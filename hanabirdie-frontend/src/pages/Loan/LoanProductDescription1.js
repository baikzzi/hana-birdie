import React, { useRef, useEffect, useState } from "react";
import "../../assets/css/Loan/LoanDetails.css";

const LoanDetails1 = () => {
  // 각 섹션에 대한 ref 생성
  const productInfoRef = useRef(null);
  const interestRateRef = useRef(null);
  const notesRef = useRef(null);
  const tabWrapRef = useRef(null); // 탭 메뉴에 대한 ref 생성

  // 고정 상태를 관리하기 위한 state
  const [isSticky, setIsSticky] = useState(false);
  const [tabWrapOffset, setTabWrapOffset] = useState(0); // 요소의 초기 위치 저장

  useEffect(() => {
    // tabWrap의 초기 top 위치를 저장
    if (tabWrapRef.current) {
      setTabWrapOffset(tabWrapRef.current.offsetTop);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤 위치에 따라 고정 여부 결정
      if (currentScrollY > tabWrapOffset && !isSticky) {
        setIsSticky(true); // 상단에 고정
      } else if (currentScrollY <= tabWrapOffset && isSticky) {
        setIsSticky(false); // 고정 해제
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky, tabWrapOffset]);

  // 스크롤 함수
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="loan-details">
      {/* Tab Menu */}
      <div
        className={`tabWrap prd ${isSticky ? "sticky" : ""}`}
        ref={tabWrapRef}
      >
        <ul className="tabMenu" role="tablist">
          <li className="on" role="tab" aria-selected="true">
            <button
              className={`tabButton`}
              onClick={(e) => {
                e.preventDefault(); // 기본 동작 막기
                scrollToSection(productInfoRef);
              }}
            >
              <span>상품안내</span>
            </button>
          </li>
          <li role="tab" aria-selected="false">
            <button
              className={`tabButton`}
              onClick={(e) => {
                e.preventDefault(); // 기본 동작 막기
                scrollToSection(interestRateRef);
              }}
            >
              <span>금리안내</span>
            </button>
          </li>
          <li role="tab" aria-selected="false">
            <button
              className={`tabButton`}
              onClick={(e) => {
                e.preventDefault(); // 기본 동작 막기
                scrollToSection(notesRef);
              }}
            >
              <span>유의사항 및 기타</span>
            </button>
          </li>
        </ul>
      </div>

      {/* 상품안내 섹션 */}
      <div className="loan-section" ref={productInfoRef}>
        <h3>대출대상</h3>
        <p>골프장의 예탁금을 하나은행에 맡긴 골프장 운영자</p>
      </div>

      {/* 금리안내 섹션 */}
      <div className="loan-section" ref={interestRateRef}>
        <h3>대출금리</h3>
        <p>회원의 예탁금을 담보로 대출할 경우 우대금리를 적용합니다.</p>
        <p>2024.06.04 기준</p>
        <table className="loan-table">
          <thead>
            <tr>
              <th colSpan="2">2024.06.04 기준</th>{" "}
              {/* 2024.06.04 기준이 2열을 차지 */}
              <th>기본금리</th>
              <th>가산금리</th>
              <th>우대금리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">예탁금담보 대출</td>{" "}
              {/* 예탁금담보 대출이 2행을 차지 */}
              <td>최저금리</td> {/* 최저금리가 한 행 차지 */}
              <td>3.61%</td>
              <td>2.03%</td>
              <td>5.64%</td>
            </tr>
            <tr>
              <td>최고금리</td> {/* 최고금리가 한 행 차지 */}
              <td>3.61%</td>
              <td>4.17%</td>
              <td>7.78%</td>
            </tr>
          </tbody>
        </table>

        <p>
          기준금리는 91일물 CD유통수익률을 기준으로 하며, 가산금리는 신용등급,
          대출기간 및 대출금액에 따라 달라질 수 있습니다.
        </p>
      </div>

      {/* 유의사항 및 기타 섹션 */}
      <div className="loan-section" ref={notesRef}>
        <h3>유의사항</h3>
        <p>대출한도는 은행이 정한 예탁금 담보 범위 내에서 정해집니다.</p>
        <p>
          대출금액의 최대 95%까지 가능하며, 실제 대출 가능 금액은 예탁금의
          평가에 따라 변동될 수 있습니다.
        </p>
        <p>
          연체이자율은 [대출이자율 + 연체가산이율(연 3%)], 최고 연 15%입니다.
        </p>
        <p>
          대출계약철회권, 금리인하요구권 및 위법계약해지권 등 관련 권리를 행사할
          수 있습니다. 자세한 사항은 은행 영업점에 문의해 주세요.
        </p>
      </div>
      {/* 금리안내 섹션 */}
      <div className="loan-section" ref={interestRateRef}>
        <h3>대출금리</h3>
        <p>대출금리 상세</p>
        <p>2022.04.25 기준</p>
        <table className="loan-table">
          <thead>
            <tr>
              <th colSpan="3">2022.04.25 기준</th>
              <th>기본금리</th>
              <th>기준금리</th>
              <th>가산금리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="4">운전/시설자금대출</td>
              <td rowSpan="2">운전자금</td>
              <td>최저금리(A1)</td>
              <td>6.135%</td>
              <td>2.965%</td>
              <td>3.17%</td>
            </tr>
            <tr>
              <td>취급가능등급 최고금리(B6)</td>
              <td>13%</td>
              <td>2.965%</td>
              <td>10.035%</td>
            </tr>
            <tr>
              <td rowSpan="2">시설자금</td>
              <td>최저금리(A1)</td>
              <td>5.785%</td>
              <td>2.965%</td>
              <td>2.82%</td>
            </tr>
            <tr>
              <td>취급가능등급 최고금리(B6)</td>
              <td>13%</td>
              <td>2.965%</td>
              <td>10.035%</td>
            </tr>
          </tbody>
        </table>
        <p>
          운전자금, 대출금액 1억, 대출기간 1년, 1년 고정금리 기준, 전액 신용,
          만기일시상환을 가정하여 산정한 것으로, 실제 대출 취급 시 대출 대상
          기업의 신용등급, 담보비율 등의 요소에 따라 달라질 수 있습니다
        </p>
        <p>기본금리 = 기준금리 + 가산금리</p>
        <p>
          기준금리는 CD 3개월물, 금융채 6개월, 금융채 1년, 단기 코픽스 금리,
          기간별 고정금리 중 선택 가능합니다
        </p>
        <p>
          가산금리는 신용등급, 대출기간, 담보, 대출금액 등에 따라
          차등적용됩니다.
        </p>
        <p>
          연체이자율은 [대출이자율+연체가산이율]로 적용 / 연체가산이율은 연 3%,
          연체이자율은 최고 연 15% 적용됩니다.
        </p>
        <p>
          대부업 등의 등록 및 금융이용자 보호에 관한 법률에 따른 법정최고금리는
          연 20%입니다.
        </p>
        <h3>대출한도</h3>
        <p>은행이 정한 운전자금 가용한도 범위 내</p>
        <p>※ 운전자금 가용한도 = 1회전 소요운전자금 – 금융기관 총차입액</p>
        <p>
          1회전 소요운전자금 = (연간 추정매출액 － 추정감가상각비) ×
          1회전기간/365
        </p>

        <h3>대출기간</h3>
        <p>일시상환 : 3년 이내</p>
        <p>분할상환 : 5년 이내</p>

        <h3>이자계산 방법</h3>
        <p>
          대출금에 연이율과 대출일수를 곱한 후 이를 365일(윤년인 경우 366일)로
          나누어 산출하되 원단위 미만은 절사
        </p>
        <p>
          원리금균등분할상환대출의 월별이자 계산은 대출원금에 연이율을 곱한 다음
          12로 나누어 계산
        </p>
        <p>
          일수계산은 여신당일로부터 기일 또는 상환일(일부상환 및 분할상환 포함)
          전일까지로 한다.(한편넣기)
        </p>
        <p>
          위 내용에도 불구하고 다음의 여신은 여신당일부터 기일 또는 상환일까지로
          한다.
        </p>
        <ul>
          <li>대출 당일에 회수되는 대출금</li>
          <li>
            대외기관으로부터 자금을 차입하는 대출금으로서 이자를 상환일까지
            지급하는 대출금
          </li>
          <li>연체기간이 1일인 연체대출채권 및 지급보증대지급금</li>
          <li>대여유가증권</li>
        </ul>
        <p>
          원금 균등분할상환대출 : 대출금액 x 대출이자율 x 이자일수 ÷ 365(윤년은
          366일)
        </p>

        <h3>원금 또는 이자의 상환시기 및 방법</h3>
        <p>
          건별대출(만기일시상환) : 원금은 만기에 일시상환, 이자는
          일정주기(매1개월 등) 단위로 납부
        </p>
        <p>
          분할상환대출 : 분할상환원금 및 이자를 일정주기(매1개월 등)단위로 납부
        </p>
        <p>
          대출실행 응당일/별도지정일에 대출금 입금계좌/자동등록계좌에서 자동이체
          처리
        </p>

        <h3>인지세</h3>
        <table className="loan-table">
          <thead>
            <tr>
              <th>대출금액</th>
              <th>인지세액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5천만원 이하</td>
              <td>비과세</td>
            </tr>
            <tr>
              <td>5천만원 초과 ~ 1억원 이하</td>
              <td>7만원</td>
            </tr>
            <tr>
              <td>1억원 초과 ~ 10억원 이하</td>
              <td>15만원</td>
            </tr>
            <tr>
              <td>10억원 초과</td>
              <td>35만원</td>
            </tr>
          </tbody>
        </table>

        <h3>시설자금대출</h3>
        <p>
          특정 재화나 서비스를 생산하기 위한 정상적인 영업활동에 사용할 목적으로
          직, 간접적으로 필요한 토지, 건물, 기계기구 등 물리적 형태가 있는
          자산의 매입, 임차, 신축, 증축, 개축 등을 하기 위한 기업
        </p>

        <h4>대출금리</h4>
        <table className="loan-table">
          <thead>
            <tr>
              <th colSpan="3">2021.05.11 기준</th>
              <th>기본금리</th>
              <th>기준금리</th>
              <th>가산금리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">운전/시설자금대출</td>
              <td rowSpan="2">시설자금</td>
              <td>최저금리(A1)</td>
              <td>4.210%</td>
              <td>1.400%</td>
              <td>2.810%</td>
            </tr>
            <tr>
              <td>취급가능등급 최고금리(B6)</td>
              <td>11.920%</td>
              <td>1.400%</td>
              <td>10.520%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 유의사항 및 기타 섹션 */}
      <div className="loan-section" ref={notesRef}>
        <h3>대출한도</h3>
        <p>당해 시설을 위한 총 소요자금의 80% 범위 내</p>
        <h3>대출기간</h3>
        <p>
          일시상환 : 1년 이내(단, 여신전결권자 인정시 3년 이내까지 일시 상환방식
          가능)
        </p>
        <p>
          분할상환 : 15년 이내(단, 업무용/상업용 부동산의 매입자금인 경우에는
          20년 이내)
        </p>
        <h3>대출관련비용</h3>
        <p>
          중도상환해약금 : 중도상환대출금액 X 중도상환해약금률 X 대출잔여일수 ÷
          대출기간
        </p>
        <p>※ 중도상환해약금률 : 부동삼담보 1.4%, 신용/기타대출 1.1%</p>
        <h3>인지세</h3>
        <table className="loan-table">
          <thead>
            <tr>
              <th>대출금액</th>
              <th>인지세액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5천만원 이하</td>
              <td>비과세</td>
            </tr>
            <tr>
              <td>5천만원 초과 ~ 1억원 이하</td>
              <td>7만원</td>
            </tr>
            <tr>
              <td>1억원 초과 ~ 10억원 이하</td>
              <td>15만원</td>
            </tr>
            <tr>
              <td>10억원 초과</td>
              <td>35만원</td>
            </tr>
          </tbody>
        </table>
        <h3>금리인하요구권</h3>
        <p>
          재무상태개선, 신용도상승 등에 따라 본인의 신용상태가 개선되었다고
          판단되는 경우, 증빙자료를 첨부한 금리인하신청서를 은행에 제출하여
          금리인하를 요구할 수 있습니다.
        </p>
        <h3>대출계약철회권</h3>
        <p>
          대출 실행일(대출금 수령일)로부터 14일(기간의 말일이 휴일인 경우 다음
          영업일)까지 은행에 서면, 전화, 컴퓨터 통신으로 철회의사를 표시하고
          원금, 이자 및 부대비용을 전액 반환한 경우 대출계약을 철회할 수
          있습니다.
        </p>
        <h3>위법계약해지권</h3>
        <p>
          은행이 금융소비자 보호법에서 정하는 적합성원칙, 적정성원칙 및
          설명의무를 위반하였거나, 불공정영업행위 혹은 부당권유행위를 하여
          대출계약을 체결한 경우, 법 위반사실을 안 날부터 1년(계약체결일로부터
          5년 이내) 이내에 해당 계약의 해지를 요구할 수 있습니다.
        </p>
        <div className="loan-section" ref={notesRef}>
          <h3>유의사항</h3>
          <p>
            손님의 신용도에 따라 대출한도, 대출금리가 차등 적용되며 대출취급이
            제한될 수 있습니다.
          </p>
          <p>
            대출거래약정서에 별도로 정한 바가 없을 경우 대출만기 도래 시
            채무자의 신청 및 은행 내규 등에 따라 만기연장 여부가 결정되며,
            만기연장 조치 없이 대출금액을 상환하지 않을 경우에는 연체이자가
            부과되며 채무자의 재산/신용상의 불이익(압류, 경매 등)이 발생할 수
            있으니 주의하시기 바랍니다.
          </p>
          <p>
            금리인하요구권 등 상품관련 자세한 사항은 상품설명서를 참조하시거나
            하나은행 고객센터(1599-1111) 또는 영업점으로 문의하시기 바랍니다.
          </p>
          <p>
            이 금융상품을 가입(계약)하시기 전에 ‘금융상품 설명서‘ 및 ‘약관’을
            반드시 읽어보시기 바랍니다.
          </p>
          <p>
            이 금융상품을 가입(계약)하시는 경우 금융소비자보호법 제19조 제1항에
            따라 상품에 관한 중요한 사항을 설명 받으실 수 있습니다.
          </p>
        </div>
        <div className="loan-changes">
          <h3>상품내용 변경에 관한 사항</h3>

          {/* 금리인하요구권 */}
          <div className="loan-section">
            <h4>&lt;금리인하요구권&gt;</h4>
            <p>기존가입고객 적용여부 : 적용</p>
            <p>
              변경 전 : 금리인하요구권대상여부 : 본 상품은 금리인하요구권의
              신청이 가능합니다
            </p>
            <p>변경 후 : 금리인하요구권</p>
            <ul>
              <li>
                재무상태개선, 신용도상승 등에 따라 본인의 신용상태가
                개선되었다고 판단되는 경우, 증빙자료를 첨부한 금리인하신청서를
                은행에 제출하여 금리인하를 요구할 수 있습니다.
              </li>
              <li>
                금리인하 요구를 받은 날부터 10영업일 이내에 금리인하 요구 수용
                여부를 통지해 드립니다.
              </li>
              <li>
                신용상태가 금리에 영향을 미치지 않는 상품은 금리인하요구
                대상에서 제외되며, 은행의 심사결과에 따라 금리인하가 수용되지
                않을 수 있습니다.
              </li>
            </ul>
          </div>

          {/* 대출계약철회권 */}
          <div className="loan-section">
            <h4>&lt;대출계약철회권&gt;</h4>
            <p>기존가입고객 적용여부 : 적용</p>
            <p>변경 전 : 신설</p>
            <p>변경 후 :</p>
            <ul>
              <li>
                대출 실행일(대출금 수령일)로부터 14일(기간의 말일이 휴일인 경우
                다음 영업일)까지 은행에 서면, 전화, 컴퓨터 통신으로 철회의사를
                표시하고 원금, 이자 및 부대비용을 전액 반환한 경우 대출계약을
                철회할 수 있습니다.
              </li>
              <li>
                대출계약철회권 남용 시 불이익: 당행에서 최근 1개월 내에 2회 이상
                대출계약을 철회하는 경우 신규대출·만기연장 거절, 대출한도 축소,
                금리우대 제한 등 불이익이 발생할 수 있습니다.
              </li>
            </ul>
          </div>

          {/* 위법계약해지권 */}
          <div className="loan-section">
            <h4>&lt;위법계약해지권&gt;</h4>
            <p>기존가입고객 적용여부 : 미적용</p>
            <p>변경 전 : 신설</p>
            <p>변경 후 :</p>
            <ul>
              <li>
                은행이 『금융소비자 보호에 관한 법률』에서 정하는 적합성원칙,
                적정성원칙 및 설명의무를 위반하였거나, 불공정영업행위 혹은
                부당권유행위를 하여 대출계약을 체결한 경우, ‘법 위반사실을 안
                날’부터 1년(계약체결일로부터 5년 이내의 범위에 있어야
                합니다.)이내에 해당 계약의 해지를 요구할 수 있습니다.
              </li>
              <li>
                은행은 해지를 요구받은 날부터 10일 이내에 고객에게 수락여부를
                통지하며, 거절할 때에는 그 사유를 함께 통지합니다.
              </li>
            </ul>
          </div>

          {/* 중도상환해약금율 변경 */}
          <div className="loan-section">
            <h4>상품내용 변경에 관한 사항 (2019.04.17 변경)</h4>
            <ul>
              <li>변경 전 : 부동산담보:1.4%, 신용/기타담보 1.1%</li>
              <li>변경 후 :</li>
              <ul>
                <li>부동산담보:고정금리시 1.4% 변동금리시 1.2%</li>
                <li>신용/기타담보:고정금리시 1.1% 변동금리시 1.0%</li>
              </ul>
            </ul>
          </div>

          {/* 분할상환 변경 */}
          <div className="loan-section">
            <h4>상품내용 변경에 관한 사항 (2017.02.16 변경)</h4>
            <ul>
              <li>
                변경 전 : 분할상환 : 10년 이내(단, 업무용/상업용 부동산의
                매입자금인 경우에는 20년 이내)
              </li>
              <li>
                변경 후 : 분할상환 : 15년 이내(단, 업무용/상업용 부동산의
                매입자금인 경우에는 20년 이내)
              </li>
            </ul>
          </div>
        </div>
        <div className="loan-changes-table">
          <h3>상품내용 변경에 관한 사항</h3>
          <table className="loan-table">
            <thead>
              <tr>
                <th>변경 사항</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>상품내용 변경에 관한 사항 (2021.03.25 변경)</td>
                <td>
                  <strong>&lt;금리인하요구권&gt;</strong>
                  <br />
                  기존가입고객 적용여부 : 적용
                  <br />
                  변경 전 : 금리인하요구권대상여부 : 본 상품은 금리인하요구권의
                  신청이 가능합니다
                  <br />
                  변경 후 : 금리인하요구권
                  <br />
                  재무상태개선, 신용도상승 등에 따라 본인의 신용상태가
                  개선되었다고 판단되는 경우, 증빙자료를 첨부한 금리인하신청서를
                  은행에 제출하여 금리인하를 요구할 수 있습니다.
                  <br />
                  금리인하 요구를 받은 날부터 10영업일 이내에 금리인하 요구 수용
                  여부를 통지해 드립니다.
                  <br />
                  신용상태가 금리에 영향을 미치지 않는 상품은 금리인하요구
                  대상에서 제외되며, 은행의 심사결과에 따라 금리인하가 수용되지
                  않을 수 있습니다.
                  <br />
                  <strong>&lt;대출계약철회권&gt;</strong>
                  <br />
                  기존가입고객 적용여부 : 적용
                  <br />
                  변경 전 : 신설
                  <br />
                  변경 후 :<br />
                  대출 실행일(대출금 수령일)로부터 14일(기간의 말일이 휴일인
                  경우 다음 영업일)까지 은행에 서면, 전화, 컴퓨터 통신으로
                  철회의사를 표시하고 원금, 이자 및 부대비용을 전액 반환한 경우
                  대출계약을 철회할 수 있습니다.
                  <br />
                  대출계약철회권 남용 시 불이익: 당행에서 최근 1개월 내에 2회
                  이상 대출계약을 철회하는 경우 신규대출·만기연장 거절, 대출한도
                  축소, 금리우대 제한 등 불이익이 발생할 수 있습니다.
                  <br />
                  <strong>&lt;위법계약해지권&gt;</strong>
                  <br />
                  기존가입고객 적용여부 : 미적용
                  <br />
                  변경 전 : 신설
                  <br />
                  변경 후 :<br />
                  은행이 『금융소비자 보호에 관한 법률』에서 정하는 적합성원칙,
                  적정성원칙 및 설명의무를 위반하였거나, 불공정영업행위 혹은
                  부당권유행위를 하여 대출계약을 체결한 경우, ‘법 위반사실을 안
                  날’부터 1년(계약체결일로부터 5년 이내의 범위에 있어야
                  합니다.)이내에 해당 계약의 해지를 요구할 수 있습니다.
                  <br />
                  은행은 해지를 요구받은 날부터 10일 이내에 고객에게 수락여부를
                  통지하며, 거절할 때에는 그 사유를 함께 통지합니다.
                </td>
              </tr>
              <tr>
                <td>상품내용 변경에 관한 사항 (2019.04.17 변경)</td>
                <td>
                  <strong>&lt;중도상환해약금율 변경&gt;</strong>
                  <br />
                  변경 전 : 부동산담보:1.4%, 신용/기타담보 1.1%
                  <br />
                  변경 후 :<br />
                  부동산담보:고정금리시 1.4% 변동금리시 1.2%
                  <br />
                  신용/기타담보:고정금리시 1.1% 변동금리시 1.0%
                </td>
              </tr>
              <tr>
                <td>상품내용 변경에 관한 사항 (2017.02.16 변경)</td>
                <td>
                  <strong>&lt;분할상환 변경&gt;</strong>
                  <br />
                  변경 전 : 분할상환 : 10년 이내(단, 업무용/상업용 부동산의
                  매입자금인 경우에는 20년 이내)
                  <br />
                  변경 후 : 분할상환 : 15년 이내(단, 업무용/상업용 부동산의
                  매입자금인 경우에는 20년 이내)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails1;
