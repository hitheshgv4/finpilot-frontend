import {
  FaBullseye,
  FaWallet,
  FaChartPie,
  FaPiggyBank,
} from "react-icons/fa";

function BudgetCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

      {/* Monthly Budget */}
      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-700/10 border border-cyan-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Monthly Budget
          </h2>

          <div className="bg-cyan-500/20 p-4 rounded-2xl">
            <FaWallet className="text-cyan-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹80,000
        </h1>

        <p className="text-cyan-400 mt-4">
          Budget allocated
        </p>

      </div>

      {/* Remaining */}
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-700/10 border border-green-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Remaining
          </h2>

          <div className="bg-green-500/20 p-4 rounded-2xl">
            <FaPiggyBank className="text-green-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹22,000
        </h1>

        <p className="text-green-400 mt-4">
          Safe spending zone
        </p>

      </div>

      {/* Usage */}
      <div className="bg-gradient-to-br from-purple-500/20 to-indigo-700/10 border border-purple-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Budget Usage
          </h2>

          <div className="bg-purple-500/20 p-4 rounded-2xl">
            <FaChartPie className="text-purple-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          72%
        </h1>

        <p className="text-purple-400 mt-4">
          Controlled expenses
        </p>

      </div>

      {/* Goal */}
      <div className="bg-gradient-to-br from-pink-500/20 to-rose-700/10 border border-pink-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Savings Goal
          </h2>

          <div className="bg-pink-500/20 p-4 rounded-2xl">
            <FaBullseye className="text-pink-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹1,00,000
        </h1>

        <p className="text-pink-400 mt-4">
          Long-term target
        </p>

      </div>

    </div>
  );
}

export default BudgetCards;