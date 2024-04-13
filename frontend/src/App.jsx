import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

import useGetWidth from "./hooks/useGetWidth";
import { useEffect } from "react";
const App = () => {
  const { authUser } = useAuthContext();
  const { windowRef } = useGetWidth();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Check if the browser supports notifications

        // Request permission if not granted yet
        if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              // Show the notification
              new Notification("Come back!", {
                body: "We miss you!",
              });
            }
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
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
