// FinanceMain.jsx

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "../../assets/css/Finance/FinanceMain.css";
import Loading from "../../components/Loading/Loading";
import likeImg from "../../assets/png/like.png";
import emergency from "../../assets/png/emergency.png";

// 드릴다운 모듈 초기화
HighchartsDrilldown(Highcharts);

// NaN 값 처리 함수
const formatValue = (value, fallback = "??", decimals = 2) => {
  return value !== undefined && !isNaN(value)
    ? value.toFixed(decimals)
    : fallback;
};

const FinanceMain = () => {
  const [accountingPeriod, setAccountingPeriod] = useState("");
  const [liquidity, setLiquidity] = useState(0); // 유동성
  const [showModal, setShowModal] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [loadingDuration, setLoadingDuration] = useState(3); // 사용자 정의 로딩 시간 (초)
  const navigate = useNavigate();

  // 상태 변수 구조: 자산, 부채, 손익계산서 등 포함
  const [balanceSheetData, setBalanceSheetData] = useState({
    // 자산
    thstrmCurrentAssets: 0, // 당기 유동자산
    frmtrmCurrentAssets: 0, // 전기 유동자산
    thstrmNonCurrentAssets: 0, // 당기 비유동자산
    frmtrmNonCurrentAssets: 0, // 전기 비유동자산

    // 부채
    thstrmCurrentLiabilities: 0, // 당기 유동부채
    frmtrmCurrentLiabilities: 0, // 전기 유동부채
    thstrmNonCurrentLiabilities: 0, // 당기 비유동부채
    frmtrmNonCurrentLiabilities: 0, // 전기 비유동부채

    // 총계
    thstrmTotalAssets: 0, // 당기 자산총계
    frmtrmTotalAssets: 0, // 전기 자산총계
    thstrmTotalLiabilities: 0, // 당기 부채총계
    frmtrmTotalLiabilities: 0, // 전기 부채총계

    // 손익계산서
    thstrmNetIncome: 0, // 당기 순이익
    frmtrmNetIncome: 0, // 전기 순이익
    thstrmTotalSales: 0, // 당기 총매출액
    frmtrmTotalSales: 0, // 전기 총매출액
    thstrmCostOfSales: 0, // 당기 매출원가
    frmtrmCostOfSales: 0, // 전기 매출원가

    // 비율
    currentRatio: 0, // 유동비율
    debtRatio: 0, // 부채비율
    totalAssetReturn: 0, // 총자산수익률
  });

  // 총자산 계산 함수
  const calculateTotalAssets = (isThstrm = true) => {
    return isThstrm
      ? balanceSheetData.thstrmCurrentAssets +
          balanceSheetData.thstrmNonCurrentAssets
      : balanceSheetData.frmtrmCurrentAssets +
          balanceSheetData.frmtrmNonCurrentAssets;
  };

  // 총부채 계산 함수
  const calculateTotalLiabilities = (isThstrm = true) => {
    return isThstrm
      ? balanceSheetData.thstrmCurrentLiabilities +
          balanceSheetData.thstrmNonCurrentLiabilities
      : balanceSheetData.frmtrmCurrentLiabilities +
          balanceSheetData.frmtrmNonCurrentLiabilities;
  };

  // 유동비율 계산 함수
  const calculateCurrentRatio = () => {
    const thstrmCurrentAssets = balanceSheetData.thstrmCurrentAssets;
    const thstrmCurrentLiabilities = balanceSheetData.thstrmCurrentLiabilities;
    return thstrmCurrentLiabilities !== 0
      ? (thstrmCurrentAssets / thstrmCurrentLiabilities) * 100
      : NaN;
  };

  // 부채비율 계산 함수
  const calculateDebtRatio = () => {
    const thstrmTotalAssets = calculateTotalAssets(true);
    const thstrmTotalLiabilities = calculateTotalLiabilities(true);
    return thstrmTotalAssets !== 0
      ? (thstrmTotalLiabilities / thstrmTotalAssets) * 100
      : NaN;
  };

  // 총자산수익률 계산 함수
  const calculateTotalAssetReturn = () => {
    const thstrmTotalAssets = calculateTotalAssets(true);
    if (thstrmTotalAssets > 0) {
      return (balanceSheetData.thstrmNetIncome / thstrmTotalAssets) * 100;
    }
    return NaN;
  };
  // 매출 증가율 계산 함수
  const calculateSalesDiff = () => {
    const { thstrmTotalSales, frmtrmTotalSales } = balanceSheetData;
    return frmtrmTotalSales !== 0
      ? ((thstrmTotalSales - frmtrmTotalSales) / frmtrmTotalSales) * 100
      : NaN;
  };

  // 매출원가 증가율 계산 함수
  const calculateCostOfSalesDiff = () => {
    const { thstrmCostOfSales, frmtrmCostOfSales } = balanceSheetData;
    return frmtrmCostOfSales !== 0
      ? ((thstrmCostOfSales - frmtrmCostOfSales) / frmtrmCostOfSales) * 100
      : NaN;
  };

  // 당기순이익 증가율 계산 함수
  const calculateNetIncomeDiff = () => {
    const { thstrmNetIncome, frmtrmNetIncome } = balanceSheetData;
    return frmtrmNetIncome !== 0
      ? ((thstrmNetIncome - frmtrmNetIncome) / frmtrmNetIncome) * 100
      : NaN;
  };

  // 유동성 계산 함수 (당기 유동자산을 유동성으로 정의)
  const calculateLiquidity = () => {
    return balanceSheetData.thstrmCurrentAssets;
  };

  // 자산비율 계산 함수
  const calculateAssetRatios = () => {
    const { thstrmCurrentAssets, thstrmNonCurrentAssets } = balanceSheetData;
    const total = thstrmCurrentAssets + thstrmNonCurrentAssets;
    return [
      {
        name: "유동자산",
        y: thstrmCurrentAssets,
        drilldown: "current-assets-drilldown",
      },
      {
        name: "비유동자산",
        y: thstrmNonCurrentAssets,
        drilldown: "non-current-assets-drilldown",
      },
    ];
  };

  // 드릴다운 시리즈 데이터 생성 함수
  const getDrilldownSeries = () => {
    const { thstrmCurrentAssets, thstrmNonCurrentAssets, thstrmNetIncome } =
      balanceSheetData;

    // 유동자산 드릴다운
    const currentAssetsDrilldown = {
      id: "current-assets-drilldown",
      data: [
        {
          name: "당좌자산",
          y: 2877238860, // 당기 당좌자산
          drilldown: "short-term-assets-drilldown",
        },
        {
          name: "재고자산",
          y: 443485933, // 당기 재고자산
          drilldown: "inventory-assets-drilldown",
        },
      ],
    };

    // 비유동자산 드릴다운
    const nonCurrentAssetsDrilldown = {
      id: "non-current-assets-drilldown",
      data: [
        {
          name: "투자자산",
          y: 2045027128, // 당기 투자자산
          drilldown: "investment-assets-drilldown",
        },
        {
          name: "유형자산",
          y: 241795737765, // 당기 유형자산
          drilldown: "tangible-assets-drilldown",
        },
        {
          name: "기타비유동자산",
          y: 495701380, // 당기 기타비유동자산
        },
      ],
    };

    // 단기자산 드릴다운
    const shortTermAssetsDrilldown = {
      id: "short-term-assets-drilldown",
      data: [
        {
          name: "현금및현금성자산",
          y: 2390525498,
        },
        {
          name: "단기금융상품",
          y: 600000000,
        },
        {
          name: "매출채권",
          y: 337020400,
        },
        {
          name: "미수금",
          y: 17017785,
        },
        {
          name: "선급금",
          y: 17500000,
        },
        {
          name: "선급비용",
          y: 115175177,
        },
      ],
    };

    // 재고자산 드릴다운
    const inventoryAssetsDrilldown = {
      id: "inventory-assets-drilldown",
      data: [
        {
          name: "식재료",
          y: 99686093,
        },
        {
          name: "저장품",
          y: 343799840,
        },
      ],
    };

    // 투자자산 드릴다운
    const investmentAssetsDrilldown = {
      id: "investment-assets-drilldown",
      data: [
        {
          name: "장기금융상품",
          y: 2019808520,
        },
        {
          name: "퇴직연금운용자산",
          y: 25217608,
        },
        {
          name: "매도가능증권",
          y: 1000,
        },
      ],
    };

    // 유형자산 드릴다운
    const tangibleAssetsDrilldown = {
      id: "tangible-assets-drilldown",
      data: [
        {
          name: "토지",
          y: 197689934500,
        },
        {
          name: "건물",
          y: 27805461779, // 전기 건물 값 수정
        },
        {
          name: "구축물",
          y: 44738181167,
        },
        {
          name: "기계장치",
          y: 1788590770,
        },
        {
          name: "차량운반구",
          y: 7289860416,
        },
        {
          name: "공기구비품",
          y: 2803007884,
        },
        {
          name: "조경",
          y: 11221058051,
        },
        {
          name: "기타의유형자산",
          y: 35000000,
        },
      ],
    };

    // 기타비유동자산 드릴다운
    const otherNonCurrentAssetsDrilldown = {
      id: "other-non-current-assets-drilldown",
      data: [
        {
          name: "보증금",
          y: 465690380,
        },
      ],
    };

    return [
      currentAssetsDrilldown,
      nonCurrentAssetsDrilldown,
      shortTermAssetsDrilldown,
      inventoryAssetsDrilldown,
      investmentAssetsDrilldown,
      tangibleAssetsDrilldown,
      otherNonCurrentAssetsDrilldown,
    ];
  };

  // 차트 옵션 설정
  const getChartOptions = () => {
    return {
      chart: {
        type: "pie",
        width: 550,
        height: 450,
      },
      title: {
        text: "자산비율",
        x: 6,
        y: 50,
        style: {
          fontSize: "25px",
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: isDataLoaded,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      colors: ["#61c0bf", "#a1c4fd"], // 유동자산, 비유동자산 색상
      series: [
        {
          name: "비율",
          colorByPoint: true,
          data: calculateAssetRatios(),
        },
      ],
      drilldown: {
        series: getDrilldownSeries(),
      },
    };
  };

  // 총부채 및 자산총계 계산 함수
  const calculateTotals = () => {
    const thstrmTotalAssets = calculateTotalAssets(true);
    const frmtrmTotalAssets = calculateTotalAssets(false);
    const thstrmTotalLiabilities = calculateTotalLiabilities(true);
    const frmtrmTotalLiabilities = calculateTotalLiabilities(false);
    return {
      thstrmTotalAssets,
      frmtrmTotalAssets,
      thstrmTotalLiabilities,
      frmtrmTotalLiabilities,
    };
  };

  // 비율 계산 함수
  const calculateRatios = () => {
    const currentRatio = calculateCurrentRatio();
    const debtRatio = calculateDebtRatio();
    const totalAssetReturn = calculateTotalAssetReturn();
    return { currentRatio, debtRatio, totalAssetReturn };
  };

  // useEffect 훅 업데이트: 총계 및 비율 계산, 차트 렌더링
  useEffect(() => {
    const {
      thstrmTotalAssets,
      frmtrmTotalAssets,
      thstrmTotalLiabilities,
      frmtrmTotalLiabilities,
    } = calculateTotals();
    const { currentRatio, debtRatio, totalAssetReturn } = calculateRatios();

    setBalanceSheetData((prevData) => ({
      ...prevData,
      thstrmTotalAssets: thstrmTotalAssets,
      frmtrmTotalAssets: frmtrmTotalAssets,
      thstrmTotalLiabilities: thstrmTotalLiabilities,
      frmtrmTotalLiabilities: frmtrmTotalLiabilities,
      currentRatio: currentRatio,
      debtRatio: debtRatio,
      totalAssetReturn: totalAssetReturn,
    }));

    // 유동성 계산하여 상태 업데이트
    setLiquidity(calculateLiquidity());

    // 차트는 HighchartsReact 컴포넌트가 자동으로 업데이트합니다.
  }, [
    balanceSheetData.thstrmCurrentAssets,
    balanceSheetData.frmtrmCurrentAssets,
    balanceSheetData.thstrmNonCurrentAssets,
    balanceSheetData.frmtrmNonCurrentAssets,
    balanceSheetData.thstrmCurrentLiabilities,
    balanceSheetData.frmtrmCurrentLiabilities,
    balanceSheetData.thstrmNonCurrentLiabilities,
    balanceSheetData.frmtrmNonCurrentLiabilities,
    balanceSheetData.thstrmNetIncome,
    balanceSheetData.frmtrmNetIncome,
    balanceSheetData.thstrmTotalSales,
    balanceSheetData.frmtrmTotalSales,
    balanceSheetData.thstrmCostOfSales,
    balanceSheetData.frmtrmCostOfSales,
  ]);

  // useEffect(() => {
  //   // 사용자가 입력한 시간만큼 로딩 상태 유지
  //   const timer = setTimeout(() => {
  //     setIsLoading(false); // 로딩 상태를 해제
  //   }, loadingDuration * 1000); // 초단위 -> 밀리초 변환

  //   return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  // }, [loadingDuration]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false); // 로딩 상태 해제
      }, loadingDuration * 1000); // 초 단위를 밀리초로 변환

      // 타이머 해제
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingDuration]);

  // 회계 기간 변경 핸들러
  const handleAccountingPeriodChange = (e) => {
    setAccountingPeriod(e.target.value);
  };

  const handleAnalyzeYear = async () => {
    if (!accountingPeriod) {
      message.info("회계 기간을 선택해주세요.");
      return;
    }

    setIsLoading(true); // 로딩 상태 활성화

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/finance/analysis",
        {
          reportYear: accountingPeriod,
          golfCourseId: 10002, // 실제 골프장 ID로 변경
        }
      );

      const data = response.data;

      // 2초 대기 후 계산 시작
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setBalanceSheetData({
        thstrmCurrentAssets: data.thstrmCurrentAssets || 0,
        frmtrmCurrentAssets: data.frmtrmCurrentAssets || 0,
        thstrmNonCurrentAssets: data.thstrmNonCurrentAssets || 0,
        frmtrmNonCurrentAssets: data.frmtrmNonCurrentAssets || 0,
        thstrmCurrentLiabilities: data.thstrmCurrentLiabilities || 0,
        frmtrmCurrentLiabilities: data.frmtrmCurrentLiabilities || 0,
        thstrmNonCurrentLiabilities: data.thstrmNonCurrentLiabilities || 0,
        frmtrmNonCurrentLiabilities: data.frmtrmNonCurrentLiabilities || 0,
        thstrmTotalAssets: data.thstrmTotalAssets || 0,
        frmtrmTotalAssets: data.frmtrmTotalAssets || 0,
        thstrmTotalLiabilities: data.thstrmTotalLiabilities || 0,
        frmtrmTotalLiabilities: data.frmtrmTotalLiabilities || 0,
        thstrmNetIncome: data.thstrmNetIncome || 0,
        frmtrmNetIncome: data.frmtrmNetIncome || 0,
        thstrmTotalSales: data.thstrmTotalSales || 0,
        frmtrmTotalSales: data.frmtrmTotalSales || 0,
        thstrmCostOfSales: data.thstrmCostOfSales || 0,
        frmtrmCostOfSales: data.frmtrmCostOfSales || 0,
        // 비율은 useEffect에서 자동으로 계산됩니다.
      });

      setIsDataLoaded(true); // 데이터가 로드되었음을 표시
    } catch (error) {
      console.error("해당년도 분석 중 오류 발생:", error);
      message.error("해당년도 분석 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="finance-container">
      {isLoading && (
        <Loading
          text="재무정보를 분석중입니다..."
          duration={loadingDuration} // 애니메이션 지속 시간 (초)
        />
      )}
      <div className="finance-row">
        <div className="finance-col-md-10 finance-dashboard_main">
          <div className="finance-dashboard_content">
            <div className="finance-dashboard_header">
              <h2>재무정보 분석</h2>
              {/* <span>회계기간별</span> */}
            </div>

            <div className="finance-dashboard_btn">
              <div className="finance-date">
                <select
                  className="finance-date_select"
                  value={accountingPeriod}
                  onChange={handleAccountingPeriodChange}
                >
                  {/* 회계 기간 옵션 업데이트 */}
                  <option value="" disabled>
                    선택하세요
                  </option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                </select>
                <button
                  className="FinanceMain-analysis-button"
                  onClick={handleAnalyzeYear}
                >
                  분석하기
                </button>
              </div>
              <div>
                <button
                  className="finance-btn_1"
                  onClick={() => navigate("/financialStatementManagement")}
                >
                  재무상태표 열람
                  <span className="material-icons-sharp">description</span>
                </button>
              </div>
            </div>

            <div className="finance-ratio-content-wrap">
              {/* 유동비율 비율 카드 */}
              <div className="finance-ratio-content">
                <div className="finance-ratio-top">
                  <div className="finance-ratio-top-left">
                    <span className="finance-chart-icon">pie_chart</span>
                  </div>
                  <button
                    className="finance-ratio-top-right"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    <i
                      className="fa-solid fa-bell fa-shake"
                      style={{
                        "--fa-animation-duration": "3s",
                        color: "#e90061",
                        fontSize: "23px",
                      }}
                    ></i>
                  </button>
                </div>

                <div className="finance-ratio-bottom">
                  <div className="finance-ratio-bottom-left">
                    <div className="finance-ratio-bottom-left-top">
                      <h4>유동비율</h4>
                      <div
                        className="finance-help-icon"
                        style={{ backgroundColor: "#61c0bf" }}
                      >
                        ?
                        <span className="tooltip-text">
                          유동자산 / 유동부채를 의미하며, 100%이상의 경우
                          안정성이 높습니다.
                        </span>
                      </div>
                    </div>
                    <h5>단기 지급능력 지표</h5>
                    <div className="finance-ratio-bottom-left-bottom">
                      <span>{formatValue(balanceSheetData.currentRatio)}</span>

                      <span>%</span>
                    </div>
                    <p>안정성 비율</p>
                  </div>
                  <div className="finance-ratio-bottom-right">
                    <svg>
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        id="current_ratio"
                        style={{ stroke: "#61c0bf", strokeWidth: "5px" }}
                      ></circle>
                    </svg>
                    <div className="finance-ratio-bottom-right-circle">
                      <p>{formatValue(balanceSheetData.currentRatio)}</p>
                      <p>%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 부채비율 비율 카드 */}
              <div className="finance-ratio-content">
                <div className="finance-ratio-top">
                  <div className="finance-ratio-top-left">
                    <span className="finance-chart-icon">analytics</span>
                  </div>
                </div>
                <div className="finance-ratio-bottom">
                  <div className="finance-ratio-bottom-left">
                    <div className="finance-ratio-bottom-left-top">
                      <h4>부채비율</h4>
                      <div
                        className="finance-help-icon"
                        style={{ backgroundColor: "#fcb69f" }}
                      >
                        ?
                        <span className="tooltip-text">
                          부채총계 / 자산총계 × 100으로 계산됩니다. 낮을수록
                          기업의 재무적 안정성이 높습니다.
                        </span>
                      </div>
                    </div>
                    <h5>기업 안정성 지표</h5>
                    <div className="finance-ratio-bottom-left-bottom">
                      <span>{formatValue(balanceSheetData.debtRatio)}</span>

                      <span>%</span>
                    </div>
                    <p>안정성 비율</p>
                  </div>
                  <div className="finance-ratio-bottom-right">
                    <svg>
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        id="debt_ratio"
                        style={{ stroke: "#fcb69f", strokeWidth: "5px" }}
                      ></circle>
                    </svg>
                    <div className="finance-ratio-bottom-right-circle">
                      <p>{formatValue(balanceSheetData.debtRatio)}</p>
                      <p>%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 총자산수익률 비율 카드 */}
              <div className="finance-ratio-content">
                <div className="finance-ratio-top">
                  <div className="finance-ratio-top-left">
                    <span className="finance-chart-icon">bar_chart</span>
                  </div>
                </div>
                <div className="finance-ratio-bottom">
                  <div className="finance-ratio-bottom-left">
                    <div className="finance-ratio-bottom-left-top">
                      <h4>총자산수익률</h4>
                      <div
                        className="finance-help-icon"
                        style={{ backgroundColor: "#a1c4fd" }}
                      >
                        ?
                        <span className="tooltip-text">
                          당기순이익 / 자산총계 × 100으로, 주어진 총 자산을
                          얼마나 효율적으로 이용했는지를 측정하는 수익성
                          지표입니다.
                        </span>
                      </div>
                    </div>
                    <h5>자산 운영 효율성 지표</h5>
                    <div className="finance-ratio-bottom-left-bottom">
                      <span>
                        {formatValue(balanceSheetData.totalAssetReturn)}
                      </span>
                      <span>%</span>
                    </div>
                    <p>수익성 비율</p>
                  </div>
                  <div className="finance-ratio-bottom-right">
                    <svg>
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        id="total_asset_return"
                        style={{ stroke: "#a1c4fd", strokeWidth: "5px" }}
                      ></circle>
                    </svg>
                    <div className="finance-ratio-bottom-right-circle">
                      <p>{formatValue(balanceSheetData.totalAssetReturn)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="finance-middle">
              <div className="finance-middle-left">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={getChartOptions()}
                />
              </div>

              <div className="finance-middle-right">
                {/* 총매출액 카드 */}
                <div className="finance-middle_box">
                  <div className="finance-middle_icon">
                    <span className="material-icons-sharp">point_of_sale</span>
                  </div>
                  <div className="finance-middle_text">
                    <h4>총매출액</h4>
                    <span>
                      {isNaN(balanceSheetData.thstrmTotalSales)
                        ? "??"
                        : balanceSheetData.thstrmTotalSales.toLocaleString(
                            "en-US"
                          )}{" "}
                      원
                    </span>
                    {/* <p id="salesDiff">
                      전기 대비 {calculateSalesDiff() >= 0 ? "+" : ""}
                      {calculateSalesDiff() !== undefined
                        ? calculateSalesDiff().toFixed(2)
                        : "0.00"}
                      %
                    </p> */}
                    <p
                      id="salesDiff"
                      style={{
                        color:
                          calculateSalesDiff() >= 0
                            ? "red"
                            : calculateSalesDiff() < 0
                            ? "blue"
                            : "black", // 기본 색상 추가
                      }}
                    >
                      전기 대비{" "}
                      {isNaN(calculateSalesDiff())
                        ? "??%"
                        : `${calculateSalesDiff() >= 0 ? "+" : ""}${formatValue(
                            calculateSalesDiff()
                          )}%`}
                    </p>
                  </div>
                </div>

                {/* 매출원가 카드 */}
                <div className="finance-middle_box">
                  <div className="finance-middle_icon">
                    <span className="material-icons-sharp">paid</span>
                  </div>
                  <div className="finance-middle_text">
                    <h4>매출원가</h4>
                    <span>
                      {isNaN(balanceSheetData.thstrmCostOfSales)
                        ? "??"
                        : balanceSheetData.thstrmCostOfSales.toLocaleString(
                            "en-US"
                          )}{" "}
                      원
                    </span>
                    {/* <p id="costOfSalesDiff">
                      전기 대비 {calculateCostOfSalesDiff() >= 0 ? "+" : ""}
                      {calculateCostOfSalesDiff() !== undefined
                        ? calculateCostOfSalesDiff().toFixed(2)
                        : "0.00"}
                      %
                    </p> */}
                    <p
                      id="costOfSalesDiff"
                      style={{
                        color:
                          calculateCostOfSalesDiff() >= 0
                            ? "blue"
                            : calculateCostOfSalesDiff() < 0
                            ? "red"
                            : "black", // 기본 색상 추가
                      }}
                    >
                      전기 대비{" "}
                      {isNaN(calculateCostOfSalesDiff())
                        ? "??%"
                        : `${
                            calculateCostOfSalesDiff() >= 0 ? "" : ""
                          }${formatValue(calculateCostOfSalesDiff())}% ${
                            calculateCostOfSalesDiff() >= 0 ? "증가" : "감소"
                          }`}
                    </p>
                  </div>
                </div>

                {/* 당기순이익 카드 */}
                <div className="finance-middle_box">
                  <div className="finance-middle_icon">
                    <span className="material-icons-sharp">
                      stacked_line_chart
                    </span>
                  </div>
                  <div className="finance-middle_text">
                    <h4>당기순이익</h4>
                    <span>
                      {isNaN(balanceSheetData.thstrmNetIncome)
                        ? "??"
                        : balanceSheetData.thstrmNetIncome.toLocaleString(
                            "en-US"
                          )}{" "}
                      원
                    </span>
                    <p
                      id="netIncomeDiff"
                      style={{
                        color:
                          calculateNetIncomeDiff() >= 0
                            ? "red"
                            : calculateNetIncomeDiff() < 0
                            ? "blue"
                            : "black", // 기본 색상 추가
                      }}
                    >
                      전기 대비{" "}
                      {isNaN(calculateNetIncomeDiff())
                        ? "??%"
                        : `${
                            calculateNetIncomeDiff() >= 0 ? "" : ""
                          }${formatValue(calculateNetIncomeDiff())}% ${
                            calculateNetIncomeDiff() >= 0 ? "증가" : "감소"
                          }`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 모달 */}
            <div
              className={`modal fade ${showModal ? "show" : ""}`}
              id="liquidityModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden={!showModal}
              style={{
                display: showModal ? "block" : "none",
                opacity: showModal ? 1 : 0,
                visibility: showModal ? "visible" : "hidden",
                transition: "opacity 0.3s ease",
                zIndex: showModal ? 1050 : -1,
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <button
                className="FinanceMain-modal-close-button"
                type="button"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <span class="material-symbols-outlined">close</span>
              </button>
              <div className="modal-body d-flex flex-column align-items-center">
                {liquidity > 0 ? (
                  <>
                    <img
                      src={likeImg}
                      alt="양호"
                      style={{
                        width: "60px",
                        height: "80px",
                        marginTop: "20px",
                      }}
                    />
                    <h4 className="liquidity_title">자금 흐름 양호</h4>
                    <div className="liquidity_notice">
                      <h4>유동성이 전기보다</h4>
                      <h4>
                        <span style={{ color: "#008485" }}>
                          {/* {liquidity.toLocaleString()}원 */}
                          240,050,162원
                        </span>{" "}
                        증가했습니다.
                      </h4>
                      <p>* 유동성 = 현금및현금성자산 + 단기금융자산</p>
                      <a
                        href="#"
                        className="FinanceMain-custom-link FinanceMain-blink-green"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/loanProduct", {
                            state: { searchTerm: "예탁금 담보 대출" },
                          }); // 검색어 전달
                        }}
                      >
                        '예탁금 담보 대출'
                      </a>
                      로 대출 우대받고 사업을 확장해보세요
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={emergency}
                      alt="경고"
                      style={{
                        width: "70px",
                        height: "70px",
                        marginTop: "5px",
                      }}
                    />
                    <h4 className="liquidity_title">자금 흐름 경고</h4>
                    <div className="liquidity_notice">
                      <h4>유동성이 전기보다</h4>
                      <h4>
                        <span style={{ color: "#e90061" }}>
                          {Math.abs(liquidity).toLocaleString()}원
                        </span>{" "}
                        감소했습니다.
                      </h4>
                      <p>* 유동성 = 현금및현금성자산 + 단기금융자산</p>
                      경영 안정을 위한{" "}
                      <a
                        href="#"
                        className="FinanceMain-custom-link FinanceMain-blink-red"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/loanProduct", {
                            state: { searchTerm: "운전/시설자금대출" },
                          }); // 검색어 전달
                        }}
                      >
                        '운전/시설자금대출'
                      </a>
                      으로 자금을 확보하세요
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceMain;
