function NotificationPanel() {
  return (
    <div className="absolute top-24 right-0 w-80 bg-[#11182D] border border-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl z-50">

      {/* Header */}
      <div className="mb-5">

        <h2 className="text-xl font-bold text-white">
          Notifications
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Recent financial activity
        </p>

      </div>

      {/* Notification Items */}
      <div className="space-y-4">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

          <h3 className="font-semibold">
            Salary Credited
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            ₹50,000 added to your account.
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

          <h3 className="font-semibold">
            Budget Alert
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            Shopping budget reached 80%.
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

          <h3 className="font-semibold">
            Investment Growth
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            Portfolio increased by 12%.
          </p>

        </div>

      </div>

    </div>
  );
}

export default NotificationPanel;