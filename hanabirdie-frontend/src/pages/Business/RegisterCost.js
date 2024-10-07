import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/Business/RegisterCost.css";
import { message } from "antd";

// 숫자에 1000단위 쉼표를 추가하는 함수
const formatNumberWithCommas = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 쉼표를 제거한 숫자 값 반환 함수
const removeCommas = (num) => {
  return num.toString().replace(/,/g, "");
};

const RegisterCost = () => {
  const [revenueList, setRevenueList] = useState([
    {
      transactionId: "",
      transactionDate: "",
      transactionType: "수입",
      transactionCategory: "",
      description: "",
      amount: "",
      isLocked: false,
    },
  ]);

  const [expenseList, setExpenseList] = useState([
    {
      transactionId: "",
      transactionDate: "",
      transactionType: "지출",
      transactionCategory: "",
      description: "",
      amount: "",
      isLocked: false,
    },
  ]);

  const todayDate = new Date().toISOString().split("T")[0];

  const revenueOptions = {
    영업수익: [
      "개서료",
      "골프용품판매",
      "골프장이용료",
      "공사수입",
      "기계이용료",
      "기타수익",
      "대여료",
      "세탁수입",
      "스포츠시설이용수입",
      "식음료",
      "연습장수입",
      "임대매출",
      "호텔이용수입",
    ],
    기타수익: [
      "배당금수익",
      "수수료수익",
      "위약금",
      "유형자산처분이익",
      "이자수익",
      "임대료",
      "자산수증이익",
      "잡이익",
    ],
  };

  const expenseOptions = {
    인건비: ["급여", "퇴직급여", "복리후생비", "잡급"],
    운영비용: [
      "감가상각비",
      "공사원가",
      "광고선전비",
      "교육훈련비",
      "대여원가",
      "도서인쇄비",
      "리스료",
      "무형자산상각비",
      "보험료",
      "사무용품비",
      "상품매출원가",
      "세금과공과",
      "세탁원가",
      "소모품비",
      "수선비",
      "스포츠시설이용원가",
      "식음료매출원가",
      "여비교통비",
      "연습장원가",
      "운반비",
      "전력비",
      "지급수수료",
      "지급임차료",
      "차량유지비",
      "코스관리비",
      "통신비",
      "판매촉진비",
      "협회비",
      "호텔이용원가",
    ],
    영업외비용: [
      "기부금",
      "기타의대손상각비",
      "매도가능증권처분손실",
      "보상비",
      "유형자산처분손실",
      "잡손실",
    ],
  };

  const addRevenueRow = () => {
    setRevenueList([
      ...revenueList,
      {
        transactionDate: todayDate,
        transactionType: "수입",
        transactionCategory: "",
        description: "",
        amount: "",
        isLocked: false,
      },
    ]);
  };

  const addExpenseRow = () => {
    setExpenseList([
      ...expenseList,
      {
        transactionDate: todayDate,
        transactionType: "지출",
        transactionCategory: "",
        description: "",
        amount: "",
        isLocked: false,
      },
    ]);
  };

  const removeRevenueRow = (index) => {
    const newList = revenueList.filter((_, i) => i !== index);
    setRevenueList(newList);
  };

  const removeExpenseRow = (index) => {
    const newList = expenseList.filter((_, i) => i !== index);
    setExpenseList(newList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasEmptyFields = (list) =>
      list.some(
        (item) =>
          !item.transactionDate ||
          !item.transactionCategory ||
          !item.description ||
          !item.amount
      );

    if (hasEmptyFields(revenueList) || hasEmptyFields(expenseList)) {
      message.info("채워지지 않은 필드가 있습니다. 모든 필드를 채워주세요.");
      return;
    }

    const unlockedRevenueList = revenueList.filter((item) => !item.isLocked);
    const unlockedExpenseList = expenseList.filter((item) => !item.isLocked);

    const combinedList = [...unlockedRevenueList, ...unlockedExpenseList].map(
      (item) => ({
        golfCourseId: 10002,
        transactionDate: item.transactionDate,
        transactionType: item.transactionType,
        transactionCategory: item.transactionCategory,
        description: item.description,
        amount: parseInt(removeCommas(item.amount), 10), // 쉼표 제거 후 저장
      })
    );
    console.log(combinedList);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/business/registerCost",
        combinedList
      );

      console.log("API Response:", response.data);

      setRevenueList(revenueList.map((item) => ({ ...item, isLocked: true })));
      setExpenseList(expenseList.map((item) => ({ ...item, isLocked: true })));

      message.success("등록 완료되었습니다!");
    } catch (error) {
      console.error("Error occurred while sending data:", error);
      message.error("등록 중 에러가 발생했습니다.");
    }
  };

  const handleAmountChange = (type, index, value) => {
    const cleanValue = removeCommas(value);
    const updatedList =
      type === "revenue" ? [...revenueList] : [...expenseList];
    updatedList[index].amount = cleanValue;

    if (type === "revenue") {
      setRevenueList(updatedList);
    } else {
      setExpenseList(updatedList);
    }
  };

  return (
    <form className="register-cost-form" onSubmit={handleSubmit}>
      <h2 className="register-cost-title">매출 및 비용 등록</h2>

      <div className="section-divider"></div>

      {/* 매출 입력 */}
      <div className="register-cost-section">
        <div className="register-cost-section-header">
          <h4 className="register-cost-section-title">매출</h4>
          <button
            type="button"
            className="register-cost-add-btn"
            onClick={addRevenueRow}
          >
            매출 행 추가
          </button>
        </div>
        <table className="register-cost-table">
          <thead>
            <tr>
              <th>일자</th>
              <th>카테고리</th>
              <th>설명</th>
              <th>금액</th>
              <th className="delete-column">삭제</th>
            </tr>
          </thead>
          <tbody>
            {revenueList.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="date"
                    value={item.transactionDate}
                    onChange={(e) => {
                      const newList = [...revenueList];
                      newList[index].transactionDate = e.target.value;
                      setRevenueList(newList);
                    }}
                    disabled={item.isLocked}
                  />
                </td>
                <td>
                  <select
                    value={item.transactionCategory}
                    onChange={(e) => {
                      const newList = [...revenueList];
                      newList[index].transactionCategory = e.target.value;
                      newList[index].description = "";
                      setRevenueList(newList);
                    }}
                    disabled={item.isLocked}
                  >
                    <option value="">카테고리 선택</option>
                    <option value="영업수익">영업수익</option>
                    <option value="기타수익">기타수익</option>
                  </select>
                </td>
                <td>
                  <select
                    value={item.description}
                    onChange={(e) => {
                      const newList = [...revenueList];
                      newList[index].description = e.target.value;
                      setRevenueList(newList);
                    }}
                    disabled={item.isLocked}
                  >
                    <option value="">설명 선택</option>
                    {revenueOptions[item.transactionCategory]?.map((desc) => (
                      <option key={desc} value={desc}>
                        {desc}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={formatNumberWithCommas(item.amount)} // 쉼표가 추가된 값 표시
                    onChange={(e) =>
                      handleAmountChange("revenue", index, e.target.value)
                    }
                    disabled={item.isLocked}
                    className="amount-input"
                  />
                </td>
                <td className="delete-column">
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => removeRevenueRow(index)}
                    disabled={item.isLocked}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-divider"></div>

      {/* 지출 입력 */}
      <div className="register-cost-section">
        <div className="register-cost-section-header">
          <h4 className="register-cost-section-title">지출</h4>
          <button
            type="button"
            className="register-cost-add-btn"
            onClick={addExpenseRow}
          >
            지출 행 추가
          </button>
        </div>
        <table className="register-cost-table">
          <thead>
            <tr>
              <th>일자</th>
              <th>카테고리</th>
              <th>설명</th>
              <th>금액</th>
              <th className="delete-column">삭제</th>
            </tr>
          </thead>
          <tbody>
            {expenseList.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="date"
                    value={item.transactionDate}
                    onChange={(e) => {
                      const newList = [...expenseList];
                      newList[index].transactionDate = e.target.value;
                      setExpenseList(newList);
                    }}
                    disabled={item.isLocked}
                  />
                </td>
                <td>
                  <select
                    value={item.transactionCategory}
                    onChange={(e) => {
                      const newList = [...expenseList];
                      newList[index].transactionCategory = e.target.value;
                      newList[index].description = "";
                      setExpenseList(newList);
                    }}
                    disabled={item.isLocked}
                  >
                    <option value="">카테고리 선택</option>
                    <option value="인건비">인건비</option>
                    <option value="운영비용">운영비용</option>
                    <option value="영업외비용">영업외비용</option>
                  </select>
                </td>
                <td>
                  <select
                    value={item.description}
                    onChange={(e) => {
                      const newList = [...expenseList];
                      newList[index].description = e.target.value;
                      setExpenseList(newList);
                    }}
                    disabled={item.isLocked}
                  >
                    <option value="">설명 선택</option>
                    {expenseOptions[item.transactionCategory]?.map((desc) => (
                      <option key={desc} value={desc}>
                        {desc}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={formatNumberWithCommas(item.amount)} // 쉼표가 추가된 값 표시
                    onChange={(e) =>
                      handleAmountChange("expense", index, e.target.value)
                    }
                    disabled={item.isLocked}
                    className="amount-input"
                  />
                </td>
                <td className="delete-column">
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => removeExpenseRow(index)}
                    disabled={item.isLocked}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <button type="submit" className="register-cost-submit-btn">
          등록하기
        </button>
      </div>
    </form>
  );
};

export default RegisterCost;
