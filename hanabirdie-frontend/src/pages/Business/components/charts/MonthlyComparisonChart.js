// src/pages/Business/components/charts/MonthlyComparisonChart.js

import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

// 날짜순으로 데이터를 정렬하는 유틸리티 함수
const sortByDate = (data) => {
  return [...data].sort((a, b) => new Date(a.month) - new Date(b.month));
};

const MonthlyComparisonChart = ({ data }) => {
  // 날짜 정렬된 데이터를 사용
  const sortedData = sortByDate(data);

  const minValue = Math.min(
    ...sortedData.map((item) => Math.min(item.매출, item.매입))
  );
  const maxValue = Math.max(
    ...sortedData.map((item) => Math.max(item.매출, item.매입))
  );

  const adjustedMinValue = minValue - Math.abs(minValue) * 0.1;
  const adjustedMaxValue = maxValue + Math.abs(maxValue) * 0.1;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={sortedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" reversed={false} />
        <YAxis
          domain={[adjustedMinValue, adjustedMaxValue]}
          tickFormatter={(value) => `${(value / 100000000).toFixed(2)}억`}
        />
        <RechartsTooltip formatter={(value) => value.toLocaleString()} />
        <Bar dataKey="매출" fill="#8884d8" />
        <Bar dataKey="매입" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

MonthlyComparisonChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      매출: PropTypes.number.isRequired,
      매입: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MonthlyComparisonChart;
