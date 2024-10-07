import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuth } from "../../context/AuthContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../assets/css/Home.css";
import calendarImage from "../../assets/png/calendar.png";
import golfImage from "../../assets/png/golf.png";
import investmentImage from "../../assets/png/investment.png";
import accountbook from "../../assets/png/accountbook.png";
import golfRounding from "../../assets/png/golfRounding.png";
import financeSafety from "../../assets/png/financeSafety.png";
import safety from "../../assets/png/safety.png";
import insurance from "../../assets/png/insurance.png";
import loan from "../../assets/png/loan.png";
import financeAnalysis from "../../assets/png/financeAnalysis.png";
import cashFlow from "../../assets/png/cashFlow.png";
import accounting from "../../assets/png/accounting.png";
import ocr from "../../assets/png/ocr.png";
import costManagement from "../../assets/png/costManagement.png";

const Home = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const paginationRef = useRef(null);
  const { isLogined, userInfo, logout } = useAuth();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);
  const slides = [
    {
      id: "slide1",
      bgColor: "#4EB4DD",
      image: golfImage,
      tag: "회원권",
      title: "골프장 회원권 둘러보기",
      description: "전국 모든 회원권의 혜택 확인",
      link: "/membership",
    }, // 일반 사용자 - 회원권 찾기
    {
      id: "slide2",
      bgColor: "#FF9E2D",
      image: calendarImage,
      tag: "예약",
      title: "2024년 11월 예약 오픈",
      description: "라운딩 일자의 날씨도 함께 확인할 수 있습니다 ",
      link: "/membershipList",
    }, // 일반 사용자 - 골프장 예약하기
    {
      id: "slide3",
      bgColor: "#DE9EC1",
      image: financeSafety,
      tag: "회원권",
      title: "골프장 안정성",
      description: "우리 골프장의 경영 안정성은?",
      link: "/membership",
    },

    {
      id: "slide4",
      bgColor: "#1CB460",
      image: investmentImage,
      tag: "회원권",
      title: "회원권 시세 확인",
      description: "실시간 시세 그래프 확인",
      link: "/membership",
    },
    {
      id: "slide5",
      bgColor: "#0A81E9",
      image: golfRounding,
      tag: "예약",
      title: "라운딩 달력",
      description: "나의 과거 라운딩 기록 확인",
      link: "/reservationHistory",
    },
    {
      id: "slide6",
      bgColor: "#9024EE",
      image: insurance,
      tag: "보험",
      title: "골프보험",
      description: "올인원, 데일리, 홀인원 원하는대로 골라담자",
      link: "/insurance",
    },
    {
      id: "slide7",
      bgColor: "#81A263",
      image: cashFlow,
      tag: "경영영지원",
      title: "현금흐름 예측 서비스",
      description: "운영자 전환 후 예측서비스를 받아보세요",
      link: "/mypage",
    },
    {
      id: "slide8",
      bgColor: "#E7D37F",
      image: insurance,
      tag: "보험",
      title: "나의 골프보험",
      description: "가입된 보험 관리",
      link: "/insuranceList",
    },
    {
      id: "slide9",
      bgColor: "#008080",
      image: financeAnalysis,
      tag: "재무분석",
      title: "재무분석 서비스",
      description: "운영자 전환 후 재무분석 서비스를 받아보세요",
      link: "/mypage",
    },
  ];

  // 관리자용 슬라이드
  const slidesForAdmin = [
    {
      id: "slide1",
      bgColor: "#FF9E2D",
      image: accounting,
      tag: "회계",
      title: "매출 현황 확인",
      description: "과거 매출과 비교해보세요",
      link: "/businessMain",
    },
    {
      id: "slide2",
      bgColor: "#DE9EC1",
      image: cashFlow,
      tag: "회계",
      title: "현금흐름 예측 서비스",
      description: "현금흐름을 예측하여 미리 대비하세요",
      link: "/cashFlowDashboard",
    },
    {
      id: "slide3",
      bgColor: "#E7D37F",
      image: loan,
      tag: "대출",
      title: "골프장 운영자금 대출",
      description: "하나은행 고객 우대 대출서비스로 유동성을 확보",
      link: "/", // 대출 개발 시 수정
    },

    {
      id: "slide4",
      bgColor: "#4EB4DD",
      image: costManagement,
      tag: "회계",
      title: "회계 등록",
      description: "메출 및 지출 등록",
      link: "/costManagement",
    },
    {
      id: "slide5",
      bgColor: "#0A81E9",
      image: golfImage,
      tag: "회원권",
      title: "골프장 회원권 상품 관리",
      description: "나의 골프장 회원권 관리를 손쉽게 !",
      link: "/",
    },
    {
      id: "slide6",
      bgColor: "#1CB460",
      image: calendarImage,
      tag: "예약",
      title: "2024년 11월 예약 현황",
      description: "예약 현황 확인",
      link: "/",
    },
    {
      id: "slide7",
      bgColor: "#9024EE",
      image: financeAnalysis,
      tag: "재무분석",
      title: "재무분석 서비스",
      description: "등록한 재무상태표 기반 재무분석",
      link: "/financeMain",
    },
    {
      id: "slide8",
      bgColor: "#008080",
      image: ocr,
      tag: "재무분석",
      title: "재무제표 등록",
      description: "아직도 손으로? 하나버디 OCR로 간편등록 !",
      link: "/financialStatementManagement",
    },
    {
      id: "slide9",
      bgColor: "#81A263",
      image: loan,
      tag: "대출",
      title: "대출 신청 내역",
      description: "대출 신청 세부내역을 확인하세요",
      link: "/", // 대출 개발 시 수정
    },
  ];

  // 일반 사용자용 메뉴 링크
  const menuLinks = [
    {
      to: "/membership",
      title: "회원권으로 이동",
      label: "회원권",
      description: "전국 다양한 회원권 정보",
    },
    {
      to: "/reservation",
      title: "실시간 예약로 이동",
      label: "예약 조회",
      description: "나의 일정을 한눈에!",
    },
    {
      to: "/membership",
      title: "회원권 시세 확인",
      label: "전국 회원권 시세",
      description: "과거부터 실시간 시세까지 !",
    },
    {
      to: "/insurance",
      title: "골프보험으로 이동",
      label: "골프 보험",
      description: "원데이 보험 간편가입!",
    },
    {
      to: "/membership",
      title: "골프장 안정성 확인",
      label: "골프장 안정성 확인",
      description: "우리 골프장의 경영 상태는?",
    },
  ];

  // 관리자용 메뉴 링크
  const adminMenuLinks = [
    {
      to: "/businessMain",
      title: "매출관리 페이지 이동",
      label: "회계 등록 및 현황",
      description: "과거 매출과 비교해보세요",
    },
    {
      to: "/cashFlowDashboard",
      title: "현금흐름 예측 페이지 이동",
      label: "현금흐름 예측",
      description: "미래 현금흐름을 예측해보기",
    },

    {
      to: "/?", // 대출 서비스 개발 시 추가
      title: "대출 신청 페이지 이동",
      label: "대출 서비스",
      description: "골프장 운영자금을 확보",
    },
    {
      to: "/financeMain",
      title: "재무분석 페이지 이동",
      label: "재무분석",
      description: "골프장 유동성 및 재무상태 확인",
    },
    {
      to: "/financialStatementManagement",
      title: "재무상태표 등록 페이지",
      label: "재무상태표 등록",
      description: "재무상태표 첨부만 !",
    },
  ];

  const isAdmin = isLogined && userInfo?.userRole === "UR02";

  return (
    <div className="home-wrap">
      <div className="swiper-wrap">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          slidesPerGroup={3}
          loop={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          className="swiper-container"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className}"></span>`,
          }}
        >
          {(isAdmin ? slidesForAdmin : slides).map((slide) => (
            <SwiperSlide
              key={slide.id}
              onClick={() => navigate(slide.link)}
              style={{ "--swiper-slide-bg-color": slide.bgColor }}
            >
              <div className="text-in-slide">
                <span>{slide.tag}</span>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
              <div className="img-in-slide">
                <img src={slide.image} alt={slide.title} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="indicator">
          <button ref={prevRef} className="swiper-button-prev"></button>
          <div className="swiper-pagination" ref={paginationRef}></div>
          <button ref={nextRef} className="swiper-button-next"></button>
        </div>
      </div>

      <div className="section_middlecon_wrap">
        <div className="section_middlecon_inner">
          {(isAdmin ? adminMenuLinks : menuLinks).map((link, index) => (
            <Link key={index} to={link.to} title={link.title}>
              <b>{link.label}</b>
              <br />
              <span>{link.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
