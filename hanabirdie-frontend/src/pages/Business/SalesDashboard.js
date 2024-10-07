import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "../../assets/css/Business/SalesDashboard.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  annotationPlugin
);

const SalesDashboard = ({ data, transactionType = "수입" }) => {
  // Helper functions
  const parseMonth = (monthStr) => {
    return new Date(`${monthStr}-01`);
  };

  const getLastYearSameMonth = (currentDate) => {
    const lastYear = new Date(currentDate);
    lastYear.setFullYear(currentDate.getFullYear() - 1);
    return lastYear;
  };

  const getLastYearPeriod = (currentDate) => {
    const lastYearStart = new Date(currentDate.getFullYear() - 1, 0, 1);
    const lastYearEnd = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    return { start: lastYearStart, end: lastYearEnd };
  };

  const getQuarterStartEnd = (quarter, year) => {
    const startMonth = (quarter - 1) * 3;
    const endMonth = startMonth + 2;
    return {
      start: new Date(year, startMonth, 1),
      end: new Date(year, endMonth + 1, 0),
    };
  };

  const getQuarter = (date) => {
    const month = date.getMonth();
    return Math.floor(month / 3) + 1;
  };

  const getCumulativePayment = (data, period) => {
    return data
      .filter((item) => {
        const itemDate = parseMonth(item.month);
        return (
          itemDate >= period.start &&
          itemDate <= period.end &&
          item.transactionType === transactionType
        );
      })
      .reduce((sum, item) => sum + item.amount, 0);
  };

  const getPaymentForMonth = (data, date) => {
    const monthString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    return data
      .filter(
        (item) =>
          item.month === monthString && item.transactionType === transactionType
      )
      .reduce((sum, item) => sum + item.amount, 0);
  };

  const getQuarterlyPayment = (data, year, quarter) => {
    const { start, end } = getQuarterStartEnd(quarter, year);
    return getCumulativePayment(data, { start, end });
  };

  const currentDate = new Date();
  const lastYearSameMonth = getLastYearSameMonth(currentDate);
  const lastYearPeriod = getLastYearPeriod(currentDate);

  // 1. Compare with last year same month
  const calculateLastYearData = (data, lastYearSameMonth, currentDate) => {
    const amountLastYear = getPaymentForMonth(data, lastYearSameMonth);
    const amountThisYear = getPaymentForMonth(data, currentDate);

    const percentageDifference =
      amountLastYear !== 0
        ? ((amountThisYear - amountLastYear) / amountLastYear) * 100
        : null;

    return {
      chartData: {
        labels: [
          `${lastYearSameMonth.getFullYear()}.${
            lastYearSameMonth.getMonth() + 1
          }`,
          `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}`,
        ],
        datasets: [
          {
            label: `${transactionType} 금액 (원)`,
            data: [amountLastYear, amountThisYear],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
            borderWidth: 1,
          },
        ],
      },
      percentageDifference: percentageDifference,
    };
  };

  // 2. Compare with last year period
  const calculateCumulativeData = (data, lastYearPeriod, currentDate) => {
    const totalLastYear = getCumulativePayment(data, lastYearPeriod);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const totalThisYear = getCumulativePayment(data, {
      start: new Date(currentYear, 0, 1),
      end: currentDate,
    });

    const percentageDifference =
      totalLastYear !== 0
        ? ((totalThisYear - totalLastYear) / totalLastYear) * 100
        : null;

    return {
      chartData: {
        labels: [
          `${lastYearPeriod.start.getFullYear()}.01 ~ ${
            lastYearPeriod.end.getMonth() + 1
          }`,
          `${currentYear}.01 ~ ${currentMonth}`,
        ],
        datasets: [
          {
            label: `누적 ${transactionType} 금액 (원)`,
            data: [totalLastYear, totalThisYear],
            backgroundColor: [
              "rgba(255, 159, 64, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 159, 64, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      percentageDifference: percentageDifference,
    };
  };

  // 3. Quarterly data
  const calculateQuarterlyDataByQuarter = (data, years, currentDate) => {
    const quarterCharts = [];
    const currentQuarter = getQuarter(currentDate);

    for (let quarter = 1; quarter <= 4; quarter++) {
      const labels = [];
      const dataset = [];
      const percentageDifferences = [];

      years.forEach((year) => {
        let totalAmount;
        const { start, end } = getQuarterStartEnd(quarter, year);

        // If current year and future quarter, set null
        if (year === currentDate.getFullYear() && quarter > currentQuarter) {
          totalAmount = null;
        } else {
          totalAmount = getCumulativePayment(data, { start, end });
          if (totalAmount === 0) {
            totalAmount = null;
          }
        }

        labels.push(`${year}`);
        dataset.push(totalAmount);
      });

      // Calculate percentage differences between years
      for (let i = 1; i < dataset.length; i++) {
        const previousAmount = dataset[i - 1];
        const currentAmount = dataset[i];

        if (
          previousAmount != null &&
          currentAmount != null &&
          previousAmount !== 0
        ) {
          const percentage =
            ((currentAmount - previousAmount) / previousAmount) * 100;
          percentageDifferences.push({
            fromIndex: i - 1,
            toIndex: i,
            value: percentage,
          });
        }
      }

      quarterCharts.push({
        quarter,
        chartData: {
          labels: labels,
          datasets: [
            {
              label: `${quarter}분기 ${transactionType} 금액 (원)`,
              data: dataset,
              backgroundColor: dataset.map((value) =>
                value === null ? "rgba(0, 0, 0, 0)" : "rgba(75, 192, 192, 0.2)"
              ),
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        percentageDifferences: percentageDifferences,
      });
    }

    return quarterCharts;
  };

  // 4. Compare with previous quarter
  const calculateComparisonData = (data, currentDate) => {
    const currentYear = currentDate.getFullYear();
    const currentQuarter = getQuarter(currentDate);
    const previousQuarter = currentQuarter - 1 || 4;
    const previousYear = previousQuarter === 4 ? currentYear - 1 : currentYear;

    const currentQuarterPayment = getQuarterlyPayment(
      data,
      currentYear,
      currentQuarter
    );
    const previousQuarterPayment = getQuarterlyPayment(
      data,
      previousYear,
      previousQuarter
    );

    const percentageDifference =
      previousQuarterPayment !== 0
        ? ((currentQuarterPayment - previousQuarterPayment) /
            previousQuarterPayment) *
          100
        : null;

    return {
      chartData: {
        labels: [
          `${previousYear} ${previousQuarter}분기`,
          `${currentYear} ${currentQuarter}분기`,
        ],
        datasets: [
          {
            label: `${transactionType} 금액 (원)`,
            data: [previousQuarterPayment, currentQuarterPayment],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      percentageDifference: percentageDifference,
    };
  };

  // Calculate necessary data
  const lastYearDataObj = calculateLastYearData(
    data,
    lastYearSameMonth,
    currentDate
  );
  const cumulativeDataObj = calculateCumulativeData(
    data,
    lastYearPeriod,
    currentDate
  );
  const quarterlyDataByQuarter = calculateQuarterlyDataByQuarter(
    data,
    [2022, 2023, 2024], // Update years as needed
    currentDate
  );
  const comparisonDataObj = calculateComparisonData(data, currentDate);

  return (
    <div className="sales-dashboard-container">
      {/* Top section: side by side charts */}
      <div className="sales-dashboard-container-top">
        <div className="chart-container">
          <h3>전년 동월 대비 {transactionType}액</h3>
          <Bar
            data={lastYearDataObj.chartData}
            options={generateOptionsWithLineAnnotations(
              lastYearDataObj.percentageDifference,
              lastYearDataObj.chartData
            )}
          />
        </div>

        <div className="chart-container">
          <h3>전년 동기간 대비 누적 {transactionType}액</h3>
          <Bar
            data={cumulativeDataObj.chartData}
            options={generateOptionsWithLineAnnotations(
              cumulativeDataObj.percentageDifference,
              cumulativeDataObj.chartData
            )}
          />
        </div>

        <div className="chart-container">
          <h3>전분기 대비 {transactionType}액 비교</h3>
          <Bar
            data={comparisonDataObj.chartData}
            options={generateOptionsWithLineAnnotations(
              comparisonDataObj.percentageDifference,
              comparisonDataObj.chartData
            )}
          />
        </div>
      </div>

      {/* Middle section: quarterly charts */}
      <div className="sales-dashboard-container-middle">
        <h3>연도별 분기 {transactionType}액</h3>
        <div className="quarterly-charts-grid">
          {quarterlyDataByQuarter.map((quarterData) => (
            <div key={quarterData.quarter} className="quarter-chart-container">
              <Bar
                data={quarterData.chartData}
                options={generateOptionsWithLineAnnotationsForQuarter(
                  quarterData.percentageDifferences,
                  quarterData.chartData
                )}
              />
              <span>{quarterData.quarter}분기</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate min and max for y-axis
const calculateYMinMax = (data) => {
  const values = data.datasets[0].data.filter((val) => val !== null); // Exclude null values
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  return {
    yMin: minValue * 0.95,
    yMax: maxValue * 1.05,
  };
};

const generateOptionsWithLineAnnotations = (
  percentageDifference,
  chartData
) => {
  const { yMin, yMax } = calculateYMinMax(chartData); // Calculate y-axis min and max
  const stepSize = (yMax - yMin) / 3; // Set stepSize

  return {
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw !== null ? context.raw : "?";
            return `${formatNumber(value)} 원`;
          },
        },
      },
      annotation: {
        annotations: createLineAnnotations(percentageDifference, chartData),
      },
    },
    scales: {
      y: {
        beginAtZero: false, // Do not start at zero
        min: yMin, // Set min
        max: yMax, // Set max
        ticks: {
          stepSize: stepSize, // Adjust tick interval
          callback: function (value) {
            return formatNumber(value);
          },
        },
      },
      x: {
        type: "category",
      },
    },
  };
};

const generateOptionsWithLineAnnotationsForQuarter = (
  percentageDifferences,
  chartData
) => {
  const { yMin, yMax } = calculateYMinMax(chartData); // Calculate y-axis min and max
  const stepSize = (yMax - yMin) / 4; // Set stepSize

  return {
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw !== null ? context.raw : "?";
            return `${formatNumber(value)} 원`;
          },
        },
      },
      annotation: {
        annotations: createLineAnnotationsForQuarter(
          percentageDifferences,
          chartData
        ),
      },
    },
    scales: {
      y: {
        beginAtZero: false, // Do not start at zero
        min: yMin, // Set min
        max: yMax, // Set max
        ticks: {
          stepSize: stepSize, // Adjust tick interval
          callback: function (value) {
            return formatNumber(value);
          },
        },
      },
      x: {
        type: "category",
      },
    },
  };
};

const createLineAnnotations = (percentageDifference, chartData) => {
  if (percentageDifference === null || isNaN(percentageDifference)) {
    return {};
  }

  let color;
  let symbolText;

  if (percentageDifference > 0) {
    color = "red";
    symbolText = "trending_up"; // Material Symbols 'trending_up' icon
  } else if (percentageDifference < 0) {
    color = "blue";
    symbolText = "trending_down"; // Material Symbols 'trending_down' icon
  } else {
    color = "gray";
    symbolText = "trending_flat"; // Material Symbols 'trending_flat' icon
  }

  const dataLength = chartData.datasets[0].data.length;
  if (dataLength < 2) {
    return {};
  }

  const fromIndex = dataLength - 2;
  const toIndex = dataLength - 1;

  const fromLabel = chartData.labels[fromIndex];
  const toLabel = chartData.labels[toIndex];

  const fromValue = chartData.datasets[0].data[fromIndex];
  const toValue = chartData.datasets[0].data[toIndex];

  if (fromValue == null || toValue == null) {
    return {};
  }

  // Calculate the mid y value
  const midY = (fromValue + toValue) / 2;

  return {
    trendLine: {
      type: "line",
      xMin: fromLabel,
      xMax: toLabel,
      yMin: fromValue,
      yMax: toValue,
      borderColor: color,
      borderWidth: 2,
      borderDash: [5, 5], // Dashed line
      label: {
        enabled: false,
      },
    },
    trendLabel: {
      type: "label",
      xValue: toLabel, // Set to second point
      yValue: midY, // Middle y
      content: `${symbolText} ${Math.abs(percentageDifference.toFixed(1))}%`,
      color: color,
      backgroundColor: "transparent",
      font: {
        family: "Material Symbols Outlined", // Use Material Symbols font
        size: 12, // Adjust font size
        weight: "normal",
        style: "normal",
      },
      textAlign: "center",
      yAdjust: -10, // Adjust y position
      xAdjust: -70, // Adjust x position
    },
    trendPoint1: {
      type: "point",
      xValue: fromLabel,
      yValue: fromValue,
      backgroundColor: color,
      radius: 5,
    },
    trendPoint2: {
      type: "point",
      xValue: toLabel,
      yValue: toValue,
      backgroundColor: color,
      radius: 5,
    },
  };
};

const createLineAnnotationsForQuarter = (percentageDifferences, chartData) => {
  const annotations = {};

  percentageDifferences.forEach((diff, index) => {
    let color;
    let symbolText;

    if (diff.value > 0) {
      color = "red";
      symbolText = "trending_up"; // 'trending_up' text
    } else if (diff.value < 0) {
      color = "blue";
      symbolText = "trending_down"; // 'trending_down' text
    } else {
      color = "gray";
      symbolText = "trending_flat"; // 'trending_flat' text
    }

    const fromIndex = diff.fromIndex;
    const toIndex = diff.toIndex;

    const fromLabel = chartData.labels[fromIndex];
    const toLabel = chartData.labels[toIndex];

    const fromValue = chartData.datasets[0].data[fromIndex];
    const toValue = chartData.datasets[0].data[toIndex];

    if (fromValue == null || toValue == null) {
      return;
    }

    // Calculate the mid y value
    const midY = (fromValue + toValue) / 2;

    annotations[`trendLine${index}`] = {
      type: "line",
      xMin: fromLabel,
      xMax: toLabel,
      yMin: fromValue,
      yMax: toValue,
      borderColor: color,
      borderWidth: 2,
      borderDash: [5, 5], // Dashed line
      label: {
        enabled: false,
      },
    };

    annotations[`trendLabel${index}`] = {
      type: "label",
      xValue: toLabel, // Set to second point
      yValue: midY, // Middle y
      content: `${symbolText} ${Math.abs(diff.value.toFixed(2))}%`,
      color: color,
      backgroundColor: "transparent",
      font: {
        family: "Material Symbols Outlined", // Use Material Symbols font
        size: 12,
        weight: "normal",
        style: "normal",
      },
      textAlign: "center",
      yAdjust: -12, // Adjust y position
      xAdjust: -70, // Adjust x position
    };

    annotations[`trendPoint1_${index}`] = {
      type: "point",
      xValue: fromLabel,
      yValue: fromValue,
      backgroundColor: color,
      radius: 5,
    };

    annotations[`trendPoint2_${index}`] = {
      type: "point",
      xValue: toLabel,
      yValue: toValue,
      backgroundColor: color,
      radius: 5,
    };
  });

  // Add "?" for missing data
  chartData.datasets[0].data.forEach((value, index) => {
    if (value === null) {
      const label = chartData.labels[index];
      const { yMin, yMax } = calculateYMinMax(chartData); // Calculate yMin and yMax

      annotations[`missingData${index}`] = {
        type: "label",
        xValue: label,
        yValue: yMin + (yMax - yMin) * 0.5, // Middle y value (50%)

        content: "?",
        color: "purple",
        backgroundColor: "transparent",
        font: {
          family: "Arial",
          size: 20,
          weight: "bold",
        },
        textAlign: "center",
        yAdjust: 0,
        xAdjust: 0,
      };
      // Add dashed bar for missing data
      annotations[`dashedBar${index}`] = {
        type: "box",
        xScaleID: "x",
        yScaleID: "y",
        xMin: index - 0.35,
        xMax: index + 0.35,
        yMin: 0,
        yMax:
          Math.max(
            ...chartData.datasets[0].data.filter((val) => val !== null)
          ) * 1.05,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        borderDash: [5, 5], // Dashed line
      };
    }
  });

  return annotations;
};

const formatNumber = (num) => {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(0)}억`;
  } else if (num >= 10000) {
    return `${(num / 10000).toFixed(0)}만`;
  }
  return num.toString();
};

export default SalesDashboard;
