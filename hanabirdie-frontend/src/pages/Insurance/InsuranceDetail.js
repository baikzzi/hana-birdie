import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/Insurance/InsuranceDetail.css";
import longterm from "../../assets/png/insurance-longterm.png";
import oneday from "../../assets/png/insurance-onday.png";
import TopButton from "../../components/Top/TopButton";

const InsuranceDetail = () => {
  const { state } = useLocation();
  const insuranceDetail = state?.insuranceDetail || {};
  const navigate = useNavigate();
  const { isLogined, userInfo } = useAuth();

  const [activeTab, setActiveTab] = useState("1일"); // 초기 활성 탭을 "1일"로 설정
  const [openIndexes, setOpenIndexes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isDailyInsurance, setIsDailyInsurance] = useState(
    insuranceDetail.tag && insuranceDetail.tag.includes("#데일리") ? "Y" : "N"
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleDropdown = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const handleEnrollClick = () => {
    if (!isLogined) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const userId = userInfo.userId;
      const insuranceId = insuranceDetail.insuranceId;

      if (insuranceDetail.tag && insuranceDetail.tag.includes("#데일리")) {
        setShowPopup(true);
      } else {
        navigate("/insuranceSignup1", {
          state: {
            userId: userId,
            insuranceId: insuranceId,
            isDailyInsurance: "N",
          },
        });
      }
    }
  };

  const handlePopupClick = (isDailyInsurance) => {
    setShowPopup(false);
    navigate("/insuranceSignup1", {
      state: {
        userId: userInfo.userId,
        insuranceId: insuranceDetail.insuranceId,
        isDailyInsurance: isDailyInsurance,
      },
    });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const items = [
    {
      title: "보험계약 체결 전 유의사항",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 보험계약 청약시 보험상품명,
            보험기간, 보험료납입기간, 피보험자 등을 반드시 확인하시고,
            보험약관을 반드시 수령, 설명 받으시기 바랍니다.
          </li>
          <li>
            <span className="item-number">02.</span> 하나손해보험은 해당 상품에
            대해 충분히 설명할 의무가 있으며, 가입자는 가입에 앞서 이에 대한
            충분한 설명을 받으시기 바랍니다.
          </li>
          <li>
            <span className="item-number">03.</span> 보험계약 체결 전에
            상품설명서와 약관을 반드시 읽어보시기 바랍니다.
          </li>
          <li>
            <span className="item-number">04.</span> 기존 보험계약을 해지하고
            새로운 보험계약을 체결하는 경우 보험 인수가 거절되거나, 보험료가
            인상될 수 있으며, 보장내용이 달라질 수 있으니 유의하시기 바랍니다.
          </li>
        </ol>
      ),
    },
    {
      title: "계약 전 알릴 의무",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 계약자 또는 피보험자는
            청약할 때 청약서에서 질문한 사항에 대하여 알고 있는 사실을 반드시
            사실대로 알려야 합니다. 약관에 따라 알릴 의무 위반 시 계약이
            해지되거나 보장이 제한될 수 있습니다.
          </li>
        </ol>
      ),
    },
    {
      title: "계약 후 알릴 의무",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 계약자 또는 피보험자는
            보험계약을 맺은 후 보험약관에 정한 계약 후 알릴 의무 사항이
            발생하였을 경우 회사에 지체없이 알려야 합니다. 그렇지 않을 경우
            보험금 지급이 거절될 수 있습니다.
          </li>
        </ol>
      ),
    },
    {
      title: "보험금을 지급하지 않는 사유",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 회사는 다음 중 어느
            한가지로 보험금 지급사유가 발생한 때에는 보험금을 지급하지 않습니다.
            <div className="text_cont_box">
              <p className="tcb_p2">
                - 피보험자가 고의로 자신을 해친 경우. 다만, 피보험자가 심신상실
                등으로 자유로운 의사결정을 할 수 없는 상태에서 자신을 해친
                경우에는 보험금을 지급합니다.
              </p>
              <p className="tcb_p2">
                - 보험수익자가 고의로 피보험자를 해친 경우. 다만, 그
                보험수익자가 보험금의 일부 보험수익자인 경우에는 다른
                보험수익자에 대한 보험금은 지급합니다.
              </p>
              <p className="tcb_p2">- 계약자가 고의로 피보험자를 해친 경우</p>
              <p className="tcb_p2">
                - 피보험자의 임신, 출산(제왕절개를 포함합니다), 산후기. 그러나,
                회사가 보장하는 보험금 지급사유로 인한 경우에는 보험금을
                지급합니다.
              </p>
              <p className="tcb_p2">
                - 전쟁, 외국의 무력행사, 혁명, 내란, 사변, 폭동
              </p>
            </div>
          </li>
          <li>
            <span className="item-number">02.</span> 회사는 다른 약정이 없으면
            피보험자가 직업, 직무 또는 동호회 활동목적으로 아래에 열거된 행위로
            인하여 제3조(보험금의 지급사유)의 상해 관련 보험금 지급사유가 발생한
            때에는 해당 보험금을 지급하지 않습니다.
            <div className="text_cont_box">
              <p className="tcb_p2">
                - 전문등반, 글라이더 조종, 스카이다이빙, 스쿠버다이빙,
                행글라이딩, 수상보트, 패러글라이딩
              </p>
              <p className="tcb_p2">
                - 모터보트, 자동차 또는 오토바이에 의한 경기, 시범, 흥행 또는
                시운전
              </p>
              <p className="tcb_p2">
                - 선박승무원, 어부, 사공, 그밖에 선박에 탑승하는 것을 직무로
                하는 사람이 직무상 선박에 탑승하고 있는 동안
              </p>
            </div>
          </li>
          <li>
            <span className="item-number">03.</span> 특약별 보험금 지급사유,
            보험금을 지급하지 않는 사유 등 기타 세부적인 사항은 약관에 따라
            제한될 수 있으므로 반드시 약관을 참조하시기 바랍니다.
          </li>
        </ol>
      ),
    },
    {
      title: "해약환급금이 납입보험료보다 적은 이유",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 해약환급금이란 보험계약이
            중도에 해지될 경우에 지급되는 금액을 말합니다. 보험은 은행의 저축과
            달리 위험보장과 저축을 겸비한 제도로 계약자가 납입한 보험료 중
            일부는 불의의 사고를 당한 다른 가입자에게 지급되는 보험금으로, 또
            다른 일부는 보험회사 운영에 필요한 경비로 사용되므로 중도해지 시
            지급되는 해약환급금은 납입한 보험료보다 적거나 없을 수도 있습니다.
          </li>
        </ol>
      ),
    },
    {
      title: "장애인전환특약에 관한 사항",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 소득세법에 따라 보장성보험
            계약 중 피보험자(또는 수익자)가 세법상 장애인에 해당하는 계약인 경우
            장애인전환특약을 통해 장애인전용보장성보험으로 전환되어 연말정산 시
            세제혜택이 가능합니다.
          </li>
          <div className="text_cont_box">
            <p className="tcb_p2">
              - 장애인 범위 : 장애인 등록자 외에도 국가유공자법상 상이자,
              항시치료가 필요한 중증환자 등 세법상 인적공제 대상 장애인은 모두
              포함
            </p>
            <p className="tcb_p2">
              - 필요서류(증빙자료) : 장애인등록증 등 장애인임을 확인할 수 있는
              자료
            </p>
          </div>
        </ol>
      ),
    },
    {
      title: "품질보증제도",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 보험가입 시 약관 및 청약서
            부본을 계약자에게 전달하지 않았거나, 약관의 중요 내용을 설명하지
            않았을 때, 청약서에 계약자가 자필서명 또는 날인하지 아니한 때
            계약성립일로부터 3개월 이내에 회사에 보험계약의 취소를 요구할 수
            있습니다.
          </li>
        </ol>
      ),
    },
    {
      title: "청약철회 청구제도",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 일반 금융소비자인 보험
            계약자는 보험증권을 받은 날부터 15일 이내(청약을 한 날부터 30일
            이내에 한함)에 청약을 철회할 수 있으며, 보험회사는 철회를 접수한
            날부터 3영업일 이내에 납입한 보험료 전액을 돌려 드립니다. 단, 아래의
            계약은 청약의 철회가 불가합니다.
          </li>
          <div className="text_cont_box">
            <p className="tcb_p2">- 전문금융소비자가 체결한 보험 계약</p>
            <p className="tcb_p2">- 청약일부터 30일 초과</p>{" "}
            <p className="tcb_p2">- 보험기간(보장기간)이 90일 이내인 계약</p>
          </div>
          <li>
            【전문금융소비자】 보험계약에 관한 전문성, 자산규모 등에 비추어
            보험계약에 따른 위험감수능력이 있는 자로서, 「금융소비자보호에 관한
            법률」 제2조제9호에서 정하는 전문금융소비자인 계약자를 말합니다.
          </li>
        </ol>
      ),
    },
    {
      title: "위법계약 해지권",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span> 계약자는 보험사가 설명의무
            등을 위반하여 계약을 체결한 경우 계약체결일부터 5년을 초과하지 않는
            범위 내에서 계약체결에 대한 회사의 위반사항을 안 날로부터 1년 이내에
            계약해지요구서에 위반한 사실을 입증하는 서류를 첨부하여 서면 등으로
            해당 계약의 해지를 요구할 수 있습니다.
          </li>
        </ol>
      ),
    },
    {
      title: "예금자보호 및 상담/분쟁/신고 안내",
      content: (
        <ol className="number" role="list">
          <li>
            <span className="item-number">01.</span>예금자 보호 안내
          </li>
          <div className="text_cont_box">
            <p className="tcb_p2">
              - 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시
              보험금)에 기타지급금을 합한 금액이 1인당 5천만원까지”(본
              보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본
              보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 "5천만원까지"
              보호됩니다. 다만, 보험계약자 및 보험료 납부자가 법인인 보험계약은
              예금자보호법에 따라 보호되지 않습니다.
            </p>
          </div>
          <li>
            <span className="item-number">02.</span>보험상담 및 분쟁해결 안내
          </li>
          <div className="text_cont_box">
            <p className="tcb_p2">
              보험에 관한 불만상담 및 분쟁이 있을 때에는 먼저 당사로 연락하시고,
              처리결과에 이의가 있으시면 민원 또는 분쟁조정 등을 신청하실 수
              있습니다. <br />
              하나손해보험 : 1566-3000,
              <a
                href="http://www.hanainsure.co.kr"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.hanainsure.co.kr{" "}
              </a>
            </p>
          </div>
          <li>
            <span className="item-number">03.</span>모집질서 확립 및 신고센터
            안내
          </li>
          <div className="text_cont_box">
            <p className="tcb_p2">
              보험계약과 관련한 보험모집질서 위반행위는 보험업법에 의해 처벌받을
              수 있습니다.
              <br />
              금융감독원 민원상담전화 : (국번없이)1332,{" "}
              <a
                href="http://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.fss.or.kr
              </a>
            </p>
          </div>
          <li>
            <span className="item-number">04.</span>금융감독원 보험 범죄
            신고센터 안내
          </li>
          <div className="text_cont_box">
            <p className="tcb_p2">
              금융감독원 민원상담전화 : (국번없이)1332,{" "}
              <a
                href="http://www.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.fss.or.kr
              </a>
            </p>
          </div>
        </ol>
      ),
    },
  ];
  return (
    <div className="insurance-detail-wrap">
      <div className="insurance-detail">
        <div className="section_box100" id="go_p2">
          <div className="product_title">
            <h2 role="heading" aria-level="2">
              <strong>{insuranceDetail.insuranceName}</strong>
            </h2>
          </div>
          <div className="base_box sel_tb">
            <h4 className="tcb_h1" role="heading" aria-level="4">
              상품안내
            </h4>
            <table className="fl base_tb sel_tb product_tb mt30">
              <colgroup>
                <col width="20%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row" className="row">
                    가입대상
                  </th>
                  <td className="tal">
                    <ul className="tcb_list1" role="list">
                      <li className="mt0">만19세 ~ 만69세</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="row">
                    보험기간
                  </th>
                  <td className="tal">
                    <ul className="tcb_list1" role="list">
                      <li className="mt0">최대 1년</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <ul className="txt_list_01 icon1" role="list">
                <li>
                  순수보장형 상품으로 만기환급금이 발생하지 않으며 해지 시
                  해약환급금이 없는 상품입니다.
                </li>
                <li>
                  국내 소재 18홀 이상을 보유한 골프장에서 발생된 사고에 대해서만
                  보장합니다.
                </li>
                <li>
                  보험기간 이전에 발생한 사고에 대해서는 보장이 제한됩니다.
                </li>
              </ul>
            </div>
          </div>

          <div className="text_cont_box">
            <h4 className="tcb_h1" role="heading" aria-level="4">
              보장내용
            </h4>
            <table className="fl base_tb sel_tb product_tb mt20">
              <colgroup>
                <col width="30%" />
                <col width="*" />
                <col width="13%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="col">
                    담보
                  </th>
                  <th scope="col" className="col">
                    보장내용
                  </th>
                  <th scope="col" className="col">
                    보험가입금액
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>골프중 상해사망</td>
                  <td className="tal">
                    피보험자가 골프 중 상해사고로 사망한 경우, 가입금액을 보험금
                    지급
                  </td>
                  <td className="tac" style={{ textAlign: "right" }}>
                    10,000만원
                  </td>
                </tr>
                <tr>
                  <td>골프중 상해후유장해</td>
                  <td className="tal">
                    피보험자가 골프 중 상해사고로 후유장해가 발생한 경우,
                    가입금액을 한도로 보험금으로 지급(3%~100%: 가입금액X지급률)
                  </td>
                  <td style={{ textAlign: "right" }}>10,000만원</td>
                </tr>
                <tr>
                  <td>골프중 배상책임</td>
                  <td className="tal">
                    피보험자가 골프 중 타인에게 손해를 끼쳐 법률상의 배상책임이
                    발생한 경우 가입금액을 한도로 보험금 지급 (자기부담금 2만원)
                  </td>
                  <td className="tac" style={{ textAlign: "right" }}>
                    2,000만원
                  </td>
                </tr>
                <tr>
                  <td>홀인원비용 (보험기간중 1회)</td>
                  <td className="tal">
                    피보험자가 골프경기 중 홀인원을 행한 경우, 최초 1회에 한하여
                    발생한 비용(증정용 기념품 구입, 축하회, 골프장 기념식수,
                    동반 캐디 축의금)을 가입금액 한도로 지급
                  </td>
                  <td className="tac" style={{ textAlign: "right" }}>
                    100만원
                  </td>
                </tr>
                <tr>
                  <td>교통상해 입원일당 (1일-180일 한도)</td>
                  <td className="tal">
                    피보험자가 교통상해로 입원하여 치료를 받은 경우, 입원 1일당
                    가입금액을 보험금으로 지급(다만, 교통상해입원일당의
                    지급일수는 1회 입원당 180일을 한도)
                  </td>
                  <td className="tac" style={{ textAlign: "right" }}>
                    2만원
                  </td>
                </tr>
                <tr>
                  <td>골절(치아파절제외) 진단비</td>
                  <td className="tal">
                    피보험자가 상해로 약관(골절(치아파절제외) 분류표)에서 정한
                    골절로 진단 확정된 경우 가입금액을 보험금으로 지급(다만,
                    동일한 상해를 직접적인 원인으로 복합골절 발생시 1회에 한하여
                    골절진단금 지급)
                  </td>
                  <td className="tac" style={{ textAlign: "right" }}>
                    30만원
                  </td>
                </tr>
                <tr>
                  <td>자동차사고 성형치료비</td>
                  <td className="tal">
                    피보험자가 자가용 자동차를 운전하던 중 발생한 급격하고
                    우연한 사고의 직접적인 결과로 외형상의 반흔, 추상장해,
                    신체의 기형, 기능장해가 발생하여 원상회복을 위해
                    사고일로부터 1년 이내에 성형외과 전문의로부터 성형수술을
                    받은 경우 가입금액을 보험금으로 지급
                  </td>
                  <td className="tac" style={{ textAlign: "right" }}>
                    100만원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4 className="tcb_h1" role="heading" aria-level="4">
            가입예시
          </h4>
          <div className="tab-container">
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === "1일" ? "active" : ""}`}
                onClick={() => handleTabClick("1일")}
              >
                1일
              </button>
              <button
                className={`tab-button ${activeTab === "1년" ? "active" : ""}`}
                onClick={() => handleTabClick("1년")}
              >
                1년
              </button>
            </div>

            {activeTab === "1일" && (
              <div className="text_cont_box">
                <p className="tcb_p2 tcb_icon1 f18">
                  <span className="neon_red pr15">보험기간 1일인 경우</span>
                </p>
                <table className="fl base_tb sel_tb product_tb mt15">
                  <colgroup>
                    <col width="75%" />
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" className="col">
                        담보명
                      </th>
                      <th scope="col" className="col">
                        홀인원
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">골프중 상해후유장해</td>
                      <td style={{ textAlign: "right" }}>10,000만원</td>
                    </tr>
                    <tr>
                      <td className="">골프중 배상책임</td>
                      <td style={{ textAlign: "right" }}>2,000만원</td>
                    </tr>
                    <tr>
                      <td className="">홀인원비용(보험기간중 1회)</td>
                      <td style={{ textAlign: "right" }}>100만원</td>
                    </tr>
                    <tr>
                      <td className="">교통상해 입원일당(1일~180일 한도)</td>
                      <td style={{ textAlign: "center" }}>-</td>
                    </tr>
                    <tr>
                      <td className="">골절(치아파절제외)진단비</td>
                      <td style={{ textAlign: "center" }}>-</td>
                    </tr>
                    <tr>
                      <td className="">자동차사고 성형치료비</td>
                      <td style={{ textAlign: "center" }}>-</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        className=""
                        style={{ borderTop: "3px double #bfbfbf" }}
                      >
                        총보험료
                      </td>
                      <td
                        style={{
                          borderTop: "3px double #bfbfbf",
                          textAlign: "right",
                        }}
                      >
                        2,500원
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {activeTab === "1년" && (
              <div className="text_cont_box">
                <p className="tcb_p2 tcb_icon1 f18">
                  <span className="neon_red pr15">보험기간 1년인 경우</span>
                </p>
                <table className="fl base_tb sel_tb product_tb mt15">
                  <colgroup>
                    <col width="50%" />
                    <col width="25%" />
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" className="col">
                        담보명
                      </th>
                      <th scope="col" className="col">
                        홀인원
                      </th>
                      <th scope="col" className="col">
                        종합형
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">골프중 상해사망</td>
                      <td style={{ textAlign: "right" }}>10,000만원</td>
                      <td style={{ textAlign: "right" }}>10,000만원</td>
                    </tr>
                    <tr>
                      <td className="">골프중 상해후유장해</td>
                      <td style={{ textAlign: "right" }}>10,000만원</td>
                      <td style={{ textAlign: "right" }}>10,000만원</td>
                    </tr>
                    <tr>
                      <td className="">골프중 배상책임</td>
                      <td style={{ textAlign: "right" }}>2,000만원</td>
                      <td style={{ textAlign: "right" }}>2,000만원</td>
                    </tr>
                    <tr>
                      <td className="">홀인원비용(보험기간중 1회)</td>
                      <td style={{ textAlign: "right" }}>100만원</td>
                      <td style={{ textAlign: "right" }}>100만원</td>
                    </tr>
                    <tr>
                      <td className="">교통상해 입원일당(1일~180일 한도)</td>
                      <td style={{ textAlign: "center" }}>-</td>
                      <td style={{ textAlign: "right" }}>2만원</td>
                    </tr>
                    <tr>
                      <td className="">골절(치아파절제외)진단비</td>
                      <td style={{ textAlign: "center" }}>-</td>
                      <td style={{ textAlign: "right" }}>30만원</td>
                    </tr>
                    <tr>
                      <td className="">자동차사고 성형치료비</td>
                      <td style={{ textAlign: "center" }}>-</td>
                      <td style={{ textAlign: "right" }}>100만원</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        className=""
                        style={{ borderTop: "3px double #bfbfbf" }}
                      >
                        총보험료
                      </td>
                      <td
                        style={{
                          borderTop: "3px double #bfbfbf",
                          textAlign: "right",
                        }}
                      >
                        55,450원
                      </td>
                      <td
                        style={{
                          borderTop: "3px double #bfbfbf",
                          textAlign: "right",
                        }}
                      >
                        63,020원
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          <div className="btn_box mb100">
            <a
              href="https://m.hanainsure.co.kr/download/prd?instype=15941&type=agree&spctype=0"
              className="btn btn_icon btn_arrow product_btn"
              id="lnk_agree"
              target="_blank"
              role="button"
            >
              보험약관
            </a>
            <button className="btn btn_enroll" onClick={handleEnrollClick}>
              가입하기
            </button>
          </div>
        </div>
      </div>
      <div className="acc_group product_accordion">
        <dl>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <dt
                className={`accordion-header ${
                  openIndexes.includes(index) ? "open" : ""
                }`}
                onClick={() => toggleDropdown(index)}
              >
                <a href="javascript:void(0);" role="link">
                  <strong>{item.title}</strong>
                </a>
                <span
                  className={`arrow ${
                    openIndexes.includes(index) ? "open" : ""
                  }`}
                ></span>
              </dt>
              <dd
                style={{
                  display: openIndexes.includes(index) ? "block" : "none",
                }}
              >
                {item.content}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
      {/* 가입 유형 선택 팝업 */}
      {showPopup && (
        <div className="popup-wrap move" style={{ height: "auto" }}>
          <div className="popup-header-detail">
            <div className="inner">
              <h2>가입 유형을 선택하세요</h2>
            </div>
            <button
              type="button"
              className="popup-close"
              onClick={handlePopupClose}
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="popup-content announcement-type">
            <div className="popup-inner">
              <ul className="popup-select-plan">
                <li className="type-oneday">
                  <div className="plan-content">
                    <div className="plan-text">
                      <p>
                        <b>
                          1일
                          <br />
                          원데이형
                        </b>
                      </p>
                      <button
                        type="button"
                        className="btn-floating btn-join"
                        onClick={() => handlePopupClick("Y")}
                      >
                        가입하기
                      </button>
                    </div>
                    <div className="popup-plan-image-wrap">
                      <img
                        src={oneday}
                        alt="원데이형"
                        className="popup-plan-image"
                      />
                    </div>
                  </div>
                </li>
                <li className="type-longterm">
                  <div className="plan-content">
                    <div className="plan-text">
                      <p>
                        <b>
                          1~12개월
                          <br />
                          선택형
                        </b>
                      </p>
                      <button
                        type="button"
                        className="btn-floating btn-join"
                        onClick={() => handlePopupClick("N")}
                      >
                        가입하기
                      </button>
                    </div>
                    <div className="popup-plan-image-wrap">
                      <img
                        src={longterm}
                        alt="선택형"
                        className="popup-plan-image"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <TopButton />
    </div>
  );
};

export default InsuranceDetail;
