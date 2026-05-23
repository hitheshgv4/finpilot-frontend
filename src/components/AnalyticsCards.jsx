import {
  FaChartLine,
  FaPiggyBank,
  FaWallet,
  FaBullseye,
} from "react-icons/fa";

function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

      {/* Savings */}
      <div className="bg-gradient-to-br from-purple-500/20 to-indigo-700/10 border border-purple-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Savings Rate
          </h2>

          <div className="bg-purple-500/20 p-4 rounded-2xl">
            <FaPiggyBank className="text-purple-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          72%
        </h1>

        <p className="text-purple-400 mt-4">
          Excellent growth
        </p>

      </div>

      {/* Growth */}
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-700/10 border border-green-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Spending Growth
          </h2>

          <div className="bg-green-500/20 p-4 rounded-2xl">
            <FaChartLine className="text-green-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          +18%
        </h1>

        <p className="text-green-400 mt-4">
          Compared to last month
        </p>

      </div>

      {/* Investments */}
      <div className="bg-gradient-to-br from-cyan-500/20 to-sky-700/10 border border-cyan-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Investment Returns
          </h2>

          <div className="bg-cyan-500/20 p-4 rounded-2xl">
            <FaWallet className="text-cyan-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹45,000
        </h1>

        <p className="text-cyan-400 mt-4">
          Passive income generated
        </p>

      </div>

      {/* Budget */}
      <div className="bg-gradient-to-br from-pink-500/20 to-rose-700/10 border border-pink-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Budget Efficiency
          </h2>

          <div className="bg-pink-500/20 p-4 rounded-2xl">
            <FaBullseye className="text-pink-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          86%
        </h1>

        <p className="text-pink-400 mt-4">
          Controlled spending
        </p>

      </div>

    </div>
  );
}

export default AnalyticsCards;