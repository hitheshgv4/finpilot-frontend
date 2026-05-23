import { useState } from "react";

import {
  FaXmark,
} from "react-icons/fa6";

function AddTransactionModal({
  isOpen,
  setIsOpen,
  type,
  onAddTransaction,
}) {

  const [formData, setFormData] =
    useState({
      title: "",
      amount: "",
      category: "",
      date: "",
    });

  /* Handle Change */
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  /* Submit */
  const handleSubmit = (e) => {

    e.preventDefault();

    onAddTransaction({
      ...formData,
      id: Date.now(),
    });

    /* Reset */
    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
    });

    setIsOpen(false);

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[99999] px-6">

      {/* Modal */}
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0B1023] p-8 shadow-2xl relative">

        {/* Close */}
        <button
          onClick={() =>
            setIsOpen(false)
          }
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-all"
        >

          <FaXmark className="text-3xl" />

        </button>

        {/* Title */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">

            Add {type}

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Enter transaction details below

          </p>

        </div>

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

          {/* Title */}
          <div>

            <label className="block mb-3 text-lg text-gray-300">

              Title

            </label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder={`Enter ${type} title`}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white"
            />

          </div>

          {/* Amount */}
          <div>

            <label className="block mb-3 text-lg text-gray-300">

              Amount

            </label>

            <input
              type="number"
              name="amount"
              required
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white"
            />

          </div>

          {/* Category */}
          <div>

            <label className="block mb-3 text-lg text-gray-300">

              Category

            </label>

            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white"
            />

          </div>

          {/* Date */}
          <div>

            <label className="block mb-3 text-lg text-gray-300">

              Date

            </label>

            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-xl font-semibold hover:scale-[1.02] transition-all shadow-2xl"
          >

            Add {type}

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddTransactionModal;