import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import {
  FaEnvelope,
  FaLocationDot,
  FaBriefcase,
  FaPhone,
  FaUserPen,
  FaFloppyDisk,
  FaLock,
} from "react-icons/fa6";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

function Profile() {

  /* ================= CURRENT USER ================= */

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    ) || {};

  /* ================= STATES ================= */

  const [isEditing,
    setIsEditing] =
    useState(false);

  

  const [incomeData,
    setIncomeData] =
    useState([]);

  const [expenseData,
    setExpenseData] =
    useState([]);

  const [profileData,
    setProfileData] =
    useState({

      id: "",

      name: "",

      email: "",

      phone: "",

      location: "",

      profession: "",

      
    });

  /* ================= PASSWORD STATES ================= */

  const [passwordData,
    setPasswordData] =
    useState({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {

    if (
      currentUser?.email
    ) {

      fetchProfile();

      fetchFinancialData();

    }

  }, []);

  /* ================= FETCH PROFILE ================= */

  const fetchProfile =
    async () => {

      try {

        const response =
          await API.get(

            `/auth/user?email=${currentUser.email}`

          );

        setProfileData(
          response.data
        );

        

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to fetch profile"
        );

      }

    };

  /* ================= FETCH FINANCIAL DATA ================= */

  const fetchFinancialData =
    async () => {

      try {

        const [

          incomeResponse,

          expenseResponse,

        ] = await Promise.all([

          API.get(
            `/income/${currentUser.email}`
          ),

          API.get(
            `/expense/${currentUser.email}`
          ),

        ]);

        setIncomeData(
          incomeResponse.data || []
        );

        setExpenseData(
          expenseResponse.data || []
        );

      }

      catch (error) {

        console.error(
          error
        );

      }

    };

  /* ================= TOTALS ================= */

  const totalIncome =
    incomeData.reduce(

      (
        acc,
        item
      ) =>

        acc +
        Number(
          item.amount
        ),

      0

    );

  const totalExpenses =
    expenseData.reduce(

      (
        acc,
        item
      ) =>

        acc +
        Number(
          item.amount
        ),

      0

    );

  const savings =
    totalIncome -
    totalExpenses;

  const totalBalance =
    savings;

  /* ================= IMAGE UPLOAD ================= */

  
  /* ================= RESET DATA ================= */

  const handleResetData =
    async () => {

      const confirmReset =
        window.confirm(

          "Are you sure you want to reset all financial data?"

        );

      if (!confirmReset) {

        return;

      }

      try {

        const [

          incomeResponse,

          expenseResponse,

          budgetResponse,

        ] = await Promise.all([

          API.get(
            `/income/${currentUser.email}`
          ),

          API.get(
            `/expense/${currentUser.email}`
          ),

          API.get(
            `/budget/${currentUser.email}`
          ),

        ]);

        await Promise.all(

          incomeResponse.data.map(
            (item) =>

              API.delete(
                `/income/${item.id}`
              )
          )

        );

        await Promise.all(

          expenseResponse.data.map(
            (item) =>

              API.delete(
                `/expense/${item.id}`
              )
          )

        );

        await Promise.all(

          budgetResponse.data.map(
            (item) =>

              API.delete(
                `/budget/${item.id}`
              )
          )

        );

        setIncomeData([]);

        setExpenseData([]);

        toast.success(
          "All financial data reset successfully"
        );

        fetchFinancialData();

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to reset data"
        );

      }

    };

  /* ================= INPUT CHANGE ================= */

  const handleChange =
    (e) => {

      setProfileData({

        ...profileData,

        [e.target.name]:
          e.target.value,

      });

    };

  /* ================= PASSWORD INPUT ================= */

  const handlePasswordChange =
    (e) => {

      setPasswordData({

        ...passwordData,

        [e.target.name]:
          e.target.value,

      });

    };

  /* ================= PASSWORD VALIDATION ================= */

  const validatePassword =
    (password) => {

      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        password
      );

    };

  /* ================= SAVE ================= */

  const handleSave =
    async () => {

      try {

        if (

          passwordData.currentPassword ||

          passwordData.newPassword ||

          passwordData.confirmPassword

        ) {

          if (

            !passwordData.currentPassword ||

            !passwordData.newPassword ||

            !passwordData.confirmPassword

          ) {

            toast.error(
              "Please fill all password fields"
            );

            return;

          }

          if (

            !validatePassword(
              passwordData.newPassword
            )

          ) {

            toast.error(

              "Password must contain uppercase, lowercase, number, special character and minimum 8 characters"

            );

            return;

          }

          if (

            passwordData.newPassword !==
            passwordData.confirmPassword

          ) {

            toast.error(
              "Passwords do not match"
            );

            return;

          }

          await API.put(

            "/auth/change-password",

            {

              email:
                currentUser.email,

              currentPassword:
                passwordData.currentPassword,

              newPassword:
                passwordData.newPassword,

            }

          );

          toast.success(
            "Password updated successfully"
          );

        }

        /* ================= UPDATE PROFILE ================= */

        const updatedUser = {

          ...profileData,

          
        };

        const response =
          await API.put(

            "/auth/update-profile",

            updatedUser

          );

        const latestUser =
          response.data.user;

        /* ================= UPDATE SESSION ================= */

        localStorage.setItem(

          "currentUser",

          JSON.stringify(
            latestUser
          )

        );

        setProfileData(
          latestUser
        );

        

        setIsEditing(false);

        toast.success(
          "Profile updated successfully"
        );

        setPasswordData({

          currentPassword: "",

          newPassword: "",

          confirmPassword: "",

        });

        /* ================= LIVE REFRESH ================= */

        window.dispatchEvent(
          new Event(
            "profileUpdated"
          )
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(

          error.response?.data
            ?.message ||

          "Profile update failed"

        );

      }

    };
  return (

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

          Profile Page

        </h1>

        <p className="text-gray-400 mt-3 text-lg">

          Manage your profile and account settings.

        </p>

      </div>

      {/* MAIN CARD */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">

        <div className="flex flex-col xl:flex-row gap-12 items-center xl:items-start">

          {/* LEFT */}

          <div className="flex flex-col items-center">

            {/* PROFILE AVATAR */}

<div className="w-44 h-44 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-7xl font-bold shadow-2xl text-white">

  {profileData.name
    ?.charAt(0)
    ?.toUpperCase() || "U"}

</div>
            {/* UPLOAD */}

            
            {/* EDIT/SAVE */}

            {!isEditing ? (

              <button
                onClick={() =>
                  setIsEditing(true)
                }
                className="mt-4 bg-cyan-500 hover:bg-cyan-600 transition-all px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold"
              >

                <FaUserPen />

                Edit Profile

              </button>

            ) : (

              <button
                onClick={
                  handleSave
                }
                className="mt-4 bg-green-500 hover:bg-green-600 transition-all px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold"
              >

                <FaFloppyDisk />

                Save Changes

              </button>

            )}

          </div>

          {/* RIGHT */}

          <div className="flex-1 space-y-8 w-full">

            {/* NAME */}

            <div>

              <label className="text-gray-400 text-lg">

                Full Name

              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="name"
                  value={
                    profileData.name
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full mt-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white text-2xl"
                />

              ) : (

                <h2 className="text-5xl font-bold mt-3 break-words">

                  {profileData.name || "User"}

                </h2>

              )}

            </div>

            {/* GRID */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* EMAIL */}

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

                <div className="flex items-start gap-4">

                  <FaEnvelope className="text-cyan-400 text-2xl mt-1" />

                  <div className="w-full">

                    <p className="text-gray-400">

                      Email

                    </p>

                    <h3 className="text-xl font-semibold mt-1 break-all">

                      {profileData.email || "No Email"}

                    </h3>

                  </div>

                </div>

              </div>

              {/* PHONE */}

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

                <div className="flex items-start gap-4">

                  <FaPhone className="text-green-400 text-2xl mt-1" />

                  <div className="w-full">

                    <p className="text-gray-400">

                      Phone

                    </p>

                    {isEditing ? (

                      <input
                        type="text"
                        name="phone"
                        value={
                          profileData.phone
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full mt-3 bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none text-white"
                      />

                    ) : (

                      <h3 className="text-xl font-semibold mt-1">

                        {profileData.phone || "Not Added"}

                      </h3>

                    )}

                  </div>

                </div>

              </div>

              {/* LOCATION */}

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

                <div className="flex items-start gap-4">

                  <FaLocationDot className="text-red-400 text-2xl mt-1" />

                  <div className="w-full">

                    <p className="text-gray-400">

                      Location

                    </p>

                    {isEditing ? (

                      <input
                        type="text"
                        name="location"
                        value={
                          profileData.location
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full mt-3 bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none text-white"
                      />

                    ) : (

                      <h3 className="text-xl font-semibold mt-1">

                        {profileData.location || "Not Added"}

                      </h3>

                    )}

                  </div>

                </div>

              </div>

              {/* PROFESSION */}

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

                <div className="flex items-start gap-4">

                  <FaBriefcase className="text-purple-400 text-2xl mt-1" />

                  <div className="w-full">

                    <p className="text-gray-400">

                      Profession

                    </p>

                    {isEditing ? (

                      <input
                        type="text"
                        name="profession"
                        value={
                          profileData.profession
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full mt-3 bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none text-white"
                      />

                    ) : (

                      <h3 className="text-xl font-semibold mt-1">

                        {profileData.profession || "Not Added"}

                      </h3>

                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* PASSWORD SECTION */}

            {isEditing && (

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">

                <div className="flex items-center gap-3 mb-6">

                  <FaLock className="text-yellow-400 text-2xl" />

                  <h2 className="text-3xl font-bold">

                    Change Password

                  </h2>

                </div>

                <div className="grid grid-cols-1 gap-6">

                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={
                      passwordData.currentPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
                  />

                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={
                      passwordData.newPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={
                      passwordData.confirmPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
                  />

                  <p className="text-sm text-gray-400 leading-7">

                    Password must contain:
                    <br />

                    • Minimum 8 characters
                    <br />

                    • One uppercase letter
                    <br />

                    • One lowercase letter
                    <br />

                    • One number
                    <br />

                    • One special character

                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* FINANCIAL CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL BALANCE */}

        <div className="bg-gradient-to-br from-blue-950 to-blue-900 border border-blue-700 rounded-3xl p-8 relative overflow-hidden">

          <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-blue-700/30 flex items-center justify-center">

            <Wallet size={32} />

          </div>

          <p className="text-3xl text-gray-200 mb-8">

            Total Balance

          </p>

          <h1 className="text-6xl font-bold break-all">

            ₹{totalBalance.toLocaleString(
              "en-IN"
            )}

          </h1>

        </div>

        {/* INCOME */}

        <div className="bg-gradient-to-br from-green-950 to-green-900 border border-green-700 rounded-3xl p-8 relative overflow-hidden">

          <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-green-700/30 flex items-center justify-center">

            <TrendingUp size={32} />

          </div>

          <p className="text-3xl text-gray-200 mb-8">

            Income

          </p>

          <h1 className="text-6xl font-bold text-green-400 break-all">

            ₹{totalIncome.toLocaleString(
              "en-IN"
            )}

          </h1>

        </div>

        {/* EXPENSES */}

        <div className="bg-gradient-to-br from-red-950 to-red-900 border border-red-700 rounded-3xl p-8 relative overflow-hidden">

          <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-red-700/30 flex items-center justify-center">

            <TrendingDown size={32} />

          </div>

          <p className="text-3xl text-gray-200 mb-8">

            Expenses

          </p>

          <h1 className="text-6xl font-bold text-red-400 break-all">

            ₹{totalExpenses.toLocaleString(
              "en-IN"
            )}

          </h1>

        </div>

        {/* SAVINGS */}

        <div className="bg-gradient-to-br from-purple-950 to-purple-900 border border-purple-700 rounded-3xl p-8 relative overflow-hidden">

          <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-purple-700/30 flex items-center justify-center">

            <PiggyBank size={32} />

          </div>

          <p className="text-3xl text-gray-200 mb-8">

            Savings

          </p>

          <h1 className="text-6xl font-bold text-purple-300 break-all">

            ₹{savings.toLocaleString(
              "en-IN"
            )}

          </h1>

        </div>

      </div>

      {/* RESET BUTTON */}

      <div className="flex justify-end">

        <button
          onClick={
            handleResetData
          }
          className="bg-red-500 hover:bg-red-600 transition-all px-8 py-4 rounded-2xl font-semibold shadow-2xl"
        >

          Reset All Data

        </button>

      </div>

    </div>

  );

}

export default Profile;