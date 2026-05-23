import { useState } from "react";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

function Signup() {

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

      name: "",

      email: "",

      phone: "",

      password: "",

      

      location: "",

      profession: "",

    });

  /* ================= HANDLE CHANGE ================= */

  const handleChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;

      if (
        name === "phone"
      ) {

        const numbers =
          value.replace(
            /\D/g,
            ""
          );

        if (
          numbers.length <= 10
        ) {

          setFormData({

            ...formData,

            [name]:
              numbers,

          });

        }

        return;

      }

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

  /* ================= IMAGE UPLOAD ================= */

  

  /* ================= PASSWORD VALIDATION ================= */

  const validatePassword = (password) => {

  const cleanPassword =
    String(password).trim();

  /* ================= DEBUG ================= */

  console.log(
    "Checking Password:",
    cleanPassword
  );

  /* ================= LENGTH ================= */

  if (cleanPassword.length < 8) {

    return false;

  }

  /* ================= UPPERCASE ================= */

  const hasUppercase =
    /[A-Z]/.test(cleanPassword);

  /* ================= LOWERCASE ================= */

  const hasLowercase =
    /[a-z]/.test(cleanPassword);

  /* ================= NUMBER ================= */

  const hasNumber =
    /[0-9]/.test(cleanPassword);

  /* ================= SPECIAL ================= */

  const hasSpecial =
    /[^A-Za-z0-9]/.test(cleanPassword);

  console.log({

    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,

  });

  return (

    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecial

  );

};

  /* ================= SIGNUP ================= */

  const handleSignup =
  async (e) => {

    e.preventDefault();

    /* ================= CLEAN PASSWORD ================= */

    const cleanPassword =
      formData.password.trim();

    /* ================= VALIDATE PASSWORD ================= */

    const isValidPassword =
      validatePassword(
        cleanPassword
      );

    if (!isValidPassword) {

      alert(
        "Password must contain uppercase, lowercase, number, special character and minimum 8 characters"
      );

      return;

    }

    try {

      setLoading(true);

      /* ================= REGISTER API ================= */

      const response =
        await API.post(

          "/auth/register",

          {

            name:
              formData.name.trim(),

            email:
              formData.email.trim(),

            password:
              cleanPassword,

            phone:
              formData.phone.trim(),

            location:
              formData.location.trim(),

            profession:
              formData.profession.trim(),

            
          }

        );

      /* ================= CLEAR STORAGE ================= */

      localStorage.clear();

      sessionStorage.clear();

      /* ================= SAVE TOKEN ================= */

      localStorage.setItem(

        "token",

        response.data.token

      );

      /* ================= SAVE USER ================= */

      localStorage.setItem(

        "currentUser",

        JSON.stringify(
          response.data.user
        )

      );

      /* ================= LOGIN STATUS ================= */

      sessionStorage.setItem(

        "isLoggedIn",

        "true"

      );

      /* ================= SUCCESS ================= */

      alert(
        "Account created successfully 🚀"
      );

      navigate(
        "/dashboard"
      );

    }

    catch (error) {

      console.error(
        "Signup Error:",
        error
      );

      alert(

        error.response?.data
          ?.message ||

        "Signup failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND BLUR */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[120px]" />

      {/* CARD */}

      <div className="relative z-10 w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">

        {/* HEADING */}

        <div className="text-center mb-10">

          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">

            FinPilot

          </h1>

          <p className="text-gray-400 mt-4 text-lg">

            Create your finance account

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleSignup
          }
          className="space-y-6"
        >

          {/* PROFILE */}

          {/* PROFILE */}

<div className="flex flex-col items-center gap-4">

  <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-5xl font-bold text-white shadow-2xl">

    👤

  </div>

  <p className="text-gray-400 text-sm">

    Default profile avatar

  </p>

</div>

          {/* NAME */}

          <div>

            <label className="block mb-3 text-lg font-medium">

              Full Name

            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block mb-3 text-lg font-medium">

              Email Address

            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all lowercase"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* PHONE */}

          <div>

            <label className="block mb-3 text-lg font-medium">

              Phone Number

            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              maxLength={10}
              required
            />

          </div>

          {/* LOCATION */}

          <div>

            <label className="block mb-3 text-lg font-medium">

              Location

            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
              value={
                formData.location
              }
              onChange={
                handleChange
              }
            />

          </div>

          {/* PROFESSION */}

          <div>

            <label className="block mb-3 text-lg font-medium">

              Profession

            </label>

            <input
              type="text"
              name="profession"
              placeholder="Enter your profession"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
              value={
                formData.profession
              }
              onChange={
                handleChange
              }
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block mb-3 text-lg font-medium">

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
                placeholder="Enter password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-purple-500 transition-all"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
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

                {showPassword ? (

                  <FaEyeSlash />

                ) : (

                  <FaEye />

                )}

              </button>

            </div>

            <p className="text-gray-400 text-sm mt-2">

              Minimum 8 characters with uppercase, lowercase, number & special character.

            </p>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] transition-all py-4 rounded-2xl font-semibold text-xl shadow-2xl"
          >

            {loading
              ? "Creating..."
              : "Create Account"}

          </button>

        </form>

        {/* BOTTOM */}

        <p className="text-center text-gray-400 mt-8">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;