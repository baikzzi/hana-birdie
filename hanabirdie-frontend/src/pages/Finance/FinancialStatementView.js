import React from "react";
import "../../assets/css/Finance/FinancialStatementView.css";

const FinancialStatementView = ({ data }) => {
  if (!data || !data.headers || !data.rows) {
    return <p>업로드된 재무상태표 데이터가 없습니다.</p>;
  }

  const currentYear = parseInt(
    data.headers[1].match(/\d+/g)?.join("") || "0",
    10
  );
  const previousYear = currentYear - 1;

  return (
    <div className="financial-statement-management-view">
      <div className="financial-statement-management-table-container">
        <table className="financial-statement-management-table">
          <thead>
            <tr>
              {data.headers && data.headers.length > 2 ? (
                <>
                  <th className="financial-statement-management-header">
                    {data.headers[0] === "과목" ? data.headers[0] : "과목"}
                  </th>
                  <th
                    colSpan={2}
                    className="financial-statement-management-header"
                  >
                    {"제 " + currentYear + " (당) 기"}
                  </th>
                  <th
                    colSpan={2}
                    className="financial-statement-management-header"
                  >
                    {"제 " + previousYear + " (전) 기"}
                  </th>
                </>
              ) : (
                <th>헤더 없음</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.rows && data.rows.length > 0 ? (
              data.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`financial-statement-management-cell ${
                        cell.match(/[\d,]+/) && cellIndex !== 0
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {cell.replace(/\n/g, " ").replace(/\|/g, "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">데이터 없음</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialStatementView;
