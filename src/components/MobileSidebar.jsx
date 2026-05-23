import { NavLink } from "react-router-dom";

import {
  FaTimes,
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

function MobileSidebar({
  isOpen,
  setIsOpen,
}) {

  return (
    <>

      {/* Overlay */}
      {isOpen && (

        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />

      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-[#0B1023] border-r border-white/10 backdrop-blur-xl z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">

          {/* Logo */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">

            FinPilot

          </h1>

          {/* Close Button */}
          <button
            onClick={() =>
              setIsOpen(false)
            }
            className="text-white text-3xl hover:text-red-400 transition-all"
          >

            <FaTimes />

          </button>

        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4 p-5 mt-4">

          {menuItems.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              onClick={() =>
                setIsOpen(false)
              }
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-5 rounded-2xl transition-all text-xl font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl"
                    : "text-gray-300 hover:bg-white/10"
                }`
              }
            >

              <span className="text-2xl">

                {item.icon}

              </span>

              {item.name}

            </NavLink>

          ))}

        </div>

      </div>

    </>
  );
}

export default MobileSidebar;