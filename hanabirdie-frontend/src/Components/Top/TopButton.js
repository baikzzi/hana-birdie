import React, { useState, useEffect } from "react";
import "../../assets/css/TopButton.css";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤을 감지하여 버튼 표시 여부를 결정하는 함수
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 화면 최상단으로 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="top-button">
      {isVisible && (
        <button onClick={scrollToTop} className="top-btn">
          Top
        </button>
      )}
    </div>
  );
};

export default TopButton;
