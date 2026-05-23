import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import { exportFinancialReport } from "../utils/exportReport";

import { generateAIInsights } from "../utils/aiInsights";

import {
  getOverviewAnalytics,
  getHealthAnalytics,
  getExpenseCategoryData,
  getIncomeExpenseComparison,
  getMonthlyTrendData,
  getTopExpenseAnalytics,
  getBudgetAnalytics,
} from "../utils/analyticsHelpers";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
];

const Analytics = () => {

  /* ================= STATES ================= */

  const [incomeData,
    setIncomeData] =
    useState([]);

  const [expenseData,
    setExpenseData] =
    useState([]);

  const [budgetData,
    setBudgetData] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  /* ================= LOAD DATA ================= */

  useEffect(() => {

    fetchAnalyticsData();

    /* ================= LIVE REFRESH ================= */

    window.addEventListener(

      "financeUpdated",

      fetchAnalyticsData

    );

    return () => {

      window.removeEventListener(

        "financeUpdated",

        fetchAnalyticsData

      );

    };

  }, []);

  /* ================= FETCH DATA ================= */

  const fetchAnalyticsData =
  async () => {

    try {

      setLoading(true);

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "currentUser"
          )
        );

      if (
        !currentUser?.email
      ) {

        return;

      }

      const [

        incomeResponse,

        expenseResponse,

        budgetResponse,

      ] = await Promise.all([

        API.get(
          `/income/${currentUser.email}`
        ),

        API.get(
          `/expense/${currentUser.email}`
        ),

        API.get(
          `/budget/${currentUser.email}`
        ),

      ]);

      setIncomeData(
        incomeResponse.data || []
      );

      setExpenseData(
        expenseResponse.data || []
      );

      setBudgetData(
        budgetResponse.data || []
      );

    }

    catch (error) {

      console.log(
        error
      );

    }

    finally {

      setLoading(false);

    }

  };
  /* ================= ANALYTICS ================= */

  const overview =
    getOverviewAnalytics(
      incomeData,
      expenseData
    );

  const health =
    getHealthAnalytics(
      incomeData,
      expenseData
    );

  const expenseCategories =
    getExpenseCategoryData(
      expenseData
    );

  const comparisonData =
    getIncomeExpenseComparison(
      incomeData,
      expenseData
    );

  const monthlyTrend =
    getMonthlyTrendData(
      incomeData,
      expenseData
    );

  const topExpense =
    getTopExpenseAnalytics(
      expenseData
    );

  const budgetAnalytics =
    getBudgetAnalytics(
      budgetData,
      expenseData
    );

  /* ================= AI INSIGHTS ================= */

  const aiInsights =
    generateAIInsights(
      incomeData,
      expenseData,
      budgetData
    );

  /* ================= EXPORT REPORT ================= */

  const handleExportReport =
    () => {

      exportFinancialReport(

        incomeData,

        expenseData,

        budgetData

      );

    };

  /* ================= LOADING ================= */

  if (
    loading
  ) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl font-bold">

        Loading Analytics...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-6">

      {/* HEADING */}

      <div className="mb-10">

        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          Financial Analytics

        </h1>

        <p className="text-gray-400 mt-4 text-lg md:text-2xl">

          Visualize your financial performance and spending insights.

        </p>

      </div>

      {/* EXPORT BUTTON */}

      <button
        onClick={
          handleExportReport
        }
        className="mb-10 bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 rounded-2xl text-xl font-bold"
      >

        Download Financial Report

      </button>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

        {/* INCOME */}

        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/20 border border-green-500/20 rounded-3xl p-8">

          <h2 className="text-gray-300 text-xl mb-5">

            Total Income

          </h2>

          <h1 className="text-4xl font-bold text-green-400 break-all">

            ₹
            {(overview.totalIncome || 0).toLocaleString(
              "en-IN"
            )}

          </h1>

        </div>

        {/* EXPENSES */}

        <div className="bg-gradient-to-br from-red-900/40 to-pink-900/20 border border-red-500/20 rounded-3xl p-8">

          <h2 className="text-gray-300 text-xl mb-5">

            Total Expenses

          </h2>

          <h1 className="text-4xl font-bold text-red-400 break-all">

            ₹
            {(overview.totalExpenses || 0).toLocaleString(
              "en-IN"
            )}

          </h1>

        </div>

        {/* SAVINGS */}

        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/20 border border-purple-500/20 rounded-3xl p-8">

          <h2 className="text-gray-300 text-xl mb-5">

            Savings

          </h2>

          <h1 className="text-4xl font-bold text-purple-400 break-all">

            ₹
            {(overview.savings || 0).toLocaleString(
              "en-IN"
            )}

          </h1>

        </div>

        {/* SAVINGS RATE */}

        <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/20 border border-cyan-500/20 rounded-3xl p-8">

          <h2 className="text-gray-300 text-xl mb-5">

            Savings Rate

          </h2>

          <h1 className="text-4xl font-bold text-cyan-400">

            {health.savingsRate || 0}%

          </h1>

        </div>

        {/* FINANCIAL HEALTH */}

        <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/20 border border-yellow-500/20 rounded-3xl p-8">

          <h2 className="text-gray-300 text-xl mb-5">

            Financial Health

          </h2>

          <h1 className="text-3xl font-bold text-yellow-400 break-words">

            {health.health || "No Data"}

          </h1>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

        {/* PIE CHART */}

        <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-6 md:p-8">

          <h2 className="text-3xl font-bold mb-8">

            Expense Categories

          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={expenseCategories}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={140}
                  label
                >

                  {expenseCategories.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-6 md:p-8">

          <h2 className="text-3xl font-bold mb-8">

            Income vs Expenses

          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={comparisonData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                />

                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                />

                <YAxis
                  stroke="#9ca3af"
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="amount"
                  fill="#8b5cf6"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* MONTHLY TREND */}

      <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-6 md:p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">

          Monthly Financial Trend

        </h2>

        <div className="h-[450px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart
              data={monthlyTrend}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
              />

              <XAxis
                dataKey="month"
                stroke="#9ca3af"
              />

              <YAxis
                stroke="#9ca3af"
              />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={4}
              />

              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TOP EXPENSE */}

      <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-8 mb-10">

        <h2 className="text-4xl font-bold mb-8">

          Highest Expense Category

        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div>

            <p className="text-gray-400 text-xl mb-3">

              Category

            </p>

            <h1 className="text-5xl font-bold text-red-400 break-words">

              {topExpense?.category || "No Data"}

            </h1>

          </div>

          <div>

            <p className="text-gray-400 text-xl mb-3">

              Amount Spent

            </p>

            <h1 className="text-5xl font-bold text-yellow-400 break-all">

              ₹
              {(topExpense?.amount || 0).toLocaleString(
                "en-IN"
              )}

            </h1>

          </div>

        </div>

      </div>

      {/* BUDGET ANALYTICS */}

      <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-8 mb-10">

        <h2 className="text-4xl font-bold mb-8">

          Budget Analytics

        </h2>

        <div className="space-y-6">

          {budgetAnalytics.length === 0 ? (

            <div className="text-gray-400 text-xl">

              No budget analytics available

            </div>

          ) : (

            budgetAnalytics.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-[#1e293b] rounded-2xl p-6"
                >

                  <div className="flex justify-between mb-4 gap-4">

                    <h2 className="text-2xl font-bold break-words">

                      {item.category}

                    </h2>

                    <span className="text-xl font-bold">

                      {item.usage}%

                    </span>

                  </div>

                  <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mb-5">

                    <div
                      className={`h-full ${
                        item.usage >= 100
                          ? "bg-red-500"
                          : item.usage >= 80
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          item.usage,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <div>

                      <p className="text-gray-400 mb-2">

                        Budget

                      </p>

                      <h3 className="text-2xl font-bold">

                        ₹
                        {item.budget.toLocaleString(
                          "en-IN"
                        )}

                      </h3>

                    </div>

                    <div>

                      <p className="text-gray-400 mb-2">

                        Spent

                      </p>

                      <h3 className="text-2xl font-bold text-red-400">

                        ₹
                        {item.spent.toLocaleString(
                          "en-IN"
                        )}

                      </h3>

                    </div>

                    <div>

                      <p className="text-gray-400 mb-2">

                        Remaining

                      </p>

                      <h3
                        className={`text-2xl font-bold ${
                          item.remaining < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >

                        ₹
                        {item.remaining.toLocaleString(
                          "en-IN"
                        )}

                      </h3>

                    </div>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>

      {/* AI INSIGHTS */}

      <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-8">

        <h2 className="text-4xl font-bold mb-8">

          AI Financial Insights

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {aiInsights.length === 0 ? (

            <div className="text-gray-400 text-xl">

              No insights available

            </div>

          ) : (

            aiInsights.map(
              (
                insight,
                index
              ) => (

                <div
                  key={index}
                  className={`rounded-2xl p-6 border ${
                    insight.type ===
                    "success"
                      ? "bg-green-900/20 border-green-500/30"
                      : insight.type ===
                        "warning"
                      ? "bg-yellow-900/20 border-yellow-500/30"
                      : insight.type ===
                        "danger"
                      ? "bg-red-900/20 border-red-500/30"
                      : "bg-cyan-900/20 border-cyan-500/30"
                  }`}
                >

                  <h3 className="text-2xl font-bold mb-4">

                    {insight.title}

                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed">

                    {insight.message}

                  </p>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>

  );

};

export default Analytics;