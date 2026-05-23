import {
  FaWallet,
  FaPiggyBank,
  FaChartLine,
  FaBullseye,
} from "react-icons/fa";

function ProfileStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

      {/* Balance */}
      <div className="bg-gradient-to-br from-blue-500/20 to-indigo-700/10 border border-blue-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Total Balance
          </h2>

          <div className="bg-blue-500/20 p-4 rounded-2xl">
            <FaWallet className="text-blue-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹4,50,000
        </h1>

        <p className="text-blue-400 mt-4">
          Financially stable
        </p>

      </div>

      {/* Savings */}
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-700/10 border border-green-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Total Savings
          </h2>

          <div className="bg-green-500/20 p-4 rounded-2xl">
            <FaPiggyBank className="text-green-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹1,20,000
        </h1>

        <p className="text-green-400 mt-4">
          Strong savings habit
        </p>

      </div>

      {/* Investments */}
      <div className="bg-gradient-to-br from-purple-500/20 to-fuchsia-700/10 border border-purple-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Investments
          </h2>

          <div className="bg-purple-500/20 p-4 rounded-2xl">
            <FaChartLine className="text-purple-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹2,00,000
        </h1>

        <p className="text-purple-400 mt-4">
          Long-term growth
        </p>

      </div>

      {/* Goals */}
      <div className="bg-gradient-to-br from-pink-500/20 to-rose-700/10 border border-pink-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Goals Achieved
          </h2>

          <div className="bg-pink-500/20 p-4 rounded-2xl">
            <FaBullseye className="text-pink-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          8 / 10
        </h1>

        <p className="text-pink-400 mt-4">
          Excellent progress
        </p>

      </div>

    </div>
  );
}

export default ProfileStats;