import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });
      console.log("Logging successful:");
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Login to Your Account
          </h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginUser}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={saving}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? "Logging in..." : "Login"}
            </button>
          </div>
          <Link to={"/register"}>
            <p className="text-blue-500 mt-3">Don't have an account</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
