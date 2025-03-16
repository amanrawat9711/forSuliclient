import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bg } from "../images/exporter";

const Login = () => {
  const navigate = useNavigate();
  const secretKey = import.meta.env.VITE_SECRET_KEY || "mysecurekey"; // Load from .env

  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (key === secretKey) {
      localStorage.setItem("authKey", key);
      window.dispatchEvent(new Event("storage")); // 🔹 Trigger event to update App state
      navigate("/"); // 🔹 Redirect after login
    } else {
      setError("Invalid key! Try again.");
    }
  };

  return (
    <>
      <div className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Secret Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
