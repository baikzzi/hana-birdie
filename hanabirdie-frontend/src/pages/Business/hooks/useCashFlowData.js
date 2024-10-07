import { useMemo, useEffect, useState } from "react";
import moment from "moment";
import {
  calculatePieChartData,
  calculateMonthlyComparisonData,
  calculateRunwayData,
  calculateRunway,
  calculateFutureCashFlow,
  transformRawDataToTree,
  transformTreeData,
  groupDataByMonthAndCategory,
  transformDataForTable,
  generateSummaryData,
} from "../utils/cashFlowUtils";

const useCashFlowData = (data, timeFrame, selectedDates, isPredicted) => {
  const [runwayData, setRunwayData] = useState([]); // Runway 데이터를 상태로 관리

  const filteredData = useMemo(() => {
    if (timeFrame === "day") {
      if (selectedDates && selectedDates.length === 2) {
        const [startDate, endDate] = selectedDates;
        return data.filter((item) => {
          const itemDate = moment(item.transactionDate, "YYYY-MM-DD");
          return (
            itemDate.isSameOrAfter(startDate) &&
            itemDate.isSameOrBefore(endDate)
          );
        });
      }
    } else if (timeFrame === "month") {
      if (selectedDates && selectedDates.length > 0 && selectedDates[0]) {
        const selectedMonth = selectedDates[0].format("YYYY-MM");
        return data.filter((item) =>
          item.transactionDate.startsWith(selectedMonth)
        );
      }
    } else if (timeFrame === "quarter") {
      if (
        selectedDates &&
        selectedDates !== "전체" &&
        typeof selectedDates === "string"
      ) {
        const [year, quarter] = selectedDates.split("-Q");
        return data.filter((item) => {
          const itemDate = moment(item.transactionDate, "YYYY-MM");
          return (
            itemDate.year() === parseInt(year) &&
            itemDate.quarter() === parseInt(quarter)
          );
        });
      }
    }
    return data; // 기본적으로 전체 데이터를 반환
  }, [timeFrame, selectedDates, data]);

  // 1번차트 : Pie 차트 데이터 계산 (수정하면 안됨)
  const pieChartData = useMemo(() => {
    if (timeFrame === "day") {
      return calculatePieChartData(data); // timeFrame이 "day"일 때는 원본 데이터를 사용
    }
    return calculatePieChartData(filteredData); // 그 외에는 filteredData를 사용
  }, [filteredData, data, timeFrame]);

  // 2번차트 : 일별/월별/분기별 지출 비교 (수정하면 안됨))
  const monthlyComparisonData = useMemo(() => {
    return calculateMonthlyComparisonData(data);
  }, [filteredData, timeFrame, data]);

  // 3번 차트
  // 처음 '월' 또는 '분기'가 선택되었을 때만 runwayData 계산
  useEffect(() => {
    if (timeFrame === "month" || timeFrame === "quarter") {
      // 예측 데이터가 추가된 경우에도 다시 계산
      const newRunwayData = calculateRunwayData(data, isPredicted);
      setRunwayData(newRunwayData); // Runway 데이터를 업데이트
    }
    // timeFrame이 "일"일 때는 runwayData를 업데이트하지 않음
  }, [timeFrame, data, isPredicted]);

  // 최신 런웨이 계산
  const latestRunway = useMemo(() => {
    // runwayData가 없을 때만 Infinity를 반환
    if (runwayData.length === 0) return Infinity;
    return runwayData[runwayData.length - 1].runway;
  }, [runwayData]);

  // 4번 차트
  // 미래 현금 흐름 차트 계산 ('일' 데이터를 포함)
  const cashFlowSummaryChart = useMemo(() => {
    if (filteredData && filteredData.length > 0) {
      return calculateFutureCashFlow(filteredData);
    }
    return [];
  }, [filteredData]);

  // 트리 데이터 변환
  const { treeData, allTimeFrames } = useMemo(
    () => transformRawDataToTree(data, timeFrame),
    [data, timeFrame]
  );

  // 트리 데이터를 테이블 형식으로 변환
  const transformedData = useMemo(
    () => transformTreeData(treeData, allTimeFrames, timeFrame),
    [treeData, allTimeFrames, timeFrame]
  );

  // 그룹화된 데이터
  const groupedData = useMemo(
    () => groupDataByMonthAndCategory(filteredData),
    [filteredData]
  );

  // 테이블에 맞춘 데이터 변환
  const dataSource = useMemo(
    () => transformDataForTable(groupedData, timeFrame),
    [groupedData, timeFrame]
  );

  // 요약 데이터 생성
  const summaryData = useMemo(
    () => generateSummaryData(groupedData, timeFrame),
    [groupedData, timeFrame]
  );

  return {
    filteredData,
    pieChartData,
    monthlyComparisonData,
    runwayData,
    latestRunway,
    cashFlowSummaryChart,
    treeData,
    allTimeFrames,
    transformedData,
    dataSource,
    summaryData,
  };
};

export default useCashFlowData;
