import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider, AuthRoute } from "./auth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreateRecipePage from "./pages/CreateRecipePage";

function App() {
  const { currentUser, loading } = useContext(AuthContext);

  return (
    <div className="bg-yellow-50">
      <Routes>
        <Route
          path="/"
          element={loading ? null : currentUser ? <HomePage /> : <LoginPage />}
        />
        <Route
          path="/create"
          element={
            <AuthRoute>
              <CreateRecipePage />
            </AuthRoute>
          }
        ></Route>
      </Routes>
    </div>
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
