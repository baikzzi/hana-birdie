import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import PropTypes from "prop-types";

// 사용자 정의 Dot 컴포넌트
const CustomizedDot = (props) => {
  const { cx, cy, stroke, index, dataLength, isPredicted } = props;
  const isFutureData = isPredicted && index >= dataLength - 12;

  return (
    <circle
      cx={cx}
      cy={cy}
      r="3"
      stroke={isFutureData ? "#00b6b6" : "#FF0000"}
      fill="#fff"
    />
  );
};

const RunwayChart = ({ data, isPredicted }) => {
  const minRunway = Math.min(...data.map((item) => item.runway));
  const maxRunway = Math.max(...data.map((item) => item.runway));

  const adjustedMinRunway = minRunway - Math.abs(minRunway) * 0.1;
  const adjustedMaxRunway = maxRunway + Math.abs(maxRunway) * 0.1;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" hide />
        <YAxis domain={[adjustedMinRunway, adjustedMaxRunway]} hide />
        <RechartsTooltip
          formatter={(value) =>
            value === Infinity ? "∞" : `${value.toFixed(1)}개월`
          }
        />
        <Line
          type="monotone"
          dataKey="runway"
          stroke="#FF0000"
          name="Runway (개월)"
          dot={(dotProps) => (
            <CustomizedDot
              {...dotProps}
              dataLength={data.length}
              isPredicted={isPredicted}
            />
          )}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

RunwayChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      runway: PropTypes.number.isRequired,
    })
  ).isRequired,
  isPredicted: PropTypes.bool.isRequired,
};

export default RunwayChart;
