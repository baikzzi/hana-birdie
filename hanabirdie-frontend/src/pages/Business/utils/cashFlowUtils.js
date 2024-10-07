// src/pages/Business/utils/cashFlowUtils.js

import moment from "moment";

// Pie Chart 데이터 계산 (수입과 지출 합계)
export const calculatePieChartData = (rawData) => {
  const summary = {
    현금유입: 0,
    현금유출: 0,
  };

  rawData.forEach(({ transactionType, amount }) => {
    if (transactionType === "수입") {
      summary.현금유입 += amount;
    } else if (transactionType === "지출") {
      summary.현금유출 += amount;
    }
  });

  return [
    { name: "현금유입", value: summary.현금유입 },
    { name: "현금유출", value: summary.현금유출 },
  ];
};

// 월별 매출, 매입 비교 데이터 계산
export const calculateMonthlyComparisonData = (rawData) => {
  const monthlyData = {};

  rawData.forEach(({ transactionDate, transactionType, amount }) => {
    if (!monthlyData[transactionDate]) {
      monthlyData[transactionDate] = { 매출: 0, 매입: 0 };
    }

    if (transactionType === "수입") {
      monthlyData[transactionDate].매출 += amount;
    } else if (transactionType === "지출") {
      monthlyData[transactionDate].매입 += amount;
    }
  });

  return Object.keys(monthlyData).map((month) => ({
    month,
    매출: monthlyData[month].매출,
    매입: monthlyData[month].매입,
  }));
};

// 런웨이 데이터 계산
export const calculateRunwayData = (rawData, isPredicted) => {
  const CASH = 20000000000; // 초기 현금 (예시 값)

  // 지출 데이터 필터링
  const expenseData = rawData.filter((item) => item.transactionType === "지출");

  if (expenseData.length === 0) {
    return [];
  }

  // 지출 데이터의 날짜 계산
  const dates = expenseData.map((item) =>
    moment(item.transactionDate, "YYYY-MM")
  );
  const latestDate = moment.max(dates);

  const startDate = latestDate.clone().subtract(11, "months").startOf("month");

  // 과거 12개월 지출 데이터를 필터링
  const last12MonthsExpenses = expenseData.filter((item) => {
    const itemDate = moment(item.transactionDate, "YYYY-MM");
    return (
      itemDate.isSameOrAfter(startDate) && itemDate.isSameOrBefore(latestDate)
    );
  });

  // 각 월의 지출 합계 계산
  const monthlyBurnRates = {};
  let totalExpense = 0; // totalExpense 변수 정의

  last12MonthsExpenses.forEach((item) => {
    const monthKey = moment(item.transactionDate, "YYYY-MM").format("YYYY-MM");
    if (!monthlyBurnRates[monthKey]) {
      monthlyBurnRates[monthKey] = 0;
    }
    monthlyBurnRates[monthKey] += item.amount;
    totalExpense += item.amount; // totalExpense 계산
  });

  const runwayData = [];

  // 과거 12개월 Runway 계산
  for (let i = 0; i < 12; i++) {
    const month = startDate.clone().add(i, "months").format("YYYY-MM");
    const burnRate = monthlyBurnRates[month] || 0;
    const runway = burnRate > 0 ? CASH / burnRate : Infinity;

    runwayData.push({
      month,
      runway,
    });
  }

  // 미래 12개월 데이터는 isPredicted가 true일 경우 추가
  if (isPredicted) {
    for (let i = 1; i <= 12; i++) {
      const futureMonth = latestDate.clone().add(i, "months").format("YYYY-MM");
      const burnRate = monthlyBurnRates[futureMonth] || 0;

      // 미래 데이터가 없으면 과거 번레이트를 사용하여 계산
      const runway =
        burnRate > 0 ? CASH / burnRate : CASH / (totalExpense / 12);

      runwayData.push({
        month: futureMonth,
        runway,
      });
    }
  }

  return runwayData;
};

// 런웨이 전체 계산
export const calculateRunway = (rawData) => {
  const CASH = 40000000000; // 예시 초기 현금

  const expenseData = rawData.filter((item) => item.transactionType === "지출");

  if (expenseData.length === 0) {
    return Infinity;
  }

  const dates = expenseData.map((item) =>
    moment(item.transactionDate, "YYYY-MM")
  );
  const latestDate = moment.max(dates);

  const startDate = latestDate.clone().subtract(11, "months").startOf("month");

  const last12MonthsExpenses = expenseData.filter((item) => {
    const itemDate = moment(item.transactionDate, "YYYY-MM");
    return (
      itemDate.isSameOrAfter(startDate) && itemDate.isSameOrBefore(latestDate)
    );
  });

  const monthlyExpenses = {};

  last12MonthsExpenses.forEach((item) => {
    if (!monthlyExpenses[item.transactionDate]) {
      monthlyExpenses[item.transactionDate] = 0;
    }
    monthlyExpenses[item.transactionDate] += item.amount;
  });

  const totalExpense = Object.values(monthlyExpenses).reduce(
    (acc, val) => acc + val,
    0
  );

  const burnRate = totalExpense / 12;

  const runway = burnRate > 0 ? CASH / burnRate : Infinity;

  return runway;
};

