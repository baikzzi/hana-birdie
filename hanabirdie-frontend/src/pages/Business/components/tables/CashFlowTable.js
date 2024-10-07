// src/pages/Business/components/tables/CashFlowTable.js

import React from "react";
import { Table, Empty } from "antd"; // Empty 추가
import moment from "moment";
import PropTypes from "prop-types";
import "../../../../assets/css/Business/CashFlowStatement.css"; // 필요시 CSS 파일 경로 확인

const CashFlowTable = ({ dataSource, columns, tableRef }) => {
  // console.log("Received dataSource:", dataSource); // 디버깅용 로그

  if (!dataSource || dataSource.length === 0) {
    return <Empty description="데이터가 없습니다." />;
  }

  // 현재 날짜를 "YYYY-MM-DD" 형태로 가져옴
  const currentDate = moment().startOf("day"); // Dynamic current date

  // Current quarter information
  const currentQuarter = {
    year: currentDate.year(),
    quarter: currentDate.quarter(),
  };

  const updatedColumns = columns.map((col) => {
    if (col.title) {
      // Check if the column title is in "YYYY-MM-DD" format
      const isDay = /^\d{4}-\d{2}-\d{2}$/.test(col.title);
      // Check if the column title is in "YYYY-MM" format
      const isMonth = /^\d{4}-\d{2}$/.test(col.title);
      // Check if the column title is in "YYYY-Q[1-4]" format
      const isQuarter = /^\d{4}-Q[1-4]$/.test(col.title);

      if (isDay || isMonth || isQuarter) {
        let isAfter = false;

        if (isDay) {
          // Parse the day and compare with the current date
          const colDate = moment(col.title, "YYYY-MM-DD");
          isAfter = colDate.isAfter(currentDate, "day");
        } else if (isMonth) {
          // Parse the month and compare with the current date
          const colDate = moment(col.title, "YYYY-MM");
          isAfter = colDate.isAfter(currentDate, "month");
        } else if (isQuarter) {
          // Parse the quarter and compare with the current quarter
          const [year, q] = col.title.split("-Q");
          const quarterDate = moment(`${year}-01`, "YYYY-MM").add(
            (parseInt(q) - 1) * 3,
            "months"
          );
          const colQuarter = {
            year: quarterDate.year(),
            quarter: quarterDate.quarter(),
          };
          // Determine if the column's quarter is after the current quarter
          if (colQuarter.year > currentQuarter.year) {
            isAfter = true;
          } else if (colQuarter.year === currentQuarter.year) {
            if (colQuarter.quarter > currentQuarter.quarter) {
              isAfter = true;
            }
          }
        }

        return {
          ...col,
          onHeaderCell: () => ({
            className: isAfter ? "predicted" : "",
          }),
          onCell: (record) => ({
            style: {
              textAlign:
                typeof record[col.dataIndex] === "number" ? "right" : "left",
            },
          }),
        };
      }
    }
    return col;
  });

  return (
    <div style={{ overflowX: "auto" }} ref={tableRef}>
      <Table
        columns={updatedColumns}
        dataSource={dataSource}
        pagination={false}
        // rowKey="key"
        rowKey={(record) =>
          record.key ||
          `${record.category}-${record.transactionDate || record.amount}-${
            record.description || ""
          }`
        } // 고유한 key 설정 강화
        expandable={{
          childrenColumnName: "children",
        }}
        scroll={{ x: "100%" }}
      />
    </div>
  );
};

// PropTypes 정의 (선택 사항)
CashFlowTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  tableRef: PropTypes.object,
};

export default CashFlowTable;
