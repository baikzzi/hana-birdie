// src/components/Loading.jsx

import React from "react";
import PropTypes from "prop-types"; // PropTypes를 통한 prop 타입 검증
import "../../assets/css/Loading.css";

// 네 개의 PNG 이미지 임포트
import loading1 from "../../assets/png/loading1.png";
import loading2 from "../../assets/png/loading2.png";
import loading3 from "../../assets/png/loading3.png";
import loading4 from "../../assets/png/loading4.png";

const Loading = ({ text, duration }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div
        className="loading-grid"
        style={{ "--animation-duration": `${duration}s` }}
      >
        <img
          src={loading1}
          alt="로딩 이미지 1"
          className="loading-image img1"
        />
        <img
          src={loading2}
          alt="로딩 이미지 2"
          className="loading-image img2"
        />
        <img
          src={loading3}
          alt="로딩 이미지 3"
          className="loading-image img3"
        />
        <img
          src={loading4}
          alt="로딩 이미지 4"
          className="loading-image img4"
        />
      </div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

// 기본 props 설정
Loading.defaultProps = {
  text: "데이터를 로드 중입니다...", // 기본 로딩 텍스트
  duration: 3, // 기본 애니메이션 지속 시간 (초)
};

// PropTypes 설정
Loading.propTypes = {
  text: PropTypes.string,
  duration: PropTypes.number,
};

export default Loading;
