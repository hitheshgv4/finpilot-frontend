import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

const Dashboard = () => {

  const navigate =
    useNavigate();

  /* ================= CURRENT USER ================= */

  const currentUser =
    JSON.parse(

      localStorage.getItem(
        "currentUser"
      )

    ) || {};

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

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  /* ================= LOAD DATA ================= */

  useEffect(() => {

    if (
      currentUser?.email
    ) {

      fetchDashboardData();

    }

    /* ================= LIVE REFRESH ================= */

    window.addEventListener(

      "financeUpdated",

      fetchDashboardData

    );

    return () => {

      window.removeEventListener(

        "financeUpdated",

        fetchDashboardData

      );

    };

  }, []);

  /* ================= FETCH DATA ================= */

  const fetchDashboardData =
    async () => {

      try {

        setLoading(true);

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

        /* ================= SET STATE ================= */

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

        console.error(
          error
        );

      }

      finally {

        setLoading(false);

      }

    };

  /* ================= TOTALS ================= */

  const totalIncome =
    incomeData.reduce(

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

  const totalExpense =
    expenseData.reduce(

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

  const totalBalance =
    totalIncome -
    totalExpense;

  const savings =
    totalBalance > 0
      ? totalBalance
      : 0;

      const totalBudget =
  budgetData.reduce(

    (acc, item) =>

      acc +
      Number(
        item.budget || 0
      ),

    0

  );

  /* ================= MERGED TRANSACTIONS ================= */

  const allTransactions =
    useMemo(() => {

      return [

        ...incomeData.map(
          (item) => ({
            ...item,
            type:
              "income",
          })
        ),

        ...expenseData.map(
          (item) => ({
            ...item,
            type:
              "expense",
          })
        ),

      ];

    }, [
      incomeData,
      expenseData,
    ]);

  /* ================= FILTERED ================= */

  const filteredTransactions =
    allTransactions

      .filter(
        (item) =>

          item.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          item.category
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

      )

      .sort(
        (a, b) =>
          new Date(
            b.date
          ) -
          new Date(
            a.date
          )
      )

      .slice(0, 8);

  /* ================= DATE ================= */

  const today =
    new Date().toLocaleDateString(
      "en-GB",
      {
        day:
          "numeric",

        month:
          "long",

        year:
          "numeric",
      }
    );

  /* ================= VIEW ALL ================= */

  const handleViewAll =
    () => {

      navigate(
        "/analytics"
      );

    };

  return (

    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-6">

      {/* SEARCH + DATE */}

      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-10">

        <div className="w-full lg:w-[420px]">

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-[#111827] border border-gray-700 rounded-2xl px-5 py-4 outline-none text-white"
          />

        </div>

        <div className="bg-[#111827] border border-gray-700 rounded-2xl px-6 py-4 text-lg flex items-center justify-center">

          {today}

        </div>

      </div>

      {/* HEADING */}

      <div className="mb-10">

        <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">

          FinPilot Dashboard

        </h1>

        <p className="text-gray-400 mt-4 text-lg md:text-2xl">

          Welcome back,{" "}
          {
            currentUser.name ||
            "User"
          } 👋

        </p>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="flex items-center justify-center py-20 text-3xl font-bold text-purple-400">

          Loading Dashboard...

        </div>

      ) : (

        <>

          {/* CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            {/* BALANCE */}

            <div className="bg-gradient-to-br from-[#1e3a8a]/40 to-[#312e81]/40 border border-blue-800 rounded-3xl p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-gray-300 text-2xl">

                  Total Balance

                </h2>

                <div className="bg-blue-500/20 p-4 rounded-2xl text-2xl">

                  💳

                </div>

              </div>

              <h1 className="text-4xl md:text-5xl font-bold break-all">

                ₹
                {totalBalance.toLocaleString(
                  "en-IN"
                )}

              </h1>

            </div>

            {/* INCOME */}

            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-800 rounded-3xl p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-gray-300 text-2xl">

                  Income

                </h2>

                <div className="bg-green-500/20 p-4 rounded-2xl text-2xl">

                  📈

                </div>

              </div>

              <h1 className="text-4xl md:text-5xl font-bold break-all">

                ₹
                {totalIncome.toLocaleString(
                  "en-IN"
                )}

              </h1>

            </div>

            {/* EXPENSES */}

            <div className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border border-red-800 rounded-3xl p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-gray-300 text-2xl">

                  Expenses

                </h2>

                <div className="bg-red-500/20 p-4 rounded-2xl text-2xl">

                  📉

                </div>

              </div>

              <h1 className="text-4xl md:text-5xl font-bold break-all">

                ₹
                {totalExpense.toLocaleString(
                  "en-IN"
                )}

              </h1>

            </div>

            {/* SAVINGS */}

            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-800 rounded-3xl p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-gray-300 text-2xl">

                  Savings

                </h2>

                <div className="bg-purple-500/20 p-4 rounded-2xl text-2xl">

                  🐷

                </div>

              </div>

              <h1 className="text-4xl md:text-5xl font-bold break-all">

                ₹
                {savings.toLocaleString(
                  "en-IN"
                )}

              </h1>

            </div>

          </div>
          {/* BUDGET */}

<div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border border-yellow-700 rounded-3xl p-8">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-gray-300 text-2xl">

      Budget

    </h2>

    <div className="bg-yellow-500/20 p-4 rounded-2xl text-2xl">

      🎯

    </div>

  </div>

  <h1 className="text-4xl md:text-5xl font-bold break-all">

    ₹
    {totalBudget.toLocaleString(
      "en-IN"
    )}

  </h1>

</div>

          {/* RECENT TRANSACTIONS */}

          <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-5 md:p-8">

            <div className="flex flex-col md:flex-row justify-between gap-5 md:items-center mb-8">

              <div>

                <h1 className="text-3xl md:text-5xl font-bold">

                  Recent Transactions

                </h1>

                <p className="text-gray-400 mt-3 text-lg">

                  Your latest financial activity

                </p>

              </div>

              <button
                onClick={
                  handleViewAll
                }
                className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-2xl font-bold"
              >

                View All

              </button>

            </div>

            {/* EMPTY */}

            {filteredTransactions.length === 0 ? (

              <div className="text-center text-gray-400 py-16 text-xl">

                No matching transactions found

              </div>

            ) : (

              <div className="space-y-5">

                {filteredTransactions.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="bg-[#1f2937]/60 border border-gray-700 rounded-2xl p-5 flex flex-col md:flex-row justify-between md:items-center gap-5"
                    >

                      {/* LEFT */}

                      <div className="flex items-center gap-5">

                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                            item.type ===
                            "income"
                              ? "bg-green-900/40 text-green-400"
                              : "bg-red-900/40 text-red-400"
                          }`}
                        >

                          {item.type ===
                          "income"
                            ? "↑"
                            : "↓"}

                        </div>

                        <div>

                          <h2 className="text-2xl font-bold">

                            {item.title}

                          </h2>

                          <p className="text-gray-400 mt-1">

                            {item.date}

                          </p>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <div
                        className={`text-2xl md:text-3xl font-bold ${
                          item.type ===
                          "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >

                        {item.type ===
                        "income"
                          ? "+"
                          : "-"}

                        {" "}₹
                        {Number(
                          item.amount
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </>

      )}

    </div>

  );

};

export default Dashboard;