import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

const Login = () => {

  const navigate =
    useNavigate();

  const [
    showPassword,

    setShowPassword,

  ] = useState(false);

  const [
    loading,

    setLoading,

  ] = useState(false);

  const [formData,
    setFormData] =
    useState({

      email: "",

      password: "",

    });

  /* ================= HANDLE CHANGE ================= */

  const handleChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;

      /* ================= EMAIL LOWERCASE ================= */

      if (
        name === "email"
      ) {

        setFormData({

          ...formData,

          [name]:
            value.toLowerCase(),

        });

        return;

      }

      setFormData({

        ...formData,

        [name]:
          value,

      });

    };

  /* ================= LOGIN ================= */

  const handleLogin =
    async (e) => {

      e.preventDefault();

      if (

        formData.email.trim() ===
          "" ||

        formData.password.trim() ===
          ""

      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      try {

        setLoading(true);

        /* ================= LOGIN API ================= */

        const response =
          await API.post(

            "/auth/login",

            {

              email:
                formData.email.trim(),

              password:
                formData.password,

            }

          );

        /* ================= RESPONSE DATA ================= */

        const token =
          response.data.token;

        const user = {

  id:
    response.data.id,

  name:
    response.data.name,

  email:
    response.data.email,

  phone:
    response.data.phone,

  location:
    response.data.location,

  profession:
    response.data.profession,

};

        /* ================= CLEAR OLD STORAGE ================= */

        localStorage.clear();

        sessionStorage.clear();

        /* ================= SAVE LOGIN STATUS ================= */

        sessionStorage.setItem(

          "isLoggedIn",

          "true"

        );

        /* ================= SAVE TOKEN ================= */

        localStorage.setItem(

          "token",

          token

        );

        /* ================= SAVE USER ================= */

        localStorage.setItem(

          "currentUser",

          JSON.stringify(user)

        );

        /* ================= SET TOKEN TO API ================= */

        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        /* ================= STORAGE EVENT ================= */

        window.dispatchEvent(
          new Event(
            "storage"
          )
        );

        /* ================= SUCCESS ================= */

        toast.success(
          "Login successful 🚀"
        );

        /* ================= REDIRECT ================= */

        navigate(
          "/dashboard"
        );

      }

      catch (error) {

        console.error(
          error
        );

        toast.error(

          error.response?.data
            ?.message ||

          "Invalid email or password"

        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-[#0f172a] border border-gray-800 rounded-3xl p-8 md:p-10">

        {/* TITLE */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">

            FinPilot

          </h1>

          <p className="text-gray-400 mt-4">

            Welcome back to your finance dashboard

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleLogin
          }
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="block mb-3 text-lg">

              Email Address

            </label>

            <input
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              placeholder="Enter your email"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-5 py-4 outline-none text-white"
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block mb-3 text-lg">

              Password

            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your password"
                className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-5 py-4 pr-14 outline-none text-white"
                required
              />

              <button
                type="button"
                onClick={() =>

                  setShowPassword(
                    !showPassword
                  )

                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
              >

                {showPassword
                  ? "🙈"
                  : "👁️"}

              </button>

            </div>

          </div>

          {/* REMEMBER */}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-gray-400">

              <input type="checkbox" />

              Remember me

            </label>

            <button
              type="button"
              className="text-purple-400"
            >

              Forgot Password?

            </button>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        {/* SIGNUP */}

        <p className="text-center text-gray-400 mt-8">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-purple-400"
          >

            Create Account

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;