// src/pages/Business/components/ui/PredictCashFlowButton.js

import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

const PredictCashFlowButton = ({ onClick, disabled, loading }) => (
  <Button
    type="primary"
    onClick={onClick}
    disabled={disabled}
    loading={loading}
    className={`cashflow-predict-button ${disabled ? "disabled" : ""}`}
    style={{
      position: "fixed",
      backgroundColor: disabled ? "#d9d9d9" : "#1890ff", // 비활성화 시 회색, 활성화 시 기본 파란색
      color: disabled ? "#a3a3a3" : "#fff", // 비활성화 시 텍스트 색상도 변경
    }} // 필요에 따라 스타일 조정
  >
    {loading ? "예측 중..." : "현금 흐름 예측하기"}
  </Button>
);

PredictCashFlowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PredictCashFlowButton;
