/* =========================
   CURRENT USER
========================= */

const getCurrentUser =
  () => {

    return JSON.parse(

      localStorage.getItem(
        "currentUser"
      )

    ) || {};

  };

/* =========================
   USER STORAGE KEYS
========================= */

const getIncomeKey =
  () => {

    const currentUser =
      getCurrentUser();

    return `income_${currentUser.email}`;

  };

const getExpenseKey =
  () => {

    const currentUser =
      getCurrentUser();

    return `expense_${currentUser.email}`;

  };

const getBudgetKey =
  () => {

    const currentUser =
      getCurrentUser();

    return `budget_${currentUser.email}`;

  };

/* =========================
   GLOBAL MEMORY CACHE
========================= */

let incomeDataCache = [];

let expenseDataCache = [];

let budgetDataCache = [];

/* =========================
   SETTERS
========================= */

export const setIncomeDataCache =
  (data) => {

    incomeDataCache =
      data || [];

    localStorage.setItem(

      getIncomeKey(),

      JSON.stringify(
        incomeDataCache
      )

    );

  };

export const setExpenseDataCache = (
  data
) => {

  localStorage.setItem(
    "expenseData",
    JSON.stringify(data)
  );

};

export const setBudgetDataCache =
  (data) => {

    budgetDataCache =
      data || [];

    localStorage.setItem(

      getBudgetKey(),

      JSON.stringify(
        budgetDataCache
      )

    );

  };

/* =========================
   GET DATA
========================= */

export const getIncomeData =
  () => {

    if (
      incomeDataCache.length > 0
    ) {

      return incomeDataCache;

    }

    return (

      JSON.parse(

        localStorage.getItem(
          getIncomeKey()
        )

      ) || []

    );

  };

export const getExpenseData = () => {

  try {

    const data = localStorage.getItem(
      "expenseData"
    );

    return data
      ? JSON.parse(data)
      : [];

  }

  catch (error) {

    console.error(
      "Expense cache error:",
      error
    );

    return [];

  }

};

export const getBudgetData =
  () => {

    if (
      budgetDataCache.length > 0
    ) {

      return budgetDataCache;

    }

    return (

      JSON.parse(

        localStorage.getItem(
          getBudgetKey()
        )

      ) || []

    );

  };

/* =========================
   TOTAL INCOME
========================= */

export const getTotalIncome =
  () => {

    const incomeData =
      getIncomeData();

    return incomeData.reduce(

      (acc, item) =>

        acc +
        Number(
          item.amount
        ),

      0

    );

  };

/* =========================
   TOTAL EXPENSE
========================= */

export const getTotalExpenses =
  () => {

    const expenseData =
      getExpenseData();

    return expenseData.reduce(

      (acc, item) =>

        acc +
        Number(
          item.amount
        ),

      0

    );

  };

/* =========================
   TOTAL SAVINGS
========================= */

export const getSavings =
  () => {

    return (
      getTotalIncome() -
      getTotalExpenses()
    );

  };

/* =========================
   TOTAL BUDGET
========================= */

export const getTotalBudget =
  () => {

    const budgetData =
      getBudgetData();

    return budgetData.reduce(

      (acc, item) =>

        acc +
        Number(
          item.budget
        ),

      0

    );

  };

/* =========================
   CATEGORY EXPENSE
========================= */

export const getCategoryExpense =
  (category) => {

    const expenseData =
      getExpenseData();

    return expenseData

      .filter(

        (item) =>

          item.category
            ?.toLowerCase()
            .trim() ===

          category
            ?.toLowerCase()
            .trim()

      )

      .reduce(

        (acc, item) =>

          acc +
          Number(
            item.amount || 0
          ),

        0

      );

  };

/* =========================
   BUDGET REMAINING
========================= */

export const getRemainingBudget =
  (
    category,
    budgetAmount
  ) => {

    const spent =
      getCategoryExpense(
        category
      );

    return (
      Number(
        budgetAmount
      ) - spent
    );

  };

/* =========================
   BUDGET USAGE
========================= */

export const getBudgetUsage =
  (
    category,
    budgetAmount
  ) => {

    const spent =
      getCategoryExpense(
        category
      );

    if (
      Number(
        budgetAmount
      ) === 0
    ) {

      return 0;

    }

    return Math.min(

  Math.round(

    (spent /
      Number(
        budgetAmount
      )) *
      100

  ),

  100

);

  };

/* =========================
   HIGHEST EXPENSE CATEGORY
========================= */

export const getHighestExpenseCategory =
  () => {

    const expenseData =
      getExpenseData();

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

        }

        else {

          categoryTotals[
            category
          ] = Number(
            item.amount
          );

        }

      }
    );

    const highest =
      Object.entries(
        categoryTotals
      ).sort(
        (a, b) =>
          b[1] - a[1]
      )[0];

    return (
      highest || null
    );

  };

/* =========================
   FINANCIAL HEALTH
========================= */

export const getFinancialHealth =
  () => {

    const income =
      getTotalIncome();

    const expenses =
      getTotalExpenses();

    if (
      income === 0
    ) {

      return "No Income";

    }

    const savingsRate =
      (
        ((income -
          expenses) /
          income) *
        100
      ).toFixed(0);

    if (
      savingsRate >= 50
    ) {

      return "Excellent";

    }

    if (
      savingsRate >= 30
    ) {

      return "Good";

    }

    if (
      savingsRate >= 10
    ) {

      return "Average";

    }

    return "Poor";

  };