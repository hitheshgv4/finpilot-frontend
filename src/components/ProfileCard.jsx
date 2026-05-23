import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCrown,
} from "react-icons/fa";

function ProfileCard() {
  return (
    <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-8">

        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-5xl font-bold shadow-2xl">
          H
        </div>

        {/* User Info */}
        <div className="flex-1">

          <div className="flex items-center gap-4 mb-4">

            <h1 className="text-4xl font-bold">
              Hithesh
            </h1>

            
          </div>

          <p className="text-gray-400 text-lg">
            Personal Finance Enthusiast & Smart Budget Planner
          </p>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">

              <FaEnvelope className="text-purple-400 text-xl" />

              <div>
                <p className="text-gray-400 text-sm">
                  Email
                </p>

                <h3 className="font-semibold">
                  hithesh@example.com
                </h3>
              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">

              <FaPhone className="text-green-400 text-xl" />

              <div>
                <p className="text-gray-400 text-sm">
                  Phone
                </p>

                <h3 className="font-semibold">
                  +91 9876543210
                </h3>
              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">

              <FaMapMarkerAlt className="text-pink-400 text-xl" />

              <div>
                <p className="text-gray-400 text-sm">
                  Location
                </p>

                <h3 className="font-semibold">
                  Chennai, India
                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;