import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      {/* Navbar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-16 py-6">

        {/* Logo */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          FinPilot
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-all"
          >
            Sign Up
          </Link>

        </div>

      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24">

        <h1 className="text-6xl md:text-8xl font-bold leading-tight max-w-6xl">

          Smart Finance <br />

          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Management Platform
          </span>

        </h1>

        <p className="text-gray-400 text-xl md:text-2xl mt-10 max-w-3xl leading-relaxed">

          Track expenses, monitor budgets, analyze financial insights,
          and manage your money smarter with FinPilot.

        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-14">

          <Link
            to="/signup"
            className="px-10 py-5 rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 text-xl font-semibold hover:scale-105 transition-all shadow-2xl"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-10 py-5 rounded-3xl bg-white/10 border border-white/10 text-xl font-semibold hover:bg-white/20 transition-all"
          >
            Login Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Landing;