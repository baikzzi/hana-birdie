import React, { useState } from "react";
import axios from "axios"; // Axios 임포트
import "../../assets/css/Business/EditCost.css";
import { message, Popconfirm } from "antd";

// 샘플 데이터 (API 호출 시 받는 데이터라고 가정)
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

// 숫자에 쉼표 추가하는 함수
const formatNumberWithCommas = (number) => {
  if (!number) return "";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 쉼표 제거 후 숫자로 변환하는 함수
const removeCommas = (value) => {
  return value.replace(/,/g, "");
};

// 숫자 입력 필터링 함수 (숫자와 쉼표만 허용)
const filterNumericInput = (value) => {
  return value.replace(/[^0-9,]/g, "");
};

const EditCost = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [revenueList, setRevenueList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [originalRevenueList, setOriginalRevenueList] = useState([]);
  const [originalExpenseList, setOriginalExpenseList] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 데이터를 불러오는 함수
  const fetchRecords = async () => {
    if (!selectedDate) {
      message.info("날짜를 선택해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/business/dateHistory",
        {
          golfCourseId: 10002, // 고정된 golfCourseId
          transactionDate: selectedDate, // 선택된 날짜 (YYYY-MM-DD)
        }
      );

      const data = response.data;

      // 응답 데이터에 isLocked 속성 추가
      const transactionsWithLock = data.map((item) => ({
        ...item,
        isLocked: false, // 기본값 false
      }));

      // 수입과 지출로 분류
      const fetchedRevenueList = transactionsWithLock.filter(
        (item) => item.transactionType === "수입"
      );
      const fetchedExpenseList = transactionsWithLock.filter(
        (item) => item.transactionType === "지출"
      );

      // 각각 리스트와 원본 리스트에 저장
      setRevenueList(fetchedRevenueList);
      setExpenseList(fetchedExpenseList);
      setOriginalRevenueList(JSON.parse(JSON.stringify(fetchedRevenueList)));
      setOriginalExpenseList(JSON.parse(JSON.stringify(fetchedExpenseList)));
    } catch (err) {
      console.error("Error fetching records:", err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 금액 입력 처리 함수 (숫자와 쉼표만 허용)
  const handleAmountChange = (type, index, value) => {
    const filteredValue = filterNumericInput(value); // 필터링
    const numericValue = removeCommas(filteredValue); // 쉼표 제거 후 숫자 변환
    const updatedList =
      type === "revenue" ? [...revenueList] : [...expenseList];
    updatedList[index].amount = numericValue;

    if (type === "revenue") {
      setRevenueList(updatedList);
    } else {
      setExpenseList(updatedList);
    }
  };

  const handleUpdate = (type, index, field, value) => {
    const updatedList =
      type === "revenue" ? [...revenueList] : [...expenseList];
    updatedList[index][field] = value;

    if (type === "revenue") {
      setRevenueList(updatedList);
    } else {
      setExpenseList(updatedList);
    }
  };

  // 비용 수정 메서드
  const handleEdit = async (transactionsToEdit) => {
    if (!transactionsToEdit || transactionsToEdit.length === 0) {
      message.error("수정할 거래 데이터가 없습니다.");
      return;
    }

    // 수정할 데이터 구조 확인을 위해 console.log 추가
    const dataToSend = transactionsToEdit.map((item) => ({
      transactionId: item.transactionId,
      transactionDate: item.transactionDate,
      transactionType: item.transactionType,
      transactionCategory: item.transactionCategory,
      description: item.description,
      amount: parseInt(item.amount, 10),
    }));

    console.log("수정할 데이터:", dataToSend);

    try {
      // 실제 API 호출 시 주석을 해제하세요.

      await axios.post(
        "http://localhost:8080/api/v1/business/editTransaction",
        dataToSend
      );

      console.log("Updated transactions:", dataToSend);

      // 수정된 항목들 잠금 처리
      setRevenueList((prev) =>
        prev.map((item) =>
          transactionsToEdit.some(
            (changedItem) => changedItem.transactionId === item.transactionId
          )
            ? { ...item, isLocked: true }
            : item
        )
      );
      setExpenseList((prev) =>
        prev.map((item) =>
          transactionsToEdit.some(
            (changedItem) => changedItem.transactionId === item.transactionId
          )
            ? { ...item, isLocked: true }
            : item
        )
      );

      message.success("수정이 완료되었습니다!");
    } catch (error) {
      console.error("Error updating records:", error);
      message.error("수정 중 에러가 발생했습니다.");
    }
  };

  // 단일 행 수정 함수 호출
  const handleSingleEdit = async (type, index) => {
    const list = type === "revenue" ? revenueList : expenseList;
    const originalList =
      type === "revenue" ? originalRevenueList : originalExpenseList;

    const updatedItem = list[index];
    const originalItem = originalList.find(
      (item) => item.transactionId === updatedItem.transactionId
    );

    if (!originalItem) {
      message.error("원본 데이터를 찾을 수 없습니다.");
      return;
    }

    // 값이 변경되었는지 비교
    const isChanged =
      originalItem.transactionDate !== updatedItem.transactionDate ||
      originalItem.transactionCategory !== updatedItem.transactionCategory ||
      originalItem.description !== updatedItem.description ||
      parseInt(originalItem.amount, 10) !== parseInt(updatedItem.amount, 10);

    if (!isChanged) {
      message.info("수정된 내용이 없습니다.");
      return;
    }

    // isLocked가 true인 경우 수정하지 않도록 추가 검증
    if (updatedItem.isLocked) {
      message.info("이 항목은 잠금 상태이므로 수정할 수 없습니다.");
      return;
    }

    // 수정할 데이터 객체를 리스트에 담아서 통합된 함수 호출
    const transactionsToEdit = [updatedItem];
    await handleEdit(transactionsToEdit);
  };

  // 전체 수정하기 처리 함수
  const handleEditAll = async () => {
    const allTransactions = [...revenueList, ...expenseList];
    const originalTransactions = [
      ...originalRevenueList,
      ...originalExpenseList,
    ];

    // 수정된 항목만 필터링 + isLocked가 false인 항목만
    const changedTransactions = allTransactions.filter((updatedItem) => {
      const originalItem = originalTransactions.find(
        (item) => item.transactionId === updatedItem.transactionId
      );
      return (
        originalItem &&
        !updatedItem.isLocked && // isLocked가 false인 항목만
        (originalItem.transactionDate !== updatedItem.transactionDate ||
          originalItem.transactionCategory !==
            updatedItem.transactionCategory ||
          originalItem.description !== updatedItem.description ||
          parseInt(originalItem.amount, 10) !==
            parseInt(updatedItem.amount, 10))
      );
    });

    if (changedTransactions.length === 0) {
      message.info("수정된 항목이 없습니다.");
      return;
    }

    // 통합된 함수 호출
    await handleEdit(changedTransactions);
  };
  // 비용 삭제 메서드
  const handleDelete = async (type, index) => {
    const transactionId =
      type === "revenue"
        ? revenueList[index].transactionId
        : expenseList[index].transactionId;

    try {
      // 삭제 API 호출
      await axios.post(
        "http://localhost:8080/api/v1/business/deleteTransaction",
        {
          transactionId: transactionId,
        }
      );

      if (type === "revenue") {
        setRevenueList(revenueList.filter((_, i) => i !== index));
      } else {
        setExpenseList(expenseList.filter((_, i) => i !== index));
      }

      message.success("삭제 완료되었습니다!");
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("삭제 중 에러가 발생했습니다.");
    }
  };

  return (
    <div className="edit-cost">
      <div className="edit-cost-header">
        <h2 className="edit-cost-title">매출 및 비용 수정 및 삭제</h2>

        <div className="date-select-container">
          <label htmlFor="date-select">날짜 선택: </label>
          <input
            type="date"
            id="date-select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button className="fetch-records-btn" onClick={fetchRecords}>
            기록 불러오기
          </button>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* 매출 수정 */}
      <div className="register-cost-section">
        <div className="register-cost-section-header">
          <h4 className="register-cost-section-title">매출 수정</h4>
        </div>
        <table className="register-cost-table">
          <thead>
            <tr>
              <th>일자</th>
              <th>카테고리</th>
              <th>설명</th>
              <th>금액</th>
              <th className="edit-column">수정</th>
              <th className="delete-column">삭제</th>
            </tr>
          </thead>
          <tbody>
            {revenueList.map((item, index) => (
              <tr key={item.transactionId}>
                <td>
                  <input
                    type="date"
                    value={item.transactionDate}
                    onChange={(e) =>
                      handleUpdate(
                        "revenue",
                        index,
                        "transactionDate",
                        e.target.value
                      )
                    }
                    disabled={item.isLocked}
                  />
                </td>
                <td>
                  <select
                    value={item.transactionCategory}
                    onChange={(e) =>
                      handleUpdate(
                        "revenue",
                        index,
                        "transactionCategory",
                        e.target.value
                      )
                    }
                    disabled={item.isLocked}
                  >
                    <option value="영업수익">영업수익</option>
                    <option value="기타수익">기타수익</option>
                  </select>
                </td>
                <td>
                  <select
                    value={item.description}
                    onChange={(e) =>
                      handleUpdate(
                        "revenue",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    disabled={item.isLocked}
                  >
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
                    value={formatNumberWithCommas(item.amount)} // 쉼표 추가
                    onChange={(e) =>
                      handleAmountChange("revenue", index, e.target.value)
                    }
                    disabled={item.isLocked}
                    className="amount-input" // CSS 클래스 추가
                  />
                </td>
                <td className="edit-column">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleSingleEdit("revenue", index)}
                    disabled={item.isLocked}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </td>
                <td className="delete-column">
                  <Popconfirm
                    title="정말 삭제하시겠습니까?"
                    onConfirm={() => handleDelete("revenue", index)}
                    okText="예"
                    cancelText="아니오"
                  >
                    <button
                      type="button"
                      className="delete-button"
                      disabled={item.isLocked}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-divider"></div>

      {/* 지출 수정 */}
      <div className="register-cost-section">
        <div className="register-cost-section-header">
          <h4 className="register-cost-section-title">지출 수정</h4>
        </div>
        <table className="register-cost-table">
          <thead>
            <tr>
              <th>일자</th>
              <th>카테고리</th>
              <th>설명</th>
              <th>금액</th>
              <th className="edit-column">수정</th>
              <th className="delete-column">삭제</th>
            </tr>
          </thead>
          <tbody>
            {expenseList.map((item, index) => (
              <tr key={item.transactionId}>
                <td>
                  <input
                    type="date"
                    value={item.transactionDate}
                    onChange={(e) =>
                      handleUpdate(
                        "expense",
                        index,
                        "transactionDate",
                        e.target.value
                      )
                    }
                    disabled={item.isLocked}
                  />
                </td>
                <td>
                  <select
                    value={item.transactionCategory}
                    onChange={(e) =>
                      handleUpdate(
                        "expense",
                        index,
                        "transactionCategory",
                        e.target.value
                      )
                    }
                    disabled={item.isLocked}
                  >
                    <option value="운영비용">운영비용</option>
                    <option value="인건비">인건비</option>
                  </select>
                </td>
                <td>
                  <select
                    value={item.description}
                    onChange={(e) =>
                      handleUpdate(
                        "expense",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    disabled={item.isLocked}
                  >
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
                    value={formatNumberWithCommas(item.amount)}
                    onChange={(e) =>
                      handleAmountChange("expense", index, e.target.value)
                    }
                    disabled={item.isLocked}
                    className="amount-input"
                  />
                </td>
                <td className="edit-column">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleSingleEdit("expense", index)}
                    disabled={item.isLocked}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </td>
                <td className="delete-column">
                  <Popconfirm
                    title="정말 삭제하시겠습니까?"
                    onConfirm={() => handleDelete("expense", index)}
                    okText="예"
                    cancelText="아니오"
                  >
                    <button
                      type="button"
                      className="delete-button"
                      disabled={item.isLocked}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="edit-cost-submit-btn" onClick={handleEditAll}>
          전체 수정하기
        </button>
      </div>
    </div>
  );
};

export default EditCost;
