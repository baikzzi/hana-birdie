import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

const COLORS = ["#00C49F", "#FF8042"]; // 현금유입과 현금유출을 위한 색상

const DonutChart = ({ data }) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0); // 전체 값 계산

  const renderLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10; // 라벨 위치 조정 (기본 반지름 + 오프셋)
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"} // 중앙을 기준으로 좌우 정렬
        dominantBaseline="central"
      >
        {`${((value / total) * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40} // 내부 반지름 크기 조정
            outerRadius={70} // 외부 반지름 크기 조정
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            label={renderLabel} // 커스텀 라벨
            labelLine={false} // 라벨 라인 제거
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <RechartsTooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* 설명 추가 */}
      <div style={{ marginTop: 8 }}>
        <div style={{ display: "inline-block", marginRight: 20 }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              backgroundColor: "#00C49F",
              marginRight: 5,
            }}
          />
          현금유입
        </div>
        <div style={{ display: "inline-block" }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              backgroundColor: "#FF8042",
              marginRight: 5,
            }}
          />
          현금유출
        </div>
      </div>
    </div>
  );
};

DonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DonutChart;
