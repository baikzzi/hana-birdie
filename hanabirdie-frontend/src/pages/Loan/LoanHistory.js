// src/components/LoanHistory.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/Loan/LoanHistory.css";
import search from "../../assets/png/search.png";
import LoanHistoryDetail from "./LoanHistoryDetail"; // 모달 컴포넌트 임포트
import axios from "axios"; // axios 임포트
import dayjs from "dayjs"; // dayjs 임포트

const LoanHistory = () => {
  const [loading, setLoading] = useState(true);
  const [loanApplications, setLoanApplications] = useState([]);
  const [confirmLoans, setConfirmLoans] = useState([]);
  const { userInfo } = useAuth();
  const userId = userInfo?.userId || ""; // userId 추출
  const name = userInfo?.name || ""; // 이름 추출

  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Function to calculate number of payments made
  const calculatePaymentsMade = (loanStartDate) => {
    if (!loanStartDate) return 0;
    const now = dayjs();
    const start = dayjs(loanStartDate);
    if (now.isBefore(start, "month")) return 0;
    return now.diff(start, "month");
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

    let nextPaymentDate = lastPaymentDate.isAfter(now)
      ? lastPaymentDate
      : lastPaymentDate.add(1, "month");

    // 만기일을 넘지 않도록 조정
    if (nextPaymentDate.isAfter(dayjs(loanExpireDate))) {
      nextPaymentDate = dayjs(loanExpireDate);
    }

    return nextPaymentDate.format("YYYY-MM-DD");
  };

  useEffect(() => {
    // LoanHistory 페이지 로드 시 API 호출
    const fetchLoanHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/loan/lookup",
          {
            userId: userId,
          }
        );

        const loans = response.data;

        // loanStatus가 '승인' 이면서 loanStartDate가 null이 아닌 대출
        const confirmed = loans
          .filter(
            (loan) => loan.loanStatus === "승인" && loan.loanStartDate !== null
          )
          .map((loan) => {
            const paymentsMade = calculatePaymentsMade(loan.loanStartDate);
            const remainingBalance = calculateRemainingBalance(
              loan,
              paymentsMade
            );
            const nextPaymentDate = calculateNextPaymentDate(
              loan,
              paymentsMade
            );
            return {
              ...loan,
              paymentsMade,
              remainingBalance,
              nextPaymentDate,
            };
          });

        // 그 외의 대출 (loanStatus !== "승인" 또는 loanStartDate가 null인 대출)
        const applications = loans.filter(
          (loan) => !(loan.loanStatus === "승인" && loan.loanStartDate !== null)
        );

        setConfirmLoans(confirmed);
        setLoanApplications(applications);
      } catch (error) {
        console.error("Error fetching loan history:", error);
        // 에러 알림 표시 (예: setAlert)
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLoanHistory();
    } else {
      setLoading(false);
      // userId가 없는 경우 처리 (로그인되지 않은 상태 등)
      // setAlert({
      //   show: true,
      //   message: "로그인이 필요합니다.",
      //   variant: "warning",
      // });
    }
  }, [userId]);

  useEffect(() => {
    // Handle side menu active state if applicable
    const side1 = document.getElementById("side1");
    if (side1) {
      side1.classList.add("active");
    }
  }, []);

  // 모달 열기 핸들러
  const handleOpenModal = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedLoan(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="loanHistory_loader-container">
        <div className="loanHistory_spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="loanHistory_container">
      <div className="loanHistory_row">
        {/* Main Content Column */}
        <div className="loanHistory_col-main">
          <div className="loanHistory_dashboard_content mb-5">
            <div className="loanHistory_dashboard_header mb-5">
              <h2>대출내역 조회</h2>
            </div>

            {/* 보유대출내역 (Confirm Loans) Section */}
            <div className="loanHistory_loanResult_head mb-3">
              <h4>보유대출내역</h4>
              <span>* 보유하신 대출계좌 목록입니다.</span>
            </div>

            <div className="loanHistory_mb-5">
              <table className="loanHistory_resultTable text-center">
                <thead>
                  <tr>
                    <th>대출명</th>
                    <th>계좌번호</th>
                    <th>대출원금</th>
                    <th>만기일</th>
                    <th>대출잔액</th>
                    <th>상세보기</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(confirmLoans) && confirmLoans.length > 0 ? (
                    confirmLoans.map((loan) => (
                      <tr key={loan.loanId}>
                        <td>{loan.loanName}</td>
                        <td>{loan.loanAccountNumber}</td>
                        <td>{loan.loanAmount.toLocaleString()}원</td>
                        <td>
                          {loan.loanExpireDate
                            ? dayjs(loan.loanExpireDate).format("YYYY. MM. D.")
                            : "N/A"}
                        </td>
                        <td>{loan.remainingBalance.toLocaleString()}원</td>
                        <td>
                          <button
                            onClick={() => handleOpenModal(loan)}
                            className="LoanHistory-search-button"
                          >
                            <img src={search} alt="상세보기" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">보유 대출이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 대출신청내역 (Loan Applications) Section */}
            <div className="loanHistory_loanResult_head mb-3">
              <h4>대출신청내역</h4>
              <span>* 신청하신 대출 목록입니다.</span>
            </div>

            <div className="loanHistory_mb-5">
              <table className="loanHistory_resultTable text-center">
                <thead>
                  <tr>
                    <th>대출명</th>
                    <th>신청일자</th>
                    <th>대출신청금액</th>
                    <th>금리</th>
                    <th>상환방법</th>
                    <th>진행상황</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(loanApplications) &&
                  loanApplications.length > 0 ? (
                    loanApplications.map((application) => (
                      <tr key={application.loanId}>
                        <td>{application.loanName}</td>
                        <td>
                          {application.loanApplicationDate
                            ? dayjs(application.loanApplicationDate).format(
                                "YYYY. MM. D."
                              )
                            : "N/A"}
                        </td>
                        <td>{application.loanAmount.toLocaleString()}원</td>
                        <td>{application.interestRate}%</td>
                        <td>{application.loanRepaymentMethod}</td>
                        <td>
                          <div className="loanHistory_status">
                            <span
                              className="loanHistory_statusPill"
                              style={{
                                backgroundColor:
                                  application.loanStatus === "신청완료"
                                    ? "#fbc979" // 신청완료: 노란색 계열
                                    : application.loanStatus === "심사중"
                                    ? "#FF8C00" // 심사중: 주황색
                                    : application.loanStatus === "승인"
                                    ? "#008485" // 승인: 청록색
                                    : application.loanStatus === "거절"
                                    ? "#FF0000" // 거절: 붉은색
                                    : "#ccc", // 기본: 회색
                              }}
                            >
                              {application.loanStatus}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">신청한 대출이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* 모달 표시 */}
      {showModal && selectedLoan && (
        <LoanHistoryDetail loan={selectedLoan} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default LoanHistory;
