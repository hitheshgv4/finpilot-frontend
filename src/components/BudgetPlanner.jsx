function BudgetPlanner() {
  return (
    <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

      {/* Header */}
      <div className="mb-10">

        <h2 className="text-3xl font-bold text-white">
          Budget Planner
        </h2>

        <p className="text-gray-400 mt-3">
          Monitor category-wise spending limits and monthly goals.
        </p>

      </div>

      {/* Categories */}
      <div className="space-y-8">

        {/* Food */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-gray-300">
              Food & Dining
            </p>

            <p className="text-orange-400 font-semibold">
              ₹12,000 / ₹20,000
            </p>

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full w-[60%] bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full"></div>

          </div>

        </div>

        {/* Shopping */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-gray-300">
              Shopping
            </p>

            <p className="text-pink-400 font-semibold">
              ₹25,000 / ₹30,000
            </p>

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full w-[83%] bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full"></div>

          </div>

        </div>

        {/* Bills */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-gray-300">
              Bills & Utilities
            </p>

            <p className="text-cyan-400 font-semibold">
              ₹18,000 / ₹25,000
            </p>

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full w-[72%] bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-full"></div>

          </div>

        </div>

        {/* Entertainment */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-gray-300">
              Entertainment
            </p>

            <p className="text-purple-400 font-semibold">
              ₹8,000 / ₹15,000
            </p>

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full w-[53%] bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 rounded-full"></div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BudgetPlanner;