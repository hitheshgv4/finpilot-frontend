import {
  getIncomeData,
  getExpenseData,
  getBudgetData,
  getTotalIncome,
  getTotalExpenses,
  getSavings,
  getFinancialHealth,
  getHighestExpenseCategory,
} from "./financeHelpers";

/* ================= OVERVIEW ================= */

export const getOverviewAnalytics =
  () => {

    const totalIncome =
      getTotalIncome();

    const totalExpenses =
      getTotalExpenses();

    const savings =
      getSavings();

    const balance =
      totalIncome -
      totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      savings,
      balance,
    };

  };

/* ================= SAVINGS RATE ================= */

export const getSavingsRate =
  () => {

    const income =
      getTotalIncome();

    const expenses =
      getTotalExpenses();

    if (income === 0) {
      return 0;
    }

    return Math.round(
      (
        ((income -
          expenses) /
          income) *
        100
      )
    );

  };

/* ================= FINANCIAL HEALTH ================= */

export const getHealthAnalytics =
  () => {

    return {
      health:
        getFinancialHealth(),
      savingsRate:
        getSavingsRate(),
    };

  };

/* ================= EXPENSE PIE ================= */

export const getExpenseCategoryData =
  () => {

    const expenseData =
      getExpenseData();

    const categoryMap =
      {};

    expenseData.forEach(
      (item) => {

        const category =
          item.category ||
          "Others";

        if (
          categoryMap[
            category
          ]
        ) {

          categoryMap[
            category
          ] += Number(
            item.amount
          );

        } else {

          categoryMap[
            category
          ] = Number(
            item.amount
          );

        }

      }
    );

    return Object.entries(
      categoryMap
    ).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  };

/* ================= COMPARISON ================= */

export const getIncomeExpenseComparison =
  () => {

    return [

      {
        name: "Income",
        amount:
          getTotalIncome(),
      },

      {
        name: "Expenses",
        amount:
          getTotalExpenses(),
      },

      {
        name: "Savings",
        amount:
          getSavings(),
      },

    ];

  };

/* ================= MONTHLY TREND ================= */

export const getMonthlyTrendData =
  () => {

    const incomeData =
      getIncomeData();

    const expenseData =
      getExpenseData();

    const monthlyMap =
      {};

    incomeData.forEach(
      (item) => {

        const month =
          new Date(
            item.date
          ).toLocaleString(
            "default",
            {
              month:
                "short",
            }
          );

        if (
          !monthlyMap[
            month
          ]
        ) {

          monthlyMap[
            month
          ] = {
            month,
            income: 0,
            expenses: 0,
          };

        }

        monthlyMap[
          month
        ].income +=
          Number(
            item.amount
          );

      }
    );

    expenseData.forEach(
      (item) => {

        const month =
          new Date(
            item.date
          ).toLocaleString(
            "default",
            {
              month:
                "short",
            }
          );

        if (
          !monthlyMap[
            month
          ]
        ) {

          monthlyMap[
            month
          ] = {
            month,
            income: 0,
            expenses: 0,
          };

        }

        monthlyMap[
          month
        ].expenses +=
          Number(
            item.amount
          );

      }
    );

    return Object.values(
      monthlyMap
    );

  };

/* ================= TOP EXPENSE ================= */

export const getTopExpenseAnalytics =
  () => {

    const highest =
      getHighestExpenseCategory();

    if (!highest) {

      return {
        category:
          "No Data",
        amount: 0,
      };

    }

    return {
      category:
        highest[0],
      amount:
        highest[1],
    };

  };

/* ================= BUDGET ANALYTICS ================= */

export const getBudgetAnalytics =
  () => {

    const budgetData =
      getBudgetData();

    const expenseData =
      getExpenseData();

    return budgetData.map(
      (item) => {

        const spent =
          expenseData
            .filter(
              (
                expense
              ) =>

                expense.category
                  .toLowerCase() ===
                item.category
                  .toLowerCase()
            )
            .reduce(
              (
                acc,
                curr
              ) =>

                acc +
                Number(
                  curr.amount
                ),

              0
            );

        const budget =
          Number(
            item.budget
          );

        const remaining =
          budget - spent;

        const usage =
          budget > 0
            ? Math.round(
                (
                  (spent /
                    budget) *
                  100
                )
              )
            : 0;

        return {

          category:
            item.category,

          budget,

          spent,

          remaining,

          usage,

        };

      }
    );

  };

/* ================= FINANCIAL SCORE ================= */

export const getFinancialScore =
  () => {

    const income =
      getTotalIncome();

    const expenses =
      getTotalExpenses();

    const savings =
      getSavings();

    if (income === 0) {
      return 0;
    }

    let score = 50;

    const savingsRate =
      (
        savings /
        income
      ) * 100;

    if (
      savingsRate >= 40
    ) {

      score += 30;

    } else if (
      savingsRate >= 20
    ) {

      score += 20;

    } else if (
      savingsRate >= 10
    ) {

      score += 10;

    }

    const expenseRatio =
      (
        expenses /
        income
      ) * 100;

    if (
      expenseRatio >= 90
    ) {

      score -= 25;

    } else if (
      expenseRatio >= 75
    ) {

      score -= 10;

    }

    if (score > 100) {
      score = 100;
    }

    if (score < 0) {
      score = 0;
    }

    return Math.round(
      score
    );

  };

/* ================= SMART INSIGHTS ================= */

export const getSmartInsights =
  () => {

    const insights =
      [];

    const income =
      getTotalIncome();

    const expenses =
      getTotalExpenses();

    const savingsRate =
      getSavingsRate();

    const topExpense =
      getTopExpenseAnalytics();

    const budgetAnalytics =
      getBudgetAnalytics();

    if (
      savingsRate >= 40
    ) {

      insights.push(
        "Excellent savings rate. Your financial management is strong."
      );

    } else if (
      savingsRate >= 20
    ) {

      insights.push(
        "Good savings rate. You are managing finances well."
      );

    } else {

      insights.push(
        "Your savings rate is low. Try reducing unnecessary expenses."
      );

    }

    if (
      topExpense.amount > 0
    ) {

      insights.push(
        `${topExpense.category} is your highest spending category at ₹${topExpense.amount.toLocaleString()}.`
      );

    }

    if (
      income > 0 &&
      expenses >
        income * 0.8
    ) {

      insights.push(
        "Warning: Your expenses are above 80% of your income."
      );

    }

    budgetAnalytics.forEach(
      (budget) => {

        if (
          budget.usage >= 100
        ) {

          insights.push(
            `${budget.category} budget exceeded.`
          );

        } else if (
          budget.usage >= 80
        ) {

          insights.push(
            `${budget.category} budget nearing limit.`
          );

        }

      }
    );

    if (
      insights.length === 0
    ) {

      insights.push(
        "Start adding transactions to view insights."
      );

    }

    return insights;

  };

/* ================= MONTHLY SUMMARY ================= */

export const getMonthlySummary =
  () => {

    return {

      income:
        getTotalIncome(),

      expenses:
        getTotalExpenses(),

      savings:
        getSavings(),

      savingsRate:
        getSavingsRate(),

      financialScore:
        getFinancialScore(),

      financialHealth:
        getFinancialHealth(),

    };

  };