import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/Insurance/InsuranceList.css";

function InsuranceList() {
  const { userInfo } = useAuth();
  const [insuranceList, setInsuranceList] = useState([]);
  const [totalPremium, setTotalPremium] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [filteredInsuranceList, setFilteredInsuranceList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("01");
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const [isNoticeOpen, setIsNoticeOpen] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(true);

  useEffect(() => {
    const fetchInsuranceList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/insurance/myList",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userInfo.userId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setInsuranceList(data);

          // Calculate total premium and total insurance period
          let totalPremiumAmount = 0;
          let totalDuration = 0;

          data.forEach((insurance) => {
            totalPremiumAmount += insurance.price;

            const startDate = new Date(insurance.startDate);
            const expireDate = new Date(insurance.expireDate);
            const duration = (expireDate - startDate) / (1000 * 60 * 60 * 24); // Difference in days
            totalDuration += duration;
          });

          setTotalPremium(totalPremiumAmount);
          setTotalDays(totalDuration);
        } else {
          console.error("Failed to fetch insurance list");
        }
      } catch (error) {
        console.error("Error fetching insurance list:", error);
      }
    };

    fetchInsuranceList();
  }, [userInfo.userId]);

  const formatDaysToYearsAndMonths = (days) => {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    return `${years}년 ${months}개월`;
  };

  const getInsuranceStatus = (expireDate) => {
    const currentDate = new Date();
    const expirationDate = new Date(expireDate);
    return expirationDate > currentDate ? "유지" : "만기";
  };

  const handleSearch = () => {
    const currentDate = new Date();
    let filteredList = [];

    if (selectedStatus === "01") {
      // '유지' 필터링
      filteredList = insuranceList.filter(
        (insurance) => new Date(insurance.expireDate) > currentDate
      );
    } else if (selectedStatus === "03") {
      // '만기' 필터링
      filteredList = insuranceList.filter(
        (insurance) => new Date(insurance.expireDate) < currentDate
      );
    } else if (selectedStatus === "010203") {
      // '전체' 필터링
      filteredList = insuranceList;
    }
    setFilteredInsuranceList(filteredList);
    setIsSearchClicked(true);
  };

  // const toggleNotice = () => {
  //   setIsNoticeOpen(!isNoticeOpen);
  // };

  // const toggleGuide = () => {
  //   setIsGuideOpen(!isGuideOpen);
  // };

  return (
    <div className="insurance-list-container">
      {/* <div className="insurance-summary">
        <p>
          <strong>누적 납입 보험료:</strong> {totalPremium.toLocaleString()} KRW
        </p>
        <p>
          <strong>전체 가입 기간:</strong>{" "}
          {formatDaysToYearsAndMonths(totalDays)}
        </p>
      </div> */}
      <div className="insurance-list-section">
        <div className="insurance-list-governing ta_l">
          <h2 className="insurance-list-governing_title">보험계약 확인</h2>
        </div>

        <div className="insurance-list-fold_body">
          <div className="insurance-list-form_area">
            <div className="insurance-list-form_item">
              <div className="insurance-list-form_label">
                <span className="insurance-list-form_title">계약상태</span>
              </div>
              <div className="insurance-list-option_area type_radio size01">
                <input
                  type="radio"
                  id="rdo_searchSt1"
                  name="searchSt"
                  className="insurance-list-btn_rdo size01"
                  value="01"
                  checked={selectedStatus === "01"}
                  onChange={() => setSelectedStatus("01")}
                />
                <label htmlFor="rdo_searchSt1">유지</label>
                <input
                  type="radio"
                  id="rdo_searchSt2"
                  name="searchSt"
                  className="insurance-list-btn_rdo size02"
                  value="02"
                  onChange={() => setSelectedStatus("02")}
                />
                <label htmlFor="rdo_searchSt2">효력상실</label>
              </div>
              <div className="insurance-list-option_area type_radio size02">
                <input
                  type="radio"
                  id="rdo_searchSt3"
                  name="searchSt"
                  className="insurance-list-btn_rdo size02"
                  value="03"
                  checked={selectedStatus === "03"}
                  onChange={() => setSelectedStatus("03")}
                />
                <label htmlFor="rdo_searchSt3">만기</label>
                <input
                  type="radio"
                  id="rdo_searchSt4"
                  name="searchSt"
                  className="insurance-list-btn_rdo size02"
                  value="04"
                  onChange={() => setSelectedStatus("04")}
                />
                <label htmlFor="rdo_searchSt4">해지</label>
                <input
                  type="radio"
                  id="rdo_searchStAll"
                  name="searchSt"
                  className="insurance-list-btn_rdo size01"
                  value="010203"
                  checked={selectedStatus === "010203"}
                  onChange={() => setSelectedStatus("010203")}
                />
                <label htmlFor="rdo_searchStAll">전체</label>
              </div>
            </div>
          </div>

          <div className="insurance-list-btn_area ta_c">
            <a
              href="javascript:void(0);"
              className="insurance-list-btn fill04"
              id="btn_search"
              onClick={handleSearch}
            >
              조회
            </a>
          </div>
        </div>
        {isSearchClicked && (
          <>
            {filteredInsuranceList.length > 0 && (
              <p className="insurance-count">
                {filteredInsuranceList.length}개의 보험이 조회되었습니다.
              </p>
            )}
            <table className="insurance-table">
              <thead>
                <tr>
                  <th>보험상품명</th>
                  <th>피보험자</th>
                  <th>보험기간</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {filteredInsuranceList.length > 0 ? (
                  filteredInsuranceList
                    .sort((a, b) => {
                      // insuranceName 오름차순으로 정렬
                      if (a.insuranceName < b.insuranceName) return -1;
                      if (a.insuranceName > b.insuranceName) return 1;

                      // insuranceName이 같다면 expireDate가 빠른 순서로 정렬
                      return new Date(a.expireDate) - new Date(b.expireDate);
                    })
                    .map((insurance, index) => (
                      <tr key={index}>
                        <td>{insurance.insuranceName}</td>
                        <td>{userInfo.name}</td>
                        <td>
                          {insurance.startDate} ~ {insurance.expireDate}
                        </td>
                        <td>{getInsuranceStatus(insurance.expireDate)}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4">해당 조건으로 조회된 정보가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default InsuranceList;
