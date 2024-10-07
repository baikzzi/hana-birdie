import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stepper, Step } from "react-basic-stepper";
import "react-basic-stepper/dist/index.css";
import "../../assets/css/Insurance/InsuranceSignup2Day.css"; // CSS 파일 경로 수정

const InsuranceSignup2Day = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, insuranceId, isDailyInsurance, startDate, expireDate } =
    location.state || {};

  const [showChangeCoverageModal, setShowChangeCoverageModal] = useState(false);
  const [showCoverageDetailsModal, setShowCoverageDetailsModal] =
    useState(false);

  const [coverages, setCoverages] = useState({
    liability: true,
    injury: true, // 기본담보로 고정
    holeInOne: true,
  });

  const [totalPremium, setTotalPremium] = useState(2500); // 초기 보험료 2500원
  const [animatePremium, setAnimatePremium] = useState(false); // 애니메이션 제어

  const toggleChangeCoverageModal = () => {
    setShowChangeCoverageModal(!showChangeCoverageModal);
  };

  const toggleCoverageDetailsModal = () => {
    setShowCoverageDetailsModal(!showCoverageDetailsModal);
  };

  const handleToggle = (type) => {
    if (type !== "injury") {
      // injury는 고정
      setCoverages((prev) => ({ ...prev, [type]: !prev[type] }));
    }
  };

  useEffect(() => {
    // 보험료 계산 로직
    let premium = 2500;
    if (!coverages.liability) premium -= 200;
    if (!coverages.holeInOne) premium -= 500;
    if (premium < 2000) premium = 2000; // 최소 보험료 2000원
    // 보험료가 변경되었을 때 애니메이션 적용
    setAnimatePremium(true);
    setTotalPremium(premium);

    const timeoutId = setTimeout(() => {
      setAnimatePremium(false); // 애니메이션 종료
    }, 3000);

    return () => clearTimeout(timeoutId); // 이전 타임아웃 제거
  }, [coverages]);

  const handleConfirm = () => {
    setShowChangeCoverageModal(false);
  };

  const handleNextClick = () => {
    navigate("/insuranceSignup3", {
      state: {
        userId: userId,
        insuranceId: insuranceId,
        isDailyInsurance: isDailyInsurance,
        startDate: startDate,
        expireDate: expireDate,
        price: totalPremium, // 보험료를 전달
      },
    });
  };

  return (
    <div id="wrap" className="insurance_signup2_wrap">
      <Stepper
        headerStyles={{
          activatedStepBackground: "#009178",
          lineColor: "#009178",
        }}
        indexStep={1}
      >
        <Step></Step>
        <Step></Step>
        <Step></Step>
        <Step></Step>
      </Stepper>
      <header id="header">
        <div className="insurance-signup2-title">
          <h1 className="location">보험료 확인</h1>
        </div>
      </header>
      <div className="insurance_signup2">
        <div className="total-premium">
          <p className="section-title">총 보험료</p>
          <p className={`premium-amount ${animatePremium ? "animate" : ""}`}>
            {totalPremium.toLocaleString()}원
          </p>
        </div>
        <div className="insurance-info">
          <div className="section full">
            <p className="section-title">가입조건</p>
            <p className="section-content">보험기간 1일 / 일시납</p>
          </div>
        </div>

        <div className="coverage-summary">
          <div className="section full coverage-header">
            <div className="left">
              <p className="section-title">보장내용</p>
              <button
                className="btn-question"
                onClick={toggleCoverageDetailsModal}
              >
                ?
              </button>
            </div>
            <div className="right">
              <button
                onClick={toggleChangeCoverageModal}
                className="btn-change-coverage"
              >
                보장내용 변경
              </button>
            </div>
          </div>
          <div className="summary-item">
            <p className={coverages.liability ? "" : "inactive"}>
              골프중 배상책임(1회당)
            </p>
            <p className={coverages.liability ? "" : "inactive"}>
              {coverages.liability ? "2,000만원" : "미가입"}
            </p>
          </div>
          <div className="summary-item">
            <p>골프중 상해후유장해(1회당)</p>
            <p>1억원 (기본담보)</p>
          </div>
          <div className="summary-item">
            <p className={coverages.holeInOne ? "" : "inactive"}>
              홀인원비용(1회당)
            </p>
            <p className={coverages.holeInOne ? "" : "inactive"}>
              {coverages.holeInOne ? "100만원" : "미가입"}
            </p>
          </div>
        </div>

        {showChangeCoverageModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>보장내용 변경</h2>
              </div>
              <div className="insurance-signup2-modal-content">
                <div className="coverage-item">
                  <span>골프중 배상책임(1회당)</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={coverages.liability}
                      onChange={() => handleToggle("liability")}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="coverage-item">
                  <span>골프중 상해후유장해(1회당) 기본담보</span>
                  <label className="switch">
                    <input type="checkbox" checked disabled />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="coverage-item">
                  <span>홀인원비용(1회당)</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={coverages.holeInOne}
                      onChange={() => handleToggle("holeInOne")}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleConfirm} className="btn-confirm">
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        {showCoverageDetailsModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>보장내용</h2>
              </div>
              <div className="insurance-signup2-modal-content">
                <div className="coverage-detail">
                  <p className="detail-title">골프중 배상책임(1회당)</p>
                  <p>
                    피해자가 골프 중 타인에게 손해를 끼쳐 발생한 배상책임이
                    발생한 경우 가입금액 한도로 보장금 지급(자기부담금 2만원)
                  </p>
                </div>
                <div className="coverage-detail">
                  <p className="detail-title">골프중 상해후유장해(1회당)</p>
                  <p>
                    피해자가 골프 중 상해사고로 후유장해가 발생한 경우, 가입금액
                    한도로 보장금 지급(3%~100% 가입금액X지급률)
                  </p>
                </div>
                <div className="coverage-detail">
                  <p className="detail-title">홀인원비용(1회당)</p>
                  <p>
                    피해자가 골프장에서 홀인원을 행한 경우, 최초 1회에 한하여
                    발생한 비용(증정용 기념품 구입, 축하회, 골프장 기념식수,
                    동반 캐디 축하금)을 가입금액 한도로 지급
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={toggleCoverageDetailsModal}
                  className="btn-confirm"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="ground-btm">
          <div className="fixed-btm">
            <div className="inner-button">
              <button
                type="button"
                id="btnStep02Next"
                className="insurance-signup-btn-floating"
                onClick={handleNextClick}
              >
                <span>확인</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSignup2Day;
