import API from "../services/api";
import React, {
  useEffect,
  useState,
} from "react";

import {
  Outlet,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Wallet,
  Receipt,
  BarChart3,
  PiggyBank,
  User,
  Menu,
  X,
} from "lucide-react";

import {

  generateNotifications,

  markAllAsRead,

  clearNotifications,

  getNotifications,

} from "../utils/notificationHelpers";

const MainLayout = () => {

  const navigate =
    useNavigate();

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  const [showProfileMenu,
    setShowProfileMenu] =
    useState(false);

  const [showNotifications,
    setShowNotifications] =
    useState(false);

  const [notifications,
    setNotifications] =
    useState([]);

  /* ================= USER STATE ================= */

  const [currentUser,
  setCurrentUser] =
  useState(null);

useEffect(() => {

  fetchUser();

}, []);

const fetchUser =
  async () => {

    try {

      const savedUser =
        JSON.parse(
          localStorage.getItem(
            "currentUser"
          )
        );

      if (!savedUser) {

        return;

      }

      setCurrentUser(
        savedUser
      );

    }

    catch (error) {

      console.log(error);

    }

};

  /* ================= UNREAD ================= */

  const unreadCount =
    notifications.filter(
      (item) =>
        !item.read
    ).length;

  /* ================= LOAD NOTIFICATIONS ================= */

  useEffect(() => {

    const existing =
      getNotifications();

    if (
      existing.length > 0
    ) {

      setNotifications(
        existing
      );

    }

    else {

      const generated =
        generateNotifications();

      setNotifications(
        generated
      );

    }

  }, []);

  /* ================= LIVE PROFILE REFRESH ================= */

  

  /* ================= MENU ================= */

  const menuItems = [

    {
      name:
        "Dashboard",

      path:
        "/dashboard",

      icon:
        <LayoutDashboard size={22} />,
    },

    {
      name:
        "Income",

      path:
        "/income",

      icon:
        <Wallet size={22} />,
    },

    {
      name:
        "Expenses",

      path:
        "/expenses",

      icon:
        <Receipt size={22} />,
    },

    {
      name:
        "Analytics",

      path:
        "/analytics",

      icon:
        <BarChart3 size={22} />,
    },

    {
      name:
        "Budget",

      path:
        "/budget",

      icon:
        <PiggyBank size={22} />,
    },

    {
      name:
        "Profile",

      path:
        "/profile",

      icon:
        <User size={22} />,
    },

  ];

  /* ================= LOGOUT ================= */

  const handleLogout =
    () => {

      /* REMOVE SESSION */

      sessionStorage.removeItem(
        "isLoggedIn"
      );

      /* REMOVE USER */

      localStorage.removeItem(
        "currentUser"
      );

      localStorage.removeItem(
        "token"
      );

      /* CLOSE MENUS */

      setShowProfileMenu(
        false
      );

      setSidebarOpen(
        false
      );

      /* REDIRECT */

      navigate(
        "/login"
      );

    };

  /* ================= OPEN NOTIFICATIONS ================= */

  const handleOpenNotifications =
    () => {

      setShowNotifications(
        !showNotifications
      );

      if (
        !showNotifications
      ) {

        const updated =
          markAllAsRead();

        setNotifications(
          updated
        );

      }

    };

  /* ================= CLEAR NOTIFICATIONS ================= */

  const clearAllNotifications =
    () => {

      clearNotifications();

      setNotifications([]);

    };

  return (

    <div className="flex bg-[#020617] min-h-screen text-white">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-[270px] bg-[#0f172a] border-r border-gray-800 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* LOGO */}

        <div className="flex items-center justify-between p-5 border-b border-gray-800">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">

            FinPilot

          </h1>

          <button
            className="lg:hidden text-3xl"
            onClick={() =>
              setSidebarOpen(false)
            }
          >

            <X />

          </button>

        </div>

        {/* MENU */}

        <div className="p-4 space-y-4 mt-4">

          {menuItems.map(
            (item) => (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={() =>
                  setSidebarOpen(
                    false
                  )
                }
                className={({
                  isActive,
                }) =>
                  `flex items-center gap-4 px-5 py-5 rounded-2xl text-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600"
                      : "hover:bg-[#1e293b]"
                  }`
                }
              >

                {item.icon}

                <span>

                  {item.name}

                </span>

              </NavLink>

            )
          )}

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}

        <header className="sticky top-0 z-30 bg-[#020617]/95 backdrop-blur-md border-b border-gray-800 px-4 md:px-8 py-5 flex items-center justify-between">

          {/* MOBILE MENU */}

          <div className="flex items-center gap-4">

            <button
              className="lg:hidden bg-[#111827] p-3 rounded-xl border border-gray-700"
              onClick={() =>
                setSidebarOpen(
                  !sidebarOpen
                )
              }
            >

              <Menu />

            </button>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-4">

            {/* NOTIFICATIONS */}

            <div className="relative">

              <button
                onClick={
                  handleOpenNotifications
                }
                className="relative bg-[#111827] border border-gray-700 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              >

                🔔

                {unreadCount >
                  0 && (

                  <span className="absolute -top-2 -right-1 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">

                    {
                      unreadCount
                    }

                  </span>

                )}

              </button>

              {/* NOTIFICATION DROPDOWN */}

              {showNotifications && (

                <div className="absolute right-0 mt-4 w-[340px] md:w-[400px] max-h-[500px] overflow-y-auto bg-[#111827] border border-gray-700 rounded-3xl shadow-2xl z-50">

                  <div className="p-5 border-b border-gray-700 flex justify-between items-center">

                    <h2 className="text-2xl font-bold">

                      Notifications

                    </h2>

                    <button
                      onClick={
                        clearAllNotifications
                      }
                      className="text-red-400 text-sm"
                    >

                      Clear All

                    </button>

                  </div>

                  {notifications.length ===
                  0 ? (

                    <div className="p-8 text-center text-gray-400">

                      No notifications available

                    </div>

                  ) : (

                    <div className="p-4 space-y-4">

                      {notifications.map(
                        (
                          item
                        ) => (

                          <div
                            key={item.id}
                            className={`rounded-2xl p-5 border transition-all ${
                              !item.read
                                ? "ring-2 ring-purple-500/40"
                                : ""
                            } ${
                              item.type ===
                              "success"
                                ? "bg-green-900/20 border-green-500/30"
                                : item.type ===
                                  "warning"
                                ? "bg-yellow-900/20 border-yellow-500/30"
                                : item.type ===
                                  "danger"
                                ? "bg-red-900/20 border-red-500/30"
                                : "bg-cyan-900/20 border-cyan-500/30"
                            }`}
                          >

                            <div className="flex justify-between items-start mb-3">

                              <h3 className="text-lg font-bold">

                                {
                                  item.title
                                }

                              </h3>

                              <span className="text-xs text-gray-400">

                                {
                                  item.time
                                }

                              </span>

                            </div>

                            <p className="text-gray-300 leading-relaxed">

                              {
                                item.message
                              }

                            </p>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              )}

            </div>

            {/* PROFILE */}

            <div className="relative">

              <button
                onClick={() =>
                  setShowProfileMenu(
                    !showProfileMenu
                  )
                }
                className="bg-[#111827] border border-gray-700 rounded-2xl px-4 md:px-5 py-3 flex items-center gap-4"
              >

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold text-white shadow-xl">

  {
    currentUser?.name
      ?.charAt(0)
      ?.toUpperCase() || "U"
  }

</div>
                <div className="hidden md:block text-left">

                  <h2 className="text-2xl font-bold">

                    {currentUser?.name || "User"}

                  </h2>

                </div>

              </button>

              {/* PROFILE DROPDOWN */}

              {showProfileMenu && (

                <div className="absolute right-0 mt-4 w-56 bg-[#111827] border border-gray-700 rounded-2xl p-3 z-50 shadow-2xl">

                  <button
                    onClick={() => {

                      navigate(
                        "/profile"
                      );

                      setShowProfileMenu(
                        false
                      );

                    }}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#1e293b]"
                  >

                    Profile

                  </button>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-400"
                  >

                    Logout

                  </button>

                </div>

              )}

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="flex-1 p-4 md:p-6">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default MainLayout;