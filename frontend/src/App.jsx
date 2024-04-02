import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

import useGetWidth from "./hooks/useGetWidth";
const App = () => {
  const { authUser } = useAuthContext();
  const { windowRef } = useGetWidth();

  return (
    <div
      className="sm:p-4  h-[100dvh]  flex sm:items-center items-start justify-center"
      ref={windowRef}
    >
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
