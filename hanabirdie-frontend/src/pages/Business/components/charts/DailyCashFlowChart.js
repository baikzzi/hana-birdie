import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import PropTypes from "prop-types";

const DailyCashFlowChart = ({ data, showPeriod = true }) => {
  // 데이터가 비어있을 경우 빈 배열로 처리
  const validData = data && data.length > 0 ? data : [];

  // 시작일 및 종료일 계산 (옵션에 따라 기간 표시)
  const startDate = useMemo(
    () =>
      validData.length > 0
        ? moment(validData[0].transactionDate, "YYYY-MM-DD").format("MM-DD")
        : "N/A",
    [validData]
  );
  const endDate = useMemo(
    () =>
      validData.length > 0
        ? moment(
            validData[validData.length - 1].transactionDate,
            "YYYY-MM-DD"
          ).format("MM-DD")
        : "N/A",
    [validData]
  );

  // 일별 현금 흐름 계산 (수입 - 지출)
  const dailyCashFlow = useMemo(() => {
    const dailyFlowMap = {};

    validData.forEach(({ transactionDate, transactionType, amount }) => {
      if (!dailyFlowMap[transactionDate]) {
        dailyFlowMap[transactionDate] = 0;
      }
      if (transactionType === "수입") {
        dailyFlowMap[transactionDate] += amount; // 수입은 더한다.
      } else if (transactionType === "지출") {
        dailyFlowMap[transactionDate] -= amount; // 지출은 뺀다.
      }
    });

    // 날짜 순으로 정렬
    return Object.keys(dailyFlowMap)
      .map((date) => ({
        date,
        cashFlow: dailyFlowMap[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜 순 정렬
  }, [validData]);

  // 평균 현금 흐름 계산
  const averageCashFlow = useMemo(() => {
    if (dailyCashFlow.length === 0) return 0;
    const totalFlow = dailyCashFlow.reduce(
      (acc, { cashFlow }) => acc + cashFlow,
      0
    );
    return totalFlow / dailyCashFlow.length;
  }, [dailyCashFlow]);

  // 최대값과 최소값 계산
  const maxCashFlow =
    Math.max(...dailyCashFlow.map((item) => item.cashFlow)) * 1.1;
  const minCashFlow =
    Math.min(...dailyCashFlow.map((item) => item.cashFlow)) * 0.9;

  return (
    <div>
      {/* 시작일과 종료일 표시 (옵션에 따라 결정) */}
      {/* {showPeriod && (
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <strong>
            기간: {startDate} ~ {endDate}
          </strong>
        </div>
      )} */}

      {/* 평균 현금 흐름 표시 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "15px",
          marginTop: "-10px",
        }}
      >
        <strong>
          {averageCashFlow > 0
            ? `+${averageCashFlow.toLocaleString()}`
            : averageCashFlow.toLocaleString()}{" "}
          원 (일당 평균)
        </strong>
      </div>

      {/* 일별 현금 흐름 차트 */}
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={dailyCashFlow}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />{" "}
          {/* 그리드 색상 조정 */}
          <XAxis
            dataKey="date"
            padding={{ left: 20, right: 20 }} // X축에 패딩 추가
            tick={{ fill: "#8884d8", fontSize: 12 }} // X축 텍스트 색상과 크기
          />
          <YAxis
            tickFormatter={(value) => `${(value / 10000).toFixed(0)} 만원`}
            domain={[minCashFlow, maxCashFlow]}
            tick={{ fill: "#8884d8", fontSize: 12 }} // Y축 텍스트 색상과 크기
          />
          <RechartsTooltip
            formatter={(value) => `${value.toLocaleString()} 원`}
            // contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} // 툴팁 스타일 변경
          />
          <Line
            type="monotone"
            dataKey="cashFlow"
            stroke="#FF0000" // 그래프 선 색상 (녹색 계열)
            strokeWidth={2} // 선 두께
            dot={{ r: 5, fill: "#FF0000" }} // 점의 크기와 색상
            activeDot={{ r: 8, stroke: "#ff9800", strokeWidth: 2 }} // 활성 점 스타일
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

DailyCashFlowChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      transactionDate: PropTypes.string.isRequired,
      transactionType: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  showPeriod: PropTypes.bool, // 기간을 표시할지 여부에 대한 옵션
};

export default DailyCashFlowChart;
