import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Stepper, Step } from "react-basic-stepper";
import "react-basic-stepper/dist/index.css";
import "../../assets/css/Insurance/InsuranceSignup3.css";

function InsuranceSignup3() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const {
    userId,
    insuranceId,
    isDailyInsurance,
    startDate,
    expireDate,
    price,
  } = location.state || {};

  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState({
    term2: false,
    term3: false,
    term4: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setChecks((prevChecks) => {
      const newChecks = { ...prevChecks, [name]: checked };
      return newChecks;
    });
  };

  useEffect(() => {
    // 모든 체크박스가 체크되면 allChecked를 true로 설정
    setAllChecked(checks.term2 && checks.term3 && checks.term4);
  }, [checks]);

  const handleNextClick = () => {
    if (allChecked) {
      navigate("/insuranceSignup4", {
        state: {
          userId,
          insuranceId,
          isDailyInsurance,
          startDate,
          expireDate,
          price,
        },
      });
    }
  };

  return (
    <div className="insurace-signup3-container">
      <Stepper
        headerStyles={{
          activatedStepBackground: "#009178",
          lineColor: "#009178",
        }}
        indexStep={2}
      >
        <Step></Step>
        <Step></Step>
        <Step></Step>
        <Step></Step>
      </Stepper>
      <div className="progress-steps">
        <h2 className="title">가입 전 필수 안내사항을 확인해주세요.</h2>
      </div>
      <div className="agreement-section">
        <ul className="agreement-list">
          <li className="agreement-item">
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />
              <div className="checkbox-icon"></div>
              <div className="agreement-text">
                피보험자가 골프 선수, 지도자 혹은 골프장 관련 종사자일 경우{" "}
                <span className="highlight-text">보장이 제한</span>될 수
                있습니다.
              </div>
            </label>
          </li>
          <li className="agreement-item">
            <label>
              <input
                type="checkbox"
                name="term3"
                checked={checks.term3}
                onChange={handleCheckboxChange}
              />
              <div className="checkbox-icon"></div>
              <div className="agreement-text">
                국내 소재 <span className="highlight-text">18홀 이상</span>을
                보유한 골프장에서 발생된 사고에 대해서만 보장합니다.
              </div>
            </label>
          </li>
          <li className="agreement-item">
            <label>
              <input
                type="checkbox"
                name="term4"
                checked={checks.term4}
                onChange={handleCheckboxChange}
              />
              <div className="checkbox-icon"></div>
              <div className="agreement-text">
                실제 발생할 손해를 보상하는 담보를 중복으로 가입하는 경우,{" "}
                <span className="highlight-text">보험계약별 비례보상</span>될 수
                있습니다.
              </div>
            </label>
          </li>
        </ul>
      </div>
      <div className="action-buttons">
        <button
          className={`InsuranceSignup3-button ${
            allChecked ? "enabled" : "disabled"
          }`}
          onClick={handleNextClick}
          disabled={!allChecked} // 모든 체크박스가 체크되지 않으면 버튼이 비활성화됨
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default InsuranceSignup3;
