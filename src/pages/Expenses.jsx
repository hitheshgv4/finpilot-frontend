import React, {
  useEffect,
  useState,
} from "react";

import {
  setExpenseDataCache,
} from "../utils/financeHelpers";

import toast from "react-hot-toast";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import API from "../services/api";

const Expenses = () => {

  /* ================= CURRENT USER ================= */

  const currentUser =
    JSON.parse(

      localStorage.getItem(
        "currentUser"
      )

    ) || {};

  /* ================= STATES ================= */

  const [expenseData,
    setExpenseData] =
    useState([]);

  const [showModal,
    setShowModal] =
    useState(false);

  const [editIndex,
    setEditIndex] =
    useState(null);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("All Categories");

  const [sortBy,
    setSortBy] =
    useState("latest");

  const emptyForm = {

    title: "",
    amount: "",
    category: "",
    date: "",
    userEmail:
      currentUser?.email || "",

  };

  const [formData,
    setFormData] =
    useState(emptyForm);

  /* ================= LOAD DATA ================= */

  useEffect(() => {

    if (
      currentUser?.email
    ) {

      fetchExpenses();

    }

  }, []);

  /* ================= FETCH EXPENSES ================= */

  const fetchExpenses =
    async () => {

      try {

        const response =
          await API.get(

            `/expense/${currentUser.email}`

          );

        setExpenseData(
          response.data
        );

        setExpenseDataCache(
          response.data
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to fetch expenses"
        );

      }

    };

  /* ================= INPUT ================= */

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  /* ================= OPEN MODAL ================= */

  const openAddModal =
    () => {

      setEditIndex(null);

      setFormData({

        title: "",
        amount: "",
        category: "",
        date: "",
        userEmail:
          currentUser?.email || "",

      });

      setShowModal(true);

    };

  /* ================= CLOSE MODAL ================= */

  const closeModal =
    () => {

      setShowModal(false);

      setEditIndex(null);

      setFormData({

        title: "",
        amount: "",
        category: "",
        date: "",
        userEmail:
          currentUser?.email || "",

      });

    };

  /* ================= ADD EXPENSE ================= */

  const handleAddExpense =
    async () => {

      if (
        !formData.title ||
        !formData.amount ||
        !formData.category ||
        !formData.date
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      try {

        const newExpense = {

          title:
            formData.title,

          amount:
            Number(
              formData.amount
            ),

          category:
            formData.category,

          date:
            formData.date,

          userEmail:
            currentUser.email,

        };

        const response =
          await API.post(

            "/expense",

            newExpense

          );

        const updatedData = [

          ...expenseData,

          response.data,

        ];

        /* ================= UPDATE STATE ================= */

        setExpenseData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setExpenseDataCache(
          updatedData
        );

        closeModal();

        toast.success(
          "Expense added successfully"
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to add expense"
        );

      }

    };

  /* ================= DELETE ================= */

  const handleDelete =
    async (id) => {

      try {

        await API.delete(
          `/expense/${id}`
        );

        const updatedData =
          expenseData.filter(
            (item) =>
              item.id !== id
          );

        /* ================= UPDATE STATE ================= */

        setExpenseData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setExpenseDataCache(
          updatedData
        );

        toast.success(
          "Expense deleted"
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

      setEditIndex(
        item.id
      );

      setFormData({

        title:
          item.title,

        amount:
          item.amount,

        category:
          item.category,

        date:
          item.date,

        userEmail:
          item.userEmail,

      });

      setShowModal(true);

    };

  /* ================= SAVE EDIT ================= */

  const handleSaveEdit =
    async () => {

      try {

        const updatedExpense = {

          title:
            formData.title,

          amount:
            Number(
              formData.amount
            ),

          category:
            formData.category,

          date:
            formData.date,

          userEmail:
            currentUser.email,

        };

        const response =
          await API.put(

            `/expense/${editIndex}`,

            updatedExpense

          );

        const updatedData =
          expenseData.map(
            (item) =>

              item.id ===
              editIndex

                ? response.data

                : item

          );

        /* ================= UPDATE STATE ================= */

        setExpenseData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setExpenseDataCache(
          updatedData
        );

        closeModal();

        toast.success(
          "Expense updated"
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

  /* ================= CATEGORIES ================= */

  const categories = [

    "All Categories",

    ...new Set(
      expenseData.map(
        (item) =>
          item.category
      )
    ),

  ];

  /* ================= FILTER + SORT ================= */

  const filteredExpenses =
    expenseData

      .filter((item) => {

        const matchesSearch =

          item.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          item.category
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          item.amount
            .toString()
            .includes(
              searchTerm
            ) ||

          item.date.includes(
            searchTerm
          );

        const matchesCategory =

          selectedCategory ===
            "All Categories" ||

          item.category ===
            selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );

      })

      .sort((a, b) => {

        if (
          sortBy ===
          "highest"
        ) {

          return (
            b.amount -
            a.amount
          );

        }

        if (
          sortBy ===
          "lowest"
        ) {

          return (
            a.amount -
            b.amount
          );

        }

        if (
          sortBy ===
          "az"
        ) {

          return a.title.localeCompare(
            b.title
          );

        }

        if (
          sortBy ===
          "za"
        ) {

          return b.title.localeCompare(
            a.title
          );

        }

        return (
          new Date(
            b.date
          ) -
          new Date(
            a.date
          )
        );

      });

  /* ================= TOTAL ================= */

  const totalExpense =
    expenseData.reduce(

      (acc, item) =>

        acc +
        Number(
          item.amount
        ),

      0

    );

  return (

    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

        <div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">

            Expenses Page

          </h1>

          <p className="text-gray-400 mt-3 text-base md:text-xl">

            Track all your expenses.

          </p>

        </div>

        <button
          onClick={
            openAddModal
          }
          className="bg-red-500 hover:bg-red-600 px-6 py-4 rounded-2xl text-lg md:text-xl font-bold"
        >

          + Add Expense

        </button>

      </div>

      {/* TOTAL CARD */}

      <div className="bg-gradient-to-br from-red-900/40 to-pink-900/20 border border-red-500/20 rounded-3xl p-6 md:p-8 mb-10">

        <h2 className="text-xl md:text-2xl text-gray-300 mb-5">

          Total Expenses

        </h2>

        <h1 className="text-4xl md:text-6xl font-bold text-red-400 break-all">

          ₹ {totalExpense.toLocaleString(
            "en-IN"
          )}

        </h1>

      </div>

      {/* FILTERS */}

      <div className="flex flex-col lg:flex-row gap-4 mb-10">

        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="flex-1 bg-[#111827] border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-500"
        />

        <select
          value={
            selectedCategory
          }
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="bg-[#111827] border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-500"
        >

          {categories.map(
            (category) => (

              <option
                key={category}
                value={category}
              >

                {category}

              </option>

            )
          )}

        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className="bg-[#111827] border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-red-500"
        >

          <option value="latest">
            Sort By
          </option>

          <option value="highest">
            Highest Amount
          </option>

          <option value="lowest">
            Lowest Amount
          </option>

          <option value="az">
            A-Z
          </option>

          <option value="za">
            Z-A
          </option>

        </select>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {filteredExpenses.map(
          (item) => (

            <div
              key={item.id}
              className="bg-[#111827] border border-gray-800 rounded-3xl p-6"
            >

              <h2 className="text-2xl md:text-3xl font-bold mb-4 break-words">

                {item.title}

              </h2>

              <h1 className="text-3xl md:text-5xl font-bold text-red-400 mb-4 break-all">

                ₹ {Number(
                  item.amount
                ).toLocaleString(
                  "en-IN"
                )}

              </h1>

              <p className="text-gray-400 mb-2 break-words">

                {item.category}

              </p>

              <p className="text-gray-500">

                {item.date}

              </p>

            </div>

          )
        )}

      </div>

      {/* HISTORY */}

      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-4 md:p-8">

        <h2 className="text-3xl md:text-4xl font-bold mb-8">

          Expense History

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>

              <tr className="text-left border-b border-gray-700 text-gray-400">

                <th className="pb-4">
                  Title
                </th>

                <th className="pb-4">
                  Category
                </th>

                <th className="pb-4">
                  Amount
                </th>

                <th className="pb-4">
                  Date
                </th>

                <th className="pb-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredExpenses.map(
                (
                  item
                ) => (

                  <tr
                    key={item.id}
                    className="border-b border-gray-800"
                  >

                    <td className="py-6">
                      {item.title}
                    </td>

                    <td className="py-6">
                      {item.category}
                    </td>

                    <td className="py-6 text-red-400 font-bold">
                      ₹ {Number(
                        item.amount
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td className="py-6">
                      {item.date}
                    </td>

                    <td className="py-6 flex gap-3">

                      <button
                        onClick={() =>
                          handleEdit(
                            item
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 p-3 rounded-xl"
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 p-3 rounded-xl"
                      >

                        <Trash2 size={18} />

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">

          <div className="bg-[#0f172a] border border-gray-700 rounded-3xl w-full max-w-2xl p-6 md:p-8">

            <div className="flex justify-between items-center mb-8">

              <h1 className="text-3xl md:text-5xl font-bold text-purple-400">

                {editIndex !== null
                  ? "Edit Expense"
                  : "Add Expense"}

              </h1>

              <button
                onClick={
                  closeModal
                }
                className="text-4xl text-gray-400"
              >

                ×

              </button>

            </div>

            <div className="space-y-6">

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl p-5 text-lg"
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl p-5 text-lg"
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl p-5 text-lg"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl p-5 text-lg"
              />

              <button
                onClick={
                  editIndex !== null
                    ? handleSaveEdit
                    : handleAddExpense
                }
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-5 rounded-2xl text-xl md:text-2xl font-bold"
              >

                {editIndex !== null
                  ? "Save Changes"
                  : "Add Expense"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Expenses;