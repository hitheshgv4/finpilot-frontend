import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Dashboard from "../pages/Dashboard";
import Income from "../pages/Income";
import Expenses from "../pages/Expenses";
import Analytics from "../pages/Analytics";
import Budget from "../pages/Budget";
import Profile from "../pages/Profile";

import MainLayout from "../layouts/MainLayout";

/* ================= PROTECTED ROUTE ================= */

const ProtectedRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const isLoggedIn =
    sessionStorage.getItem(
      "isLoggedIn"
    );

  /* ================= CHECK AUTH ================= */

  if (

    token &&
    isLoggedIn === "true"

  ) {

    return children;

  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );

};

/* ================= AUTH ROUTE ================= */

const AuthRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const isLoggedIn =
    sessionStorage.getItem(
      "isLoggedIn"
    );

  /* ================= ALREADY LOGGED IN ================= */

  if (

    token &&
    isLoggedIn === "true"

  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }

  return children;

};

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={

            <AuthRoute>

              <Login />

            </AuthRoute>

          }
        />

        {/* SIGNUP */}

        <Route
          path="/signup"
          element={

            <AuthRoute>

              <Signup />

            </AuthRoute>

          }
        />

        {/* MAIN APP */}

        <Route
          path="/"
          element={

            <ProtectedRoute>

              <MainLayout />

            </ProtectedRoute>

          }
        >

          {/* REDIRECT */}

          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* DASHBOARD */}

          <Route
            path="dashboard"
            element={
              <Dashboard />
            }
          />

          {/* INCOME */}

          <Route
            path="income"
            element={
              <Income />
            }
          />

          {/* EXPENSES */}

          <Route
            path="expenses"
            element={
              <Expenses />
            }
          />

          {/* ANALYTICS */}

          <Route
            path="analytics"
            element={
              <Analytics />
            }
          />

          {/* BUDGET */}

          <Route
            path="budget"
            element={
              <Budget />
            }
          />

          {/* PROFILE */}

          <Route
            path="profile"
            element={
              <Profile />
            }
          />

        </Route>

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;