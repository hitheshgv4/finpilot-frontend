export const generateAIInsights = (
  incomeData,
  expenseData,
  budgetData
) => {

  const insights = [];

  /* ================= TOTALS ================= */

  const totalIncome =
    incomeData.reduce(
      (acc, item) =>
        acc +
        Number(item.amount),
      0
    );

  const totalExpense =
    expenseData.reduce(
      (acc, item) =>
        acc +
        Number(item.amount),
      0
    );

  const savings =
    totalIncome -
    totalExpense;

  /* ================= SAVINGS ================= */

  if (savings > 0) {

    insights.push({
      type: "success",
      title:
        "Healthy Savings",
      message: `Great job! You saved ₹${savings.toLocaleString()} this month.`,
    });

  } else {

    insights.push({
      type: "danger",
      title:
        "Negative Savings",
      message:
        "Your expenses exceeded your income this month.",
    });

  }

  /* ================= EXPENSE CATEGORIES ================= */

  const categoryTotals =
    {};

  expenseData.forEach(
    (item) => {

      const category =
        item.category ||
        "Others";

      if (
        categoryTotals[
          category
        ]
      ) {

        categoryTotals[
          category
        ] += Number(
          item.amount
        );

      } else {

        categoryTotals[
          category
        ] = Number(
          item.amount
        );

      }

    }
  );

  /* ================= HIGHEST CATEGORY ================= */

  const highestCategory =
    Object.entries(
      categoryTotals
    ).sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

  if (highestCategory) {

    insights.push({
      type: "warning",
      title:
        "Highest Spending Category",
      message: `${highestCategory[0]} is your highest expense category with ₹${highestCategory[1].toLocaleString()} spent.`,
    });

  }

  /* ================= BUDGET ANALYSIS ================= */

  budgetData.forEach(
    (budget) => {

      const categorySpent =
        categoryTotals[
          budget.category
        ] || 0;

      const usage =
        (categorySpent /
          budget.budget) *
        100;

      if (
        usage >= 80 &&
        usage < 100
      ) {

        insights.push({
          type: "warning",
          title:
            "Budget Warning",
          message: `You already used ${usage.toFixed(0)}% of your ${budget.category} budget.`,
        });

      }

      if (
        usage >= 100
      ) {

        insights.push({
          type: "danger",
          title:
            "Budget Exceeded",
          message: `Your ${budget.category} budget exceeded by ₹${(
            categorySpent -
            budget.budget
          ).toLocaleString()}.`,
        });

      }

    }
  );

  /* ================= LOW SAVINGS RATE ================= */

  const savingsRate =
    totalIncome > 0
      ? (
          (savings /
            totalIncome) *
          100
        ).toFixed(0)
      : 0;

  if (
    savingsRate < 20
  ) {

    insights.push({
      type: "warning",
      title:
        "Low Savings Rate",
      message:
        "Try reducing unnecessary expenses to improve savings.",
    });

  }

  /* ================= NO EXPENSES ================= */

  if (
    expenseData.length === 0
  ) {

    insights.push({
      type: "info",
      title:
        "No Expenses Added",
      message:
        "Start adding expenses to unlock smart financial insights.",
    });

  }

  return insights;

};