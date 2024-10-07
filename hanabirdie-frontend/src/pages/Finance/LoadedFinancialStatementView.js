// LoadedFinancialStatementView.js
import React from "react";

const LoadedFinancialStatementView = ({ rows, thstrmNum }) => {
  if (!rows || rows.length === 0) {
    return <p>선택된 년도의 재무상태표 데이터가 없습니다.</p>;
  }

  return (
    <div className="financial-statement-management-view">
      <div className="financial-statement-management-table-container">
        <table className="financial-statement-management-table">
          <thead>
            <tr>
              <th rowSpan="2" className="financial-statement-management-header">
                과목
              </th>
              <th colSpan="2" className="financial-statement-management-header">
                {"제 " + thstrmNum + " (당) 기"}
              </th>
              <th colSpan="2" className="financial-statement-management-header">
                {"제 " + (thstrmNum - 1) + " (전) 기"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`financial-statement-management-cell ${
                      /^[\d,()]+$/.test(cell) && cellIndex !== 0
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {cell?.replace(/\n/g, " ").replace(/\|/g, "") || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadedFinancialStatementView;
