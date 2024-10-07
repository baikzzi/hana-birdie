// src/components/MonthStatus.jsx
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "../../assets/css/Business/MonthStatus.css";

const MonthStatus = ({ data }) => {
  const [month, setMonth] = useState("");
  const [salesData, setSalesData] = useState({
    currentSales: 0,
    currentCost: 0,
    yearlySales: 0,
    recentSales: 0,
    recentCost: 0,
  });

  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태 추가

  useEffect(() => {
    if (data.length === 0) return;

    const latestMonth = getLatestMonth(data);
    setMonth(latestMonth);

    // 데이터 업데이트
    const updatedData = calculateSalesData(latestMonth, data);
    setSalesData(updatedData);
  }, [data]);

  const getLatestMonth = (data) => {
    // 데이터에서 가장 최신의 월을 찾습니다.
    const months = data.map((item) => item.month);
    const uniqueMonths = [...new Set(months)];
    uniqueMonths.sort(); // 오름차순 정렬
    return uniqueMonths[uniqueMonths.length - 1]; // 가장 최신의 월
  };

  const calculateSalesData = (currentMonth, data) => {
    const currentYear = currentMonth.substring(0, 4);

    // 현재 월의 데이터 필터링
    const currentMonthData = data.filter((item) => item.month === currentMonth);

    const currentSales =
      currentMonthData.find((item) => item.transactionType === "수입")
        ?.amount || 0;

    const currentCost =
      currentMonthData.find((item) => item.transactionType === "지출")
        ?.amount || 0;

    // 이전 월 데이터 필터링
    const previousMonth = getPreviousMonth(currentMonth, data);
    const previousMonthData = data.filter(
      (item) => item.month === previousMonth
    );

    const recentSales =
      previousMonthData.find((item) => item.transactionType === "수입")
        ?.amount || 0;

    const recentCost =
      previousMonthData.find((item) => item.transactionType === "지출")
        ?.amount || 0;

    // 연간 총 매출액 계산 (해당 연도의 모든 수입 합산)
    const yearlySales = data
      .filter(
        (item) =>
          item.month.startsWith(currentYear) && item.transactionType === "수입"
      )
      .reduce((total, item) => total + item.amount, 0);

    return {
      currentSales,
      currentCost,
      yearlySales,
      recentSales,
      recentCost,
    };
  };

  const getPreviousMonth = (currentMonth, data) => {
    const [year, month] = currentMonth.split("-");
    let prevYear = parseInt(year);
    let prevMonth = parseInt(month) - 1;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear -= 1;
    }
    const prevMonthFormatted =
      prevMonth < 10 ? `${prevYear}-0${prevMonth}` : `${prevYear}-${prevMonth}`;

    // 이전 월 데이터가 존재하는지 확인
    const exists = data.some((item) => item.month === prevMonthFormatted);
    if (exists) {
      return prevMonthFormatted;
    } else {
      // 이전 월 데이터가 없으면 현재 월로 설정
      return currentMonth;
    }
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);

    // 애니메이션 시작
    setIsAnimating(true);

    // 짧은 지연 후 데이터 업데이트
    setTimeout(() => {
      const updatedData = calculateSalesData(selectedMonth, data);
      setSalesData(updatedData);
      setIsAnimating(false); // 애니메이션 종료
    }, 500); // 500ms 지연
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-row">
        <div className="dashboard-col-md-10 dashboard-main">
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h2>
                {month.substring(0, 4)}년 {month.substring(5, 7)}월 현황
              </h2>
            </div>

            <div className="dashboard-d-flex dashboard-justify-content-start dashboard-mb-3 dashboard-mt-4">
              <input
                type="month"
                value={month}
                className="dashboard-month-select"
                onChange={handleMonthChange}
              />
            </div>

            <div className="dashboard-bs-top1">
              {/* 매출액 */}
              <div className="dashboard-top1 dashboard-green-bg">
                <h4>매출액</h4>
                <p>
                  <CountUp
                    start={
                      isAnimating
                        ? salesData.recentSales
                        : salesData.currentSales
                    }
                    end={salesData.currentSales}
                    duration={0.5}
                    separator=","
                  />
                  원
                </p>
                <h5>
                  전월대비{" "}
                  {salesData.currentSales - salesData.recentSales >= 0
                    ? `+${(
                        salesData.currentSales - salesData.recentSales
                      ).toLocaleString()}`
                    : (
                        salesData.currentSales - salesData.recentSales
                      ).toLocaleString()}{" "}
                  원
                </h5>
              </div>

              {/* 연간 총매출액 */}
              <div className="dashboard-top1 dashboard-purple-bg">
                <h4>연간 총매출액</h4>
                <p>
                  <CountUp
                    start={isAnimating ? 0 : salesData.yearlySales}
                    end={salesData.yearlySales}
                    duration={0.5}
                    separator=","
                  />
                  원
                </p>
                <h5>{month.substring(0, 4)}년 총 매출액입니다</h5>
              </div>

              {/* 지출액 */}
              <div className="dashboard-top1 dashboard-red-bg">
                <h4>지출액</h4>
                <p>
                  <CountUp
                    start={
                      isAnimating ? salesData.recentCost : salesData.currentCost
                    }
                    end={salesData.currentCost}
                    duration={0.5}
                    separator=","
                  />
                  원
                </p>
                <h5>
                  전월대비{" "}
                  {salesData.currentCost - salesData.recentCost >= 0
                    ? `+${(
                        salesData.currentCost - salesData.recentCost
                      ).toLocaleString()}`
                    : (
                        salesData.currentCost - salesData.recentCost
                      ).toLocaleString()}{" "}
                  원
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthStatus;
