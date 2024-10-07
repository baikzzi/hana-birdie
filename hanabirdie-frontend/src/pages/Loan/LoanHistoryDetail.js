// src/components/LoanHistoryDetail.js
import React from "react";
import "../../assets/css/Loan/LoanHistoryDetail.css";
import dayjs from "dayjs";
import { useAuth } from "../../context/AuthContext";

const LoanHistoryDetail = ({ loan, onClose }) => {
  const { userInfo } = useAuth();
  const name = userInfo?.name || ""; // 대출자 이름 추출

  // 총 납입 회차 계산 함수
  const calculatePaymentsMade = (loanStartDate, loanTerm) => {
    if (!loanStartDate) return 0;
    const now = dayjs();
    const start = dayjs(loanStartDate);
    if (now.isBefore(start, "month")) return 0;
    const monthsPassed = now.diff(start, "month");
    return Math.min(monthsPassed, loanTerm);
  };

  // Function to calculate remaining balance
  const calculateRemainingBalance = (loan, paymentsMade) => {
    const { loanRepaymentMethod, loanAmount, interestRate, loanTerm } = loan;
    const P = loanAmount;
    const r = interestRate / 100 / 12; // 월 이자율
    const N = loanTerm; // 전체 기간 (월 단위)
    const n = paymentsMade; // 이미 납부한 회차

    let remainingBalance = P;

    if (loanRepaymentMethod === "원리금균등상환") {
      // 원리금 균등상환 잔액 계산
      if (n === 0) {
        remainingBalance = P;
      } else {
        remainingBalance =
          (P * (Math.pow(1 + r, N) - Math.pow(1 + r, n))) /
          (Math.pow(1 + r, N) - 1);
      }
    } else if (loanRepaymentMethod === "원금균등상환") {
      // 원금 균등상환 잔액 계산
      remainingBalance = P - (P / N) * n;
    } else if (loanRepaymentMethod === "원금만기일시상환") {
      // 원금만기일시상환 잔액 계산
      if (n < N) {
        remainingBalance = P;
      } else {
        remainingBalance = 0;
      }
    }

    return Math.round(remainingBalance);
  };

  // Function to calculate next payment date
  const calculateNextPaymentDate = (loan, paymentsMade) => {
    const { loanStartDate, interestDueDate, loanExpireDate } = loan;
    if (!loanStartDate || !interestDueDate || !loanExpireDate) return "N/A";

    const lastPaymentDate = dayjs(loanStartDate)
      .add(paymentsMade, "month")
      .date(interestDueDate);
    const now = dayjs();

    let nextPaymentDate = lastPaymentDate.isAfter(now, "day")
      ? lastPaymentDate
      : lastPaymentDate.add(1, "month");

    // 만기일을 넘지 않도록 조정
    if (nextPaymentDate.isAfter(dayjs(loanExpireDate))) {
      nextPaymentDate = dayjs(loanExpireDate);
    }

    return nextPaymentDate.format("YYYY-MM-DD");
  };

  // 총 납입 회차 계산
  const paymentsMade = calculatePaymentsMade(loan.loanStartDate, loan.loanTerm);

  // 남은 대출 잔액 계산
  const remainingBalance = calculateRemainingBalance(loan, paymentsMade);

  // 다음 납부일 계산
  const nextPaymentDate = calculateNextPaymentDate(loan, paymentsMade);

  return (
    <div className="LoanHistoryDetail_overlay">
      <div className="LoanHistoryDetail_content">
        <div className="LoanHistoryDetail_header">
          <h2>대출 상세 정보</h2>
          <button className="LoanHistoryDetail_close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="LoanHistoryDetail_body">
          <table className="LoanHistoryDetail_table">
            <tbody>
              <tr>
                <th>대출종류</th>
                <td>{loan.loanName}</td>
              </tr>
              <tr>
                <th>대출자 성명</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th>계좌번호</th>
                <td>{loan.loanAccountNumber}</td>
              </tr>
              <tr>
                <th>대출원금</th>
                <td>{loan.loanAmount.toLocaleString()} 원</td>
              </tr>
              <tr>
                <th>대출잔액</th>
                <td>{remainingBalance.toLocaleString()} 원</td>
              </tr>
              <tr>
                <th>적용이율</th>
                <td>{loan.interestRate}%</td>
              </tr>
              <tr>
                <th>신청일자</th>
                <td>
                  {loan.loanApplicationDate
                    ? dayjs(loan.loanApplicationDate).format("YYYY. MM. D.")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th>만기일자</th>
                <td>
                  {loan.loanExpireDate
                    ? dayjs(loan.loanExpireDate).format("YYYY. MM. D.")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th>다음 납부일</th>
                <td>{nextPaymentDate}</td>
              </tr>
            </tbody>
          </table>
          <div className="LoanHistoryDetail_summary">
            <h3>상환 현황</h3>
            <p>총 납입 회차: {paymentsMade} 회차</p>
            <p>남은 대출금액: {remainingBalance.toLocaleString()} 원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanHistoryDetail;
