// src/pages/Business/components/CashFlowDashboard.js

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Row, Col, Card, message, DatePicker, Button, Empty } from "antd";
import moment from "moment";
import "../../../assets/css/Business/CashFlowStatement.css";

// 분리된 컴포넌트들 import
import DonutChart from "./charts/DonutChart";
import MonthlyComparisonChart from "./charts/MonthlyComparisonChart";
import RunwayChart from "./charts/RunwayChart";
import CashFlowSummaryChart from "./charts/CashFlowSummaryChart";
import DailyCashFlowChart from "./charts/DailyCashFlowChart";
import CashFlowTable from "./tables/CashFlowTable";
import DailyCashFlowTable from "./tables/DailyCashFlowTable";
import TopMenu from "./ui/TopMenu";
import PredictCashFlowButton from "./ui/PredictCashFlowButton";

// 유틸리티 함수 import
import {
  calculateRunway,
  calculateRunwayData,
  calculateFutureCashFlow,
  fetchDailyDataFromAPI, // API 호출 함수 추가 (가정)
  groupDataByMonthAndCategory, // 데이터 그룹화 유틸리티
  transformRawDataToTree, // 트리 변환 유틸리티
  transformTreeData, // 트리 데이터를 테이블 형태로 변환
  transformDataForTable, // 테이블 변환 유틸리티
} from "../utils/cashFlowUtils";

// 커스텀 훅 import
import useCashFlowData from "../hooks/useCashFlowData";

// 샘플 데이터
const rawData = [
  {
    transactionDate: "2024-09",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "배당금수익",
    amount: 23645920,
  },
  {
    transactionDate: "2024-09",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "유형자산처분이익",
    amount: 76692200,
  },
  {
    transactionDate: "2024-09",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "이자수익",
    amount: 80873400,
  },
  {
    transactionDate: "2024-09",
    transactionType: "지출",
    transactionCategory: "백지환",
    description: "이자수익",
    amount: 80873400,
  },
];

const predefinedPredictData = [
  {
    transactionDate: "2025-09",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "배당금수익",
    amount: 23645920,
  },
  {
    transactionDate: "2025-08",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "유형자산처분이익",
    amount: 76692200,
  },
  {
    transactionDate: "2025-07",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "이자수익",
    amount: 80873400,
  },
  {
    transactionDate: "2025-06",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "자산수증이익",
    amount: 14741820,
  },
  {
    transactionDate: "2025-05",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "잡이익",
    amount: 35937980,
  },
  {
    transactionDate: "2025-04",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "개서료",
    amount: 5438780,
  },
  {
    transactionDate: "2025-03",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "골프용품판매",
    amount: 44089750,
  },
  {
    transactionDate: "2025-02",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "골프장이용료",
    amount: 635834150,
  },
  {
    transactionDate: "2025-01",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "공사수입",
    amount: 47498530,
  },
  {
    transactionDate: "2024-12",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "기타수입",
    amount: 19942320,
  },
  {
    transactionDate: "2024-11",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "대여료",
    amount: 112741880,
  },
  {
    transactionDate: "2024-10",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "식음료",
    amount: 149192250,
  },
];

