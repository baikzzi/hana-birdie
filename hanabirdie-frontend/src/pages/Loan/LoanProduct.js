import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate 훅을 import
import "../../assets/css/Loan/LoanProduct.css";
import TopButton from "../../components/Top/TopButton";
import loanIcon1 from "../../assets/png/loanIcon1.png";
import loanIcon2 from "../../assets/png/loanIcon2.png";
import loanIcon3 from "../../assets/png/loanIcon3.png";
import loanIcon4 from "../../assets/png/loanIcon4.png";

const sampleLoanProducts = [
  {
    loanProductId: "LN_0001",
    loanName: "하나버디 예탁금 담보 대출",
    description:
      "회원의 예탁금을 하나은행에 보관하는 골프장 운영자를 대상으로 대출 금리를 우대",
    flags: ["기업대출", "예탁금담보"],
  },
  {
    loanProductId: "LN_0002",
    loanName: "하나다이렉트 수출보증대출",
    description:
      "법인대상 무역보험공사 보증을 담보로 대출해 드리는 상품 (무역보험공사 보증서 담보)",
    flags: ["기업대출", "인터넷"],
  },
  {
    loanProductId: "LN_0003",
    loanName: "운전/시설자금대출",
    description:
      "회원의 예기업의 판매활동과 운영활동에 필요한 자금을 위한 상품 / 시설의 확장 또는 구입에 필요한 상품탁금을 하나은행에 맡기고 대출 금리를 우대",
    flags: ["기업대출", "영업점전용", "운영자금"],
  },
  {
    loanProductId: "LN_0004",
    loanName: "소상공인 저금리대환대출(수탁보증)",
    description:
      "소상공인의 금융권 고금리 대출을 저금리로 대환해 드리는 상품 (신용보증기금 보증서 담보)",
    flags: ["기업대출", "영업점", "스마트폰"],
  },
  {
    loanProductId: "LN_0005",
    loanName: "트러스트온 보증 대출(신용보증기금)",
    description:
      "기업 경영활동에 필요한 물품구매, 인건비, 임차료 지급 등의 자금집행을 지원하는 회전성 운전자금 대출상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0006",
    loanName: "클린플러스 보증 대출(기술보증기금)",
    description:
      "기업 경영활동에 필요한 물품구매, 인건비, 임차료 지급 등의 자금집행을 지원하는 회전성 운전자금 대출상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0007",
    loanName: "재정기금대출",
    description:
      "정부, 지자체, 공공기관 등 정책자금운용기관이 정책목적에 부응하는 사업을 영위하는 기업을 지원하는 대출상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0008",
    loanName: "이차보전대출",
    description:
      "지방자치단체 등이 은행 대출금리의 일부를 이차보전 금으로 지급하면 그 이차보전율만큼 대출금리를 낮게 대출하는 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0009",
    loanName: "한국은행 금융중개지원대출관련신성장·일자리지원 프로그램",
    description:
      "중소기업 (개인사업자 포함)에 대한 신성장·일자리지원을 위한 대출 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0010",
    loanName: "당좌대출",
    description:
      "당좌예금 잔액을 초과하여 발행한 수표, 약속어음을 일정 금액까지 대출해 드리는 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0011",
    loanName: "사모전환사채인수",
    description:
      "기업이 사모방식으로 발행하는 전환사채를 은행이 전액 인수하여 자금을 지원하는 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0012",
    loanName: "상업어음할인",
    description:
      "재화 및 용역의 거래에 수반하여 발행된 어음을 은행이 매입하는 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0013",
    loanName: "수요자금융",
    description:
      "일반소비재 또는 산업용 기자재, 부품 및 원자재를 구입하는 최종수요자에게 대출을 취급하는 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0014",
    loanName: "온렌딩(on-lending)대출",
    description:
      "중소기업 금융지원 및 미래 성장동력 확충을 위해 산업은행이 자금을 공급하는 대출 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0015",
    loanName: "외화대출",
    description:
      "기업이 필요로 하는 운전자금, 수입자금, 시설자금을 외화로 지원하는 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0016",
    loanName: "하나 솔라론",
    description: "태양광발전소를 건설하는 발전사업자에게 시설자금을 지원",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0017",
    loanName: "하나기업 종합통장 대출",
    description:
      "마이너스 대출한도를 정하여 그 범위 내에서 자유롭게 대출을 사용하고 상환하는 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0018",
    loanName: "하나마스터스오토대출",
    description:
      "법인 및 개인사업자인 정비업소 전용 대출상품으로 대출한도 우대",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0019",
    loanName: "하나미션클럽대출",
    description:
      "중·대형 규모의 기독교 개신교회를 대상으로 교회시설 부동산의 매입, 신축 등을 위한 자금지원",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0020",
    loanName: "CP매입(기타어음할인)",
    description: "기업의 자금융통을 목적으로 발행하는 CP를 매입하는 상품",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0021",
    loanName: "무역금융",
    description: "수출업체에 원자재 및 완제품 구매를 위한 자금을 지원",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0022",
    loanName: "상생협력 기업대출",
    description:
      "대기업의 예금이자 절감분을 협력 중소기업에 대한 대출 시 금리 감면",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0023",
    loanName: "클러스터 기업대출",
    description:
      "클러스터 지역 내 부동산을 매입하거나 분양받은 기업에게 자금을 지원",
    flags: ["기업대출", "영업점 전용"],
  },
  {
    loanProductId: "LN_0024",
    loanName: "하나 주거래 사업자 우대 대출",
    description:
      "하나은행을 주거래은행으로 사용하는 사업자에 대한 시설자금 및 운전자금 지원",
    flags: ["기업대출", "영업점 전용"],
  },
];

const LoanProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(sampleLoanProducts);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation(); // useLocation 훅으로 상태 값 받기
  const searchButtonRef = useRef(null); // 검색 버튼을 참조하기 위한 ref

  useEffect(() => {
    // 만약 location.state에 검색어가 있다면 searchTerm에 반영
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state]);

  useEffect(() => {
    if (searchTerm) {
      // 검색어가 있을 때, 버튼을 자동으로 클릭
      if (searchButtonRef.current) {
        searchButtonRef.current.click();
      }
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredProducts(sampleLoanProducts);
      return;
    }

    // Perform case-insensitive search
    const lowerCaseTerm = searchTerm.toLowerCase();

    const filtered = sampleLoanProducts.filter((product) => {
      const loanNameMatch = product.loanName
        .toLowerCase()
        .includes(lowerCaseTerm);
      const descriptionMatch = product.description
        .toLowerCase()
        .includes(lowerCaseTerm);
      const flagsMatch = product.flags.some((flag) =>
        flag.toLowerCase().includes(lowerCaseTerm)
      );
      return loanNameMatch || descriptionMatch || flagsMatch;
    });

    if (filtered.length > 0) {
      setFilteredProducts(filtered);
    } else {
      // alert("검색 결과가 없습니다.");
      setFilteredProducts([]); // Optionally, clear the list if no results
    }
  };

  // 리스트 클릭 시 searchTerm을 업데이트하고 검색 수행
  const handleListItemClick = (e) => {
    const value = e.currentTarget.getAttribute("data-value");
    setSearchTerm(value);

    // Perform search with the selected keyword
    const lowerCaseTerm = value.toLowerCase();

    const filtered = sampleLoanProducts.filter((product) => {
      const loanNameMatch = product.loanName
        .toLowerCase()
        .includes(lowerCaseTerm);
      const descriptionMatch = product.description
        .toLowerCase()
        .includes(lowerCaseTerm);
      const flagsMatch = product.flags.some((flag) =>
        flag.toLowerCase().includes(lowerCaseTerm)
      );
      return loanNameMatch || descriptionMatch || flagsMatch;
    });

    setFilteredProducts(filtered);
  };

  // 키워드 버튼 클릭 시 searchTerm을 업데이트하고 검색 수행
  const handleKeywordClick = (value) => {
    setSearchTerm(value);

    // Perform search with the selected keyword
    const lowerCaseTerm = value.toLowerCase();

    const filtered = sampleLoanProducts.filter((product) => {
      const loanNameMatch = product.loanName
        .toLowerCase()
        .includes(lowerCaseTerm);
      const descriptionMatch = product.description
        .toLowerCase()
        .includes(lowerCaseTerm);
      const flagsMatch = product.flags.some((flag) =>
        flag.toLowerCase().includes(lowerCaseTerm)
      );
      return loanNameMatch || descriptionMatch || flagsMatch;
    });

    setFilteredProducts(filtered);
  };

  // 상품 클릭 시 loanProductId에 따라 페이지 이동
  const handleProductClick = (loanProductId) => {
    if (loanProductId === 1) {
      navigate("/loanProductDetail1"); // loanProductId가 1이면 해당 경로로 이동
    } else {
      navigate("/loanProductDetail2"); // loanProductId가 1이 아니면 다른 경로로 이동
    }
  };

  return (
    <div className="loanProduct-wrap">
      <div
        className="loan-search-container"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <h2 className="section-title loan-title">하나버디 대출 상품</h2>
        <div className="loan-inquiry-product-container">
          <div className="loan-theme">
            <ul className="loan-theme-list mt-36">
              <li>
                <a
                  className="none"
                  title="예탁금 담보 대출 보러가기"
                  data-value="예탁금담보"
                  onClick={handleListItemClick}
                >
                  <div className="loan-item">
                    <img src={loanIcon1} alt="예탁금 담보 대출" />
                    <span className="loan-body med">#예탁금담보</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  className="none"
                  title="신용 대출 보러가기"
                  data-value="신용"
                  onClick={handleListItemClick}
                >
                  <div className="loan-item">
                    <img src={loanIcon2} alt="신용 대출" />
                    <span className="loan-body med">#신용</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  className="none"
                  title="주거래 하나 대상 대출"
                  data-value="주거래"
                  onClick={handleListItemClick}
                >
                  <div className="loan-item">
                    <img
                      src={loanIcon3}
                      alt="주거래 하나 대출"
                      style={{
                        width: "75px",
                        height: "55px",
                        paddingTop: "13px",
                        marginBottom: "12px",
                      }}
                    />
                    <span className="loan-body med">#주거래하나</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  className="none"
                  title="윤영자금 대출 보러가기"
                  data-value="운영자금"
                  onClick={handleListItemClick}
                >
                  <div className="loan-item">
                    <img src={loanIcon4} alt="운영자금 대출" />
                    <span className="loan-body med">#운영자금</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="loan-search-product">
            <div className="loan-search-product-form">
              <form className="loan-search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="loan-search-input body01 med"
                  placeholder="찾으시는 대출 상품을 검색해보세요."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="loan-search-btn"
                  ref={searchButtonRef} // 버튼을 ref로 연결
                >
                  <span className="material-symbols-outlined">search</span>
                </button>
              </form>
            </div>
            <div className="loan-keyword pc_only">
              <div className="loan-keyword-wrap body02 med gray02">
                <button
                  className="loan-btn-keyword"
                  data-value="예탁금"
                  title="예탁금 담보 대출로 검색"
                  onClick={() => handleKeywordClick("예탁금")}
                >
                  #예탁금
                </button>
                <button
                  className="loan-btn-keyword"
                  data-value="수출보증"
                  title="수출보증 대출로 검색"
                  onClick={() => handleKeywordClick("수출보증")}
                >
                  #소상공인
                </button>
                <button
                  className="loan-btn-keyword"
                  data-value="소상공인"
                  title="소상공인 대출로 검색"
                  onClick={() => handleKeywordClick("소상공인")}
                >
                  #운전자금
                </button>
                <button
                  className="loan-btn-keyword"
                  data-value="저금리대환"
                  title="저금리 대환 대출로 검색"
                  onClick={() => handleKeywordClick("저금리대환")}
                >
                  #저금리대환
                </button>
                <button
                  className="loan-btn-keyword"
                  data-value="신용보증"
                  title="신용보증 대출로 검색"
                  onClick={() => handleKeywordClick("신용보증")}
                >
                  #신용보증
                </button>
              </div>
            </div>
          </div>
          {/* 대출 상품 목록 */}
          <div className="loanProductList">
            <p className="prdInfo">
              총 <strong>{filteredProducts.length}</strong>개의{" "}
              <span>기업대출</span> 상품이 있어요
            </p>

            {filteredProducts.length > 0 ? (
              <ul className="prdList">
                {filteredProducts.map((product) => (
                  <li
                    className="prdItem"
                    key={product.loanProductId}
                    onClick={() => handleProductClick(product.loanProductId)} // 클릭 시 이동 처리
                  >
                    <a
                      href="#"
                      className="prdBox"
                      title="자세히보기"
                      onClick={(e) => {
                        e.preventDefault(); // 기본 a 태그 동작 막기
                        handleProductClick(product.loanProductId); // 클릭 시 이동 처리
                      }}
                    >
                      <div className="prdContent">
                        <div className="prdTop">
                          <div className="prdFlags">
                            {product.flags.map((flag, index) => (
                              <span className="prdFlag" key={index}>
                                {flag}
                              </span>
                            ))}
                          </div>
                          <p className="prdTitle">{product.loanName}</p>
                          <p className="prdDescription">
                            {product.description}
                          </p>
                        </div>
                        <div className="prdBottom">
                          <div className="prdMore">
                            <p>자세히보기</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="noResults">검색에 해당하는 상품이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <TopButton />
    </div>
  );
};

export default LoanProduct;
