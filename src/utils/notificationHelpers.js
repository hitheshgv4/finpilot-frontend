import {
  getTotalIncome,
  getTotalExpenses,
  getSavings,
  getBudgetData,
  getExpenseData,
  getHighestExpenseCategory,
  getFinancialHealth,
} from "./financeHelpers";

/* ================= STORAGE KEY ================= */

const STORAGE_KEY =
  "finpilot_notifications";

/* ================= GET SAVED ================= */

export const getNotifications =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        )
      ) || []
    );

  };

/* ================= SAVE ================= */

export const saveNotifications =
  (notifications) => {

    localStorage.setItem(
      STORAGE_KEY,

      JSON.stringify(
        notifications
      )
    );

  };

/* ================= MARK READ ================= */

export const markAllAsRead =
  () => {

    const notifications =
      getNotifications();

    const updated =
      notifications.map(
        (item) => ({

          ...item,

          read: true,

        })
      );

    saveNotifications(
      updated
    );

    return updated;

  };

/* ================= CLEAR ================= */

export const clearNotifications =
  () => {

    localStorage.removeItem(
      STORAGE_KEY
    );

  };

/* ================= GENERATE ================= */

export const generateNotifications =
  () => {

    const existing =
      getNotifications();

    const notifications =
      [];

    const totalIncome =
      getTotalIncome();

    const totalExpenses =
      getTotalExpenses();

    const savings =
      getSavings();

    const budgetData =
      getBudgetData();

    const expenseData =
      getExpenseData();

    const highestExpense =
      getHighestExpenseCategory();

    const financialHealth =
      getFinancialHealth();

    /* ================= EMPTY ================= */

    if (
      totalIncome === 0 &&
      totalExpenses === 0
    ) {

      notifications.push({

        id: 1,

        type: "info",

        title:
          "Start Tracking",

        message:
          "Add income and expenses to begin financial tracking.",

        time:
          new Date().toLocaleString(),

        read: false,

      });

    }

    /* ================= SAVINGS ================= */

    if (
      savings > 0
    ) {

      notifications.push({

        id: 2,

        type:
          "success",

        title:
          "Positive Savings",

        message:
          `You currently saved Rs. ${savings.toLocaleString(
            "en-IN"
          )}.`,

        time:
          new Date().toLocaleString(),

        read: false,

      });

    }

    /* ================= LOW SAVINGS ================= */

    if (
      totalIncome > 0 &&
      savings <
        totalIncome *
          0.1
    ) {

      notifications.push({

        id: 3,

        type:
          "warning",

        title:
          "Low Savings Alert",

        message:
          "Savings are below 10% of income.",

        time:
          new Date().toLocaleString(),

        read: false,

      });

    }

    /* ================= TOP CATEGORY ================= */

    if (
      highestExpense
    ) {

      notifications.push({

        id: 4,

        type:
          "danger",

        title:
          "Highest Spending",

        message:
          `${highestExpense[0]} spending reached Rs. ${highestExpense[1].toLocaleString(
            "en-IN"
          )}.`,

        time:
          new Date().toLocaleString(),

        read: false,

      });

    }

    /* ================= HEALTH ================= */

    notifications.push({

      id: 5,

      type:
        financialHealth ===
        "Excellent"
          ? "success"
          : financialHealth ===
            "Poor"
          ? "danger"
          : "info",

      title:
        "Financial Health",

      message:
        `Current financial health is ${financialHealth}.`,

      time:
        new Date().toLocaleString(),

      read: false,

    });

    /* ================= BUDGET ALERTS ================= */

    budgetData.forEach(
      (budget) => {

        const spent =
          expenseData
            .filter(
              (
                expense
              ) =>

                expense.category
                  .toLowerCase() ===
                budget.category
                  .toLowerCase()
            )
            .reduce(
              (
                acc,
                item
              ) =>

                acc +
                Number(
                  item.amount
                ),

              0
            );

        const budgetAmount =
          Number(
            budget.budget
          );

        const usage =
          (
            (spent /
              budgetAmount) *
            100
          );

        /* ===== EXCEEDED ===== */

        if (
          usage >= 100
        ) {

          notifications.push({

            id:
              Math.random(),

            type:
              "danger",

            title:
              "Budget Exceeded",

            message:
              `${budget.category} budget exceeded by Rs. ${(
                spent -
                budgetAmount
              ).toLocaleString(
                "en-IN"
              )}.`,

            time:
              new Date().toLocaleString(),

            read:
              false,

          });

        }

        /* ===== WARNING ===== */

        else if (
          usage >= 80
        ) {

          notifications.push({

            id:
              Math.random(),

            type:
              "warning",

            title:
              "Budget Warning",

            message:
              `${budget.category} budget usage reached ${Math.round(
                usage
              )}%.`,

            time:
              new Date().toLocaleString(),

            read:
              false,

          });

        }

      }
    );

    /* ================= LARGE EXPENSE ================= */

    expenseData.forEach(
      (expense) => {

        if (
          Number(
            expense.amount
          ) >= 10000
        ) {

          notifications.push({

            id:
              Math.random(),

            type:
              "warning",

            title:
              "Large Expense",

            message:
              `${expense.title} expense is unusually high.`,

            time:
              expense.date,

            read:
              false,

          });

        }

      }
    );

    /* ================= REMOVE DUPLICATES ================= */

    const unique =
      notifications.filter(
        (
          item,
          index,
          self
        ) =>

          index ===
          self.findIndex(
            (n) =>

              n.title ===
                item.title &&
              n.message ===
                item.message
          )
      );

    /* ================= SAVE ================= */

    saveNotifications(
      unique
    );

    return unique.reverse();

  };