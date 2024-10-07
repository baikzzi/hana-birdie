import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Insurance/Insurance.css";
import allInOne from "../../assets/png/insurance-icon/allInOne.png";
import holeInOne from "../../assets/png/insurance-icon/holeInOne.png";
import wound from "../../assets/png/insurance-icon/wound.png";
import daily from "../../assets/png/insurance-icon/daily.png";
import counselor from "../../assets/png/counselor.png";

const golfInsuranceCategories = [
  {
    category: "allInOne",
    name: "#올인원",
    icon: allInOne,
    alt: "올인원",
  },
  {
    category: "daily",
    name: "#데일리",
    icon: daily,
    alt: "데일리보험",
  },
  {
    category: "holeInOne",
    name: "#홀인원",
    icon: holeInOne,
    alt: "홀인원",
  },
  {
    category: "wound",
    name: "#상해",
    icon: wound,
    alt: "상해",
  },
];

function InsuranceOptions() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/insurance/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedProducts = data.map((product) => {
          const tags = product.tag.split(",");
          return {
            ...product,
            daily: tags.includes("#데일리"),
            holeInOne: tags.includes("#홀인원"),
            allInOne: tags.includes("#올인원"),
            wound: tags.includes("#상해"),
          };
        });
        setProducts(
          updatedProducts.sort(
            (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
          )
        );
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const mostRecentProduct = products[0];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "") {
      return true;
    }
    return product[selectedCategory];
  });

  const handleCardClick = (insuranceId) => {
    fetch("http://localhost:8080/api/v1/insurance/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ insuranceId }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/insuranceDetail", { state: { insuranceDetail: data } });
      })
      .catch((error) =>
        console.error("Error fetching insurance detail:", error)
      );
  };

  return (
    <section className="insurance-section">
      <header className="insurance-section-header">
        <h2 className="title">어떤 보험상품이 필요하세요?</h2>
        <p className="coverage">
          하나버디의 다양한 골프 보험 상품을 확인해보세요.
        </p>
      </header>

      <nav className="product-navigation">
        <ul className="product-list">
          {golfInsuranceCategories.map((category, index) => (
            <li key={index}>
              <a
                className={`product-item ${
                  selectedCategory === category.category ? "active" : ""
                }`}
                aria-selected={
                  selectedCategory === category.category ? "true" : "false"
                }
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory((prevCategory) =>
                    prevCategory === category.category ? "" : category.category
                  );
                }}
              >
                <i className="icon">
                  <img src={category.icon} alt={category.alt} />
                </i>
                <span className="name">
                  <strong>{category.name}</strong>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="product-cards">
        {filteredProducts.map((product, index) => (
          <article
            className="product-card"
            key={index}
            onClick={() => handleCardClick(product.insuranceId)}
          >
            <header className="card-header">
              <div className="tag-group">
                {product.daily && <span className="tag daily">데일리</span>}
                {product.allInOne && <span className="tag">올인원</span>}
                {product.holeInOne && <span className="tag">홀인원</span>}
                {product.wound && <span className="tag">상해</span>}
                {product === mostRecentProduct && (
                  <span className="tag new">NEW</span>
                )}
              </div>
            </header>
            <div className="card-body">
              <h3 className="card-title">{product.insuranceName}</h3>
              <p className="coverage">{product.coverage}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="product-inquiry">
        <div className="inquiry-image">
          <img alt="" loading="lazy" decoding="async" src={counselor} />
        </div>
        <div className="inquiry-body">
          <h3 className="title">찾으시는 상품이 없나요?</h3>
          <p className="coverage">고객님께 딱 맞는 상품을 알려드릴게요.</p>
        </div>
        <div className="inquiry-button">
          <a
            href="/app/cs/counsel/?category=product"
            role="button"
            className="button"
          >
            상품 문의하기
          </a>
        </div>
      </section>
    </section>
  );
}

export default InsuranceOptions;
