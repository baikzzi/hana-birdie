import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
// import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "tui-calendar/dist/tui-calendar.css";
import "../../assets/css/Reservation/ReservationHistory.css";
import statusConfirmed from "../../assets/png/status_confirmed.png";
import statusDone from "../../assets/png/status_done.png";
import statusCancelled from "../../assets/png/status_cancelled.png";

// Chart.js에서 필요한 스케일과 컴포넌트를 등록합니다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Calendar() {
  const { userInfo } = useAuth();
  const userId = userInfo.userId;

  const [currentDate] = useState(new Date());
  const [currentYear] = useState(currentDate.getFullYear());
  const [currentMonth] = useState(currentDate.getMonth() + 1);
  const [currentDay] = useState(currentDate.getDate());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [calendarDate, setCalendarDate] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReservations, setSelectedReservations] = useState([]);

  const [roundCount, setRoundCount] = useState(0);
  const [timeSlotStats, setTimeSlotStats] = useState({});
  const [golfCourseStats, setGolfCourseStats] = useState([]);
  const [teeTimeStats, setTeeTimeStats] = useState({});
  const [upcomingRoundSummary, setUpcomingRoundSummary] = useState({
    count: 0,
    nearestDate: "",
    nearestGolfCourse: "",
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const changeMonth = (direction) => {
    if (direction === 1) {
      if (selectedMonth === 12) {
        setSelectedMonth(1);
        setSelectedYear((prevYear) => prevYear + 1);
      } else {
        setSelectedMonth((prevMonth) => prevMonth + 1);
      }
    } else if (direction === -1) {
      if (selectedMonth === 1) {
        setSelectedMonth(12);
        setSelectedYear((prevYear) => prevYear - 1);
      } else {
        setSelectedMonth((prevMonth) => prevMonth - 1);
      }
    }
  };

  const fetchReservationData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/reservation/status",
        { userId }
      );

      const reservationData = response.data || [];

      setReservations(reservationData);

      // 라운딩 횟수
      setRoundCount(reservationData.length);

      // 시간대 통계 계산
      const timeSlots = reservationData.reduce((acc, curr) => {
        const timeSlot = curr.teeOffTime.split(":")[0];
        if (acc[timeSlot]) {
          acc[timeSlot]++;
        } else {
          acc[timeSlot] = 1;
        }
        return acc;
      }, {});
      setTimeSlotStats(timeSlots);

      // 골프장별 이용 횟수 통계 계산
      const golfCourses = reservationData.reduce((acc, curr) => {
        if (acc[curr.golfCourseName]) {
          acc[curr.golfCourseName]++;
        } else {
          acc[curr.golfCourseName] = 1;
        }
        return acc;
      }, {});

      // 상위 3개 골프장 정렬 후 추출
      const sortedGolfCourses = Object.entries(golfCourses)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      setGolfCourseStats(sortedGolfCourses);

      // 티타임별 예약 통계 계산
      const teeTimes = reservationData.reduce((acc, curr) => {
        if (acc[curr.teeTime]) {
          acc[curr.teeTime]++;
        } else {
          acc[curr.teeTime] = 1;
        }
        return acc;
      }, {});
      setTeeTimeStats(teeTimes);

      // 예정된 라운딩 요약 계산
      const upcomingRoundsData = reservationData.filter(
        (res) => new Date(res.reservationDate) > new Date()
      );

      if (upcomingRoundsData.length > 0) {
        const nearestRound = upcomingRoundsData.reduce((prev, curr) => {
          return new Date(prev.reservationDate) < new Date(curr.reservationDate)
            ? prev
            : curr;
        });

        setUpcomingRoundSummary({
          count: upcomingRoundsData.length,
          nearestDate: nearestRound.reservationDate,
          nearestGolfCourse: nearestRound.golfCourseName,
        });
      } else {
        setUpcomingRoundSummary({
          count: 0,
          nearestDate: "",
          nearestGolfCourse: "",
        });
      }
      // 데이터 처리 후 차트 데이터 설정
      setChartData(processReservationData(reservationData));
    } catch (error) {
      console.error("Failed to fetch reservation data:", error);
    }
  };

  const processReservationData = (reservations) => {
    if (!reservations || reservations.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const timeLabels = Array.from(
      { length: 24 },
      (_, i) => `${String(i).padStart(2, "0")}:00`
    );
    const golfCourseNames = [
      ...new Set(reservations.map((r) => r.golfCourseName)),
    ];

    const datasets = golfCourseNames.map((courseName) => {
      const data = Array(24).fill(0);
      reservations
        .filter((r) => r.golfCourseName === courseName)
        .forEach((r) => {
          const hour = parseInt(r.teeOffTime.split(":")[0], 10);
          data[hour] += 1;
        });

      return {
        label: courseName,
        data: data,
        borderColor: getRandomColor(),
        fill: false,
      };
    });

    return {
      labels: timeLabels,
      datasets: datasets,
    };
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    fetchReservationData();
  }, [userId]);

  useEffect(() => {
    if (reservations.length > 0) {
      const chartData = processReservationData(reservations);
      setChartData(chartData);
    }
  }, [reservations]);

  useEffect(() => {
    const newStartDate = new Date(selectedYear, selectedMonth - 1, 1);
    const newEndDate = new Date(selectedYear, selectedMonth, 0);
    const startDay = newStartDate.getDay();
    const totalDays = newEndDate.getDate();

    const prevMonthEndDate = new Date(selectedYear, selectedMonth - 1, 0);
    const prevMonthTotalDays = prevMonthEndDate.getDate();

    const newCalendarDate = [];

    for (let i = startDay - 1; i >= 0; i--) {
      newCalendarDate.push({
        date: prevMonthTotalDays - i,
        isCurrentMonth: false,
        year: selectedMonth === 1 ? selectedYear - 1 : selectedYear,
        month: selectedMonth === 1 ? 12 : selectedMonth - 1,
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      newCalendarDate.push({
        date: i,
        isCurrentMonth: true,
        year: selectedYear,
        month: selectedMonth,
      });
    }

    const remainingDays = 35 - newCalendarDate.length;
    for (let i = 1; i <= remainingDays; i++) {
      newCalendarDate.push({
        date: i,
        isCurrentMonth: false,
        year: selectedMonth === 12 ? selectedYear + 1 : selectedYear,
        month: selectedMonth === 12 ? 1 : selectedMonth + 1,
      });
    }

    setCalendarDate(newCalendarDate);
  }, [selectedYear, selectedMonth]);

  const dayStyle = (date, isCurrentMonth = false) => {
    const selectedDate = new Date(selectedYear, selectedMonth - 1, date);
    const dayOfWeek = selectedDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isToday =
      selectedYear === currentYear &&
      selectedMonth === currentMonth &&
      date === currentDay;

    return {
      color: isWeekend ? "#ff0000" : isCurrentMonth ? "#000" : "#aaa",
      cursor: isCurrentMonth ? "default" : "pointer",
      fontWeight: isToday ? "bold" : "normal",
    };
  };

  const handleDateClick = (date) => {
    const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}`;

    const reservationsForDate = reservations.filter(
      (res) => res.reservationDate === formattedDate
    );

    if (reservationsForDate.length > 0) {
      setSelectedReservations(reservationsForDate);
      setModalIsOpen(true);
    } else {
      console.log("No reservation found for this date."); // 디버깅용 로그
    }
  };

  const getReservationStatusInfo = (date) => {
    const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}`;

    const dayReservations = reservations.filter(
      (res) => res.reservationDate === formattedDate
    );

    if (dayReservations.length > 0) {
      let statusImage;
      if (dayReservations.some((res) => res.status === "CANCELLED")) {
        statusImage = statusCancelled;
      } else if (dayReservations.some((res) => res.status === "DONE")) {
        statusImage = statusDone;
      } else {
        statusImage = statusConfirmed;
      }

      return { statusImage, count: dayReservations.length };
    }
    return null;
  };

  const isWeekend = (date) => {
    const selectedDate = new Date(selectedYear, selectedMonth - 1, date);
    const dayOfWeek = selectedDate.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0은 일요일, 6은 토요일
  };

  const handleCancelReservation = async (reservationNum) => {
    try {
      await axios.post("http://localhost:8080/api/v1/reservation/cancel", {
        reservationNum,
      });
      message.success("예약이 취소되었습니다.");
      setModalIsOpen(false);
      fetchReservationData(); // 취소 후 데이터를 다시 불러옴
    } catch (error) {
      console.error("예약 취소 실패:", error);
      message.error("예약 취소 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="custom-calendar-wrap">
      <h2 style={{ textAlign: "center" }}>{userInfo.name} 님의 라운딩 달력</h2>
      <div className="custom-calendar">
        <div className="custom-calendar-img-info">
          <span className="custom-calendar-legend-item">
            <img src={statusConfirmed} className="custom-calendar-img"></img>
            예약됨
          </span>
          <span className="custom-calendar-legend-item">
            <img src={statusCancelled} className="custom-calendar-img"></img>
            취소됨
          </span>
          <span className="custom-calendar-legend-item">
            <img src={statusDone} className="custom-calendar-img"></img>
            라운딩완료
          </span>
        </div>
        <div className="custom-calendar-month">
          <IoIosArrowDropleft
            className="custom-icon"
            onClick={() => changeMonth(-1)}
          />
          <span className="custom-text">
            {selectedYear}.{String(selectedMonth).padStart(2, "0")}
          </span>
          <IoIosArrowDropright
            className="custom-icon"
            onClick={() => changeMonth(1)}
          />
        </div>

        <ul className="custom-week-list">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <li key={index} className="custom-week-day">
                {day}
              </li>
            )
          )}
        </ul>

        <ul className="custom-calendar-day">
          {calendarDate.map(({ date, isCurrentMonth }, index) => {
            const reservationInfo = isCurrentMonth
              ? getReservationStatusInfo(date)
              : null;

            return (
              <li
                key={index}
                className={`custom-day ${
                  isCurrentMonth &&
                  selectedYear === currentYear &&
                  selectedMonth === currentMonth &&
                  date === currentDay
                    ? "custom-today"
                    : ""
                }`}
                style={dayStyle(date, isCurrentMonth)}
                onClick={() =>
                  isCurrentMonth && reservationInfo
                    ? handleDateClick(date)
                    : null
                }
              >
                <div
                  className="date-number"
                  style={{ color: isWeekend(date) ? "#ff0000" : "#000" }} // 주말 색상 설정
                >
                  {date}
                </div>
                {reservationInfo && (
                  <div className="reservation-container">
                    <img
                      src={reservationInfo.statusImage}
                      alt=""
                      className="reservation-image"
                    />
                    {reservationInfo.count > 1 && (
                      <span className="reservation-count">
                        {reservationInfo.count}
                      </span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Reservation Details"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>라운딩 기록</h2>
          <button
            onClick={() => setModalIsOpen(false)}
            className="ReservationHistory-modal-close-button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          {selectedReservations.length > 0 &&
            selectedReservations.map((reservation, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <table className="modal-table">
                  <tbody>
                    <tr>
                      <td className="modal-table-label">예약 번호</td>
                      <td className="modal-table-value">
                        {reservation.reservationNum}
                      </td>
                    </tr>
                    <tr>
                      <td className="modal-table-label">골프장</td>
                      <td className="modal-table-value">
                        {reservation.golfCourseName}
                      </td>
                    </tr>
                    <tr>
                      <td className="modal-table-label">예약일</td>
                      <td className="modal-table-value">
                        {reservation.reservationDate}
                      </td>
                    </tr>
                    <tr>
                      <td className="modal-table-label">티오프</td>
                      <td className="modal-table-value">
                        {reservation.teeOffTime}
                      </td>
                    </tr>
                    <tr>
                      <td className="modal-table-label">상태</td>
                      <td className="modal-table-value">
                        {reservation.status}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {reservation.status === "CONFIRMED" && (
                  <button
                    onClick={() =>
                      handleCancelReservation(reservation.reservationNum)
                    }
                    className="reservation-modal-cancel-button"
                  >
                    예약 취소하기
                  </button>
                )}
              </div>
            ))}
        </Modal>
      </div>
    </div>
  );
}

export default Calendar;
