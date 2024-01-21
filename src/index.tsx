import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider, AuthRoute } from "./auth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const { currentUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      console.log("currentUser: ", currentUser);
      navigate("/");
    }
  }, [currentUser, loading]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthRoute>
            <HomePage />
          </AuthRoute>
        }
      ></Route>
    </Routes>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
