import {
  FaUser,
  FaRightFromBracket,
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

function ProfileMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {

    /* Remove Session */
    localStorage.removeItem(
      "user"
    );

    /* Redirect */
    navigate("/login");
  };

  return (
    <div className="w-72 rounded-3xl border border-white/10 bg-[#0B1023] backdrop-blur-2xl p-5 shadow-2xl">

      {/* Profile */}
      <button
        onClick={() => navigate("/profile")}
        className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-all px-5 py-4 rounded-2xl text-left"
      >

        <FaUser className="text-cyan-400 text-xl" />

        <span className="text-lg">
          My Profile
        </span>

      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-4 bg-red-500/10 hover:bg-red-500/20 transition-all px-5 py-4 rounded-2xl mt-4 text-left"
      >

        <FaRightFromBracket className="text-red-400 text-xl" />

        <span className="text-lg text-red-400">
          Logout
        </span>

      </button>

    </div>
  );
}

export default ProfileMenu;