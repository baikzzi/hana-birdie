import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stepper, Step } from "react-basic-stepper";
import "react-basic-stepper/dist/index.css";
import "../../assets/css/Insurance/InsuranceSignup2Long.css";

const InsuranceSignup2Long = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, insuranceId, isDailyInsurance, startDate, expireDate } =
    location.state || {};

  const [coverages, setCoverages] = useState({
    liability: true,
    injuryDeath: true,
    injuryDisability: true,
    // holeInOne: isDailyInsurance === "Y",
    holeInOne: true,
    trafficAccident: false,
    plasticSurgery: false,
    boneFracture: false,
  });

  const [selectedPlan, setSelectedPlan] = useState("홀인원");
  const [totalPremium, setTotalPremium] = useState(0);
  const [animatePremium, setAnimatePremium] = useState(false);
  const [showChangeCoverageModal, setShowChangeCoverageModal] = useState(false);
  const [showCoverageDetailsModal, setShowCoverageDetailsModal] =
    useState(false);

  const toggleChangeCoverageModal = () => {
    setShowChangeCoverageModal(!showChangeCoverageModal);
  };

  const toggleCoverageDetailsModal = () => {
    setShowCoverageDetailsModal(!showCoverageDetailsModal);
  };

  const handleToggle = (type) => {
    if (type !== "injuryDeath" && type !== "injuryDisability") {
      setCoverages((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  // 개월 수 계산
  const calculateMonthsDifference = (start, end) => {
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  };

  // 보험료 계산
  const calculatePremium = () => {
    const months = calculateMonthsDifference(
      new Date(startDate),
      new Date(expireDate)
    );

    const baseRates = {
      홀인원: {
        liability: 123,
        injuryDeath: 33,
        injuryDisability: 22,
        holeInOne: 10912,
      },
      종합형: {
        liability: 123,
        injuryDeath: 33,
        injuryDisability: 22,
        holeInOne: 10912,
        trafficAccident: 625,
        plasticSurgery: 43,
        boneFracture: 844,
      },
    };

    const getRateMultiplier = (months) => {
      if (months >= 12) return 5;
      if (months >= 9) return 4.2;
      if (months >= 6) return 3.5;
      if (months >= 3) return 2;
      return 1;
    };

    const selectedPlanRates = baseRates[selectedPlan];
    const multiplier = getRateMultiplier(months);

    let totalPremium = 0;

    for (const [key, value] of Object.entries(selectedPlanRates)) {
      if (coverages[key]) {
        totalPremium += value * multiplier;
      }
    }

    // 1의 자리에서 반올림
    totalPremium = Math.round(totalPremium / 10) * 10;

    // 계산된 보험료가 2000보다 작으면 2000을 반환
    return totalPremium < 2000 ? 2000 : totalPremium;
  };

  useEffect(() => {
    const premium = calculatePremium();
    setTotalPremium(premium);

    setAnimatePremium(true);
    const timeoutId = setTimeout(() => {
      setAnimatePremium(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [startDate, expireDate, selectedPlan, coverages]);

  const renderCoverages = () => {
    const commonCoverages = [
      {
        name: "골프중 배상책임 보장",
        amount: "2,000만원",
        key: "liability",
      },
      {
        name: "골프중 상해사망 보장",
        amount: "1억원",
        key: "injuryDeath",
      },
      {
        name: "골프중 상해후유장해 보장",
        amount: "1억원",
        key: "injuryDisability",
      },
      {
        name: "홀인원비용(보험기간중1회) 보장",
        amount: "100만원",
        key: "holeInOne",
      },
    ];

    const additionalCoverages = [
      {
        name: "교통상해 입원일당(1일이상 180일한도) 보장",
        amount: "2만원",
        key: "trafficAccident",
      },
      {
        name: "자동차사고 성형치료비 보장",
        amount: "100만원",
        key: "plasticSurgery",
      },
      {
        name: "골절(치아파절제외)진단비 보장",
        amount: "30만원",
        key: "boneFracture",
      },
    ];

    const coveragesToShow =
      selectedPlan === "홀인원"
        ? commonCoverages
        : [...commonCoverages, ...additionalCoverages];

    return coveragesToShow.map((coverage, index) => (
      <div className="summary-item" key={index}>
        <p className={coverages[coverage.key] ? "" : "inactive"}>
          {coverage.name}
        </p>
        <p className={coverages[coverage.key] ? "" : "inactive"}>
          {coverages[coverage.key] ? coverage.amount : "미가입"}
        </p>
      </div>
    ));
  };

  const calculateCoveragePremium = (baseRate, months) => {
    const getRateMultiplier = (months) => {
      if (months >= 12) return 5;
      if (months >= 9) return 4.2;
      if (months >= 6) return 3.5;
      if (months >= 3) return 2;
      return 1;
    };

    const multiplier = getRateMultiplier(months);
    return Math.round((baseRate * multiplier) / 10) * 10;
  };

  const renderModalCoverages = () => {
    const months = calculateMonthsDifference(
      new Date(startDate),
      new Date(expireDate)
    );

    const details = {
      홀인원: [
        {
          title: "골프중 배상책임",
          description:
            "피보험자가 골프 중 타인에게 손해를 끼쳐 법률상의 배상책임이 발생한 경우 가입금액을 한도로 보험금 지급(자기부담금 2만원)",
          amount: "2,000만원",
          premium: `${calculateCoveragePremium(123, months)}원`,
        },
        {
          title: "골프중 상해사망",
          description:
            "피보험자가 골프 중 상해사고로 사망한 경우, 가입금액을 보험금으로 지급",
          amount: "1억원",
          premium: `${calculateCoveragePremium(33, months)}원`,
        },
        {
          title: "골프중 상해후유장해",
          description:
            "피보험자가 골프 중 상해사고로 후유장해가 발생한 경우, 가입금액을 한도로 보험금 지급(3%~100%:가입금액X지급률)",
          amount: "1억원",
          premium: `${calculateCoveragePremium(22, months)}원`,
        },
        {
          title: "홀인원비용(보험기간 중 1회) 특별약관",
          description:
            "피보험자가 골프경기 중 홀인원을 행항 경우, 최초 1회에 한하여 발생한 비용(증정용 기념품 구입, 축하회, 골프장 기념식수, 동반 캐디 축의금) 을 가입금액 한도로 지급",
          amount: "100만원",
          premium: `${calculateCoveragePremium(10912, months)}원`,
        },
      ],
      종합형: [
        {
          title: "골프중 배상책임",
          description:
            "피보험자가 골프 중 타인에게 손해를 끼쳐 법률상의 배상책임이 발생한 경우 가입금액을 한도로 보험금 지급(자기부담금 2만원)",
          amount: "2,000만원",
          premium: `${calculateCoveragePremium(123, months)}원`,
        },
        {
          title: "골프중 상해사망",
          description:
            "피보험자가 골프 중 상해사고로 사망한 경우, 가입금액을 보험금으로 지급",
          amount: "1억원",
          premium: `${calculateCoveragePremium(33, months)}원`,
        },
        {
          title: "골프중 상해후유장해",
          description:
            "피보험자가 골프 중 상해사고로 후유장해가 발생한 경우, 가입금액을 한도로 보험금 지급(3%~100%:가입금액X지급률)",
          amount: "1억원",
          premium: `${calculateCoveragePremium(22, months)}원`,
        },
        {
          title: "홀인원비용(보험기간 중 1회) 특별약관",
          description:
            "피보험자가 골프경기 중 홀인원을 행항 경우, 최초 1회에 한하여 발생한 비용(증정용 기념품 구입, 축하회, 골프장 기념식수, 동반 캐디 축의금) 을 가입금액 한도로 지급",
          amount: "100만원",
          premium: `${calculateCoveragePremium(10912, months)}원`,
        },
        {
          title: "교통상해 입원일당(1일이상 180일한도) 보장",
          description:
            "피보험자가 교통상해로 입원하여 치료를 받은 경우, 입원 1일당 가입금액을 보험금으로 지급(다만, 교통상해입원일당의 지급일수는 1회 입원당 180일을 한도로 합니다.)",
          amount: "2만원",
          premium: `${calculateCoveragePremium(625, months)}원`,
        },
        {
          title: "자동차사고 성형치료비 보장",
          description:
            "피보험자가 자가용 자동차를 운전하던 중 발생한 급격하고 우연한 사고의 직접적인 결과로 외형상의 반흔, 추상장해, 신체의 기형, 기능장해가 발생하여 원상회복을 위해 사고일로부터 1년 이내에 성형외과 전문의로부터 성형수술을 받은 경우 가입금액을 보험금으로 지급.",
          amount: "100만원",
          premium: `${calculateCoveragePremium(43, months)}원`,
        },
        {
          title: "골절진단비(치아파절제외) 보장",
          description:
            "피보험자가 상해로 약관(골절(치아파절제외) 분류표)에서 정한 골절로 진단 확정된 경우 가입금액을 보험금으로 지급(다만, 동일한 상해를 직접적인 원인으로 복합골절 발생시 1회에 한하여 골절진단금 지급)",
          amount: "30만원",
          premium: `${calculateCoveragePremium(844, months)}원`,
        },
      ],
    };

    const visibleDetails = details[selectedPlan];
    return visibleDetails.map((detail, index) => (
      <div key={index} className="coverage-detail">
        <p className="detail-title">{detail.title}</p>
        <p>{detail.description}</p>
        <table className="coverage-table">
          <thead>
            <tr>
              <th>보험가입금액</th>
              <th>보험료</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detail.amount}</td>
              <td>{detail.premium}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ));
  };

  const handleNextClick = () => {
    navigate("/insuranceSignup3", {
      state: {
        userId: userId,
        insuranceId: insuranceId,
        isDailyInsurance: isDailyInsurance,
        startDate: startDate,
        expireDate: expireDate,
        price: totalPremium, // 보험료 전달
      },
    });
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);

    if (plan === "홀인원") {
      setCoverages((prev) => ({
        ...prev,
        holeInOne: isDailyInsurance === "Y", // 일보험인 경우만 적용
        trafficAccident: false,
        plasticSurgery: false,
        boneFracture: false,
      }));
    } else if (plan === "종합형") {
      setCoverages((prev) => ({
        ...prev,
        holeInOne: true, // 종합형 선택 시 홀인원 혜택을 포함하지 않음
        trafficAccident: true,
        plasticSurgery: true,
        boneFracture: true,
      }));
    }
  };

  const handleConfirm = () => {
    setShowChangeCoverageModal(false);
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
        {isDailyInsurance === "Y" && (
          <div className="insurance-info">
            <div className="section full">
              <p className="section-title">가입조건</p>
              <p className="section-content">보험기간 1일 / 일시납</p>
            </div>
          </div>
        )}

        <div className="select-tab-wrap line">
          <div className="inner">
            <div className="select-tab">
              <ul>
                <li>
                  <button
                    type="button"
                    className={`plan-btn ${
                      selectedPlan === "홀인원" ? "selected" : ""
                    }`}
                    onClick={() => handlePlanChange("홀인원")}
                  >
                    홀인원
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`plan-btn ${
                      selectedPlan === "종합형" ? "selected" : ""
                    }`}
                    onClick={() => handlePlanChange("종합형")}
                  >
                    종합형
                  </button>
                </li>
              </ul>
            </div>
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
          {renderCoverages()}
        </div>

        {showChangeCoverageModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>보장내용 변경</h2>
              </div>
              <div className="insurance-signup2-modal-content">
                {selectedPlan === "홀인원" && (
                  <>
                    {[
                      "liability",
                      "injuryDeath",
                      "injuryDisability",
                      "holeInOne",
                    ].map((key) => (
                      <div className="coverage-item" key={key}>
                        <span>
                          {
                            {
                              liability: "골프중 배상책임 보장",
                              injuryDeath: "골프중 상해사망 보장",
                              injuryDisability: "골프중 상해후유장해 보장",
                              holeInOne: "홀인원비용(보험기간중1회) 보장",
                            }[key]
                          }
                        </span>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={coverages[key]}
                            onChange={() => handleToggle(key)}
                            disabled={
                              key === "injuryDeath" ||
                              key === "injuryDisability"
                            } // injuryDeath와 injuryDisability는 고정
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    ))}
                  </>
                )}
                {selectedPlan === "종합형" && (
                  <>
                    {[
                      "liability",
                      "injuryDeath",
                      "injuryDisability",
                      "holeInOne",
                      "trafficAccident",
                      "plasticSurgery",
                      "boneFracture",
                    ].map((key) => (
                      <div className="coverage-item" key={key}>
                        <span>
                          {
                            {
                              liability: "골프중 배상책임 보장",
                              injuryDeath: "골프중 상해사망 보장",
                              injuryDisability: "골프중 상해후유장해 보장",
                              holeInOne: "홀인원비용(보험기간중1회) 보장",
                              trafficAccident:
                                "교통상해 입원일당(1일이상 180일한도) 보장",
                              plasticSurgery: "자동차사고 성형치료비 보장",
                              boneFracture: "골절(치아파절제외)진단비 보장",
                            }[key]
                          }
                        </span>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={coverages[key]}
                            onChange={() => handleToggle(key)}
                            disabled={
                              key === "injuryDeath" ||
                              key === "injuryDisability"
                            } // injuryDeath, injuryDisability, liability는 고정
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    ))}
                  </>
                )}
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
                {renderModalCoverages()}
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

export default InsuranceSignup2Long;
