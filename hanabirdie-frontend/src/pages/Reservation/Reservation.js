import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoMdClose,
} from "react-icons/io";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReservationConfirmModal from "./ReservationConfirmModal";
import "tui-calendar/dist/tui-calendar.css";
import "../../assets/css/Reservation/Reservation.css";
import img1 from "../../assets/png/weather-icon/1.png";
import img2 from "../../assets/png/weather-icon/2.png";
import img3 from "../../assets/png/weather-icon/3.png";
import img4 from "../../assets/png/weather-icon/4.png";
import img5 from "../../assets/png/weather-icon/5.png";
import img6 from "../../assets/png/weather-icon/6.png";
import img7 from "../../assets/png/weather-icon/7.png";
import img8 from "../../assets/png/weather-icon/8.png";
import img9 from "../../assets/png/weather-icon/9.png";
import img10 from "../../assets/png/weather-icon/10.png";
import img11 from "../../assets/png/weather-icon/11.png";
import img12 from "../../assets/png/weather-icon/12.png";
import img13 from "../../assets/png/weather-icon/13.png";
import img14 from "../../assets/png/weather-icon/14.png";
import img15 from "../../assets/png/weather-icon/15.png";
import img16 from "../../assets/png/weather-icon/16.png";
import img17 from "../../assets/png/weather-icon/17.png";
import img18 from "../../assets/png/weather-icon/18.png";
import img19 from "../../assets/png/weather-icon/19.png";
import img20 from "../../assets/png/weather-icon/20.png";
import img21 from "../../assets/png/weather-icon/21.png";
import img22 from "../../assets/png/weather-icon/22.png";
import img23 from "../../assets/png/weather-icon/23.png";
import img24 from "../../assets/png/weather-icon/24.png";
import img25 from "../../assets/png/weather-icon/25.png";
import img26 from "../../assets/png/weather-icon/26.png";
import img27 from "../../assets/png/weather-icon/27.png";
import img28 from "../../assets/png/weather-icon/28.png";
import img29 from "../../assets/png/weather-icon/29.png";
import img30 from "../../assets/png/weather-icon/30.png";
import img31 from "../../assets/png/weather-icon/31.png";
import img32 from "../../assets/png/weather-icon/32.png";
import img33 from "../../assets/png/weather-icon/33.png";
import img34 from "../../assets/png/weather-icon/34.png";
import img35 from "../../assets/png/weather-icon/35.png";
import img36 from "../../assets/png/weather-icon/36.png";

