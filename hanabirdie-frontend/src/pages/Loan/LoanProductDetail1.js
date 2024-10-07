// 주거래하나 (예탁금 담보) 우대 대출
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoanProductDescription1 from "./LoanProductDescription1";
import LoanCalculator from "./LoanCalculator";
import TopButton from "../../components/Top/TopButton";
import loanImage from "../../assets/png/loanImage1.png";
import loanCalculator from "../../assets/png/loanCalculator.png";
import loanApply from "../../assets/png/loanApply.png";
import "../../assets/css/Loan/LoanProductDetail.css";

const sampleLoanProduct = {
  loanProductId: "LP_0001",
  loanName: "하나버디 예탁금 담보 대출",
  description:
    "회원의 예탁금을 하나은행에 보관하는 골프장 운영자를 대상으로 대출 금리를 우대",
  flags: ["기업대출", "예탁금담보"],
};

const LoanProductDetail1 = () => {
  const product = sampleLoanProduct; // 샘플 데이터 사용
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 페이지 이동 시 스크롤을 맨 위로 이동시키는 효과
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 모달 열림/닫힘 상태 관리
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // 대출계산기 모달 열기 함수
  const openLoanCalculator = () => {
    setIsCalculatorOpen(true);
  };

  // 대출계산기 모달 닫기 함수
  const closeLoanCalculator = () => {
    setIsCalculatorOpen(false);
  };

  // 신청하기 버튼 클릭 핸들러
  const handleApplyClick = () => {
    navigate("/applyLoan", { state: { loanProduct: product } });
  };

  return (
    <div className="LoanProductDetailContainer">
      <div className="LoanProductDetailItem">
        <div className="LoanProductDetailLeft">
          <div className="LoanProductDetailContent">
            <div className="LoanProductDetailTop">
              <div className="LoanProductDetailFlags">
                {product.flags.map((flag, index) => (
                  <span className="LoanProductDetailFlag" key={index}>
                    {flag}
                  </span>
                ))}
              </div>
              <p className="LoanProductDetailTitle">{product.loanName}</p>
              <p className="LoanProductDetailDescription">
                {product.description}
              </p>
            </div>
            {/* 신청하기 버튼 추가 */}
            <div className="LoanProductDetailButtonWrap">
              <div className="LoanProductDetailCalculator">
                <button
                  className="LoanProductDetailApplyButton"
                  onClick={openLoanCalculator} // 클릭 시 모달 열기
                >
                  <img src={loanCalculator} />
                  대출계산기
                </button>
              </div>
              <div className="LoanProductDetailApply">
                <button
                  type="button"
                  className="LoanProductDetailApplyButton"
                  onClick={handleApplyClick} // 클릭 시 /applyLoan로 이동
                >
                  <img src={loanApply} alt="Apply" />
                  신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="LoanProductDetailRight">
          <img
            src={loanImage}
            alt="Loan Product"
            className="LoanProductDetailImage"
          />
        </div>
      </div>
      {/* LoanDetails1 컴포넌트 추가 */}
      <LoanProductDescription1 />
      <TopButton />
      {/* LoanCalculator 모달 - isCalculatorOpen이 true일 때만 표시 */}
      {isCalculatorOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <LoanCalculator closeCalculator={closeLoanCalculator} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanProductDetail1;