// 미래 현금 흐름 요약 차트 데이터 계산
export const calculateFutureCashFlow = (rawData) => {
  const monthlyData = {};

  rawData.forEach(({ transactionDate, transactionType, amount }) => {
    if (!monthlyData[transactionDate]) {
      monthlyData[transactionDate] = { 현금유입: 0, 현금유출: 0 };
    }

    if (transactionType === "수입") {
      monthlyData[transactionDate].현금유입 += amount;
    } else if (transactionType === "지출") {
      monthlyData[transactionDate].현금유출 += amount;
    }
  });

  return Object.keys(monthlyData).map((month) => ({
    name: month,
    현금유입: monthlyData[month].현금유입,
    현금유출: monthlyData[month].현금유출,
    차이: monthlyData[month].현금유입 - monthlyData[month].현금유출, // 차이 계산
  }));
};

// 데이터를 계층 구조로 변환
export const transformRawDataToTree = (rawData, timeFrame) => {
  const treeData = [
    {
      key: "수입",
      category: "수입",
      children: [],
    },
    {
      key: "지출",
      category: "지출",
      children: [],
    },
  ];

  rawData.forEach(
    ({
      transactionDate,
      transactionType,
      transactionCategory,
      description,
      amount,
    }) => {
      const parent = treeData.find((item) => item.category === transactionType);
      if (!parent) return;

      let categoryNode = parent.children.find(
        (item) => item.category === transactionCategory
      );
      if (!categoryNode) {
        categoryNode = {
          key: `${transactionType}-${transactionCategory}`,
          category: transactionCategory,
          children: [],
        };
        parent.children.push(categoryNode);
      }

      let subCategoryNode = categoryNode.children.find(
        (item) => item.category === description
      );
      if (!subCategoryNode) {
        subCategoryNode = {
          key: `${transactionType}-${transactionCategory}-${description}`,
          category: description,
          amount: 0,
        };
        categoryNode.children.push(subCategoryNode);
      }

      if (timeFrame === "month") {
        subCategoryNode[transactionDate] =
          (subCategoryNode[transactionDate] || 0) + amount;
      } else if (timeFrame === "quarter") {
        const quarter = moment(transactionDate, "YYYY-MM").quarter();
        const year = moment(transactionDate, "YYYY-MM").year();
        const quarterKey = `${year}-Q${quarter}`;
        subCategoryNode[quarterKey] =
          (subCategoryNode[quarterKey] || 0) + amount;
      } else if (timeFrame === "day") {
        subCategoryNode[transactionDate] =
          (subCategoryNode[transactionDate] || 0) + amount;
      }
    }
  );

  let allTimeFrames = [];
  if (timeFrame === "month") {
    allTimeFrames = Array.from(
      new Set(rawData.map((item) => item.transactionDate))
    ).sort();
  } else if (timeFrame === "quarter") {
    allTimeFrames = Array.from(
      new Set(
        rawData.map(
          (item) =>
            `${moment(item.transactionDate, "YYYY-MM").year()}-Q${moment(
              item.transactionDate,
              "YYYY-MM"
            ).quarter()}`
        )
      )
    ).sort();
  } else if (timeFrame === "day") {
    const datesSet = new Set(rawData.map((item) => item.transactionDate));
    allTimeFrames = Array.from(datesSet).sort();
  }
  return { treeData, allTimeFrames };
};

// 트리 데이터를 테이블에 맞게 변환
export const transformTreeData = (treeData, allTimeFrames, timeFrame) => {
  return treeData.map((type) => ({
    key: type.key,
    category: type.category,
    ...allTimeFrames.reduce((acc, tf) => {
      acc[tf] = type.children.reduce((sum, category) => {
        return (
          sum +
          category.children.reduce((subSum, subCategory) => {
            return subSum + (subCategory[tf] || 0);
          }, 0)
        );
      }, 0);
      return acc;
    }, {}),
    children: type.children.map((category) => ({
      key: category.key,
      category: category.category,
      ...allTimeFrames.reduce((acc, tf) => {
        acc[tf] = category.children.reduce((sum, subCategory) => {
          return sum + (subCategory[tf] || 0);
        }, 0);
        return acc;
      }, {}),
      children: category.children.map((subCategory) => ({
        key: subCategory.key,
        category: subCategory.category,
        ...allTimeFrames.reduce((acc, tf) => {
          acc[tf] = subCategory[tf] || 0;
          return acc;
        }, {}),
      })),
    })),
  }));
};

