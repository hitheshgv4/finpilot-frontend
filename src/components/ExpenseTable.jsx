const expenseData = [
  {
    id: 1,
    category: "Food Order",
    amount: "₹1,250",
    date: "18 May 2026",
    status: "Paid",
  },
  {
    id: 2,
    category: "Electricity Bill",
    amount: "₹3,500",
    date: "16 May 2026",
    status: "Pending",
  },
  {
    id: 3,
    category: "Shopping",
    amount: "₹8,000",
    date: "14 May 2026",
    status: "Paid",
  },
  {
    id: 4,
    category: "Netflix Subscription",
    amount: "₹799",
    date: "12 May 2026",
    status: "Paid",
  },
];

function ExpenseTable() {
  return (
    <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl overflow-x-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Expense History
          </h2>

          <p className="text-gray-400 mt-2">
            Recent spending transactions
          </p>
        </div>

        <button className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-3 rounded-2xl text-sm font-semibold">
          + Add Expense
        </button>

      </div>

      {/* Table */}
      <table className="w-full text-left">

        <thead>

          <tr className="border-b border-white/10 text-gray-400">

            <th className="pb-5">Category</th>

            <th className="pb-5">Amount</th>

            <th className="pb-5">Date</th>

            <th className="pb-5">Status</th>

          </tr>

        </thead>

        <tbody>

          {expenseData.map((item) => (
            <tr
              key={item.id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >

              <td className="py-5 font-semibold">
                {item.category}
              </td>

              <td className="py-5 text-red-400 font-bold">
                {item.amount}
              </td>

              <td className="py-5 text-gray-400">
                {item.date}
              </td>

              <td className="py-5">

                <span
                  className={`px-4 py-2 rounded-xl text-sm ${
                    item.status === "Paid"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ExpenseTable;