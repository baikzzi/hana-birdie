// src/pages/Business/components/charts/CashFlowSummaryChart.js

import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

const CashFlowSummaryChart = ({ data }) => {
  // 12개월 현금유입과 현금유출 차이의 합 계산
  const totalDifference = data.reduce((sum, item) => sum + item.차이, 0);

  const minValue = Math.min(...data.map((item) => item.차이));
  const maxValue = Math.max(...data.map((item) => item.차이));

  const adjustedMinValue = minValue - Math.abs(minValue) * 0.1;
  const adjustedMaxValue = maxValue + Math.abs(maxValue) * 0.1;

  return (
    <div>
      {/* 12개월 차이의 합 텍스트로 표시 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
          marginTop: "-10px",
        }}
      >
        <strong>
          {" "}
          {totalDifference > 0
            ? `+${totalDifference.toLocaleString()}`
            : totalDifference.toLocaleString()}{" "}
          원
        </strong>
      </div>

      {/* 꺾은선 차트 */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[adjustedMinValue, adjustedMaxValue]}
            tickFormatter={(value) => `${(value / 100000000).toFixed(0)}억`}
          />
          <RechartsTooltip formatter={(value) => value.toLocaleString()} />
          <Line
            type="monotone"
            dataKey="차이"
            stroke="#00b6b6"
            name="유입 - 유출 "
            dot={{ r: 3 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
CashFlowSummaryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      현금유입: PropTypes.number.isRequired,
      현금유출: PropTypes.number.isRequired,
      차이: PropTypes.number.isRequired, // 차이를 추가
    })
  ).isRequired,
};

export default CashFlowSummaryChart;
