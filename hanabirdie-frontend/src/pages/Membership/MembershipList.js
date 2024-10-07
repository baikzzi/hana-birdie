// MembershipList.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "../../assets/css/Membership/MembershipList.css";
import FinanceSummaryModal from "../Finance/FinanceSummaryModal"; // 모달 컴포넌트 임포트

const MembershipList = () => {
  const { userInfo } = useAuth();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 모달 상태 관리
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showFinanceModal, setShowFinanceModal] = useState(false);

  const [financialData, setFinancialData] = useState(null); // FinanceSummaryModal에 전달할 데이터
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const today = new Date();
  const navigate = useNavigate();

  const backgroundStyles = [
    "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    "linear-gradient(135deg, #AD9A5F 0%, #AD9A5F 100%)",
    "linear-gradient(135deg, #9e9e9e 0%, #9e9e9e 100%)",
  ];

  const calculateRemainingDays = (expirationDate) => {
    const expiration = new Date(expirationDate);
    const differenceInTime = expiration.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays : 0; // 만료 시 0 반환
  };

  const fetchMemberships = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/membership/myList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userInfo.userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch memberships");
      }

      const data = await response.json();
      setMemberships(data); // 서버에서 받아온 데이터를 상태로 저장
    } catch (err) {
      setError(err.message || "Failed to fetch memberships");
    } finally {
      setLoading(false);
    }
  };

  // 최초 로드 시 데이터를 가져옴
  useEffect(() => {
    fetchMemberships();
  }, [userInfo]);

  if (loading)
    return (
      <p>{userInfo.name}님이 보유하신 회원권 목록을 불러오는 중입니다...</p>
    );
  if (error) return <p>{error}</p>;

  const openRenewalModal = (golfCourseId, membershipId) => {
    setSelectedMembership({ golfCourseId, membershipId });
    setShowRenewalModal(true);
  };

  const handleDetailClick = (golfCourseId, membershipId) => {
    fetch("http://localhost:8080/api/v1/membership/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        golfCourseId: golfCourseId,
        membershipId: membershipId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // API 응답 데이터를 MembershipDetail 페이지로 전달
        navigate("/membershipdetail", { state: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleReservationClick = (golfCourseId) => {
    fetch("http://localhost:8080/api/v1/reservation/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        golfCourseId: golfCourseId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // API 응답 데이터를 Reservation 페이지로 전달
        navigate("/reservation", { state: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRenewClick = (golfCourseId, membershipId, renewalPeriod) => {
    fetch("http://localhost:8080/api/v1/membership/renewal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userInfo.userId,
        golfCourseId: golfCourseId,
        membershipId: membershipId,
        renewalPeriod: renewalPeriod,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        setMemberships((prevMemberships) =>
          prevMemberships.map((membership) =>
            membership.membershipId === membershipId &&
            membership.golfCourseId === golfCourseId
              ? { ...membership, ...data }
              : membership
          )
        );

        setShowRenewalModal(false); // 재계약 모달창 닫기
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // "안정성 확인" 버튼 클릭 시 모달 열기
  const handleStatisticsClick = (golfCourseId) => {
    fetch("http://localhost:8080/api/v1/finance/statistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        golfCourseId: golfCourseId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // FinanceSummaryModal에 전달할 데이터 설정
        setFinancialData({
          liquidityRatio: data.liquidityRatio,
          debtRatio: data.debtRatio,
          totalAssetReturn: data.totalAssetReturn,
          totalSales: data.totalSales,
          costOfSales: data.costOfSales,
          netIncome: data.netIncome,
        });
        setShowFinanceModal(true); // FinanceSummaryModal 열기
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("안정성 정보를 가져오는 중 오류가 발생했습니다.");
      });
  };

  const handleRefundRequest = (golfCourseId, membershipId) => {
    fetch("http://localhost:8080/api/v1/membership/refund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        golfCourseId: golfCourseId,
        membershipId: membershipId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Refund request successful:", data);
        alert("예탁금 반환 신청이 접수되었습니다.");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("예탁금 반환 신청 중 오류가 발생했습니다.");
      });
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
  };

  const handleRenewalSubmit = () => {
    if (selectedPeriod && selectedMembership) {
      handleRenewClick(
        selectedMembership.golfCourseId,
        selectedMembership.membershipId,
        selectedPeriod
      );
      setShowRenewalModal(false);
      fetchMemberships();
    } else {
      alert("재계약 기간을 선택하세요.");
    }
  };

  const closeRenewalModal = () => {
    setShowRenewalModal(false);
    setSelectedPeriod(null);
  };

  const closeFinanceModal = () => {
    setShowFinanceModal(false);
    setFinancialData(null);
  };

  return (
    <div className="vip-membership-container">
      <h1 className="vip-membership-title">보유 회원권 목록</h1>
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="vip-swiper"
      >
        {memberships.length > 0 ? (
          memberships.map((membership, index) => {
            const isExpired = new Date(membership.expirationDate) < today;
            const isCloseToExpiration =
              (new Date(membership.expirationDate) - today) /
                (1000 * 60 * 60 * 24) <=
              30;
            const elapsedDaysAfterExpiration = Math.floor(
              (today - new Date(membership.expirationDate)) /
                (1000 * 60 * 60 * 24)
            );

            return (
              <SwiperSlide
                key={index}
                className="vip-swiper-slide"
                style={{
                  background: backgroundStyles[index % backgroundStyles.length],
                }}
              >
                <div
                  className={`vip-membership-item ${
                    isExpired ? "vip-expired" : ""
                  }`}
                >
                  <h2 className="vip-club-name">
                    Golf Course: {membership.golfCourseName}
                  </h2>
                  <div className="vip-bottom-section">
                    <div className="vip-info-section">
                      <p className="vip-info">
                        계약기간: {membership.firstContractDate} ~{" "}
                        {membership.expirationDate}
                      </p>
                      <p className="vip-info">
                        {isExpired
                          ? `만료 후 경과 기간: ${elapsedDaysAfterExpiration}일`
                          : `남은기간: ${calculateRemainingDays(
                              membership.expirationDate
                            )}일`}
                      </p>
                    </div>
                    <div className="vip-button-section">
                      {isExpired ? (
                        <>
                          <p className="vip-expired-message">
                            만료된 회원권입니다.
                          </p>
                          <button
                            className="vip-button renew-button"
                            onClick={() =>
                              openRenewalModal(
                                membership.golfCourseId,
                                membership.membershipId
                              )
                            }
                          >
                            <span class="material-symbols-outlined">
                              contract_edit
                            </span>
                            계약 연장
                          </button>
                          <button
                            className="vip-button refund-button"
                            onClick={() =>
                              handleRefundRequest(
                                membership.golfCourseId,
                                membership.membershipId
                              )
                            }
                          >
                            <span class="material-symbols-outlined membership-list-refund-button">
                              currency_exchange
                            </span>
                            예탁금 반환 신청
                          </button>
                          <button
                            className="vip-button"
                            onClick={() =>
                              handleStatisticsClick(membership.golfCourseId)
                            }
                          >
                            <span class="material-symbols-outlined">
                              balance
                            </span>
                            안정성 확인
                          </button>
                          {isCloseToExpiration && (
                            <p className="vip-expiration-warning">
                              만료일 기준 30일 이내에 반환 신청하지 않으면
                              <br /> 자동으로 계약 연장됩니다.
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            className="vip-button"
                            onClick={() =>
                              handleDetailClick(
                                membership.golfCourseId,
                                membership.membershipId
                              )
                            }
                          >
                            <span class="material-symbols-outlined">
                              search
                            </span>
                            상세보기
                          </button>
                          <button
                            className="vip-button"
                            onClick={() =>
                              handleReservationClick(membership.golfCourseId)
                            }
                          >
                            <span class="material-symbols-outlined">
                              golf_course
                            </span>
                            라운딩 예약
                          </button>
                          <button
                            className="vip-button"
                            onClick={() =>
                              handleStatisticsClick(membership.golfCourseId)
                            }
                          >
                            <span class="material-symbols-outlined">
                              balance
                            </span>
                            안정성 확인
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <p className="vip-no-memberships">보유하신 회원권이 없습니다.</p>
        )}
      </Swiper>

      {/* Finance Summary Modal */}
      {showFinanceModal && financialData && (
        <FinanceSummaryModal
          showModal={showFinanceModal}
          closeModal={closeFinanceModal}
          financialData={financialData}
        />
      )}

      {/* Renewal Modal */}
      {showRenewalModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeRenewalModal}>
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2>재계약 기간 선택</h2>
            <div className="button-group">
              <button
                className={`modal-period-button ${
                  selectedPeriod === 1 ? "selected" : ""
                }`}
                onClick={() => handlePeriodSelect(1)}
              >
                1년
              </button>
              <button
                className={`modal-period-button ${
                  selectedPeriod === 3 ? "selected" : ""
                }`}
                onClick={() => handlePeriodSelect(3)}
              >
                3년
              </button>
              <button
                className={`modal-period-button ${
                  selectedPeriod === 5 ? "selected" : ""
                }`}
                onClick={() => handlePeriodSelect(5)}
              >
                5년
              </button>
              <button
                className={`modal-period-button ${
                  selectedPeriod === 10 ? "selected" : ""
                }`}
                onClick={() => handlePeriodSelect(10)}
              >
                10년
              </button>
            </div>
            <button
              className="modal-confirm-button"
              onClick={handleRenewalSubmit}
            >
              계약 연장하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipList;
