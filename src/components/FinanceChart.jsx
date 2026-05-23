import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", income: 40000, expense: 24000 },
  { month: "Feb", income: 30000, expense: 13900 },
  { month: "Mar", income: 50000, expense: 28000 },
  { month: "Apr", income: 47800, expense: 39080 },
  { month: "May", income: 58900, expense: 48000 },
  { month: "Jun", income: 63900, expense: 38000 },
];

function FinanceChart() {
  return (
    <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Financial Overview
          </h2>

          <p className="text-gray-400 mt-2">
            Income vs Expenses
          </p>
        </div>

        <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 rounded-2xl text-sm font-semibold">
          This Month
        </button>

      </div>

      {/* Chart */}
      <div className="overflow-x-auto">

        <LineChart
          width={900}
          height={350}
          data={data}
        >

          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
          />

          <YAxis
            stroke="#9CA3AF"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#8B5CF6"
            strokeWidth={4}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EC4899"
            strokeWidth={4}
          />

        </LineChart>

      </div>

    </div>
  );
}

export default FinanceChart;