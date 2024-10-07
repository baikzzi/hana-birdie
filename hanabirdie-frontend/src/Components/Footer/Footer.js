import React from "react";
import "../../assets/css/Footer.css";
import logo from "../../assets/png/logo.png";
import youtube from "../../assets/png/youtube.png";
import instagram from "../../assets/png/instagram.png";
import accessibility from "../../assets/png/accessibility.png";

function Footer() {
  const handlePolicyClick = (policyType) => {
    console.log(`Navigating to ${policyType}`); // 예시 로그, 실제로는 페이지 이동 로직 구현
  };
  return (
    <footer className="footer">
      <div className="divide--line">
        <div className="footer-wrapper">
          <div className="top">
            <div className="inner">
              <div className="link">
                <ol aria-hidden="true" id="link">
                  <li>
                    <button
                      type="button"
                      onClick={() => handlePolicyClick("privacyPolicy")}
                      aria-controls="privacyPolicy"
                      className="privacy"
                    >
                      개인정보처리방침
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handlePolicyClick("creditPolicy")}
                      aria-controls="creditPolicy"
                      className="credit"
                    >
                      신용정보활용체제
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handlePolicyClick("customerPolicy")}
                      aria-controls="customerPolicy"
                    >
                      고객정보취급방침
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          "http://openhanafn.ttmap.co.kr/content_fn.jsp?biz_type=2&seq_no=130"
                        )
                      }
                    >
                      하나맵
                    </button>
                  </li>
                </ol>
              </div>
              <div className="sns">
                <a
                  href="https://www.youtube.com/channel/UCejh7cdlFSkCh_rqQT6WB8Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube"
                  title="youtube 새창 열기"
                  aria-label="youtube"
                >
                  <img src={youtube} alt="YouTube" />
                </a>
                <a
                  href="https://www.instagram.com/hanafn.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                  title="instagram 새창 열기"
                  aria-label="instagram"
                >
                  <img src={instagram} alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="inner">
              <a href="/" className="logo" title="홈으로" aria-label="홈으로">
                <img className="logo" src={logo} alt="하나 금융그룹 로고" />
              </a>
              <p>
                <span>인천광역시 서구 에코로 181</span>

                <span>032.2002.1111</span>
              </p>
              <p>Copyright ⓒ 2024 HANA BIRDIE. All rights Reserved.</p>
            </div>
            <a
              href="http://www.wa.or.kr/board/list.asp?BoardID=0006"
              target="_blank"
              rel="noopener noreferrer"
              id="accessibility"
              title="새창"
            >
              <img
                className="accessibility"
                src={accessibility}
                alt="정보통신접근성 품질인증 마크(과학기술정보통신부 WEB접근성 한국웹접근성인증평가원. 2024.04.14~2025.04.13)"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
