import React, { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/Header.css";
import logo from "../../assets/png/logo.png";
// import mypage from "../../assets/png/mypage.png";

function Header() {
  // useAuth 훅을 사용하여 로그인 상태와 로그인/로그아웃 함수를 가져옵니다
  const { isLogined, userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // 로그인 처리 함수
  const handleLogin = () => {
    navigate("/login");
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    flushSync(() => {
      logout();
      setShowLogoutMessage(true); // 로그아웃 메시지 표시
    });

    navigate("/");
    setTimeout(() => {
      setShowLogoutMessage(false); // 일정 시간 후 메시지 숨김
    }, 3000); // 3초 후에 메시지가 사라지도록 설정
  };

  const handleProtectedLinkClick = (event, targetPath) => {
    if (!isLogined) {
      event.preventDefault();
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate(targetPath);
    }
  };

  return (
    <div className="header__wrap">
      <div className="header__content">
        <div className="header__left">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="gnb">
          <ul className="d1-list">
            {userInfo?.userRole !== "UR02" && (
              <li className="d1-item">
                <Link to="/membership" className="d1-link">
                  회원권
                </Link>
                <ul className="d2-wrap">
                  {userInfo?.userRole !== "UR02" && (
                    <li className="d2-item">
                      <Link
                        to="/membership"
                        className="d2-link __ga-inited"
                        data-ga-label="gnb_product_list"
                      >
                        골프장 회원권 찾기
                      </Link>
                    </li>
                  )}
                  {userInfo?.userRole !== "UR02" && (
                    <li className="d2-item">
                      <Link
                        to="/membershipList"
                        className="d2-link __ga-inited"
                        data-ga-label="gnb_product_theme_fundseller"
                        onClick={(e) =>
                          handleProtectedLinkClick(e, "/membershipList")
                        }
                      >
                        보유 회원권 확인
                      </Link>
                    </li>
                  )}
                  {/* {userInfo?.userRole === "UR02" && (
                    <li className="d2-item">
                      <Link
                        to="/membershipManagement"
                        className="d2-link __ga-inited"
                        ㄴ
                        data-ga-label="gnb_product_theme_fundseller"
                        onClick={(e) =>
                          handleProtectedLinkClick(e, "/membershipManagement")
                        }
                      >
                        회원권 관리
                      </Link>
                    </li>
                  )} */}
                </ul>
              </li>
            )}
            {userInfo?.userRole !== "UR02" && (
              <li className="d1-item">
                <Link
                  to="/membershipList"
                  className="d1-link"
                  onClick={(e) =>
                    handleProtectedLinkClick(e, "/membershipList")
                  }
                >
                  예약
                </Link>
                <ul className="d2-wrap">
                  <li className="d2-item">
                    <Link
                      // to="/reservation"
                      to="/membershipList"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_insight_houseview"
                      onClick={(e) =>
                        handleProtectedLinkClick(e, "/membershipList")
                      }
                    >
                      라운딩 예약
                    </Link>
                  </li>
                  {userInfo?.userRole !== "UR02" && (
                    <li className="d2-item">
                      <Link
                        to="/reservationHistory"
                        className="d2-link __ga-inited"
                        data-ga-label="gnb_insight_newsroom"
                        onClick={(e) =>
                          handleProtectedLinkClick(e, "/reservationHistory")
                        }
                      >
                        예약 기록
                      </Link>
                    </li>
                  )}
                  {userInfo?.userRole === "UR02" && (
                    <li className="d2-item">
                      <Link
                        to="/reservationManagement"
                        className="d2-link __ga-inited"
                        data-ga-label="gnb_insight_calculator"
                        onClick={(e) =>
                          handleProtectedLinkClick(e, "/reservationManagement")
                        }
                      >
                        예약 관리
                      </Link>
                    </li>
                  )}
                  {userInfo?.userRole === "UR02" && (
                    <li className="d2-item">
                      <Link
                        to="/reservationStatistics"
                        className="d2-link __ga-inited"
                        data-ga-label="gnb_insight_calculator"
                        onClick={(e) =>
                          handleProtectedLinkClick(e, "/reservationStatistics")
                        }
                      >
                        예약 통계
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}
            {userInfo?.userRole === "UR02" && (
              <li className="d1-item">
                <Link to="/businessMain" className="d1-link">
                  현금흐름
                </Link>
                <ul className="d2-wrap">
                  <li className="d2-item">
                    <Link
                      to="/businessMain"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_event"
                    >
                      매출 현황
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/costManagement"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_notice"
                    >
                      매출 및 비용 등록
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/cashFlowDashboard"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_notice"
                    >
                      현금 흐름 확인 및 예측
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {userInfo?.userRole === "UR02" && (
              <li className="d1-item">
                <Link to="/financeMain" className="d1-link">
                  재무분석
                </Link>
                <ul className="d2-wrap">
                  <li className="d2-item">
                    <Link
                      to="/financeMain"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_notice"
                    >
                      재무분석
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/financialStatementManagement"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_event"
                    >
                      재무제표관리
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {/* {userInfo?.userRole === "UR02" && (
              <li className="d1-item">
                <Link to="/dashboard" className="d1-link">
                  예탁금
                </Link>
                <ul className="d2-wrap">
                  <li className="d2-item">
                    <Link
                      to="/portfolio"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_notice"
                    >
                      포트폴리오
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/dashboard"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_event"
                    >
                      운영비 현황
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/investment"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_announcement"
                    >
                      투자 현황
                    </Link>
                  </li>
                </ul>
              </li>
            )} */}
            {userInfo?.userRole === "UR02" && (
              <li className="d1-item">
                <Link to="/loanMain" className="d1-link">
                  대출 {/*부가서비스*/}
                </Link>
                <ul className="d2-wrap">
                  <li className="d2-item">
                    <Link
                      to="/loanProduct"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_notice"
                    >
                      대출상품
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/loanHistory"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_lounge_announcement"
                    >
                      대출내역
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {/* {userInfo?.userRole !== "UR02" && (
              <li className="d1-item">
                <Link
                  to="/???statistics"
                  className="d1-link"
                  onClick={(e) => handleProtectedLinkClick(e, "/???statistics")}
                >
                  통계
                </Link>
                <ul className="d2-wrap">
                  <li className="d2-item">
                    <Link
                      to="/???"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_about_relative"
                      onClick={(e) => handleProtectedLinkClick(e, "/???")}
                    >
                      명예의 전당 (이건 로그인 안하고도 보여야하나)
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/reservationHistory"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_about_company"
                      onClick={(e) =>
                        handleProtectedLinkClick(e, "/reservationHitory")
                      }
                    >
                      골프장 이용 기록
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/roundingRecord"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_about_company"
                      onClick={(e) =>
                        handleProtectedLinkClick(e, "/roundingRecord")
                      }
                    >
                      라운딩 기록
                    </Link>
                  </li>
                </ul>
              </li>
            )} */}
            {userInfo?.userRole !== "UR02" && (
              <li className="d1-item">
                <Link to="/insurance" className="d1-link">
                  보험
                </Link>
                <ul className="d2-wrap">
                  <li className="d2-item">
                    <Link
                      to="/insurance"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_about_company"
                    >
                      골프보험 찾기
                    </Link>
                  </li>
                  <li className="d2-item">
                    <Link
                      to="/insuranceList"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_about_relative"
                      onClick={(e) =>
                        handleProtectedLinkClick(e, "/insuranceList")
                      }
                    >
                      나의 보험
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="d1-item">
              <Link
                to="/mypage"
                className="d1-link"
                onClick={(e) => handleProtectedLinkClick(e, "/mypage")}
              >
                마이페이지
              </Link>
              <ul className="d2-wrap">
                {userInfo?.userRole === "UR02" && (
                  <li className="d2-item">
                    <Link
                      to="/???"
                      className="d2-link __ga-inited"
                      data-ga-label="gnb_about_relative"
                      onClick={(e) => handleProtectedLinkClick(e, "/???")}
                    >
                      골프장 정보 관리
                    </Link>
                  </li>
                )}
                <li className="d2-item">
                  <Link
                    to="/mypage"
                    className="d2-link __ga-inited"
                    data-ga-label="gnb_about_company"
                    onClick={(e) => handleProtectedLinkClick(e, "/mypage")}
                  >
                    회원정보수정
                  </Link>
                </li>
                <li className="d2-item">
                  <Link
                    to="/???"
                    className="d2-link __ga-inited"
                    data-ga-label="gnb_about_relative"
                    onClick={(e) => handleProtectedLinkClick(e, "/???")}
                  >
                    연결 계좌 관리
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="menu">
          {/* <Link to={isLogined ? "/mypage" : "/login"} className="menu__mypage">
            <img src={mypage} alt="마이 페이지" />
          </Link> */}
          {isLogined ? (
            <span className="user-info">
              {userInfo.name}[
              {userInfo.userRole === "UR01" ? "일반 이용자" : "골프장 운영자"}
              ]님
            </span>
          ) : null}
          {isLogined ? (
            <div className="logout-container">
              <button className="button-login" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div className="logout-container">
              <button className="button-login" onClick={handleLogin}>
                로그인
              </button>
              {showLogoutMessage && (
                <div className="logout-message">로그아웃 되었습니다.</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="divide--line"></div>
    </div>
  );
}

export default Header;
