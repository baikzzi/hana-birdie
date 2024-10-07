import React, { useState } from "react";
import { Segmented, DatePicker, Select, Button } from "antd"; // Button 추가
import PropTypes from "prop-types";

const { RangePicker, MonthPicker } = DatePicker;
const { Option } = Select;

const TopMenu = ({
  timeFrame,
  handleTimeFrameChange,
  selectedDates,
  handleDateChange,
  handleQuarterChange,
  generateQuarterOptions,
  handleFetchDailyData, // 새로 추가된 prop
  loading, // 새로 추가된 prop
  handleFetchPastData, // 과거 데이터 가져오기 버튼 클릭 시 실행되는 함수
  isPastDataFetched,
}) => {
  const [hoverStyle, setHoverStyle] = useState({});

  const handleMouseEnter = () => {
    setHoverStyle({ backgroundColor: "#27a596" });
  };

  const handleMouseLeave = () => {
    setHoverStyle({});
  };
  const renderDatePicker = () => {
    switch (timeFrame) {
      case "day":
        return (
          <div
            className="date-picker-container"
            style={{ display: "flex", alignItems: "center", marginTop: 16 }}
          >
            <RangePicker
              onChange={handleDateChange}
              value={selectedDates}
              // picker={timeFrame === "week" ? "week" : undefined}
              // format={timeFrame === "week" ? undefined : "YYYY-MM-DD"}
              format="YYYY-MM-DD" // 날짜 포맷 지정
              className={`cash-flow-dashboard-${timeFrame}-picker`}
            />
            <Button
              type="primary"
              onClick={handleFetchDailyData}
              loading={loading}
              style={{ marginLeft: 8, ...hoverStyle }}
              className="fetch-data-button" // 클래스 이름 추가
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              기록 불러오기
            </Button>
          </div>
        );
      // case "week":
      // case "month":
      //   return (
      //     <MonthPicker
      //       onChange={handleDateChange}
      //       value={selectedDates[0]}
      //       format="YYYY-MM"
      //       className="cash-flow-dashboard-month-picker"
      //     />
      //   );
      // case "quarter":
      //   return (
      //     <Select
      //       placeholder="Select Quarter"
      //       onChange={handleQuarterChange}
      //       className="cash-flow-dashboard-quarter-select"
      //       style={{ width: 120 }}
      //       allowClear
      //     >
      //       <Option value="전체">전체</Option>
      //       {generateQuarterOptions().map((quarter) => (
      //         <Option key={quarter} value={quarter}>
      //           {quarter}
      //         </Option>
      //       ))}
      //     </Select>
      //   );
      case "month":
      case "quarter":
        return (
          <div
            className="past-data-button-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button
              type="primary"
              onClick={handleFetchPastData}
              loading={loading}
              style={{
                marginLeft: 8,
                backgroundColor: "#008485",
                ...hoverStyle,
              }}
              className={`fetch-past-data-button ${
                !isPastDataFetched ? "breathing-button" : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              과거 기록 불러오기
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cash-flow-dashboard-header">
      <div className="cash-flow-dashboard-title-group">
        <h3 className="cash-flow-dashboard-title ant-typography">손익 현황</h3>
        <div
          className="cash-flow-dashboard-divider ant-divider ant-divider-vertical"
          role="separator"
        ></div>
      </div>
      <div className="cash-flow-dashboard-controls">
        <div className="cash-flow-dashboard-timeframe-picker">
          <Segmented
            options={[
              { label: "일", value: "day" },
              { label: "월", value: "month" },
              { label: "분기", value: "quarter" },
            ]}
            value={timeFrame}
            onChange={handleTimeFrameChange}
            className="cash-flow-dashboard-segmented"
          />
          {renderDatePicker()}
        </div>
      </div>
    </div>
  );
};

TopMenu.propTypes = {
  timeFrame: PropTypes.string.isRequired,
  handleTimeFrameChange: PropTypes.func.isRequired,
  selectedDates: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
    .isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleQuarterChange: PropTypes.func.isRequired,
  generateQuarterOptions: PropTypes.func.isRequired,
  handleFetchDailyData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleFetchPastData: PropTypes.func.isRequired, // 과거 데이터 가져오기 버튼 클릭 시 실행되는 함수
};

export default TopMenu;
