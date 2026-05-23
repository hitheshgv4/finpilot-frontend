import {
  FaWallet,
  FaBriefcase,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

function IncomeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

      {/* Total Income */}
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-700/10 border border-green-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Total Income
          </h2>

          <div className="bg-green-500/20 p-4 rounded-2xl">
            <FaWallet className="text-green-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹2,40,000
        </h1>

        <p className="text-green-400 mt-4">
          +18% this month
        </p>

      </div>

      {/* Salary */}
      <div className="bg-gradient-to-br from-blue-500/20 to-indigo-700/10 border border-blue-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Salary
          </h2>

          <div className="bg-blue-500/20 p-4 rounded-2xl">
            <FaBriefcase className="text-blue-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹1,50,000
        </h1>

        <p className="text-blue-400 mt-4">
          Stable income
        </p>

      </div>

      {/* Freelance */}
      <div className="bg-gradient-to-br from-purple-500/20 to-fuchsia-700/10 border border-purple-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Freelance
          </h2>

          <div className="bg-purple-500/20 p-4 rounded-2xl">
            <FaMoneyBillWave className="text-purple-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹60,000
        </h1>

        <p className="text-purple-400 mt-4">
          Growing steadily
        </p>

      </div>

      {/* Investments */}
      <div className="bg-gradient-to-br from-cyan-500/20 to-sky-700/10 border border-cyan-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Investments
          </h2>

          <div className="bg-cyan-500/20 p-4 rounded-2xl">
            <FaChartLine className="text-cyan-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹30,000
        </h1>

        <p className="text-cyan-400 mt-4">
          Passive returns
        </p>

      </div>

    </div>
  );
}

export default IncomeCards;