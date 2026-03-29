import React from "react";
import { LockOpenIcon, Mail, User2Icon } from "lucide-react";

const Login = () => {
  const query = new URLSearchParams(window.location.search);
  const urlstate = query.get("state");
  const [state, setState] = React.useState(urlstate || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle login/signup logic
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[400px] w-full text-center bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden"
      >
        {/* Decorative Gradient Circle */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-tr from-green-400 to-green-200 rounded-full opacity-40"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-green-400 to-green-200 rounded-full opacity-40"></div>

        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          {state === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          Please {state} to continue
        </p>

        {/* Name Field */}
        {state !== "login" && (
          <div className="flex items-center mt-4 w-full border border-gray-300 rounded-full px-5 h-12 focus-within:ring-2 focus-within:ring-green-400 transition">
            <User2Icon size={18} className="text-green-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="flex-1 ml-3 outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="flex items-center mt-4 w-full border border-gray-300 rounded-full px-5 h-12 focus-within:ring-2 focus-within:ring-green-400 transition">
          <Mail size={18} className="text-green-500" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="flex-1 ml-3 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center mt-4 w-full border border-gray-300 rounded-full px-5 h-12 focus-within:ring-2 focus-within:ring-green-400 transition">
          <LockOpenIcon size={18} className="text-green-500" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="flex-1 ml-3 outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forget password */}
        {state === "login" && (
          <div className="mt-2 text-right">
            <button className="text-sm text-green-500 hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-5 w-full h-12 bg-green-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        {/* Switch Login/Register */}
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-5 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-green-500 font-medium hover:underline">
            {state === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;