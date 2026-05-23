import React, {
  useEffect,
  useState,
} from "react";

import {
  setIncomeDataCache,
} from "../utils/financeHelpers";

import toast from "react-hot-toast";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import API from "../services/api";

const Income = () => {

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

      fetchIncome();

    }

  }, []);

  /* ================= FETCH INCOME ================= */

  const fetchIncome =
    async () => {

      try {

        const response =
          await API.get(

            `/income/${currentUser.email}`

          );

        setIncomeData(
          response.data
        );

        setIncomeDataCache(
          response.data
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to fetch income"
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

  /* ================= ADD INCOME ================= */

  const handleAddIncome =
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

        const newIncome = {

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

            "/income",

            newIncome

          );

        const updatedData = [

          ...incomeData,

          response.data,

        ];

        /* ================= UPDATE STATE ================= */

        setIncomeData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setIncomeDataCache(
          updatedData
        );

        closeModal();

        toast.success(
          "Income added successfully"
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to add income"
        );

      }

    };

  /* ================= DELETE ================= */

  const handleDelete =
    async (id) => {

      try {

        await API.delete(
          `/income/${id}`
        );

        const updatedData =
          incomeData.filter(
            (item) =>
              item.id !== id
          );

        /* ================= UPDATE STATE ================= */

        setIncomeData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setIncomeDataCache(
          updatedData
        );

        toast.success(
          "Income deleted"
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

        const updatedIncome = {

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

            `/income/${editIndex}`,

            updatedIncome

          );

        const updatedData =
          incomeData.map(
            (item) =>

              item.id ===
              editIndex

                ? response.data

                : item

          );

        /* ================= UPDATE STATE ================= */

        setIncomeData(
          updatedData
        );

        /* ================= UPDATE CACHE ================= */

        setIncomeDataCache(
          updatedData
        );

        closeModal();

        toast.success(
          "Income updated"
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
      incomeData.map(
        (item) =>
          item.category
      )
    ),

  ];

  /* ================= FILTER + SORT ================= */

  const filteredIncome =
    incomeData

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

  const totalIncome =
    incomeData.reduce(

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

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">

            Income Page

          </h1>

          <p className="text-gray-400 mt-3 text-base md:text-xl">

            Track all your income sources.

          </p>

        </div>

        <button
          onClick={
            openAddModal
          }
          className="bg-green-500 hover:bg-green-600 px-6 py-4 rounded-2xl text-lg md:text-xl font-bold"
        >

          + Add Income

        </button>

      </div>

      {/* TOTAL CARD */}

      <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/20 border border-green-500/20 rounded-3xl p-6 md:p-8 mb-10">

        <h2 className="text-xl md:text-2xl text-gray-300 mb-5">

          Total Income

        </h2>

        <h1 className="text-4xl md:text-6xl font-bold text-green-400 break-all">

          ₹ {totalIncome.toLocaleString(
            "en-IN"
          )}

        </h1>

      </div>

      {/* FILTERS */}

      <div className="flex flex-col lg:flex-row gap-4 mb-10">

        <input
          type="text"
          placeholder="Search income..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="flex-1 bg-[#111827] border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
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
          className="bg-[#111827] border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
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
          className="bg-[#111827] border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
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

      {/* INCOME LIST */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {filteredIncome.length === 0 ? (

          <div className="col-span-full bg-[#111827] border border-gray-800 rounded-3xl p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-400">

              No Income Found

            </h2>

          </div>

        ) : (

          filteredIncome.map(
            (item) => (

              <div
                key={item.id}
                className="bg-[#111827] border border-gray-800 rounded-3xl p-6 flex flex-col md:flex-row justify-between gap-6"
              >

                <div className="space-y-3">

                  <h2 className="text-2xl font-bold">

                    {item.title}

                  </h2>

                  <p className="text-gray-400">

                    {item.category}

                  </p>

                  <p className="text-gray-500">

                    {item.date}

                  </p>

                </div>

                <div className="flex flex-col items-end justify-between">

                  <h1 className="text-4xl font-bold text-green-400">

                    ₹
                    {Number(
                      item.amount
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </h1>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() =>
                        handleEdit(
                          item
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 p-3 rounded-xl"
                    >

                      <Pencil size={20} />

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 p-3 rounded-xl"
                    >

                      <Trash2 size={20} />

                    </button>

                  </div>

                </div>

              </div>

            )
          )

        )}

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-[#111827] border border-gray-700 rounded-3xl p-8 w-full max-w-2xl">

            <h1 className="text-3xl font-bold mb-8">

              {editIndex
                ? "Edit Income"
                : "Add Income"}

            </h1>

            <div className="space-y-6">

              <input
                type="text"
                name="title"
                placeholder="Income Title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                className="w-full bg-[#020617] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={
                  formData.amount
                }
                onChange={
                  handleChange
                }
                className="w-full bg-[#020617] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                className="w-full bg-[#020617] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

              <input
                type="date"
                name="date"
                value={
                  formData.date
                }
                onChange={
                  handleChange
                }
                className="w-full bg-[#020617] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-green-500"
              />

            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-10">

              <button
                onClick={
                  editIndex
                    ? handleSaveEdit
                    : handleAddIncome
                }
                className="flex-1 bg-green-500 hover:bg-green-600 py-4 rounded-2xl text-xl font-bold"
              >

                {editIndex
                  ? "Save Changes"
                  : "Add Income"}

              </button>

              <button
                onClick={
                  closeModal
                }
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-4 rounded-2xl text-xl font-bold"
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Income;