export const groupDataByMonthAndCategory = (data) => {
  const groupedData = {};
  data.forEach(
    ({
      transactionDate = "",
      transactionType = "Unknown",
      transactionCategory = "Unknown",
      description = "",
      amount = 0,
    }) => {
      if (!groupedData[transactionType]) {
        groupedData[transactionType] = {};
      }
      if (!groupedData[transactionType][transactionCategory]) {
        groupedData[transactionType][transactionCategory] = {};
      }
      if (!groupedData[transactionType][transactionCategory][transactionDate]) {
        groupedData[transactionType][transactionCategory][transactionDate] = 0;
      }
      groupedData[transactionType][transactionCategory][transactionDate] +=
        amount;
    }
  );
  return groupedData;
};

// 테이블 데이터를 변환
export const transformDataForTable = (groupedData, timeFrame) => {
  if (["month", "quarter"].includes(timeFrame)) {
    return Object.keys(groupedData).map((type) => ({
      key: type,
      category: type,
      ...Object.keys(groupedData[type] || {}).reduce((acc, category) => {
        Object.keys(groupedData[type][category] || {}).forEach((tf) => {
          acc[tf] = (acc[tf] || 0) + groupedData[type][category][tf];
        });
        return acc;
      }, {}),
      children: Object.keys(groupedData[type] || {}).map((category) => ({
        key: `${type}-${category}`,
        category: category,
        ...Object.keys(groupedData[type][category] || {}).reduce((acc, tf) => {
          acc[tf] = groupedData[type][category][tf];
          return acc;
        }, {}),
        children: Object.keys(groupedData[type][category] || {}).map((tf) => ({
          key: `${type}-${category}-${tf}`,
          category: tf,
          amount: groupedData[type][category][tf],
        })),
      })),
    }));
  } else if (timeFrame === "day") {
    const allDates = Array.from(
      new Set(
        Object.values(groupedData).flatMap((categoryData) =>
          Object.keys(categoryData || {}).flatMap((date) => date)
        )
      )
    ).sort((a, b) => moment(a).diff(moment(b)));

    return Object.keys(groupedData).map((type) => ({
      key: type,
      category: type,
      ...allDates.reduce((acc, date) => {
        acc[date] = Object.keys(groupedData[type] || {}).reduce(
          (sum, category) => {
            return sum + (groupedData[type][category][date] || 0);
          },
          0
        );
        return acc;
      }, {}),
      children: Object.keys(groupedData[type] || {}).map((category) => ({
        key: `${type}-${category}`,
        category: category,
        ...allDates.reduce((acc, date) => {
          acc[date] = groupedData[type][category][date] || 0;
          return acc;
        }, {}),
        children: allDates.map((date) => ({
          key: `${type}-${category}-${date}`,
          category: date,
          amount: groupedData[type][category][date] || 0,
        })),
      })),
    }));
  }
  return [];
};

// 요약 데이터 생성
export const generateSummaryData = (groupedData, timeFrame) => {
  if (!groupedData) return [];

  return Object.keys(groupedData)
    .map((type) => {
      const categories = groupedData[type];
      if (!categories) return null;

      const total = Object.values(categories).reduce((sum, categoryData) => {
        if (!categoryData) return sum;
        return (
          sum +
          Object.values(categoryData).reduce(
            (catSum, amount) => catSum + amount,
            0
          )
        );
      }, 0);

      return {
        type,
        total,
      };
    })
    .filter((item) => item !== null); // null 제거
};

export const fetchDailyDataFromAPI = async (startDate, endDate) => {
  // 실제 API 호출 로직을 여기에 구현
  // 현재는 predefinedDailyData를 필터링하여 반환
  const predefinedDailyData = [
    // ... 사용자가 제공한 predefinedDailyData
  ];

  return predefinedDailyData.filter((item) => {
    const date = moment(item.transactionDate, "YYYY-MM-DD");
    return (
      date.isSameOrAfter(startDate, "day") &&
      date.isSameOrBefore(endDate, "day")
    );
  });
};
