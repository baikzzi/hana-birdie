// import React, { useEffect, useState } from "react";
// import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
// import "tui-calendar/dist/tui-calendar.css";
// import "../../assets/css/ReservationStatus.css";
// import "../../assets/png/status_cancelled.png";
// import "../../assets/png/status_confirmed.png";

// function ReservationHistory() {
//   const [currentDate] = useState(new Date());
//   const [currentYear] = useState(currentDate.getFullYear());
//   const [currentMonth] = useState(currentDate.getMonth() + 1);
//   const [currentDay] = useState(currentDate.getDate());
//   const [selectedYear, setSelectedYear] = useState(currentYear);
//   const [selectedMonth, setSelectedMonth] = useState(currentMonth);
//   const [calendarDate, setCalendarDate] = useState([]);

//   const changeMonth = (direction) => {
//     if (direction === 1) {
//       if (selectedMonth === 12) {
//         setSelectedMonth(1);
//         setSelectedYear((prevYear) => prevYear + 1);
//       } else {
//         setSelectedMonth((prevMonth) => prevMonth + 1);
//       }
//     } else if (direction === -1) {
//       if (selectedMonth === 1) {
//         setSelectedMonth(12);
//         setSelectedYear((prevYear) => prevYear - 1);
//       } else {
//         setSelectedMonth((prevMonth) => prevMonth - 1);
//       }
//     }
//   };

//   useEffect(() => {
//     const newStartDate = new Date(selectedYear, selectedMonth - 1, 1);
//     const newEndDate = new Date(selectedYear, selectedMonth, 0);
//     const startDay = newStartDate.getDay();
//     const totalDays = newEndDate.getDate();

//     const prevMonthEndDate = new Date(selectedYear, selectedMonth - 1, 0);
//     const prevMonthTotalDays = prevMonthEndDate.getDate();

//     const newCalendarDate = [];

//     for (let i = startDay - 1; i >= 0; i--) {
//       newCalendarDate.push({
//         date: prevMonthTotalDays - i,
//         isCurrentMonth: false,
//         year: selectedMonth === 1 ? selectedYear - 1 : selectedYear,
//         month: selectedMonth === 1 ? 12 : selectedMonth - 1,
//       });
//     }

//     for (let i = 1; i <= totalDays; i++) {
//       newCalendarDate.push({
//         date: i,
//         isCurrentMonth: true,
//         year: selectedYear,
//         month: selectedMonth,
//       });
//     }

//     const remainingDays = 35 - newCalendarDate.length;
//     for (let i = 1; i <= remainingDays; i++) {
//       newCalendarDate.push({
//         date: i,
//         isCurrentMonth: false,
//         year: selectedMonth === 12 ? selectedYear + 1 : selectedYear,
//         month: selectedMonth === 12 ? 1 : selectedMonth + 1,
//       });
//     }

//     setCalendarDate(newCalendarDate);
//   }, [selectedYear, selectedMonth]);

//   const dayStyle = (date, isCurrentMonth = false) => {
//     const selectedDate = new Date(selectedYear, selectedMonth - 1, date);
//     const dayOfWeek = selectedDate.getDay();
//     const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
//     const isToday =
//       selectedYear === currentYear &&
//       selectedMonth === currentMonth &&
//       date === currentDay;

//     return {
//       color: isWeekend ? "#ff0000" : isCurrentMonth ? "#000" : "#aaa", // 주말은 빨간색으로 표시
//       cursor: isCurrentMonth ? "default" : "pointer",
//       fontWeight: isToday ? "bold" : "normal",
//     };
//   };

//   const handleDateClick = (year, month) => {
//     setSelectedYear(year);
//     setSelectedMonth(month);
//   };

//   return (
//     <div className="custom-calendar-wrap">
//       <div className="custom-calendar-month">
//         <IoIosArrowDropleft
//           className="custom-icon"
//           onClick={() => changeMonth(-1)}
//         />
//         <span className="custom-text">
//           {selectedYear}.{String(selectedMonth).padStart(2, "0")}
//         </span>
//         <IoIosArrowDropright
//           className="custom-icon"
//           onClick={() => changeMonth(1)}
//         />
//       </div>

//       <ul className="custom-week-list">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
//           <li key={index} className="custom-week-day">
//             {day}
//           </li>
//         ))}
//       </ul>

//       <ul className="custom-calendar-day">
//         {calendarDate.map(({ date, isCurrentMonth, year, month }, index) => (
//           <li
//             key={index}
//             className={`custom-day ${
//               isCurrentMonth &&
//               selectedYear === currentYear &&
//               selectedMonth === currentMonth &&
//               date === currentDay
//                 ? "custom-today"
//                 : ""
//             }`}
//             style={dayStyle(date, isCurrentMonth)}
//             onClick={() => !isCurrentMonth && handleDateClick(year, month)}
//           >
//             {date}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ReservationHistory;
