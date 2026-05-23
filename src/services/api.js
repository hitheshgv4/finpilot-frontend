import axios from "axios";

/* ================= BASE URL ================= */

const API = axios.create({

  baseURL:
    "http://localhost:8080/api",

  headers: {

    "Content-Type":
      "application/json",

  },

});

/* ================= REQUEST INTERCEPTOR ================= */

API.interceptors.request.use(

  (config) => {

    /* ================= GET TOKEN ================= */

    const token =

      localStorage.getItem(
        "token"
      ) ||

      localStorage.getItem(
        "authToken"
      );

    /* ================= ADD JWT ================= */

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(
      error
    );

  }

);

/* ================= RESPONSE INTERCEPTOR ================= */

API.interceptors.response.use(

  (response) =>
    response,

  (error) => {

    /* ================= AUTO LOGOUT ================= */

    if (

      error.response &&

      error.response.status === 401

    ) {

      /* ================= CLEAR STORAGE ================= */

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "authToken"
      );

      localStorage.removeItem(
        "currentUser"
      );

      sessionStorage.removeItem(
        "isLoggedIn"
      );

      /* ================= REDIRECT ================= */

      window.location.href =
        "/login";

    }

    return Promise.reject(
      error
    );

  }

);

/* ================= AUTO TOKEN RESTORE ================= */

const token =

  localStorage.getItem(
    "token"
  ) ||

  localStorage.getItem(
    "authToken"
  );

if (token) {

  API.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;

}

export default API;