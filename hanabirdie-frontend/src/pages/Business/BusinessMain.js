import React, { useEffect, useState, useRef } from "react";
import Loading from "../../components/Loading/Loading";
import SalesDashboard from "./SalesDashboard";
import MonthStatus from "./MonthStatus";
import axios from "axios";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/Business/BusinessMain.css";

const MainDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // 실제 데이터 로딩 상태
  const [initialLoading, setInitialLoading] = useState(true); // 초기 2초 로딩 상태
  const [loadingDuration] = useState(3); // 사용자 정의 로딩 시간 (초)
  const [error, setError] = useState(null);
  const sliderRef = useRef(null); // Reference to the Slider
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide index

  // POST request data (if needed)
  const postData = {
    // Example: specific filters or parameters
    // year: 2024,
    // month: "09"
  };

  // 데이터 로드 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/business/statistics",
          postData // Add any required data here
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("데이터 가져오기 실패:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 초기 렌더링 시 2초 동안 무조건 로딩을 보여주기 위한 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false); // 초기 2초 로딩 상태 해제
    }, loadingDuration * 1000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [loadingDuration]);

  // Slider settings with arrows and dots disabled
  const sliderSettings = {
    dots: false, // Disable dots
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Disable default arrows
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Update current slide
  };

  // Handler functions for buttons
  const goToIncome = () => {
    sliderRef.current.slickGoTo(0);
  };

  const goToExpenditure = () => {
    sliderRef.current.slickGoTo(1);
  };

  // 2초 초기 로딩이 끝났는지 확인하고 데이터 로딩 중이면 로딩 화면 표시
  if (initialLoading || loading) {
    return (
      <Loading
        text="매출 데이터를 가져오고있습니다..."
        duration={loadingDuration} // 애니메이션 지속 시간 (초)
      />
    );
  }

  // 데이터 로드 중 오류가 발생했을 때 처리
  if (error) {
    return <div>데이터 로드 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="main-dashboard-container">
      <div className="month-status-section">
        <MonthStatus data={data} />
      </div>

      {/* Navigation Buttons */}
      <div className="dashboard-navigation-buttons">
        <button
          className={`nav-button ${currentSlide === 0 ? "active" : ""}`}
          onClick={goToIncome}
        >
          수입
        </button>
        <button
          className={`nav-button ${currentSlide === 1 ? "active" : ""}`}
          onClick={goToExpenditure}
        >
          지출
        </button>
      </div>

      {/* Slider Section */}
      <div className="sales-dashboard-slider-section">
        <Slider ref={sliderRef} {...sliderSettings}>
          <div>
            <SalesDashboard data={data} transactionType="수입" />
          </div>
          <div>
            <SalesDashboard data={data} transactionType="지출" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default MainDashboard;
