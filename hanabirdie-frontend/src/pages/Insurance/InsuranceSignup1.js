import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stepper, Step } from "react-basic-stepper";
import "react-basic-stepper/dist/index.css";
import "../../assets/css/Insurance/InsuranceSignup1.css";

function InsuranceSignup1() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDailyInsurance, userId, insuranceId } = location.state || {};

  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(new Date(today));
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const updateEndDate = () => {
    const nextPeriod = new Date(startDate);
    if (isDailyInsurance === "Y") {
      nextPeriod.setDate(startDate.getDate() + 1);
      nextPeriod.setHours(0, 0, 0, 0);
    } else {
      nextPeriod.setMonth(startDate.getMonth() + selectedPeriod);
      nextPeriod.setHours(0, 0, 0, 0);
    }
    setEndDate(nextPeriod);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  useEffect(() => {
    updateEndDate();
  }, [startDate, selectedPeriod]);

  const handleDateSelection = (e) => {
    const selectedDate = new Date(e.target.value);
    handleDateChange(selectedDate);
    setIsDropdownOpen(false);
  };

  const handleHourChange = (e) => {
    const newDate = new Date(startDate);
    newDate.setHours(e.target.value);
    handleDateChange(newDate);
  };

  const handleMinuteChange = (e) => {
    const newDate = new Date(startDate);
    newDate.setMinutes(e.target.value);
    handleDateChange(newDate);
  };

  const handleNextClick = () => {
    const nextPath =
      isDailyInsurance === "Y"
        ? "/insuranceSignup2Day"
        : "/insuranceSignup2Long";
    navigate(nextPath, {
      state: {
        userId: userId,
        insuranceId: insuranceId,
        isDailyInsurance: isDailyInsurance,
        startDate: startDate,
        expireDate: endDate,
      },
    });
  };

  return (
    <div className="signup-time-select-wrap">
      <Stepper
        headerStyles={{
          activatedStepBackground: "#008485",
          lineColor: "#008485",
        }}
        indexStep={0}
      >
        <Step></Step>
        <Step></Step>
        <Step></Step>
        <Step></Step>
      </Stepper>
      <div className="time-select-header">
        <h3 className="title">라운딩 일자와 출발시간을 선택해주세요</h3>
        <div className="divider"></div> {/* 구분선 추가 */}
        <div className="middle-wrap">
          <div className="middle-wrap-left">
            <h4 className="note">
              이미 골프장에 도착하셨다면 라운딩 시간을 선택해주세요.
            </h4>
            <h3 className="title">라운딩 일자</h3>
            <h4 className="subtitle">(집에서 출발)</h4>
          </div>
          <div className="middle-wrap-right">
            <div className="date-picker">
              <div className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
                <span
                  className="dropdown-toggle"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {startDate.toLocaleDateString()} {startDate.getHours()}:
                  {startDate.getMinutes().toString().padStart(2, "0")}
                </span>
                <div className="dropdown-content">
                  <div className="date-picker-wrapper">
                    <select
                      value={startDate.toISOString()}
                      onChange={handleDateSelection}
                      className="full-date"
                    >
                      {Array.from({ length: 365 }).map((_, i) => {
                        const date = new Date(today);
                        date.setDate(today.getDate() + i);
                        return (
                          <option
                            key={date.toISOString()}
                            value={date.toISOString()}
                          >
                            {`${date.getFullYear()}/${
                              date.getMonth() + 1
                            }/${date.getDate()}(${
                              ["일", "월", "화", "수", "목", "금", "토"][
                                date.getDay()
                              ]
                            })`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="time-picker">
                    <select
                      value={startDate.getHours()}
                      onChange={handleHourChange}
                      className="hour-minute"
                    >
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    :
                    <select
                      value={startDate.getMinutes()}
                      onChange={handleMinuteChange}
                      className="hour-minute"
                    >
                      {Array.from({ length: 6 }).map((_, index) => {
                        const minute = index * 10;
                        return (
                          <option key={minute} value={minute}>
                            {minute.toString().padStart(2, "0")}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              {isDailyInsurance === "N" && (
                <div className="period-wrap">
                  <span>가입기간 선택</span>
                  <div className="period-select">
                    {[1, 3, 6, 9, 12].map((period) => (
                      <button
                        key={period}
                        onClick={() => handlePeriodChange(period)}
                        className={selectedPeriod === period ? "selected" : ""}
                      >
                        {period}개월
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div> {/* 구분선 추가 */}
      <div className="end-wrap">
        <div className="end-wrap-left">
          <h4 className="note">
            종료일시는 선택한 라운딩 일자에 맞춰 자동으로 선택됩니다.
          </h4>
          <h3 className="title">보험 종료일</h3>
          <h4 className="subtitle">(보장 종료일)</h4>
        </div>
        <div className="end-wrap-right">
          <div className="date-picker end-date-wrap">
            <span className="end-date">
              {endDate.toLocaleDateString()} 00:00
            </span>
          </div>
        </div>
      </div>
      <div className="notice-wrap">
        <div className="notice">
          <p>가입 가능 연령은 만 19세부터 만 69세까지 입니다.</p>
          <p>깔때기 홀은 제외됩니다.</p>
          <p>보험기간 이전에 발생한 사고에 대해서는 보장이 제한됩니다.</p>
        </div>
      </div>
      <button className="next-button active" onClick={handleNextClick}>
        다음
      </button>
    </div>
  );
}

export default InsuranceSignup1;
