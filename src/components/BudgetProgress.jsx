function BudgetProgress() {
  return (
    <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Budget Overview
          </h2>

          <p className="text-gray-400 mt-2">
            Monthly spending progress
          </p>
        </div>

        <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 rounded-2xl text-sm font-semibold">
          View Budget
        </button>

      </div>

      {/* Budget Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-gray-400">
            Monthly Budget
          </p>

          <h2 className="text-3xl font-bold mt-3">
            ₹50,000
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-gray-400">
            Spent
          </p>

          <h2 className="text-3xl font-bold mt-3 text-red-400">
            ₹37,500
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-gray-400">
            Remaining
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">
            ₹12,500
          </h2>
        </div>

      </div>

      {/* Progress Bar */}
      <div>

        <div className="flex items-center justify-between mb-3">

          <p className="text-gray-300">
            Budget Usage
          </p>

          <p className="text-purple-400 font-semibold">
            75%
          </p>

        </div>

        <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

          <div className="h-full w-[75%] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-lg"></div>

        </div>

      </div>

    </div>
  );
}

export default BudgetProgress;