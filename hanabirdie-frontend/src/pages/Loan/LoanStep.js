import React from "react";
import "../../assets/css/Loan/LoanStep.css";

const LoanStep = () => {
  return (
    <div className="LoanStep-container">
      <div className="LoanStep-horizontal">
        <ul className="LoanStep-list">
          {/* STEP 1 */}
          <li className="LoanStep-item">
            <div className="LoanStep-inner">
              <div className="LoanStep-contents">
                <div className="LoanStep-badge">STEP 1</div>
                <p className="LoanStep-text">
                  원하는 상품과 조건으로
                  <br />
                  <strong>대출을 신청</strong>합니다.
                </p>
              </div>
              <div className="LoanStep-icon">
                {/* SVG Icon for Step 1 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="none"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="#DCEAFC"
                    fillRule="evenodd"
                    d="M11 3a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V11l-8-8H11Z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#00CBC1"
                    d="m15.454 33.964-.12-.026a15.89 15.89 0 0 1-8.774-6.685 16.405 16.405 0 0 1-2.428-10.885 1.614 1.614 0 0 1 .64-1.082 1.49 1.49 0 0 1 1.184-.253l3.118.651c.334.071.635.253.855.519.22.265.346.597.36.944l.1 2.77c.011.305-.067.607-.224.867-.158.26-.388.467-.661.594l-1.445.672a12.62 12.62 0 0 0 3.71 5.863l1.237-1.097a1.502 1.502 0 0 1 1.673-.223l2.46 1.22c.307.15.556.402.706.715.15.312.193.667.12 1.007l-.676 3.243a1.529 1.529 0 0 1-.703.999c-.341.205-.745.272-1.132.187Z"
                  ></path>
                  <path
                    fill="#A1B3C9"
                    d="M13 19a1 1 0 0 1 1-1h11a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1ZM19 24a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
                  ></path>
                  <path
                    fill="#B8CAE1"
                    fillRule="evenodd"
                    d="M23.5 11H30l-8-8v6.5a1.5 1.5 0 0 0 1.5 1.5Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </li>

          {/* STEP 2 */}
          <li className="LoanStep-item">
            <div className="LoanStep-inner">
              <div className="LoanStep-contents">
                <div className="LoanStep-badge">STEP 2</div>
                <p className="LoanStep-text">
                  신청하신 정보를 바탕으로 <br />
                  대출 자격 심사 후
                  <br />
                  <strong>결과를 안내</strong>해드립니다.
                </p>
              </div>
              <div className="LoanStep-icon">
                {/* SVG Icon for Step 2 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M13 6a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V16L29 6H13Z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#D3E3F8"
                    fillRule="evenodd"
                    d="M31.5 16H39L29 6v7.5a2.5 2.5 0 0 0 2.5 2.5Z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#AFC3DC"
                    d="M14 27.75c0-.69.56-1.25 1.25-1.25h12.5a1.25 1.25 0 0 1 0 2.5h-12.5c-.69 0-1.25-.56-1.25-1.25ZM14 33.75c0-.69.56-1.25 1.25-1.25h9.5a1.25 1.25 0 0 1 0 2.5h-9.5c-.69 0-1.25-.56-1.25-1.25Z"
                  ></path>
                  <path
                    fill="#143B75"
                    d="M41.94 19.06a1.5 1.5 0 0 1 2.12 0l1.768 1.768a1.5 1.5 0 0 1 0 2.122L33.892 34.886a1.5 1.5 0 0 1-.581.36l-3.93 1.326a.818.818 0 0 1-.973-1.04l1.236-3.936c.073-.23.2-.44.37-.61L41.94 19.06Z"
                  ></path>
                </svg>
              </div>
            </div>
          </li>

          {/* STEP 3 */}
          <li className="LoanStep-item">
            <div className="LoanStep-inner">
              <div className="LoanStep-contents">
                <div className="LoanStep-badge">STEP 3</div>
                <p className="LoanStep-text">
                  손님의 대출계좌에
                  <br />
                  <strong>대출금을 입금</strong>해드립니다.
                </p>
              </div>
              <div className="LoanStep-icon">
                {/* SVG Icon for Step 3 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#AFC3DC"
                    d="M7 20a4 4 0 0 1 4-4h26a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V20Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M10.5 10a4 4 0 0 1 4-4h19a4 4 0 0 1 4 4v21a4 4 0 0 1-4 4h-19a4 4 0 0 1-4-4V10Z"
                  ></path>
                  <path
                    fill="#AFC3DC"
                    d="M14.5 13.25c0-.69.56-1.25 1.25-1.25h15.5a1.25 1.25 0 1 1 0 2.5h-15.5c-.69 0-1.25-.56-1.25-1.25ZM14.5 19.25c0-.69.56-1.25 1.25-1.25h10.5a1.25 1.25 0 1 1 0 2.5h-10.5c-.69 0-1.25-.56-1.25-1.25Z"
                  ></path>
                  <path
                    fill="#DCEAFC"
                    d="m7 20 15 10.542V38a4 4 0 0 1-4 4h-7a4 4 0 0 1-4-4V20ZM41 20 26 30.542V38a4 4 0 0 0 4 4h7a4 4 0 0 0 4-4V20Z"
                  ></path>
                  <path
                    fill="#AFC3DC"
                    d="M37 42H11l12.267-13.21a1 1 0 0 1 1.466 0L37 42Z"
                  ></path>
                  <path
                    fill="#2AD6CE"
                    d="M46 37a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M41.717 34.303a1 1 0 0 1-.02 1.414l-5.143 5a1 1 0 0 1-1.394 0l-2.857-2.778a1 1 0 1 1 1.394-1.434l2.16 2.1 4.446-4.322a1 1 0 0 1 1.414.02Z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#fff"
                    d="M28 36.25a1 1 0 0 1 1-1h1.5a1 1 0 1 1 0 2H29a1 1 0 0 1-1-1ZM38.5 36.25a1 1 0 0 1 1-1H41a1 1 0 1 1 0 2h-1.5a1 1 0 0 1-1-1Z"
                  ></path>
                </svg>
              </div>
            </div>
          </li>

          {/* STEP 4 */}
          <li className="LoanStep-item">
            <div className="LoanStep-inner">
              <div className="LoanStep-contents">
                <div className="LoanStep-badge">STEP 4</div>
                <p className="LoanStep-text">
                  계약 조건에 따라서
                  <br />
                  <strong>이자와 원금을 납부</strong>합니다.
                </p>
              </div>
              <div className="LoanStep-icon">
                {/* SVG Icon for Step 4 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fff"
                    d="M8 10.21C8 7.885 9.79 6 12 6h22c2.21 0 4 1.885 4 4.21V26H8V10.21Z"
                  ></path>
                  <path
                    fill="#AFC3DC"
                    d="M12 15.25c0-.69.56-1.25 1.25-1.25h13.5a1.25 1.25 0 1 1 0 2.5h-13.5c-.69 0-1.25-.56-1.25-1.25ZM12 20.25c0-.69.56-1.25 1.25-1.25h10.5a1.25 1.25 0 1 1 0 2.5h-10.5c-.69 0-1.25-.56-1.25-1.25Z"
                  ></path>
                  <path
                    fill="#074093"
                    d="M8 10a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4H8Z"
                  ></path>
                  <path
                    fill="#DCEAFC"
                    d="M8 26h30l1.965 9.773C40.277 38.011 38.458 40 36.098 40H9.902c-2.36 0-4.179-1.989-3.867-4.227L8 26Z"
                  ></path>
                  <path
                    fill="#D3E2F5"
                    d="M37.977 26.004H7.96L38.618 29.7l-.64-3.696Z"
                  ></path>
                  <path
                    fill="#074093"
                    d="M6.094 35.5H40.46c.349 2.38-1.619 4.5-4.175 4.5H9.767c-2.554 0-4.033-2.124-3.673-4.5Z"
                  ></path>
                  <path
                    fill="#FFC737"
                    d="M24 30.5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H26a2 2 0 0 1-2-2v-12Z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M30.194 32.548a1 1 0 0 1 1.258.646l1.11 3.455 1.519-3.543a1 1 0 0 1 1.838 0l1.519 3.543 1.11-3.455a1 1 0 1 1 1.904.612l-1.928 6a1 1 0 0 1-1.872.088L35 36.04l-1.652 3.855a1 1 0 0 1-1.871-.088l-1.929-6a1 1 0 0 1 .646-1.258Z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#fff"
                    d="M28 36.25a1 1 0 0 1 1-1h1.5a1 1 0 1 1 0 2H29a1 1 0 0 1-1-1ZM38.5 36.25a1 1 0 0 1 1-1H41a1 1 0 1 1 0 2h-1.5a1 1 0 0 1-1-1Z"
                  ></path>
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoanStep;