const predefinedDailyData = [
  {
    transactionDate: "2024-09-11",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "자산수증이익",
    amount: 5367260,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "잡이익",
    amount: 9771840,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "골프장이용료",
    amount: 31312100,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "공사수입",
    amount: 2924640,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "대여료",
    amount: 2332810,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "식음료",
    amount: 13944700,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "영업외비용",
    description: "기타의대손상각비",
    amount: 4741230,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "공사원가",
    amount: 4996770,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "세금과공과",
    amount: 4380710,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "소모품비",
    amount: 1247510,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "식음료매출원가",
    amount: 7469900,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "전력비",
    amount: 3998770,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "지급수수료",
    amount: 7565430,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "코스관리비",
    amount: 9865390,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "인건비",
    description: "급여",
    amount: 3722700,
  },
  {
    transactionDate: "2024-09-11",
    transactionType: "지출",
    transactionCategory: "인건비",
    description: "복리후생비",
    amount: 4305550,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "배당금수익",
    amount: 5592990,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "수입",
    transactionCategory: "기타수익",
    description: "유형자산처분이익",
    amount: 4111650,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "골프용품판매",
    amount: 7823640,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "골프장이용료",
    amount: 36842420,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "수입",
    transactionCategory: "영업수익",
    description: "기타수입",
    amount: 735420,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "감가상각비",
    amount: 5995770,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "공사원가",
    amount: 2813560,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "상품매출원가",
    amount: 3102880,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "세금과공과",
    amount: 1266960,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "소모품비",
    amount: 9028960,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "식음료매출원가",
    amount: 7546590,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "지급수수료",
    amount: 8329280,
  },
  {
    transactionDate: "2024-09-10",
    transactionType: "지출",
    transactionCategory: "운영비용",
    description: "코스관리비",
    amount: 7901990,
  },
];

