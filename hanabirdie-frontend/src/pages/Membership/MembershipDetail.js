import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/css/Membership/MembershipDetail.css";
import Modal from "react-modal";
import FinanceSummaryModal from "../Finance/FinanceSummaryModal"; // 모달 컴포넌트 임포트

function MembershipDetail() {
  const location = useLocation();
  const membershipData = location.state || {};

  const {
    golfCourseId,
    membershipId,
    golfCourseName,
    openingDate,
    address,
    holeCount,
    memberCount,
    personal,
    corporate,
    membershipIntro,
    courseIntro,
    history,
    locationInfo,
    priceTrend,
    futureOutlook,
    precommendedCustomers,
    pcomposition,
    pmembershipType,
    pbooking,
    pjoiningConditions,
    prequiredDocuments,
    pfeatures,
    crecommendedCustomers,
    ccomposition,
    cmembershipType,
    cbooking,
    cjoiningConditions,
    crequiredDocuments,
    cfeatures,
    weekdayMember,
    weekendMember,
    weekdayFamily,
    weekendFamily,
    weekdayNonMember,
    weekendNonMember,
    weekdayPrime,
    weekendPrime,
    caddyFee,
    cartFee,
  } = membershipData;

  const imageUrl = `/golfCourseImage/${golfCourseId}.png`;
  const [activeTab, setActiveTab] = useState("personal");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [showFinanceModal, setShowFinanceModal] = useState(false);
  const [financialData, setFinancialData] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const openModal = (url) => {
    setModalUrl(url);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeFinanceModal = () => {
    setShowFinanceModal(false);
    setFinancialData(null);
  };

  const handleFinanceClick = () => {
    // 재무 데이터를 설정하거나 API로 데이터를 불러오는 로직을 추가할 수 있습니다.
    const exampleFinancialData = {
      liquidityRatio: 120,
      debtRatio: 60,
      totalAssetReturn: 10,
      totalSales: 50000000,
      costOfSales: 30000000,
      netIncome: 20000000,
      previousTotalSales: 45000000,
      previousCostOfSales: 28000000,
      previousNetIncome: 18000000,
    };

    setFinancialData(exampleFinancialData);
    setShowFinanceModal(true);
  };

  return (
    <div className="membership-detail-container">
      <div className="membership-detail-content" id="golfcourseview">
        <h3 className="membership-detail-title">
          <span id="golf-club-title">{golfCourseName}</span>
        </h3>
        <h4 className="membership-detail-subtitle blue-tit mt10">
          골프장 기본 정보
        </h4>
        <div className="membership-detail-header">
          <div className="membership-image-container">
            <img src={imageUrl} alt="Golf Club" />
          </div>
          <div className="membership-table-container">
            <table className="membership-horizon membership-detail-header-table">
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th className="membership-table-header">골프장명</th>
                  <td data-tpl-name="club-name">{golfCourseName}</td>
                  <th>회원제 홀수</th>
                  <td
                    className="membership-table-right"
                    data-tpl-name="play-count"
                  >
                    {holeCount}홀
                  </td>
                </tr>
                <tr>
                  <th className="membership-table-header">개장일</th>
                  <td data-tpl-name="open-date">{openingDate}</td>
                  <th>회원수</th>
                  <td
                    data-tpl-name="user-count"
                    className="membership-table-right"
                  >
                    {memberCount.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th className="membership-table-header">주소</th>
                  <td data-tpl-name="address" colSpan="3">
                    {address}
                  </td>
                </tr>
                <tr>
                  <th className="membership-table-header">개인</th>
                  <td
                    data-tpl-name="advantage-individual"
                    className="membership-table-right"
                    colSpan="3"
                  >
                    {personal}
                  </td>
                </tr>
                <tr>
                  <th className="membership-table-header">법인</th>
                  <td
                    data-tpl-name="advantage-corporate"
                    className="membership-table-right"
                    colSpan="3"
                  >
                    {corporate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h4 className="membership-detail-subtitle blue-tit mt40">
          회원권 시세 및 골프장 재무 정보
        </h4>
        <div className="membership-btn-section">
          <button
            onClick={() =>
              openModal(
                `https://www.dongagolf.co.kr/pop/pop_price_flow.html?custid=${golfCourseId}&code=${membershipId}&area=undefined#`
              )
            }
            className="membership-btn membership-btn-outline membership-btn-icon-right membership-btn-large"
          >
            시세 확인하기
          </button>
          <button
            onClick={handleFinanceClick}
            className="membership-btn membership-btn-outline membership-btn-icon-right membership-btn-large"
          >
            재무정보 확인하기
          </button>
        </div>

        <div className="membership-additional-info">
          <h4 className="membership-detail-subtitle blue-tit mt40 mb20">
            회원권 추가 정보
          </h4>
          <table className="membership-horizon">
            <tbody className="membership-additional-info-table">
              <tr>
                <th>회원권 소개</th>
                <td data-tpl-name="introduce" id="intro">
                  {membershipIntro}
                </td>
              </tr>
              <tr>
                <th>코스 소개</th>
                <td data-tpl-name="course-introduce" id="course_intro">
                  {courseIntro}
                </td>
              </tr>
              <tr>
                <th>연혁</th>
                <td data-tpl-name="history" id="history">
                  {history}
                </td>
              </tr>
              <tr>
                <th>위치 정보</th>
                <td data-tpl-name="location" id="location">
                  {locationInfo}
                </td>
              </tr>
              <tr>
                <th>시세 흐름</th>
                <td id="price_flow">{priceTrend}</td>
              </tr>
              <tr>
                <th>향후 전망</th>
                <td id="vision">{futureOutlook}</td>
              </tr>
            </tbody>
          </table>
          <div className="membership-info-toggle" style={{ marginTop: "40px" }}>
            <div
              className={`membership-toggle-button ${
                activeTab === "personal"
                  ? "membership-toggle-button-active"
                  : ""
              }`}
              id="personal"
              onClick={() => handleTabClick("personal")}
            >
              개인 회원권 정보
            </div>
            <div
              className={`membership-toggle-button ${
                activeTab === "corporate"
                  ? "membership-toggle-button-active"
                  : ""
              }`}
              id="corporate"
              onClick={() => handleTabClick("corporate")}
            >
              법인 회원권 정보
            </div>
          </div>
          <div className="membership-additional-info-field">
            <div className="membership-field">
              <table
                className="membership-horizon"
                style={{ marginTop: "20px" }}
              >
                <tbody className="membership-additional-info-table">
                  <tr>
                    <th>추천 고객</th>
                    <td className="recommend_customer">
                      {activeTab === "personal"
                        ? precommendedCustomers || "-"
                        : crecommendedCustomers || "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>회원권 구성</th>
                    <td className="recommend_customer">
                      {activeTab === "personal"
                        ? pcomposition || "-"
                        : ccomposition || "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>회원권 종류</th>
                    <td className="recommend_customer">
                      {activeTab === "personal"
                        ? pmembershipType || "-"
                        : cmembershipType || "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>부킹</th>
                    <td className="recommend_customer">
                      {activeTab === "personal"
                        ? pbooking || "-"
                        : cbooking || "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>입회 조건</th>
                    <td className="recommend_customer">
                      {activeTab === "personal"
                        ? pjoiningConditions || "-"
                        : cjoiningConditions || "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>필요 서류</th>
                    <td className="recommend_customer">
                      {activeTab === "personal"
                        ? prequiredDocuments || "-"
                        : crequiredDocuments || "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>회원권 특징</th>
                    <td className="recommend_customer">
                      {activeTab === "personal"
                        ? pfeatures || "-"
                        : cfeatures || "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h4 className="membership-detail-subtitle blue-tit mt40 mb0">
          골프장 이용 정보
        </h4>
        <h5 className="membership-detail-small-title">그린피</h5>
        <table className="membership-list-even">
          <colgroup>
            <col width="33%" />
            <col width="34%" />
            <col width="33%" />
          </colgroup>
          <thead>
            <tr>
              <th>구분</th>
              <th>주중</th>
              <th>주말</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>정회원</td>
              <td>{weekdayMember.toLocaleString()}</td>
              <td>{weekendMember.toLocaleString()}</td>
            </tr>
            <tr>
              <td>가족회원</td>
              <td>{weekdayFamily.toLocaleString()}</td>
              <td>{weekendFamily.toLocaleString()}</td>
            </tr>
            <tr>
              <td>비회원</td>
              <td>{weekdayNonMember.toLocaleString()}</td>
              <td>{weekendNonMember.toLocaleString()}</td>
            </tr>
            <tr>
              <td>우대회원</td>
              <td>{weekdayPrime.toLocaleString()}</td>
              <td>{weekendPrime.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <h5 className="membership-detail-small-title">캐디피 &amp; 카트비</h5>
        <table className="membership-horizon">
          <colgroup>
            <col width="20%" />
            <col width="30%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>
          <tbody>
            <tr>
              <th className="membership-table-header">캐디피</th>
              <td>{caddyFee}</td>
              <th>카트비</th>
              <td className="membership-table-right">{cartFee}</td>
            </tr>
          </tbody>
        </table>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Membership Modal"
          className="membership-custom-modal"
          overlayClassName="membership-custom-modal-overlay"
        >
          <button
            onClick={closeModal}
            className="membership-close-modal-button"
          >
            닫기
          </button>
          <div style={{ height: "100%", overflow: "hidden" }}>
            <iframe
              src={modalUrl}
              className="membership-modal-iframe"
              scrolling="no"
              style={{ marginTop: "-80px", height: "calc(100%)" }}
            />
          </div>
        </Modal>
        {showFinanceModal && financialData && (
          <FinanceSummaryModal
            showModal={showFinanceModal}
            closeModal={closeFinanceModal}
            financialData={financialData}
          />
        )}
      </div>
    </div>
  );
}

export default MembershipDetail;
