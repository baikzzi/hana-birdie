import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stepper, Step } from "react-basic-stepper";
import "react-basic-stepper/dist/index.css";
import "../../assets/css/Insurance/InsuranceSignup4.css";

function InsuranceSignup4() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    userId,
    insuranceId,
    isDailyInsurance,
    startDate,
    expireDate,
    price,
  } = location.state || {};

  const [isAgreed, setIsAgreed] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    // 모든 필수 체크박스가 체크되었는지 확인
    const requiredChecked =
      document.querySelectorAll("input.check-required:checked").length === 3;
    setAllChecked(requiredChecked);
    setIsAgreed(requiredChecked);
  }, []);

  const handleAgreementChange = () => {
    const requiredChecked =
      document.querySelectorAll("input.check-required:checked").length === 3;
    setAllChecked(requiredChecked);
    setIsAgreed(requiredChecked);
  };

  const handleAllCheckedChange = (e) => {
    const isChecked = e.target.checked;
    document.querySelectorAll(".check-required").forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    setAllChecked(isChecked);
    setIsAgreed(isChecked);
  };

  const handleShowTerms = (title, content) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAgreementSubmit = async () => {
    const formatDate = (date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
    };

    const formattedStartDate = formatDate(new Date(startDate));
    const formattedExpireDate = formatDate(new Date(expireDate));

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/insurance/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            insuranceId,
            startDate: formattedStartDate,
            expireDate: formattedExpireDate,
            price,
          }),
        }
      );

      if (response.ok) {
        navigate("/insuranceSignup5");
      } else {
        const errorData = await response.text();
        alert("신청에 실패하였습니다. 다시 시도해주세요.\n" + errorData);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="insurance4-wrap">
      <Stepper
        headerStyles={{
          activatedStepBackground: "#009178",
          lineColor: "#009178",
        }}
        indexStep={3}
      >
        <Step></Step>
        <Step></Step>
        <Step></Step>
        <Step></Step>
      </Stepper>
      <div className="insurance4-header header2">
        <div className="insurance-signup4-inner">
          <h2>고객 동의</h2>
        </div>
      </div>
      <div className="insurance4-content">
        <div className="content-in">
          <div className="insurance-signup4-inner">
            <p className="txt-explain">
              고객님의 보험료를 계산하기 위한 개인(신용) 정보 수집/이용, 조회,
              제공 동의가 필요합니다.
            </p>
          </div>
          <div className="insurance4-agree-wrap" id="agree_select">
            <div className="insurance4-agree-top">
              <div className="checkbox type1">
                <input
                  type="checkbox"
                  className="check-all"
                  id="chkRequired"
                  onChange={handleAllCheckedChange}
                  checked={allChecked}
                />
                <i></i>
              </div>
              <label htmlFor="chkRequired">
                [필수] 고객정보 관리 및 가입설계를 위한 동의
              </label>
            </div>

            <div className="insurance4-agree-box">
              <fieldset id="agree_required">
                <ul>
                  <li>
                    <div className="txt">
                      <button
                        type="button"
                        className="insurance4-btnShowTerms"
                        onClick={() =>
                          handleShowTerms(
                            "수집/이용에 관한 사항",
                            `수집·이용 목적: 보험계약 상담, 재무설계서비스, 보험계약 인수여부 판단(건강진단 및 계약 적부조사), 보험료출수납업무, 실손형보험 중복확인 및 정액담보 가입사항 확인을 위한 당사/타사보험 가입조회
                          보유 및 이용기간: 동의일로부터 1년까지
                          수집·이용 항목: 고유식별정보 - 주민등록번호, 외국인등록번호, 여권번호, 운전면허번호
                          위 고유식별정보 수집·이용에 동의하십니까?
                          □동의하지 않음 □동의함
                          민감정보: 피보험자의 질병·상해에 관한 정보(진료기록, 상병명, 흡연여부 등), 교통법규위반정보
                          위 민감정보 수집·이용에 동의하십니까?
                          □동의하지 않음 □동의함
                          개인(신용)정보: 성명, 주소, 생년월일, 이메일, 유·무선 전화번호, 국적, 직업, 운전여부, 국내거소신고번호, 주행거리, 연계정보(CI), 안전운전점수정보, 차량부속정보
                          신용거래정보: 보험계약정보(상품종류, 기간, 보험가입금액 등), 보험금정보(보험금 지급사유, 지급금액 등), 본인계좌(카드)정보
                          신용능력정보: 소득 및 재산 정보
                          위 개인신용정보 수집·이용에 동의하십니까?
                          □동의하지 않음 □동의함`
                          )
                        }
                      >
                        수집/이용에 관한 사항
                        <span className="insurance4-btn-icon more">더보기</span>
                      </button>
                    </div>
                    <div className="chk">
                      <div className="checkbox type3">
                        <input
                          type="checkbox"
                          className="check-required chk-only"
                          id="chkAgreeRequired1"
                          onChange={handleAgreementChange}
                        />
                        <i></i>
                      </div>
                      <label htmlFor="chkAgreeRequired1">동의</label>
                    </div>
                  </li>
                  <li>
                    <div className="txt">
                      <button
                        type="button"
                        className="insurance4-btnShowTerms"
                        onClick={() =>
                          handleShowTerms(
                            "제공에 관한 사항",
                            `제공받는 자: 국내 재보험사, 국외 재보험사, 종합신용정보집중기관, 보험요율산출기관, 국토교통부, 금융거래기관, 본인인증기관, 티맵모빌리티, 현대자동차, 기아자동차, 쿠콘
                        제공받는 자의 이용목적: 국내 재보험사, 국외 재보험사 - 보험계약 상담(건강등급 포함), 가입설계, 가입설계지원, 보험계약 인수여부 판단
                        종합신용정보집중기관, 보험요율산출기관, 국토교통부, 금융거래기관, 본인인증기관 - 개인(신용)정보 조회
                        티맵모빌리티: 안전운전점수 실적조회(특약가입자에 한함)
                        현대자동차, 기아자동차 - 주행거리관련, 안전운전점수조회(특약가입자에 한함)
                        쿠콘: 차량장착 부속조회(부속장착 가입자에 한함)
                        보유 및 이용기간: 동의일로부터 1년까지
                        고유식별정보: 주민등록번호, 외국인등록번호, 여권번호, 운전면허번호
                        위 고유식별정보 제공에 동의하십니까?
                        □동의하지 않음 □동의함
                        민감정보: 피보험자의 질병·상해에 관한 정보(진료기록, 상병명, 기왕증 등), 교통법규 위반정보
                        위 민감정보 제공에 동의하십니까?
                        □동의하지 않음 □동의함
                        개인(신용)정보: 성명, 국내거소신고번호
                        신용거래정보: 보험계약정보(상품종류, 기간, 보험가입금액 등), 보험금정보(보험금 지급사유, 지급금액 등), 계약 전 알릴 의무사항(취미 등)
                        위 개인신용정보 제공에 동의하십니까?
                        □동의하지 않음 □동의함`
                          )
                        }
                      >
                        제공에 관한 사항
                        <span className="insurance4-btn-icon more">더보기</span>
                      </button>
                    </div>
                    <div className="chk">
                      <div className="checkbox type3">
                        <input
                          type="checkbox"
                          className="check-required chk-only"
                          id="chkAgreeRequired2"
                          onChange={handleAgreementChange}
                        />
                        <i></i>
                      </div>
                      <label htmlFor="chkAgreeRequired2">동의</label>
                    </div>
                  </li>
                  <li>
                    <div className="txt">
                      <button
                        type="button"
                        className="insurance4-btnShowTerms"
                        onClick={() =>
                          handleShowTerms(
                            "조회에 관한 사항",
                            `조회 대상 기관: 종합신용정보집중기관, 보험요율산출기관, 국토교통부, 금융거래기관, 본인인증기관, GHC, 티맵모빌리티·현대자동차·기아자동차, 쿠콘
                        조회 목적: 종합신용정보집중기관 - 보험계약 인수여부 결정을 위한 판단, 보험 가입한도 조회, 실제 발생하는 손해를 보상하는 실손형 보험의 중복확인, 새로운 보험계약 체결 시 기존 보험계약과의 중요사항 비교설명
                        보험요율산출기관, 국토교통부 - 보험계약 인수여부 결정을 위한 판단, 기타 법령에 의한 업무수행
                        금융거래기관 - 예금주(카드소유주) 본인 확인
                        본인인증기관 - 실명인증, 본인인증
                        GHC - 건강등급
                        티맵모빌리티:안전운전점수 실적조회(특약가입자에 한함)
                        현대자동차,기아자동차 - 주행거리정보, 안전운전점수조회(특약가입자에 한함)
                        쿠콘 - 차량장착 부속조회(부속장착가입자에 한함)
                        조회 동의의 효력기간: 동의일로부터 보험계약의 청약 시까지(최대 1년)
                        고유식별정보: 주민등록번호, 외국인등록번호, 여권번호, 운전면허번호
                        위 고유식별정보 제공에 동의하십니까?
                        □동의하지 않음 □동의함
                        민감정보: 피보험자의 질병·상해에 관한 정보(진료기록, 상병명 등), 교통법규위반정보1)
                        1) 교통법규위반정보 기재 부분은 자동차보험 등 조회가 필요한 보험종목에 한함
                        위 민감정보 조회에 동의하십니까?
                        □동의하지 않음 □동의함
                        개인(신용)정보: 성명, 국내거소신고번호, 연계정보(CI), 차량정보, 안전운전점수정보
                        신용거래정보: 보험계약정보(상품종류, 기간, 보험료, 보험가입금액 등), 보험금정보(보험금 지급사유, 지급금액 등)
                        공공정보 등: 군운전경력정보※ 1), 자동차등록관련 정보1)
                        당사의 요청에 따라 보험요율 산출기관이 행정정보공동이용센터를 통해 병무청으로부터 제공받는 정보(단, 요율 산출에 필요한 보험계약에 한함
                        1) 공공정보 기재 부분은 자동차보험 등 조회가 필요한 보험종목에 한함
                        위 개인신용정보 조회에 동의하십니까?
                        □동의하지 않음 □동의함`
                          )
                        }
                      >
                        조회에 관한 사항
                        <span className="insurance4-btn-icon more">더보기</span>
                      </button>
                    </div>
                    <div className="chk">
                      <div className="checkbox type3">
                        <input
                          type="checkbox"
                          className="check-required chk-only"
                          id="chkAgreeRequired3"
                          onChange={handleAgreementChange}
                        />
                        <i></i>
                      </div>
                      <label htmlFor="chkAgreeRequired3">동의</label>
                    </div>
                  </li>
                </ul>
              </fieldset>
            </div>
          </div>
          <div className="insurance-signup4-button">
            <button
              className={`insurance4-btn-floating ${
                isAgreed ? "" : "disabled"
              }`}
              onClick={handleAgreementSubmit}
              disabled={!isAgreed}
            >
              <span>동의완료</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for showing terms */}
      {isModalOpen && (
        <div className="insurance4-modal">
          <div className="insurance4-modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{modalContent.title}</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{modalContent.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InsuranceSignup4;
