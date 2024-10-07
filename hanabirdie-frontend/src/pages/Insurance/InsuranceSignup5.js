import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Insurance/InsuranceSignup5.css";
import complete from "../../assets/gif/complete.gif";

function InsuranceSignup5() {
  const navigate = useNavigate();

  return (
    <div className="insurance-signup-complete-container">
      <div className="completion-message">
        <h1>가입이 완료되었습니다!</h1>
        <img src={complete} alt="complete gif" className="gif-style" />
      </div>
      <div className="insurance-signup-action-buttons">
        <button className="home-button" onClick={() => navigate("/")}>
          홈으로
        </button>
        <button
          className="insurance-signup-details-button"
          onClick={() => navigate("/insuranceList")}
        >
          보험 내역 확인하기
        </button>
      </div>
    </div>
  );
}

export default InsuranceSignup5;