function Reservation() {
  const location = useLocation();
  const navigate = useNavigate();

  const [ccData, setCcData] = useState({
    golfCourseId: "",
    membershipId: "",
    golfCourseName: "",
    holeCount: 0,
    weekdayMember: 0,
    weekendMember: 0,
    caddyFeeNum: 0,
    cartFeeNum: 0,
    location: "",
    locationEng: "",
    nightRound: "N",
    sunrise: "",
  });

  const images = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
    6: img6,
    7: img7,
    8: img8,
    9: img9,
    10: img10,
    11: img11,
    12: img12,
    13: img13,
    14: img14,
    15: img15,
    16: img16,
    17: img17,
    18: img18,
    19: img19,
    20: img20,
    21: img21,
    22: img22,
    23: img23,
    24: img24,
    25: img25,
    26: img26,
    27: img27,
    28: img28,
    29: img29,
    30: img30,
    31: img31,
    32: img32,
    33: img33,
    34: img34,
    35: img35,
    36: img36,
  };

  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [currentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState(null);

  const [previousSelectedDate, setPreviousSelectedDate] = useState(null);
  const [selectedTeeType, setSelectedTeeType] = useState(null);
  const [selectedTeeTime, setSelectedTeeTime] = useState(null);
  const [selectedCaddyOption, setSelectedCaddyOption] = useState(null);
  const [selectedCartOption, setSelectedCartOption] = useState(null);
  const [selectedDailyInsuranceOption, setSelectedDailyInsuranceOption] =
    useState(null);
  const [insuranceType, setInsuranceType] = useState(null);
  const [availableTeeTimes, setAvailableTeeTimes] = useState([]); // 추가된 부분

  const [reservationType, setReservationType] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [apiCalled, setApiCalled] = useState(false); // API 호출 여부 상태 추가

  const reservationTypeRef = useRef(null);
  const calendarRef = useRef(null);
  const teeTimeRef = useRef(null);
  const teeOffTimeRef = useRef(null);
  const caddyRef = useRef(null);
  const cartRef = useRef(null);
  const insuranceRef = useRef(null);

  // 예약 확인 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (location.state) {
      const data = location.state;
      setCcData({
        golfCourseId: data.golfCourseId,
        membershipId: data.membershipId,
        golfCourseName: data.golfCourseName,
        holeCount: data.holeCount,
        weekdayMember: data.weekdayMember,
        weekendMember: data.weekendMember,
        caddyFeeNum: data.caddyFeeNum,
        cartFeeNum: data.cartFeeNum,
        location: data.location,
        locationEng: data.locationEng,
        nightRound: data.nightRound,
        sunrise: "", // 일출 시간은 별도로 관리
      });
    }
  }, [location.state]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const key = "n28wlnqumzynwhvlhrc130cjwi5eq1jf7pk1gj30";
      const url = `https://www.meteosource.com/api/v1/flexi/point?place_id=${ccData.locationEng}&sections=daily&timezone=Asia/Seoul&language=en&units=metric&key=${key}`;
      // url에서 free -> flexi로 요금제 변경
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data.daily.data); // API에서 날씨 데이터 설정
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (ccData.locationEng) {
      fetchWeatherData(); // 위치가 설정될 때마다 날씨 데이터를 가져옴
    }
  }, [ccData.locationEng]);

  const calculateTotalPrice = () => {
    let price = 0;
    const selectedDateObj = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDate
    );
    const dayOfWeek = selectedDateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const memberPrice = isWeekend ? ccData.weekendMember : ccData.weekdayMember;
    const multiplier = reservationType === "GROUP" ? 4 : 1;

    price += memberPrice * multiplier;

    if (selectedCaddyOption === "Y") {
      price += ccData.caddyFeeNum;
    }

    if (selectedCartOption === "Y") {
      price += ccData.cartFeeNum;
    }

    if (selectedDailyInsuranceOption === "Y") {
      price += 2500;
    }

    setTotalPrice(price);
  };

  const createYearMonthList = () => {
    const yearMonthList = [];
    let yearCounter = currentYear;
    let monthCounter = currentMonth;

    for (let i = 0; i < 24; i++) {
      yearMonthList.push({ year: yearCounter, month: monthCounter });

      monthCounter += 1;
      if (monthCounter > 12) {
        monthCounter = 1;
        yearCounter += 1;
      }
    }
    return yearMonthList;
  };

  const yearMonthList = createYearMonthList();

  const [dropDownOn, setDropDownOn] = useState(false);
  const [dropDownYear, setDropDownYear] = useState(selectedYear);
  const [dropDownMonth, setDropDownMonth] = useState(selectedMonth);

  const [calendarDate, setCalendarDate] = useState([]);
  const weekList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const resetSelectionsAfter = (step) => {
    if (step === 2) {
      setSelectedTeeType(null);
      setSelectedTeeTime(null);
      setSelectedCaddyOption(null);
      setSelectedCartOption(null);
      setSelectedDailyInsuranceOption(null);
      setInsuranceType(null);
    }
    if (step === 3) {
      setSelectedTeeTime(null);
      setSelectedCaddyOption(null);
      setSelectedCartOption(null);
      setSelectedDailyInsuranceOption(null);
      setInsuranceType(null);
    }
    if (step === 4) {
      setSelectedCaddyOption(null);
      setSelectedCartOption(null);
      setSelectedDailyInsuranceOption(null);
      setInsuranceType(null);
    }
    if (step === 5) {
      setSelectedCartOption(null);
      setSelectedDailyInsuranceOption(null);
      setInsuranceType(null);
    }
    if (step === 6) {
      setSelectedDailyInsuranceOption(null);
      setInsuranceType(null);
    }
    if (step === 7) {
      setInsuranceType(null);
    }
  };

  useEffect(() => {
    if (selectedDate && reservationType) {
      calculateTotalPrice();
    }
  }, [
    selectedDate,
    reservationType,
    selectedCaddyOption,
    selectedCartOption,
    selectedDailyInsuranceOption,
  ]);

  const dayStyle = (date, isPreviousMonth = false) => {
    const selectedDateObj = new Date(selectedYear, selectedMonth - 1, date);
    const availableSlots = getAvailableSlotsForDate(date);

    // 주말 여부 확인
    const dayOfWeek = selectedDateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const isPastDate =
      selectedYear < currentYear ||
      (selectedYear === currentYear &&
        (selectedMonth < currentMonth ||
          (selectedMonth === currentMonth && date < currentDay)));

    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDay);

    let limitDate;
    if (reservationType === "GROUP") {
      limitDate = new Date(currentDateObj);
      limitDate.setDate(limitDate.getDate() + 28);
    } else if (reservationType === "INDIV") {
      limitDate = new Date(currentDateObj);
      limitDate.setDate(limitDate.getDate() + 14);
    }

    const isSelectableDate =
      selectedDateObj > currentDateObj &&
      selectedDateObj <= limitDate &&
      availableSlots > 0; // 빈자리가 0보다 커야 선택 가능

    const isSelected = selectedDate === date;

    const disabledStyle = {
      backgroundColor: "#e0e0e0",
      color: isWeekend ? "#ff0000" : "#a0a0a0", // 주말이면 빨간색, 그 외는 회색
      cursor: "not-allowed",
    };

    const enabledStyle = {
      backgroundColor: isSelected ? "#97d1c7" : "#f9f9f9",
      color: isWeekend ? "#ff0000" : isSelected ? "#fff" : "#000", // 주말이면 빨간색, 선택된 날짜는 흰색, 그 외는 검은색
      cursor: "pointer",
    };

    return isPreviousMonth || isPastDate || !isSelectableDate
      ? disabledStyle
      : enabledStyle;
  };

  const changeMonth = (direction) => {
    resetSelectionsAfter(2);
    setSelectedDate(null);
    setSelectedTeeType(null);
    setSelectedTeeTime(null);

    if (direction === 1) {
      setSelectedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
      if (selectedMonth === 12) {
        setSelectedYear((prevYear) => prevYear + 1);
      }
    } else if (direction === -1) {
      setSelectedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
      if (selectedMonth === 1) {
        setSelectedYear((prevYear) => prevYear - 1);
      }
    }
  };

  const changeSelectMonth = (year, month) => {
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert("예약 기간이 지난 날짜입니다.");
    } else {
      resetSelectionsAfter(2);
      setSelectedYear(year);
      setSelectedMonth(month);
      setDropDownOn(false);
      setSelectedDate(null);
      setPreviousSelectedDate(null);
      setSelectedTeeType(null);
      setSelectedTeeTime(null);
    }
  };

  const fetchSunrise = async (date) => {
    const serviceKey =
      "waZCvvrzyqFno11uiSlFzjZnvcoRpTYvcMizGG0U%2BdbTXk%2F904kOaK5TzGowr1giXot89YtzzhK9V16jxGDZ1Q%3D%3D";
    const locdate = `${selectedYear}${String(selectedMonth).padStart(
      2,
      "0"
    )}${String(date).padStart(2, "0")}`;
    const location = ccData.location;
    const url = `http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo?serviceKey=${serviceKey}&locdate=${encodeURIComponent(
      locdate
    )}&location=${encodeURIComponent(location)}`;

    setLoading(true); // API 호출 시작 전 로딩 상태 활성화
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          "네트워크 응답에 문제가 있습니다: " + response.statusText
        );
      }
      const textResponse = await response.text();

      // XML 파싱
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textResponse, "application/xml");
      const sunriseElement = xmlDoc.getElementsByTagName("sunrise")[0];

      if (sunriseElement) {
        let sunriseValue = sunriseElement.textContent.trim();

        if (sunriseValue.length === 4) {
          sunriseValue =
            sunriseValue.substring(0, 2) + ":" + sunriseValue.substring(2, 4);
        }

        setCcData((prevData) => ({
          ...prevData,
          sunrise: sunriseValue,
        }));
      } else {
        throw new Error("Sunrise 태그를 찾을 수 없습니다");
      }
    } catch (error) {
      console.error("Error fetching sunrise data:", error.message);
    } finally {
      setTimeout(() => {
        setLoading(false); // 1초 후 로딩 상태 비활성화
      }, 500); // 1000밀리초 = 1초
    }
  };

  const handleDateClick = async (date) => {
    if (!reservationType) {
      // 예약 구분이 선택되지 않았을 경우 경고 메시지 표시
      alert("예약 구분을 선택해주세요.");
      return;
    }

    const availableSlots = getAvailableSlotsForDate(date);
    if (availableSlots === 0) {
      // 빈자리가 0인 경우 경고 메시지 표시
      alert("이 날짜는 예약이 모두 차있습니다.");
      return;
    }

    const isPastDate =
      selectedYear < currentYear ||
      (selectedYear === currentYear &&
        (selectedMonth < currentMonth ||
          (selectedMonth === currentMonth && date <= currentDay)));

    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDay);

    let limitDate;
    if (reservationType === "GROUP") {
      limitDate = new Date(currentDateObj);
      limitDate.setDate(limitDate.getDate() + 28); // 단체 예약은 28일 이후까지만 가능
    } else if (reservationType === "INDIV") {
      limitDate = new Date(currentDateObj);
      limitDate.setDate(limitDate.getDate() + 14); // 개인 예약은 14일 이후까지만 가능
    }

    const selectedDateObj = new Date(selectedYear, selectedMonth - 1, date);
    const isSelectableDate =
      selectedDateObj > currentDateObj && selectedDateObj <= limitDate;

    // 선택 불가 날짜에 대한 경고 메시지 표시
    if (isPastDate || !isSelectableDate) {
      if (isPastDate) {
        alert("예약 기간이 지난 날짜입니다.");
      } else {
        alert("예약이 오픈되지 않은 날짜 입니다.");
      }
      return;
    }

    if (selectedDate === date) {
      setSelectedDate(null);
      setSelectedTeeType(null);
      setSelectedTeeTime(null);
    } else {
      resetSelectionsAfter(2);
      setPreviousSelectedDate(selectedDate);
      setSelectedDate(date);
      setSelectedTeeType(null);
      setSelectedTeeTime(null);
      if (teeTimeRef.current) {
        teeTimeRef.current.scrollIntoView({ behavior: "smooth" });
      }

      // 날짜 선택 시 일출 시간 및 예약 가능한 티타임을 가져오기
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/reservation/available-time",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              golfCourseId: ccData.golfCourseId,
              reservationDate: `${selectedYear}-${String(
                selectedMonth
              ).padStart(2, "0")}-${String(date).padStart(2, "0")}`,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch available tee times");
        }

        const fetchedTeeTimes = await response.json();
        // console.log(fetchedTeeTimes);
        setAvailableTeeTimes(fetchedTeeTimes); // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching tee times:", error.message);
      }

      fetchSunrise(date); // 날짜 선택 시 일출 시간 가져오기
    }
  };

  const handleTeeTimeClick = (teeTime) => {
    setSelectedTeeType((prevTeeTime) =>
      prevTeeTime === teeTime ? null : teeTime
    );
    resetSelectionsAfter(3);
    if (teeOffTimeRef.current) {
      teeOffTimeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTeeOffTimeClick = (timeWithCourse) => {
    const [course, time] = timeWithCourse.split(" - ");
    setSelectedTeeTime((prevTime) =>
      prevTime === timeWithCourse ? null : timeWithCourse
    );
    resetSelectionsAfter(4);
    if (caddyRef.current) {
      caddyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCaddyClick = (caddyOption) => {
    setSelectedCaddyOption(caddyOption === "선택" ? "Y" : "N");
    resetSelectionsAfter(6);
    calculateTotalPrice();
    if (cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCartClick = (cartOption) => {
    setSelectedCartOption(cartOption === "선택" ? "Y" : "N");
    resetSelectionsAfter(7);
    calculateTotalPrice();
    if (insuranceRef.current) {
      insuranceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDailyInsuranceClick = (insuranceOption) => {
    setSelectedDailyInsuranceOption(insuranceOption === "가입" ? "Y" : "N");
    resetSelectionsAfter(8);
    calculateTotalPrice();
    if (insuranceOption === "선택") {
      if (insuranceType === "보유보험" || insuranceType === "데일리보험") {
        setInsuranceType(null);
      }
      if (insuranceType === null && insuranceRef.current) {
        insuranceRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleInsuranceTypeClick = (type) => {
    setInsuranceType(type);
  };

  // handleBookingClick 함수
  const handleBookingClick = async () => {
    if (!selectedTeeTime) {
      setModalContent("시간을 선택하세요");
      setModalTitle("예약 오류");
      setIsModalOpen(true);
    } else {
      const [courseType, teeOffTime] = selectedTeeTime.split(" - ");

      const bookingSummary = `
          예약 구분: ${reservationType === "GROUP" ? "단체" : "개인"}
          라운딩 날짜: ${selectedYear}-${String(selectedMonth).padStart(
        2,
        "0"
      )}-${String(selectedDate).padStart(2, "0")}
          티타임: ${selectedTeeType}
          코스 및 티오프 시간: ${selectedTeeTime}
          캐디 : ${selectedCaddyOption === "Y" ? "선택" : "미선택"}
          카트 : ${selectedCartOption === "Y" ? "선택" : "미선택"}
          데일리 보험 : ${
            selectedDailyInsuranceOption === "Y" ? "가입" : "미가입"
          }   
          총 예약 금액: ${totalPrice.toLocaleString()} 원
        `;

      setModalContent(`다음 정보로 예약하시겠습니까?\n${bookingSummary}`);
      setModalTitle("예약 확인");
      setIsModalOpen(true);
    }
  };

  const handleConfirmBooking = async () => {
    setIsModalOpen(false);
    // selectedTeeTime에서 코스 타입과 티오프 시간을 추출
    const [courseType, teeOffTime] = selectedTeeTime.split(" - ");

    const bookingDetails = {
      userId: "userid1",
      golfCourseId: ccData.golfCourseId,
      reservationDate: `${selectedYear}-${String(selectedMonth).padStart(
        2,
        "0"
      )}-${String(selectedDate).padStart(2, "0")}`,
      teeOffTime: teeOffTime,
      reservationType: reservationType,
      teeTime: selectedTeeType,
      courseType: courseType.replace("코스", ""), // '코스'를 제거한 알파벳만 저장
      caddyYn: selectedCaddyOption === "Y" ? "선택" : "미선택",
      cartYn: selectedCartOption === "Y" ? "선택" : "미선택",
      dailyInsuranceYn:
        selectedDailyInsuranceOption === "Y" ? "가입" : "미가입",
      totalPrice: `${totalPrice.toLocaleString()} 원`,
    };

    const modalContent = `
      예약 구분: ${bookingDetails.reservationType === "GROUP" ? "단체" : "개인"}
      라운딩 날짜: ${bookingDetails.reservationDate}
      티타임: ${bookingDetails.teeTime}
      코스 및 티오프 시간: ${bookingDetails.courseType} - ${
      bookingDetails.teeOffTime
    }
      캐디: ${bookingDetails.caddyYn}
      카트: ${bookingDetails.cartYn}
      데일리 보험: ${bookingDetails.dailyInsuranceYn}
      총 예약 금액: ${bookingDetails.totalPrice}
    `;

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/reservation/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "userid1",
            golfCourseId: ccData.golfCourseId,
            reservationDate: `${selectedYear}-${String(selectedMonth).padStart(
              2,
              "0"
            )}-${String(selectedDate).padStart(2, "0")}`,
            teeOffTime: teeOffTime,
            reservationType: reservationType,
            teeTime: selectedTeeType,
            courseType: courseType.replace("코스", ""), // '코스'를 제거한 알파벳만 저장
            caddyYn: selectedCaddyOption,
            cartYn: selectedCartOption,
            dailyInsuranceYn: selectedDailyInsuranceOption,
          }),
        }
      );

      const responseText = await response.text();
      if (responseText) {
        const data = JSON.parse(responseText);
        console.log("Success:", data);
        navigate("/reservationHistory", { state: data });
      } else {
        console.log("No content received.");
        navigate("/reservationHistory");
      }
    } catch (error) {
      console.error("Error during booking:", error.message);
      alert("예약 중 오류가 발생했습니다. 네트워크를 확인하세요.");
    }
  };

  const handleReservationTypeClick = async (type) => {
    setReservationType(type);
    setSelectedDate(null); // Reset selected date when switching user types

    if (ccData.golfCourseId) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/reservation/available-date",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              golfCourseId: ccData.golfCourseId,
              reservationType: type,
            }), // Include reservationType in the request
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch available dates");
        }

        const data = await response.json();

        setAvailableDates(data); // Update available dates
        updateCalendarDates(selectedYear, selectedMonth); // Update calendar with the new data
      } catch (err) {
        console.error("API Error:", err.message);
      } finally {
        setLoading(false);
      }
    }

    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const updateCalendarDates = (year, month) => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const startDay = firstDayOfMonth.getDay();

    const newCalendarDate = [];

    for (let i = 0; i < startDay; i++) {
      newCalendarDate.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      newCalendarDate.push({
        date: i,
        isCurrentMonth: true,
      });
    }

    setCalendarDate(newCalendarDate);
  };

  useEffect(() => {
    // Update calendar when year or month changes
    updateCalendarDates(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, availableDates]);

  const getAvailableSlotsForDate = (date) => {
    const selectedFormattedDate = `${selectedYear}-${String(
      selectedMonth
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    const slotData = availableDates.find(
      (day) => day.reservationDate === selectedFormattedDate
    );

    // 빈자리를 표시할 때 GROUP일 경우 4로 나눈 몫을 표시
    if (slotData) {
      return reservationType === "GROUP"
        ? Math.floor(slotData.availableSlots / 4)
        : slotData.availableSlots;
    }

    return null;
  };

  useEffect(() => {
    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
    const lastDayOfMonth = new Date(selectedYear, selectedMonth, 0);
    const startDay = firstDayOfMonth.getDay();

    const newCalendarDate = [];

    for (let i = 0; i < startDay; i++) {
      newCalendarDate.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      newCalendarDate.push({
        date: i,
        isCurrentMonth: true,
      });
    }

    setCalendarDate(newCalendarDate);
  }, [selectedYear, selectedMonth]);

  const getCourses = () => {
    const courses = [];
    const courseCount = Math.floor(ccData.holeCount / 9);

    for (let i = 0; i < courseCount; i++) {
      courses.push(String.fromCharCode(65 + i) + "코스");
    }
    // if (ccData.holeCount === 18) {
    //   courses.push("인코스", "아웃코스");
    // } else {
    //   for (let i = 0; i < courseCount; i++) {
    //     courses.push(String.fromCharCode(65 + i) + "코스");
    //   }
    // }

    return courses;
  };

  const calculateTime = (startTime, addedMinutes) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);

    const newDate = new Date(startDate.getTime() + addedMinutes * 60000);

    const newHours = String(newDate.getHours()).padStart(2, "0");
    const newMinutes = String(newDate.getMinutes()).padStart(2, "0");

    return `${newHours}:${newMinutes}`;
  };

  const calculateTeeTimes = () => {
    const durationPerHole = 7;
    const totalDuration = durationPerHole * 18;

    const firstEndTime = calculateTime(ccData.sunrise, totalDuration);
    const secondStartTime = calculateTime(firstEndTime, totalDuration);
    const secondEndTime = calculateTime(secondStartTime, totalDuration);
    const nightStartTime = calculateTime(secondEndTime, totalDuration);
    const nightEndTime = calculateTime(nightStartTime, totalDuration);

    return {
      firstEndTime,
      secondStartTime,
      secondEndTime,
      nightStartTime,
      nightEndTime,
    };
  };

  const {
    firstEndTime,
    secondStartTime,
    secondEndTime,
    nightStartTime,
    nightEndTime,
  } = calculateTeeTimes();

  const generateTeeOffTimesWithCourses = () => {
    const teeOffTimesWithCourses = [];
    const teeOffTimes = [];
    let startTime, endTime;

    if (selectedTeeType === "1부") {
      startTime = ccData.sunrise;
      endTime = firstEndTime;
    } else if (selectedTeeType === "2부") {
      startTime = secondStartTime;
      endTime = secondEndTime;
    } else if (selectedTeeType === "야간") {
      startTime = nightStartTime;
      endTime = nightEndTime;
    }

    let currentTime = startTime;
    while (currentTime < endTime) {
      teeOffTimes.push(currentTime);
      currentTime = calculateTime(currentTime, 7);
    }

    const courses = getCourses();
    courses.forEach((course) => {
      teeOffTimes.forEach((time) => {
        const key = `${course} - ${time}`;
        const teeTimeData = availableTeeTimes.filter(
          (t) => t.teeOffTime === time && t.courseType === course.charAt(0)
        );

        let disabled = false;
        const groupCount = teeTimeData.filter(
          (t) => t.reservationType === "GROUP"
        ).length;
        const individualCount = teeTimeData.filter(
          (t) => t.reservationType === "INDIV"
        ).length;

        if (reservationType === "GROUP") {
          disabled = teeTimeData.length > 0; // 그룹 예약의 경우 하나라도 예약이 있으면 비활성화
        } else if (reservationType === "INDIV") {
          disabled = groupCount > 0 || individualCount >= 4; // 개인 예약의 경우, GROUP 예약이 있거나 INDIV 예약이 4명 이상이면 비활성화
        }

        teeOffTimesWithCourses.push({
          key,
          time,
          course,
          disabled,
        });
      });
    });

    return teeOffTimesWithCourses;
  };

  const getWeatherIconForDate = (date) => {
    const selectedFormattedDate = `${selectedYear}-${String(
      selectedMonth
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDay);
    const selectedDateObj = new Date(selectedYear, selectedMonth - 1, date);

    const daysDifference =
      (selectedDateObj - currentDateObj) / (1000 * 60 * 60 * 24);
    if (daysDifference < 1 || daysDifference > 28) {
      return null; // 오늘을 제외하고 28일간의 날씨 정보만 표시
    }

    const weatherForDate = weatherData.find((weather) => {
      const weatherDate = weather.day;
      return weatherDate === selectedFormattedDate;
    });

    return weatherForDate ? images[weatherForDate.icon] : null;
  };

  const getWeatherDataForDate = (date) => {
    const selectedFormattedDate = `${selectedYear}-${String(
      selectedMonth
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDay);
    const selectedDateObj = new Date(selectedYear, selectedMonth - 1, date);

    const daysDifference =
      (selectedDateObj - currentDateObj) / (1000 * 60 * 60 * 24);
    if (daysDifference < 1 || daysDifference > 28) {
      return {}; // 오늘을 제외하고 28일간의 날씨 정보만 표시
    }

    const weatherForDate = weatherData.find(
      (weather) => weather.day === selectedFormattedDate
    );

    return weatherForDate ? weatherForDate.all_day : {};
  };

  return (
    <div className="reservation-wrap">
      <h2>'{ccData.golfCourseName}' 예약</h2>
      <h3>1. 예약 구분</h3>
      <div ref={reservationTypeRef} className="user-type-selection">
        <button
          className={`time ${reservationType === "GROUP" ? "selected" : ""}`}
          onClick={() => handleReservationTypeClick("GROUP")}
        >
          단체
          <br />
          (4인 필수)
        </button>
        <button
          className={`time ${reservationType === "INDIV" ? "selected" : ""}`}
          onClick={() => handleReservationTypeClick("INDIV")}
        >
          개인 <br />
          (개인예약에 대한 설명)
        </button>
      </div>

      <h3>2. 일자 선택</h3>
      <div ref={calendarRef}>
        <div className="calendar-legend">
          <span className="legend-item">
            <span
              className="color-box"
              style={{ backgroundColor: "#e0e0e0" }}
            ></span>
            선택 불가
          </span>
          <span className="legend-item">
            <span
              className="color-box"
              style={{ backgroundColor: "#f9f9f9" }}
            ></span>
            선택 가능
          </span>
          <span className="legend-item">
            <span
              className="color-box"
              style={{ backgroundColor: "#97d1c7" }}
            ></span>
            선택됨
          </span>
        </div>

        <div className="calendar-month">
          <IoIosArrowDropleft
            className="icon"
            onClick={() => changeMonth(-1)}
          />
          <span className="text" onClick={() => setDropDownOn(!dropDownOn)}>
            {selectedYear}.{String(selectedMonth).padStart(2, "0")}
          </span>
          <IoIosArrowDropright
            className="icon"
            onClick={() => changeMonth(1)}
          />
        </div>

        <ul className="week-list">
          {weekList.map((day, index) => (
            <li key={index} className="week-day">
              {day}
            </li>
          ))}
        </ul>

        {dropDownOn && (
          <div className="month-selector">
            <div className="top">
              <h5>단체-1개월 / 개인-2주</h5>
              <IoMdClose
                className="icon"
                onClick={() => setDropDownOn(false)}
              />
            </div>
            <div className="select-list">
              <div className="select year-select">
                {yearMonthList.map(({ year, month }, index) => (
                  <div
                    key={index}
                    className={`option ${
                      year === dropDownYear && month === dropDownMonth
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {
                      setDropDownYear(year);
                      setDropDownMonth(month);
                      changeSelectMonth(year, month);
                    }}
                  >
                    {year}년 {String(month).padStart(2, "0")}월
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <ul className="calendar-day">
          {calendarDate.map((item, index) =>
            item ? (
              <li
                className={`day ${
                  item.isCurrentMonth ? "current" : "prev-month"
                }`}
                style={dayStyle(item.date, !item.isCurrentMonth)}
                key={index}
                onClick={() =>
                  item.isCurrentMonth ? handleDateClick(item.date) : null
                }
              >
                <div className="day-top">{item.date}</div>
                <div className="day-bottom">
                  <div className="weather-wrapper">
                    {getWeatherIconForDate(item.date) && (
                      <>
                        <img
                          src={getWeatherIconForDate(item.date)}
                          alt="Weather icon"
                          className="weather-icon"
                        />
                        <div className="temperature">
                          {getWeatherDataForDate(
                            item.date
                          )?.temperature_max.toFixed(1)}
                          ° <br />
                          {getWeatherDataForDate(
                            item.date
                          )?.temperature_min.toFixed(1)}
                          °
                        </div>
                      </>
                    )}
                  </div>
                  {getAvailableSlotsForDate(item.date) && (
                    <div className="available-slots">
                      {reservationType === "GROUP"
                        ? `빈자리: ${getAvailableSlotsForDate(item.date)}팀`
                        : `빈자리: ${getAvailableSlotsForDate(item.date)}인`}
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li
                className="day empty"
                key={index}
                style={{ backgroundColor: "#e0e0e0" }}
              ></li>
            )
          )}
        </ul>
      </div>

      {selectedDate &&
        loading && ( // 로딩 중일 때 메시지 표시
          <div className="loading-screen">
            <p>{`${selectedYear}-${String(selectedMonth).padStart(
              2,
              "0"
            )}-${String(selectedDate).padStart(
              2,
              "0"
            )}의 일출 시간 정보를 가져오는 중입니다.`}</p>
          </div>
        )}

      {selectedDate &&
        !loading && ( // 로딩 중이 아닐 때만 3번부터 표시
          <>
            <div ref={teeTimeRef}>
              <h3>3. 티타임 선택 (일출시간 : {ccData.sunrise})</h3>
              <div className="hidden-button">
                <button
                  className={`time ${
                    selectedTeeType === "1부" ? "selected" : ""
                  }`}
                  onClick={() => handleTeeTimeClick("1부")}
                  disabled={!selectedDate} // selectedDate가 null이면 버튼 비활성화
                >
                  1부 ({ccData.sunrise} ~ {firstEndTime})
                </button>

                <button
                  className={`time ${
                    selectedTeeType === "2부" ? "selected" : ""
                  }`}
                  onClick={() => handleTeeTimeClick("2부")}
                  disabled={!selectedDate} // selectedDate가 null이면 버튼 비활성화
                >
                  2부 ({secondStartTime} ~ {secondEndTime})
                </button>

                {ccData.nightRound === "Y" && (
                  <button
                    className={`time ${
                      selectedTeeType === "야간" ? "selected" : ""
                    }`}
                    onClick={() => handleTeeTimeClick("야간")}
                    disabled={!selectedDate} // selectedDate가 null이면 버튼 비활성화
                  >
                    야간 라운딩 ({nightStartTime} ~ {nightEndTime})
                  </button>
                )}
              </div>
            </div>

            {selectedTeeType && (
              <div ref={teeOffTimeRef}>
                <h3>4. 코스 및 티오프 시간 선택</h3>
                <div className="calendar-legend">
                  <span className="legend-item">
                    <span
                      className="color-box"
                      style={{ backgroundColor: "#e0e0e0" }}
                    ></span>
                    선택 불가
                  </span>
                  <span className="legend-item">
                    <span
                      className="color-box"
                      style={{ backgroundColor: "#f9f9f9" }}
                    ></span>
                    선택 가능
                  </span>
                  <span className="legend-item">
                    <span
                      className="color-box"
                      style={{ backgroundColor: "#97d1c7" }}
                    ></span>
                    선택됨
                  </span>
                </div>
                <div className="hidden-button hidden-button-tee-off">
                  {getCourses().map((course, index) => (
                    <React.Fragment key={course}>
                      <div className="course-name">{course}</div>
                      {/* {generateTeeOffTimesWithCourses()
                        .filter((time) => time.startsWith(course))
                        .map((time) => (
                          <button
                            key={time}
                            className={`time ${
                              selectedTeeTime === time ? "selected" : ""
                            }`}
                            onClick={() => handleTeeOffTimeClick(time)}
                          >
                            {time.split(" - ")[1]}
                          </button>
                        ))} */}
                      {generateTeeOffTimesWithCourses()
                        .filter((timeObj) => timeObj.course === course)
                        .map((timeObj) => (
                          <button
                            key={timeObj.key}
                            className={`time ${
                              timeObj.disabled
                                ? "disabled"
                                : selectedTeeTime === timeObj.key
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              if (timeObj.disabled) {
                                alert("이 티오프 시간은 예약이 불가능합니다.");
                              } else {
                                handleTeeOffTimeClick(timeObj.key);
                              }
                            }}
                            disabled={timeObj.disabled} // 비활성화 속성 추가
                          >
                            {timeObj.time}
                          </button>
                        ))}

                      {/* 마지막 코스가 아닐 경우에만 구분선을 추가 */}
                      {index < getCourses().length - 1 && (
                        <div className="course-separator"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {selectedTeeTime && (
              <div ref={caddyRef}>
                <h3>5. 캐디 선택</h3>
                <div className="hidden-button">
                  <button
                    className={`time ${
                      selectedCaddyOption === "Y" ? "selected" : ""
                    }`}
                    onClick={() => handleCaddyClick("선택")}
                    disabled={!selectedTeeTime} // selectedTeeTime이 null이면 버튼 비활성화
                  >
                    선택
                  </button>
                  <button
                    className={`time ${
                      selectedCaddyOption === "N" ? "selected" : ""
                    }`}
                    onClick={() => handleCaddyClick("미선택")}
                    disabled={!selectedTeeTime} // selectedTeeTime이 null이면 버튼 비활성화
                  >
                    미선택
                  </button>
                </div>
              </div>
            )}

            {selectedCaddyOption && (
              <div ref={cartRef}>
                <h3>6. 카트 선택</h3>
                <div className="hidden-button">
                  <button
                    className={`time ${
                      selectedCartOption === "Y" ? "selected" : ""
                    }`}
                    onClick={() => handleCartClick("선택")}
                    disabled={!selectedCaddyOption} // selectedCaddyOption이 null이면 버튼 비활성화
                  >
                    선택
                  </button>
                  <button
                    className={`time ${
                      selectedCartOption === "N" ? "selected" : ""
                    }`}
                    onClick={() => handleCartClick("미선택")}
                    disabled={!selectedCaddyOption} // selectedCaddyOption이 null이면 버튼 비활성화
                  >
                    미선택
                  </button>
                </div>
              </div>
            )}

            {selectedCartOption && (
              <div ref={insuranceRef}>
                <h3>7. 데일리 보험 선택</h3>
                <div className="hidden-button">
                  <button
                    className={`time ${
                      selectedDailyInsuranceOption === "Y" ? "selected" : ""
                    }`}
                    onClick={() => handleDailyInsuranceClick("가입")}
                    disabled={!selectedCartOption} // selectedCartOption이 null이면 버튼 비활성화
                  >
                    가입
                  </button>
                  <button
                    className={`time ${
                      selectedDailyInsuranceOption === "N" ? "selected" : ""
                    }`}
                    onClick={() => handleDailyInsuranceClick("미가입")}
                    disabled={!selectedCartOption} // selectedCartOption이 null이면 버튼 비활성화
                  >
                    미가입
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      {selectedTeeTime && !loading && (
        <>
          <div className="total-price">
            <h3>총 예약 금액: {totalPrice.toLocaleString()} 원</h3>
          </div>

          {selectedDailyInsuranceOption && (
            <div className="booking-button">
              <button
                onClick={handleBookingClick}
                style={{
                  backgroundColor: "#008485",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                예약하기
              </button>
            </div>
          )}
          <ReservationConfirmModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmBooking}
            title={modalTitle}
            content={modalContent}
          />
        </>
      )}
    </div>
  );
}

export default Reservation;
