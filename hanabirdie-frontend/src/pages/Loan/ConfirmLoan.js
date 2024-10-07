// src/components/ConfirmLoan.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Loan/ConfirmLoan.css";
import complete from "../../assets/gif/complete.gif";

const ConfirmLoan = () => {
  // 알림 상태
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });

  // 페이지 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate();

  // 대출내역 조회 버튼 클릭 시 /loanHistory로 이동
  const handleViewLoanHistoryClick = () => {
    navigate("/loanHistory");
  };

  return (
    <div className="confirm-loan-container">
      {alert.show && (
        <div className={`alert ${alert.variant}`}>
          <span
            className="closebtn"
            onClick={() => setAlert({ ...alert, show: false })}
          >
            &times;
          </span>
          {alert.message}
        </div>
      )}

      <div className="main-content">
        <h2>기업대출신청</h2>

        <div id="applyResult" className="confirmation-message">
          <div className="result-top">
            <img src={complete} alt="Checked" width="460" height="180" />
            <h1>
              <span style={{ color: "#008485" }}>기업대출</span> 신청이
              완료되었습니다.
            </h1>
          </div>
          <div className="result-bottom">
            <p>대출심사는 1주일 내외로 소요됩니다.</p>
            <p>대출신청 진행상황은 대출 &gt; 대출내역에서 확인 가능합니다.</p>
          </div>
        </div>

        <div className="view-loan-button-container">
          <button
            className="view-loan-button"
            onClick={handleViewLoanHistoryClick} // 버튼 클릭 시 페이지 이동
          >
            대출내역조회
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLoan;
