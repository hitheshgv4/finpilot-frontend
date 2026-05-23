import {
  FaUtensils,
  FaShoppingBag,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
} from "react-icons/fa";

function ExpenseCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

      {/* Total Expenses */}
      <div className="bg-gradient-to-br from-red-500/20 to-pink-700/10 border border-red-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Total Expenses
          </h2>

          <div className="bg-red-500/20 p-4 rounded-2xl">
            <FaMoneyBillWave className="text-red-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹85,000
        </h1>

        <p className="text-red-400 mt-4">
          +12% this month
        </p>

      </div>

      {/* Food */}
      <div className="bg-gradient-to-br from-orange-500/20 to-amber-700/10 border border-orange-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Food
          </h2>

          <div className="bg-orange-500/20 p-4 rounded-2xl">
            <FaUtensils className="text-orange-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹12,000
        </h1>

        <p className="text-orange-400 mt-4">
          Dining & groceries
        </p>

      </div>

      {/* Shopping */}
      <div className="bg-gradient-to-br from-pink-500/20 to-fuchsia-700/10 border border-pink-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Shopping
          </h2>

          <div className="bg-pink-500/20 p-4 rounded-2xl">
            <FaShoppingBag className="text-pink-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹25,000
        </h1>

        <p className="text-pink-400 mt-4">
          Lifestyle purchases
        </p>

      </div>

      {/* Bills */}
      <div className="bg-gradient-to-br from-purple-500/20 to-indigo-700/10 border border-purple-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-gray-300 text-lg">
            Bills
          </h2>

          <div className="bg-purple-500/20 p-4 rounded-2xl">
            <FaFileInvoiceDollar className="text-purple-300 text-2xl" />
          </div>

        </div>

        <h1 className="text-4xl font-bold mt-8">
          ₹18,000
        </h1>

        <p className="text-purple-400 mt-4">
          Utilities & services
        </p>

      </div>

    </div>
  );
}

export default ExpenseCards;