const CashFlowDashboard = () => {
  const [timeFrame, setTimeFrame] = useState("month"); // Default to 'month'
  const [selectedDates, setSelectedDates] = useState([]);
  const [data, setData] = useState(rawData); // 기존 데이터 상태 초기화
  const [loading, setLoading] = useState(false); // API 호출 로딩 상태
  const [isPredicted, setIsPredicted] = useState(false); // 예측 데이터 추가 여부
  const [isDataFetched, setIsDataFetched] = useState(false); // 데이터 가져오기 여부 (일/주)
  const [predictedData, setPredictedData] = useState([]); // 예측 데이터 상태 추가
  const [runwayData, setRunwayData] = useState([]); // <<-- 새로 추가된 상태
  const [cashFlowSummaryData, setCashFlowSummaryData] = useState([]); // 차트에 사용될 데이터
  const [dailyData, setDailyData] = useState([]);
  const [dailyDataForChart, setDailyDataForChart] = useState([]);
  const [fetchedData, setFetchedData] = useState([]); // API로부터 받아온 데이터 상태 추가
  const [cachedData, setCachedData] = useState(null); // 캐시된 데이터
  const [dailyDataFetched, setDailyDataFetched] = useState(false); // '일' 데이터 가져오기 여부
  const [isPastDataFetched, setIsPastDataFetched] = useState(false); // 과거 데이터 가져왔는지 여부

  const tableRef = useRef(null);

  // 페이지 로드 시 초기 Runway 계산
  useEffect(() => {
    // timeFrame이 'day'일 때는 runwayData를 다시 계산하지 않고 기존 값을 유지
    if (timeFrame !== "day") {
      const newRunwayData = calculateRunwayData(data, isPredicted);
      setRunwayData(newRunwayData); // Runway 데이터를 업데이트
    }
  }, [timeFrame, data, isPredicted]);

  // 데이터 처리 커스텀 훅 사용
  const {
    filteredData,
    pieChartData,
    monthlyComparisonData,
    // runwayData,
    latestRunway,
    cashFlowSummaryChart,
    treeData,
    allTimeFrames,
    transformedData,
    dataSource,
    summaryData,
  } = useCashFlowData(data, timeFrame, selectedDates, isPredicted);

  // 버튼 클릭 후 과거 데이터를 가져오기
  const handleFetchPastData = async () => {
    setLoading(true); // 로딩 상태 활성화
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/business/fetchPastTransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            golfCourseId: 10002, // 고정된 골프장 ID
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch past transaction data.");
      }

      const fetchedData = await response.json();
      if (fetchedData.length > 0) {
        setFetchedData(fetchedData); // API로부터 가져온 데이터를 상태에 저장
        setIsPastDataFetched(true); // 버튼이 눌린 후 숨쉬기 효과 비활성화

        setData(fetchedData); // 데이터를 가져온 후 상태에 저장
        setIsDataFetched(true); // 데이터를 성공적으로 가져왔음을 표시
        setCachedData(fetchedData); // 캐시된 데이터로 저장
        message.success("과거 데이터가 성공적으로 로드되었습니다.");
      } else {
        message.info("과거 데이터가 없습니다.");
      }
    } catch (error) {
      message.error("과거 데이터 로드에 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  // 컬럼 정의
  const columns = useMemo(() => {
    if (["month", "quarter", "day"].includes(timeFrame)) {
      // 'week' 제거
      return [
        {
          title: "영업활동 현금흐름",
          dataIndex: "category",
          key: "category",
          width: 200,
          fixed: "left",
          render: (text) => <strong>{text}</strong>,
        },
        ...allTimeFrames.map((tf) => ({
          title: tf,
          dataIndex: tf,
          key: tf,
          width: 140,
          render: (value) => (value ? value.toLocaleString() : "-"),
        })),
      ];
    } else {
      return [
        {
          title: "영업활동 현금흐름",
          dataIndex: "category",
          key: "category",
          render: (text) => <strong>{text}</strong>,
        },
      ];
    }
  }, [allTimeFrames, timeFrame]);

  // 시간 단위 변경 핸들러
  const handleTimeFrameChange = (value) => {
    setTimeFrame(value);

    if (value === "day") {
      // '일'로 변경될 때 fetchedData가 없다면 데이터 비우기
      if (cachedData && dailyDataForChart.length > 0) {
        setData(cachedData); // 캐시된 데이터를 그대로 사용
      } else {
        setData([]); // 없으면 빈 데이터로 초기화
        setIsDataFetched(false); // 데이터를 가져오지 않았음을 표시
      }
    } else {
      // '월' 또는 '분기'로 전환 시 예측 데이터를 포함한 전체 데이터를 사용
      setData([...fetchedData, ...predictedData]); // API로부터 받아온 데이터를 사용
    }
  };

  useEffect(() => {
    if (timeFrame === "day") {
      // 캐시된 데이터가 있으면 사용, 없으면 초기화
      if (cachedData) {
        setData(cachedData);
      } else {
        setData([]); // 없으면 빈 데이터로 초기화
      }
    }
  }, [timeFrame]); // timeFrame 변경 시 실행

  // 날짜 변경 핸들러
  const handleDateChange = (dates) => {
    console.log("선택된 날짜: ", dates);
    setSelectedDates(dates);
  };

  // 분기 변경 핸들러
  const handleQuarterChange = (value) => {
    setSelectedDates(value);
  };

  // 분기 옵션 생성 함수
  const generateQuarterOptions = () => {
    // 모든 날짜를 moment 객체로 변환
    const dates = data.map((item) => moment(item.transactionDate, "YYYY-MM"));
    const earliest = moment.min(dates).startOf("month");
    const latest = moment.max(dates).startOf("month");

    // 분기 옵션 생성
    const quarters = [];
    let current = earliest.clone().startOf("quarter");
    const end = latest.clone().endOf("quarter");

    while (current.isSameOrBefore(end)) {
      const year = current.year();
      const quarter = current.quarter();
      quarters.push(`${year}-Q${quarter}`);
      current.add(1, "quarter");
    }

    return quarters;
  };

  // 예측 데이터 추가 핸들러
  const handlePredictCashFlow = () => {
    if (!isPredicted) {
      setLoading(true);

      try {
        const futureCashFlowData = calculateFutureCashFlow(
          predefinedPredictData
        );
        setCashFlowSummaryData(futureCashFlowData);
        // 예측 데이터를 기존 데이터에 추가
        const predictData = predefinedPredictData;
        setPredictedData(predictData); // 예측 데이터를 따로 저장
        const updatedData = [...data, ...predictData]; // 기존 데이터와 예측 데이터 병합
        setData(updatedData); // 병합된 데이터 설정
        setIsPredicted(true); // 버튼을 비활성화하기 위해 상태를 true로 설정

        // 예측 데이터가 추가된 후 Runway 다시 계산
        const newRunwayData = calculateRunwayData(updatedData, true); // isPredicted=true 전달
        setRunwayData(newRunwayData); // Runway 데이터를 업데이트

        message.success("현금 흐름 예측 데이터가 추가되었습니다.");
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        message.error("현금 흐름 예측 데이터 추가에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  // 데이터가 변경될 때마다 스크롤 위치를 조정
  useEffect(() => {
    if (isPredicted && tableRef.current) {
      const predictedElements = tableRef.current.querySelectorAll(".predicted");
      if (predictedElements.length > 0) {
        const lastPredictedElement =
          predictedElements[predictedElements.length - 1];
        tableRef.current.scrollTo({
          left: lastPredictedElement.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  }, [isPredicted, data]);

  // const fetchDailyData = async (startDate, endDate) => {
  //   setLoading(true);
  //   try {
  //     // console.log("Fetching data...");

  //     const dailyData = predefinedDailyData; // 실제 API 호출 부분

  //     if (dailyData.length > 0) {
  //       setData(dailyData);
  //       setCachedData(dailyData); // 가져온 데이터를 캐싱
  //       setIsDataFetched(true);
  //       message.success("데이터가 성공적으로 로드되었습니다.");
  //     } else {
  //       message.info("데이터가 없습니다.");
  //     }
  //   } catch (error) {
  //     console.error("데이터 로드 중 오류 발생:", error);
  //     message.error("데이터 로드에 실패했습니다.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchDailyData = async (startDate, endDate) => {
    setLoading(true);
    console.log(startDate);
    console.log(endDate);
    try {
      // 날짜 형식을 'YYYY-MM-DD'로 변환
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");

      console.log("Formatted Dates:", formattedStartDate, formattedEndDate);

      const response = await fetch(
        "http://localhost:8080/api/v1/business/fetchDailyTransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch daily transaction data.");
      }

      const dailyData = await response.json();

      if (dailyData.length > 0) {
        setDailyDataForChart(dailyData);
        setData(dailyData); // 테이블 데이터 업데이트
        setIsDataFetched(true); // 데이터가 성공적으로 로드됨을 표시
        setCachedData(dailyData); // 캐시된 데이터로 저장
        message.success("데이터가 성공적으로 로드되었습니다.");
      } else {
        message.info("데이터가 없습니다.");
      }
    } catch (error) {
      message.error("데이터 로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 데이터 가져오기 버튼 클릭 시 실행
  // const handleFetchDailyData = async () => {
  //   if (!Array.isArray(selectedDates) || selectedDates.length !== 2) {
  //     message.warning("시작일과 종료일을 선택해주세요.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     console.log(selectedDates);
  //     const dailyData = predefinedDailyData; // 실제 API 호출 대신 샘플 데이터 사용

  //     if (dailyData.length > 0) {
  //       setDailyDataForChart(dailyData);
  //       setData(dailyData); // 테이블 데이터 업데이트
  //       setIsDataFetched(true); // 데이터가 성공적으로 로드됨을 표시
  //       setCachedData(dailyData); // 캐시된 데이터로 저장
  //       message.success("데이터가 성공적으로 로드되었습니다.");
  //     } else {
  //       message.info("데이터가 없습니다.");
  //     }
  //   } catch (error) {
  //     message.error("데이터 로드에 실패했습니다.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // 데이터 가져오기 버튼 클릭 시 실행
  const handleFetchDailyData = async () => {
    if (!Array.isArray(selectedDates) || selectedDates.length !== 2) {
      message.warning("시작일과 종료일을 선택해주세요.");
      return;
    }

    console.log("선택된 시작일:", selectedDates[0]);
    console.log("선택된 종료일:", selectedDates[1]);

    const [startDate, endDate] = selectedDates;
    await fetchDailyData(startDate, endDate);
  };

  // 차트 로드 전 "??" 표시용 함수
  const renderPlaceholderChart = () => (
    <div
      style={{
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#999",
      }}
    >
      ??
    </div>
  );

  return (
    <div className="cash-flow-dashboard-container">
      {/* Top Menu */}
      <div className="cash-flow-dashboard-top-menu">
        <TopMenu
          timeFrame={timeFrame}
          handleTimeFrameChange={handleTimeFrameChange}
          selectedDates={selectedDates}
          // handleDateChange={handleDateChange}
          // handleDateChange={setSelectedDates}

          handleDateChange={handleDateChange} // 수정된 부분
          handleQuarterChange={handleQuarterChange}
          generateQuarterOptions={generateQuarterOptions}
          handleFetchDailyData={handleFetchDailyData} // 새로 추가된 prop
          handleFetchPastData={handleFetchPastData} // 이 함수 전달
          loading={loading} // 로딩 상태 전달
          isPastDataFetched={isPastDataFetched} // Pass the state as a prop
        />
      </div>

      {/* Chart Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card title="비용 지출">
            {isDataFetched ? (
              <DonutChart data={pieChartData} />
            ) : (
              renderPlaceholderChart()
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            title={`${
              timeFrame === "day"
                ? "일별 매출, 지출 비교"
                : timeFrame === "month"
                ? "월별 매출, 지출 비교"
                : "분기별 매출, 지출 비교"
            }`}
          >
            {isDataFetched ? (
              <MonthlyComparisonChart data={monthlyComparisonData} />
            ) : (
              renderPlaceholderChart()
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            title={`Runway (${
              isDataFetched
                ? latestRunway === Infinity
                  ? "∞"
                  : ` + ${latestRunway.toFixed(1)}개월`
                : "?? 개월" // 데이터를 가져오기 전에는 '?? 개월'로 표시
            })`}
          >
            {isDataFetched ? (
              <RunwayChart data={runwayData} isPredicted={isPredicted} />
            ) : (
              renderPlaceholderChart() // 데이터를 가져오기 전에는 차트 대신 '??'로 표시
            )}
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            title={
              timeFrame === "day"
                ? "일별 현금 흐름"
                : "향후 12개월 합계 현금 흐름"
            }
            style={{ height: "300px" }} // Card의 높이를 고정
          >
            {timeFrame === "day" ? (
              !isDataFetched || dailyDataForChart.length === 0 ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="breathing-text">
                    날짜를 선택하고 현금 흐름을 확인하세요.
                  </p>
                </div>
              ) : (
                <DailyCashFlowChart
                  data={dailyDataForChart} // 데이터가 들어가는 부분
                />
              )
            ) : !isPredicted ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="breathing-text">
                  현금 흐름을 예측하여 확인하세요.
                </p>
              </div>
            ) : (
              <CashFlowSummaryChart data={cashFlowSummaryData} />
            )}
          </Card>
        </Col>
      </Row>
      {/* 데이터 테이블 섹션 */}
      {timeFrame === "month" || timeFrame === "quarter" ? (
        !isDataFetched ? (
          <Empty description="과거 기록 불러오기 버튼을 클릭하세요." />
        ) : (
          <CashFlowTable
            columns={columns}
            dataSource={transformedData}
            tableRef={tableRef}
          />
        )
      ) : !isDataFetched ? (
        <Empty description="날짜를 선택하고 기록 불러오기 버튼을 클릭하세요." />
      ) : (
        <DailyCashFlowTable
          columns={columns}
          dataSource={transformedData}
          isDataFetched={isDataFetched}
        />
      )}
      {["month", "quarter"].includes(timeFrame) && (
        <PredictCashFlowButton
          onClick={handlePredictCashFlow}
          disabled={isPredicted || loading}
          loading={loading}
        />
      )}
    </div>
  );
};

export default CashFlowDashboard;
