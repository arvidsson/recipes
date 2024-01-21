import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const isLoggedIn = await login(email, password);

    if (isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col p-10 space-y-4 items-center justify-center">
        <div>
          <input
            className="w-72"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            className="w-72"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="underline font-semibold"
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
