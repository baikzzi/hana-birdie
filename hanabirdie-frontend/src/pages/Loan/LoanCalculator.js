import React, { useState } from "react";
import "../../assets/css/Loan/LoanCalculator.css";

const LoanCalculator = ({ closeCalculator }) => {
  const [repaymentMethod, setRepaymentMethod] = useState(""); // Default empty
  const [loanAmount, setLoanAmount] = useState(0); // Default 0 to avoid null issues
  const [loanTerm, setLoanTerm] = useState(null); // Default null
  const [loanInterestRate, setLoanInterestRate] = useState(null); // Default null
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [schedule, setSchedule] = useState([]); // 상환 스케줄 저장

  // 각 필드를 초기화하는 함수
  const resetLoanAmount = () => setLoanAmount(0);
  const resetLoanTerm = () => setLoanTerm(null);
  const resetLoanInterestRate = () => setLoanInterestRate(null);

  const handleRepaymentChange = (e) => setRepaymentMethod(e.target.value);

  // 대출 금액 추가 처리
  const handleLoanAmountChange = (amount) =>
    setLoanAmount((prev) => (prev ? prev + amount : amount));

  // 대출 금리 추가 및 최대 20% 제한 처리 + 소수점 둘째 자리 반올림
  const handleLoanInterestRateChange = (rate) => {
    setLoanInterestRate((prevRate) => {
      const newRate = prevRate ? prevRate + rate : rate;
      return Math.min(Math.round(newRate * 100) / 100, 20); // 소수점 둘째 자리 반올림 후 20% 제한
    });
  };

  const calculateLoan = () => {
    if (!repaymentMethod || !loanAmount || !loanTerm || !loanInterestRate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    let monthlyPayment,
      totalInterest = 0,
      totalPayment = 0;
    const monthlyRate = loanInterestRate / 100 / 12;

    if (repaymentMethod === "원리금 균등상환") {
      monthlyPayment =
        (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
      totalPayment = monthlyPayment * loanTerm;
      totalInterest = totalPayment - loanAmount;

      let remainingAmount = loanAmount;
      const newSchedule = [];

      for (let i = 1; i <= loanTerm; i++) {
        const interest = remainingAmount * monthlyRate;
        const principal = monthlyPayment - interest;
        remainingAmount -= principal;

        // 마지막 회차에 -0원 문제 해결
        if (i === loanTerm) {
          remainingAmount = Math.max(remainingAmount, 0);
        }

        newSchedule.push({
          installment: i,
          payment: Math.round(monthlyPayment).toLocaleString(), // 소수점 반올림 및 toLocaleString 적용
          principal: Math.round(principal).toLocaleString(), // 소수점 반올림 및 toLocaleString 적용
          remaining: Math.round(remainingAmount).toLocaleString(), // 소수점 반올림 및 toLocaleString 적용
          interest: Math.round(interest).toLocaleString(), // 소수점 반올림 및 toLocaleString 적용
        });
      }

      setSchedule(newSchedule);
      setMonthlyPayment(Math.round(monthlyPayment));
      setTotalInterest(Math.round(totalInterest));
      setTotalPayment(Math.round(totalPayment));
    } else if (repaymentMethod === "만기 일시상환") {
      monthlyPayment = loanAmount * monthlyRate;
      totalInterest = monthlyPayment * loanTerm;
      totalPayment = loanAmount + totalInterest;

      const newSchedule = [];
      for (let i = 1; i <= loanTerm; i++) {
        newSchedule.push({
          installment: i,
          payment: Math.round(monthlyPayment).toLocaleString(),
          principal: "0",
          remaining: loanAmount.toLocaleString(),
          interest: Math.round(monthlyPayment * i).toLocaleString(),
        });
      }

      newSchedule.push({
        installment: loanTerm,
        payment: loanAmount.toLocaleString(),
        principal: loanAmount.toLocaleString(),
        remaining: "0",
        interest: Math.round(totalInterest).toLocaleString(),
      });

      setSchedule(newSchedule);
      setMonthlyPayment(Math.round(monthlyPayment));
      setTotalInterest(Math.round(totalInterest));
      setTotalPayment(Math.round(totalPayment));
    } else if (repaymentMethod === "원금 균등상환") {
      const principalRepayment = loanAmount / loanTerm;
      let remainingAmount = loanAmount;
      const newSchedule = [];
      let lastPaymentAmount = 0; // 마지막 월 납입액 저장

      for (let i = 1; i <= loanTerm; i++) {
        const interest = remainingAmount * monthlyRate;
        const payment = principalRepayment + interest;
        remainingAmount -= principalRepayment;

        // 마지막 회차에 -0원 문제 해결
        if (i === loanTerm) {
          remainingAmount = Math.max(remainingAmount, 0);
        }

        totalInterest += interest;
        totalPayment += payment;

        newSchedule.push({
          installment: i,
          payment: Math.round(payment).toLocaleString(),
          principal: Math.round(principalRepayment).toLocaleString(),
          remaining: Math.round(remainingAmount).toLocaleString(),
          interest: Math.round(interest).toLocaleString(),
        });

        lastPaymentAmount = payment; // 마지막 월 납입액 업데이트
      }

      setSchedule(newSchedule);
      setMonthlyPayment(Math.round(lastPaymentAmount)); // 마지막 월 납입액 설정
      setTotalInterest(Math.round(totalInterest));
      setTotalPayment(Math.round(totalPayment));
    }
  };

  const resetFields = () => {
    setRepaymentMethod("");
    resetLoanAmount();
    resetLoanTerm();
    resetLoanInterestRate();
    setMonthlyPayment(null);
    setTotalInterest(null);
    setTotalPayment(null);
    setSchedule([]);
  };

  return (
    <div className="LoanCalculator-modal">
      <div className="LoanCalculator-modal-content">
        <div className="LoanCalculator-modal-header">
          <h2>대출계산기</h2>
          <button
            className="LoanCalculator-close-button"
            onClick={closeCalculator}
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="LoanCalculator-modal-body">
          <p className="LoanCalculator-fixed-header">
            항목을 입력하신 후 [계산하기] 버튼을 클릭하세요
          </p>

          {/* 상환 방법 */}
          <div className="LoanCalculator-form-group LoanCalculator-repayment-method">
            <span className="LoanCalculator-label">상환 방법</span>
            <div className="LoanCalculator-radio-group">
              <label
                className={`LoanCalculator-radio-box ${
                  repaymentMethod === "만기 일시상환"
                    ? "LoanCalculator-selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  value="만기 일시상환"
                  checked={repaymentMethod === "만기 일시상환"}
                  onChange={handleRepaymentChange}
                />
                <span className="LoanCalculator-repayment-title">
                  만기 일시상환
                </span>
                <p className="LoanCalculator-repayment-description">
                  대출 기간 동안 이자만 상환하고, 만기일에 원금을 일시
                  상환합니다.
                </p>
              </label>
              <label
                className={`LoanCalculator-radio-box ${
                  repaymentMethod === "원리금 균등상환"
                    ? "LoanCalculator-selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  value="원리금 균등상환"
                  checked={repaymentMethod === "원리금 균등상환"}
                  onChange={handleRepaymentChange}
                />
                <span className="LoanCalculator-repayment-title">
                  원리금 균등상환
                </span>
                <p className="LoanCalculator-repayment-description">
                  원금과 이자를 합한 상환 금액이 매달 동일합니다.
                </p>
              </label>
              <label
                className={`LoanCalculator-radio-box ${
                  repaymentMethod === "원금 균등상환"
                    ? "LoanCalculator-selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  value="원금 균등상환"
                  checked={repaymentMethod === "원금 균등상환"}
                  onChange={handleRepaymentChange}
                />
                <span className="LoanCalculator-repayment-title">
                  원금 균등상환
                </span>
                <p className="LoanCalculator-repayment-description">
                  매달 동일한 금액의 원금을 상환하며, 이자는 남은 원금에 대해
                  부과됩니다.
                </p>
              </label>
            </div>
          </div>

          {/* 대출 금액 */}
          <div className="LoanCalculator-form-group">
            <span className="LoanCalculator-label">대출 금액</span>
            <div className="LoanCalculator-button-group">
              <button onClick={() => handleLoanAmountChange(1000000)}>
                + 100만
              </button>
              {/* <button onClick={() => handleLoanAmountChange(5000000)}>
                + 500만
              </button> */}
              <button onClick={() => handleLoanAmountChange(10000000)}>
                + 1,000만
              </button>
              {/* <button onClick={() => handleLoanAmountChange(50000000)}>
                + 5,000만
              </button> */}
              <button onClick={() => handleLoanAmountChange(100000000)}>
                + 10,000만
              </button>
              <button onClick={() => handleLoanAmountChange(1000000000)}>
                + 100,000만
              </button>
            </div>
            <div className="LoanCalculator-amount-reset">
              <input
                type="text"
                value={loanAmount ? loanAmount.toLocaleString() : ""}
                readOnly
                placeholder="대출 금액을 선택하세요"
                className="LoanCalculator-input"
              />{" "}
              원
              <button
                className="LoanCalculator-reset-btn"
                onClick={resetLoanAmount}
              >
                초기화
              </button>
            </div>
          </div>

          {/* 대출 기간 */}
          <div className="LoanCalculator-form-group">
            <span className="LoanCalculator-label">대출 기간</span>
            <div className="LoanCalculator-loan-term-dropdown">
              <select
                value={loanTerm || ""}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                defaultValue=""
                className="LoanCalculator-select"
              >
                <option value="" disabled>
                  대출 기간 선택
                </option>
                <option value={3}>3개월</option>
                <option value={6}>6개월</option>
                <option value={12}>12개월</option>
                <option value={24}>24개월</option>
                <option value={36}>36개월</option>
                <option value={48}>48개월</option>
                <option value={60}>60개월</option>
              </select>
            </div>
          </div>

          {/* 대출 금리 */}
          <div className="LoanCalculator-form-group">
            <span className="LoanCalculator-label">대출 금리</span>
            <div className="LoanCalculator-button-group">
              <button onClick={() => handleLoanInterestRateChange(0.01)}>
                + 0.01%
              </button>
              <button onClick={() => handleLoanInterestRateChange(0.1)}>
                + 0.1%
              </button>
              <button onClick={() => handleLoanInterestRateChange(1.0)}>
                + 1.0%
              </button>
              <button onClick={() => handleLoanInterestRateChange(5)}>
                + 5.0%
              </button>
              <button onClick={() => handleLoanInterestRateChange(10)}>
                + 10.0%
              </button>
            </div>
            <div className="LoanCalculator-interest-reset">
              <input
                type="number"
                value={
                  loanInterestRate !== null ? loanInterestRate.toFixed(2) : ""
                }
                onChange={(e) => {
                  const input = e.target.value;
                  const parsedValue = parseFloat(input);
                  if (isNaN(parsedValue)) {
                    setLoanInterestRate(null);
                    return;
                  }
                  const value = Math.round(parsedValue * 100) / 100; // 소수점 둘째 자리까지 반올림
                  if (value <= 20) {
                    setLoanInterestRate(value);
                  }
                }}
                placeholder="금리를 입력하세요"
                className="LoanCalculator-input"
              />{" "}
              %
              <button
                className="LoanCalculator-reset-btn"
                onClick={resetLoanInterestRate}
              >
                초기화
              </button>
            </div>
            <small className="LoanCalculator-max-rate-notice">
              최대 20%까지 입력 가능합니다.
            </small>
          </div>

          {/* 버튼들 */}
          <div className="LoanCalculator-button-group">
            <button onClick={resetFields}>초기화</button>
            <button
              onClick={calculateLoan}
              className="LoanCalculator-calculate-button"
            >
              계산하기
            </button>
          </div>

          {/* 결과 표시 */}
          {monthlyPayment !== null && (
            <div className="LoanCalculator-result">
              <h3>계산 결과</h3>
              <div className="LoanCalculator-result-top">
                {repaymentMethod === "원금 균등상환" ? (
                  <p>만기월 납입액: {monthlyPayment.toLocaleString()} 원</p>
                ) : (
                  <p>월 납입액: {monthlyPayment.toLocaleString()} 원</p>
                )}
                <p>대출 원금: {loanAmount.toLocaleString()} 원</p>
                <p>이자 합계: {totalInterest.toLocaleString()} 원</p>
                <p>총 상환 금액: {totalPayment.toLocaleString()} 원</p>
              </div>
              <small className="LoanCalculator-max-rate-notice">
                대출금액과 기간으로 계산한 결과이며, 실제 대출 결과와 다를 수
                있습니다.
              </small>
              <h4>예상 상환 스케쥴</h4>
              {schedule.map((entry) => (
                <div
                  key={entry.installment}
                  className="LoanCalculator-schedule-entry"
                >
                  <div className="LoanCalculator-row-top">
                    <div>{entry.installment}회차</div>
                    <div>{entry.payment} 원</div>
                  </div>
                  <div className="LoanCalculator-row">
                    <div>
                      원금: {entry.principal} 원 <br />
                      이자: {entry.interest} 원
                    </div>
                    <div>잔액: {entry.remaining} 원</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
