// src/pages/Business/components/tables/DailyCashFlowTable.js

import React from "react";
import { Table, Empty } from "antd";
import PropTypes from "prop-types";
import "../../../../assets/css/Business/CashFlowStatement.css"; // CSS 경로 수정

const DailyCashFlowTable = ({ dataSource, columns, isDataFetched }) => {
  // console.log("in Tabe : ", dataSource);
  if (!isDataFetched) {
    return <Empty description="현금흐름을 확인할 날짜(기간)을 지정하세요" />;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        columns={columns} // 외부에서 받은 columns 사용
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) =>
          record.key ||
          `${record.category}-${record.transactionDate}-${record.description}-${record.amount}`
        } // 고유한 key 설정 강화
        scroll={{ x: "100%" }}
      />
    </div>
  );
};

// PropTypes 정의 (선택 사항)
DailyCashFlowTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired, // 외부에서 받은 columns prop 정의
  isDataFetched: PropTypes.bool.isRequired,
};

export default DailyCashFlowTable;
