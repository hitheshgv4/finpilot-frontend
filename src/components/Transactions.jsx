import {
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const transactions = [
  {
    id: 1,
    title: "Salary",
    amount: "+ ₹70,000",
    date: "18 May 2026",
    type: "income",
  },
  {
    id: 2,
    title: "Netflix Subscription",
    amount: "- ₹799",
    date: "17 May 2026",
    type: "expense",
  },
  {
    id: 3,
    title: "Freelance Payment",
    amount: "+ ₹12,000",
    date: "15 May 2026",
    type: "income",
  },
  {
    id: 4,
    title: "Food Order",
    amount: "- ₹1,250",
    date: "14 May 2026",
    type: "expense",
  },
];

function Transactions() {
  return (
    <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Transactions
          </h2>

          <p className="text-gray-400 mt-2">
            Your latest financial activity
          </p>
        </div>

        <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 rounded-2xl text-sm font-semibold">
          View All
        </button>

      </div>

      {/* Transactions */}
      <div className="space-y-5">

        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
          >

            <div className="flex items-center gap-5">

              <div
                className={`p-4 rounded-2xl ${
                  item.type === "income"
                    ? "bg-green-500/20"
                    : "bg-red-500/20"
                }`}
              >
                {item.type === "income" ? (
                  <FaArrowUp className="text-green-400 text-xl" />
                ) : (
                  <FaArrowDown className="text-red-400 text-xl" />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {item.date}
                </p>
              </div>

            </div>

            <h2
              className={`text-xl font-bold ${
                item.type === "income"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {item.amount}
            </h2>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Transactions;