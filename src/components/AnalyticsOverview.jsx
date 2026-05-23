function AnalyticsOverview() {
  return (
    <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

      {/* Header */}
      <div className="mb-10">

        <h2 className="text-3xl font-bold text-white">
          Financial Performance
        </h2>

        <p className="text-gray-400 mt-3">
          Analyze your monthly financial activities and growth insights.
        </p>

      </div>

      {/* Analytics Blocks */}
      <div className="space-y-8">

        {/* Savings Progress */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-gray-300">
              Savings Target
            </p>

            <p className="text-purple-400 font-semibold">
              72%
            </p>

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full w-[72%] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full"></div>

          </div>

        </div>

        {/* Expense Control */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-gray-300">
              Expense Control
            </p>

            <p className="text-pink-400 font-semibold">
              81%
            </p>

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full w-[81%] bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full"></div>

          </div>

        </div>

        {/* Investment Growth */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-gray-300">
              Investment Growth
            </p>

            <p className="text-cyan-400 font-semibold">
              64%
            </p>

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full w-[64%] bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-full"></div>

          </div>

        </div>

        {/* Budget Usage */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-gray-300">
              Budget Usage
            </p>

            <p className="text-green-400 font-semibold">
              88%
            </p>

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full w-[88%] bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full"></div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsOverview;