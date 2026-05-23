import {
  NavLink,
} from "react-router-dom";

import {
  FaChartPie,
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaBullseye,
  FaUser,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaChartPie />,
  },
  {
    name: "Income",
    path: "/income",
    icon: <FaWallet />,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: <FaMoneyBillWave />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <FaChartLine />,
  },
  {
    name: "Budget",
    path: "/budget",
    icon: <FaBullseye />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];

function Sidebar() {

  return (
    <div className="hidden lg:flex flex-col w-[270px] min-h-screen bg-white/5 border-r border-white/10 backdrop-blur-xl p-5">

      {/* Logo */}
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-16">

        FinPilot

      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-5">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-5 rounded-2xl transition-all text-xl ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl"
                  : "hover:bg-white/10 text-gray-300"
              }`
            }
          >

            {item.icon}

            {item.name}

          </NavLink>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;