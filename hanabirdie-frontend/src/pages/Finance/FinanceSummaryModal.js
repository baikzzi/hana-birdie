// FinanceSummaryModal.jsx

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more"; // Highcharts More 모듈
import HighchartsSolidGauge from "highcharts/modules/solid-gauge"; // Solid Gauge 모듈
import "../../assets/css/Finance/FinanceSummaryModal.css"; // CSS 파일 임포트
import redLight from "../../assets/png/redLight.png"; // 이미지 임포트 (이미지가 있는 경우)
import greenLight from "../../assets/png/greenLight.png"; // 이미지 임포트 (이미지가 있는 경우)

// Highcharts 모듈 초기화
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

const FinanceSummaryModal = ({ showModal, closeModal, financialData }) => {
  // 샘플 데이터 정의
  const sampleData = {
    liquidityRatio: 150, // 유동비율
    debtRatio: 60, // 부채비율
    totalAssetReturn: 2.4, // 총자산수익률
    totalSales: 50000000, // 총매출액
    costOfSales: 30000000, // 매출원가
    netIncome: 20000000, // 당기순이익
    previousTotalSales: 45000000, // 전기 총매출액
    previousCostOfSales: 28000000, // 전기 매출원가
    previousNetIncome: 18000000, // 전기 당기순이익
  };

  // financialData가 없거나 일부 속성이 없을 경우 샘플 데이터 사용
  const data = financialData || sampleData;

  // 데이터 속성이 없을 경우 샘플 데이터에서 가져오기
  const {
    liquidityRatio = sampleData.liquidityRatio,
    debtRatio = sampleData.debtRatio,
    totalAssetReturn = sampleData.totalAssetReturn,
    totalSales = sampleData.totalSales,
    costOfSales = sampleData.costOfSales,
    netIncome = sampleData.netIncome,
    previousTotalSales = sampleData.previousTotalSales,
    previousCostOfSales = sampleData.previousCostOfSales,
    previousNetIncome = sampleData.previousNetIncome,
  } = data;

  // 전기 대비 값 계산
  const salesDiff = totalSales - previousTotalSales;
  const costOfSalesDiff = costOfSales - previousCostOfSales;
  const netIncomeDiff = netIncome - previousNetIncome;

  // 전기 대비 퍼센트 계산 (전기 매출액, 매출원가, 당기순이익이 0이 아닐 때만 계산)
  const salesDiffPercent =
    previousTotalSales !== 0 ? (salesDiff / previousTotalSales) * 100 : 0;
  const costOfSalesDiffPercent =
    previousCostOfSales !== 0
      ? (costOfSalesDiff / previousCostOfSales) * 100
      : 0;
  const netIncomeDiffPercent =
    previousNetIncome !== 0 ? (netIncomeDiff / previousNetIncome) * 100 : 0;

  // 게이지 차트 옵션 정의
  const getGaugeOptions = (title, value, min, max, threshold) => ({
    chart: {
      type: "solidgauge",
      // height과 width는 CSS로 관리
    },
    title: {
      text: title,
      align: "center",
      verticalAlign: "middle",
      y: 0,
      useHTML: true,
    },
    tooltip: {
      enabled: false,
    },
    pane: {
      center: ["50%", "50%"],
      size: "100%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },
    yAxis: {
      min: min,
      max: max,
      stops: [
        [threshold / max, "#DF5353"], // 빨간색
        [1, "#55BF3B"], // 초록색
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
        text: "",
      },
      labels: {
        y: 16,
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
          format: `<div style="text-align:center">
                    <span style="font-size:25px">{y}</span>
                    <span style="font-size:12px">%</span>
                  </div>`,
        },
      },
    },
    series: [
      {
        name: title,
        data: [value],
        dataLabels: {
          format:
            '<div style="text-align:center"><span style="font-size:25px">{y}</span><span style="font-size:12px">%</span></div>',
        },
        tooltip: {
          valueSuffix: " %",
        },
        color: value >= threshold ? "#55BF3B" : "#DF5353", // 임계값에 따라 색상 변경
      },
    ],
    credits: {
      enabled: false,
    },
  });

  return (
    <div className={`finance-modal ${showModal ? "show" : ""}`}>
      <div className="finance-modal-overlay" onClick={closeModal}></div>
      <div className="finance-modal-content">
        <button className="finance-modal-close" onClick={closeModal}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2>재무 요약</h2>
        <div className="FinanceSummaryModal-top">
          <div className="finance-key-info-image">
            {/* 유동비율에 따라 이미지 조건부 렌더링 */}
            <img
              src={liquidityRatio >= 100 ? greenLight : redLight}
              alt={liquidityRatio >= 100 ? "좋음" : "주의"}
            />
          </div>
          <div className="finance-key-info">
            <h4>주요 재무 정보</h4>
            <ul>
              <li>
                <strong>총매출액:</strong> {totalSales.toLocaleString()}
                원&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  style={{
                    color: salesDiff >= 0 ? "red" : "blue",
                  }}
                >
                  {salesDiff >= 0
                    ? `+${salesDiffPercent.toFixed(2)}% 전기 대비`
                    : `${salesDiffPercent.toFixed(2)}% 전기 대비`}
                </span>
              </li>
              <li>
                <strong>매출원가:</strong> {costOfSales.toLocaleString()}
                원&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  style={{
                    color: costOfSalesDiff >= 0 ? "red" : "blue",
                  }}
                >
                  {costOfSalesDiff >= 0
                    ? `+${costOfSalesDiffPercent.toFixed(2)}% 전기 대비`
                    : `${costOfSalesDiffPercent.toFixed(2)}% 전기 대비`}
                </span>
              </li>
              <li>
                <strong>당기순이익:</strong> {netIncome.toLocaleString()}
                원&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  style={{
                    color: netIncomeDiff >= 0 ? "red" : "blue",
                  }}
                >
                  {netIncomeDiff >= 0
                    ? `+${netIncomeDiffPercent.toFixed(2)}% 전기 대비`
                    : `${netIncomeDiffPercent.toFixed(2)}% 전기 대비`}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="finance-charts-container">
          <div className="finance-chart">
            <HighchartsReact
              highcharts={Highcharts}
              options={getGaugeOptions("유동비율", liquidityRatio, 0, 200, 100)}
            />
            <h4>
              유동비율
              <span className="tooltip">
                <span className="material-symbols-outlined">help_outline</span>
                <span className="tooltiptext">
                  유동자산 / 유동부채를 의미하며, 100%이상의 경우 안정성이
                  높습니다.
                </span>
              </span>
            </h4>
          </div>
          <div className="finance-chart">
            <HighchartsReact
              highcharts={Highcharts}
              options={getGaugeOptions("부채비율", debtRatio, 0, 100, 50)}
            />
            <h4>
              부채비율
              <span className="tooltip">
                <span className="material-symbols-outlined">help_outline</span>
                <span className="tooltiptext">
                  부채총계 / 자산총계 * 100으로 낮을수록 기업의 재무적 안정성이
                  높습니다.
                </span>
              </span>
            </h4>
          </div>
          <div className="finance-chart">
            <HighchartsReact
              highcharts={Highcharts}
              options={getGaugeOptions(
                "총자산수익률",
                totalAssetReturn,
                0,
                10,
                5
              )}
            />
            <h4>
              총자산수익률
              <span className="tooltip">
                <span className="material-symbols-outlined">help_outline</span>
                <span className="tooltiptext">
                  당기순이익 / 자산총계 * 100으로, 주어진 총 자산을 얼마나
                  효율적으로 이용했는지를 측정하는 수익성 지표입니다.
                </span>
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceSummaryModal;
