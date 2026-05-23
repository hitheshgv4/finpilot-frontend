const incomeData = [
  {
    id: 1,
    source: "Salary",
    amount: "₹50,000",
    date: "18 May 2026",
    status: "Completed",
  },
  {
    id: 2,
    source: "Freelance Project",
    amount: "₹12,000",
    date: "15 May 2026",
    status: "Completed",
  },
  {
    id: 3,
    source: "Dividends",
    amount: "₹5,500",
    date: "12 May 2026",
    status: "Pending",
  },
  {
    id: 4,
    source: "Rental Income",
    amount: "₹18,000",
    date: "10 May 2026",
    status: "Completed",
  },
];

function IncomeTable() {
  return (
    <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl overflow-x-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Income History
          </h2>

          <p className="text-gray-400 mt-2">
            Recent income transactions
          </p>
        </div>

        <button className="bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 rounded-2xl text-sm font-semibold">
          + Add Income
        </button>

      </div>

      {/* Table */}
      <table className="w-full text-left">

        <thead>

          <tr className="border-b border-white/10 text-gray-400">

            <th className="pb-5">Source</th>

            <th className="pb-5">Amount</th>

            <th className="pb-5">Date</th>

            <th className="pb-5">Status</th>

          </tr>

        </thead>

        <tbody>

          {incomeData.map((item) => (
            <tr
              key={item.id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >

              <td className="py-5 font-semibold">
                {item.source}
              </td>

              <td className="py-5 text-green-400 font-bold">
                {item.amount}
              </td>

              <td className="py-5 text-gray-400">
                {item.date}
              </td>

              <td className="py-5">

                <span
                  className={`px-4 py-2 rounded-xl text-sm ${
                    item.status === "Completed"
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

export default IncomeTable;