import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import api from "./api"; // Import your API client
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const Logout = () => {
  api
    .post("/api/logout/")
    .then((res) => {
      console.log("Logout successful:", res.data);
    })
    .catch((err) => {
      console.error("Logout failed:", err);
    })
    .finally(() => {
      localStorage.clear();
      window.location.href = "/login";
    });

  return null;
};

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
