import React, {
  useEffect,
  useState,
} from "react";

import {
  setBudgetDataCache,
} from "../utils/financeHelpers";

import toast from "react-hot-toast";

import API from "../services/api";

import {
  getCategoryExpense,
  getRemainingBudget,
  getBudgetUsage,
} from "../utils/financeHelpers";

const Budget = () => {

  /* ================= CURRENT USER ================= */

  const currentUser =
    JSON.parse(

      localStorage.getItem(
        "currentUser"
      )

    ) || {};

  /* ================= STATES ================= */

  const [budgetData,
    setBudgetData] =
    useState([]);

  const [showModal,
    setShowModal] =
    useState(false);

  const [editingId,
    setEditingId] =
    useState(null);

  const emptyForm = {

    category: "",
    budget: "",
    userEmail:
      currentUser?.email || "",

  };

  const [formData,
    setFormData] =
    useState(emptyForm);

  /* ================= LOAD ================= */

  useEffect(() => {

    if (
      currentUser?.email
    ) {

      fetchBudgets();

    }

  }, []);

  /* ================= FETCH BUDGETS ================= */

  const fetchBudgets =
    async () => {

      try {

        const response =
          await API.get(

            `/budget/${currentUser.email}`

          );

        setBudgetData(
          response.data
        );

        setBudgetDataCache(
          response.data
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to fetch budgets"
        );

      }

    };

  /* ================= TOTALS ================= */

  const totalBudget =
    budgetData.reduce(
      (acc, item) =>
        acc +
        Number(item.budget),
      0
    );

  const totalSpent =
    budgetData.reduce(
      (acc, item) =>
        acc +
        getCategoryExpense(
          item.category
        ),
      0
    );

  const remainingBudget =
    totalBudget -
    totalSpent;

  const savingsGoal =
    totalBudget > 0
      ? Math.round(
          (remainingBudget /
            totalBudget) *
            100
        )
      : 0;

  const overspending =
    budgetData.filter(
      (item) =>
        getCategoryExpense(
          item.category
        ) >
        Number(item.budget)
    );

  /* ================= OPEN MODAL ================= */

  const openAddModal =
    () => {

      setEditingId(null);

      setFormData({

        category: "",
        budget: "",
        userEmail:
          currentUser?.email || "",

      });

      setShowModal(true);

    };

  /* ================= CLOSE MODAL ================= */

  const closeModal =
    () => {

      setShowModal(false);

      setEditingId(null);

      setFormData({

        category: "",
        budget: "",
        userEmail:
          currentUser?.email || "",

      });

    };

  /* ================= ADD BUDGET ================= */

  const handleAddBudget =
    async () => {

      if (
        !formData.category ||
        !formData.budget
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      try {

        const newBudget = {

          category:
            formData.category,

          budget:
            Number(
              formData.budget
            ),

          userEmail:
            currentUser.email,

        };

        const response =
          await API.post(

            "/budget",

            newBudget

          );

        const updatedData = [

          ...budgetData,

          response.data,

        ];

        /* ================= UPDATE STATE ================= */

        setBudgetData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setBudgetDataCache(
          updatedData
        );

        closeModal();

        toast.success(
          "Budget added successfully"
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to add budget"
        );

      }

    };

  /* ================= DELETE ================= */

  const handleDelete =
    async (id) => {

      try {

        await API.delete(
          `/budget/${id}`
        );

        const updatedData =
          budgetData.filter(
            (item) =>
              item.id !== id
          );

        /* ================= UPDATE STATE ================= */

        setBudgetData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setBudgetDataCache(
          updatedData
        );

        toast.success(
          "Budget deleted"
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Delete failed"
        );

      }

    };

  /* ================= EDIT ================= */

  const handleEdit =
    (item) => {

      setEditingId(
        item.id
      );

      setFormData({

        category:
          item.category,

        budget:
          item.budget,

        userEmail:
          item.userEmail,

      });

      setShowModal(true);

    };

  /* ================= SAVE EDIT ================= */

  const handleSaveChanges =
    async () => {

      try {

        const updatedBudget = {

          category:
            formData.category,

          budget:
            Number(
              formData.budget
            ),

          userEmail:
            currentUser.email,

        };

        const response =
          await API.put(

            `/budget/${editingId}`,

            updatedBudget

          );

        const updatedData =
          budgetData.map(
            (item) =>

              item.id ===
              editingId

                ? response.data

                : item

          );

        /* ================= UPDATE STATE ================= */

        setBudgetData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setBudgetDataCache(
          updatedData
        );

        closeModal();

        toast.success(
          "Budget updated"
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Update failed"
        );

      }

    };

  /* ================= BUDGET WARNINGS ================= */

  useEffect(() => {

    budgetData.forEach(
      (item) => {

        const usage =
          getBudgetUsage(
            item.category,
            item.budget
          );

        if (
          usage >= 100
        ) {

          toast.error(
            `${item.category} budget exceeded!`
          );

        }

        else if (
          usage >= 80
        ) {

          toast(
            `${item.category} budget reached ${usage}%`,
            {
              icon: "⚠️",
            }
          );

        }

      }
    );

  }, [budgetData]);

  return (

    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

        <div>

          <h1 className="text-4xl md:text-6xl font-bold text-yellow-400">

            Budget Page

          </h1>

          <p className="text-gray-400 mt-3 text-base md:text-xl">

            Plan and manage your monthly budgets smartly.

          </p>

        </div>

        <button
          onClick={
            openAddModal
          }
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-4 rounded-2xl text-lg md:text-xl font-bold"
        >

          + Add Budget

        </button>

      </div>

      {/* BUDGET PLANNER */}

      <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-6 md:p-8 mb-10">

        <h1 className="text-3xl md:text-4xl font-bold mb-10">

          Monthly Budget Planner

        </h1>

        <div className="space-y-8">

          {budgetData.map(
            (item) => {

              const spent =
                getCategoryExpense(
                  item.category
                );

              const remaining =
                getRemainingBudget(
                  item.category,
                  item.budget
                );

              const usage =
                getBudgetUsage(
                  item.category,
                  item.budget
                );

              return (

                <div
                  key={item.id}
                  className="bg-[#1e293b] rounded-3xl p-6 border border-gray-700"
                >

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">

                    <div>

                      <h2 className="text-3xl font-bold">

                        {item.category}

                      </h2>

                      <p className="text-gray-400 mt-2">

                        Budget:
                        ₹
                        {Number(
                          item.budget
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>

                    <div className="text-right">

                      <h1 className="text-3xl font-bold text-yellow-400">

                        {usage}%

                      </h1>

                    </div>

                  </div>

                  {/* PROGRESS BAR */}

                  <div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden mb-6">

                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        usage >= 100
                          ? "bg-red-500"
                          : usage >= 80
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          usage,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                  {/* DETAILS */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-[#0f172a] rounded-2xl p-5">

                      <p className="text-gray-400 mb-2">

                        Spent

                      </p>

                      <h2 className="text-3xl font-bold text-red-400">

                        ₹
                        {spent.toLocaleString(
                          "en-IN"
                        )}

                      </h2>

                    </div>

                    <div className="bg-[#0f172a] rounded-2xl p-5">

                      <p className="text-gray-400 mb-2">

                        Remaining

                      </p>

                      <h2
                        className={`text-3xl font-bold ${
                          remaining < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >

                        ₹
                        {remaining.toLocaleString(
                          "en-IN"
                        )}

                      </h2>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={() =>
                        handleEdit(
                          item
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-2xl font-bold"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-2xl font-bold"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-800 rounded-3xl p-8">

          <h2 className="text-2xl text-gray-300 mb-6">

            Remaining Budget

          </h2>

          <h1 className="text-5xl md:text-6xl font-bold text-green-400 break-all">

            ₹
            {remainingBudget.toLocaleString(
              "en-IN"
            )}

          </h1>

        </div>

        <div className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border border-red-800 rounded-3xl p-8">

          <h2 className="text-2xl text-gray-300 mb-6">

            Overspending

          </h2>

          <h1 className="text-5xl md:text-6xl font-bold text-red-400">

            {
              overspending.length
            }

          </h1>

        </div>

        <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-800 rounded-3xl p-8">

          <h2 className="text-2xl text-gray-300 mb-6">

            Savings Goal

          </h2>

          <h1 className="text-5xl md:text-6xl font-bold text-cyan-400">

            {savingsGoal}%

          </h1>

        </div>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-5">

          <div className="bg-[#0f172a] w-full max-w-2xl rounded-3xl p-8 border border-gray-700">

            <div className="flex justify-between items-center mb-8">

              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">

                {editingId
                  ? "Edit Budget"
                  : "Add Budget"}

              </h1>

              <button
                onClick={
                  closeModal
                }
                className="text-4xl"
              >

                ×

              </button>

            </div>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Category"
                value={
                  formData.category
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target
                        .value,
                  })
                }
                className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-5 py-4 text-xl outline-none"
              />

              <input
                type="number"
                placeholder="Budget Amount"
                value={
                  formData.budget
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budget:
                      e.target
                        .value,
                  })
                }
                className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-5 py-4 text-xl outline-none"
              />

              <button
                onClick={
                  editingId
                    ? handleSaveChanges
                    : handleAddBudget
                }
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-4 rounded-2xl text-2xl font-bold mt-6"
              >

                {editingId
                  ? "Save Changes"
                  : "Add Budget"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Budget;