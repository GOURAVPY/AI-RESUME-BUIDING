import React from "react";
import {
  LockOpenIcon,
  Mail,
  User2Icon,
  ArrowRight,
  Loader2,
} from "lucide-react";
import endPoint from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlstate = query.get("state");
  const [state, setState] = React.useState(urlstate || "login");
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await endPoint.post(`/api/user/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Common Tailwind classes for inputs to fix autofill background
  const inputClasses = `
    flex-1 ml-3 bg-transparent outline-none text-gray-500 font-medium 
    placeholder:text-gray-900 
    autofill:shadow-[0_0_0_40px_#f9fafb_inset] 
    [-webkit-text-fill-color:#374151]
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-green-100/50 blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-green-50 blur-3xl"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="sm:w-[440px] w-full bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 transition-all duration-500"
      >
        <div className="text-left mb-8">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200">
            <LockOpenIcon className="text-white" size={24} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {state === "login" ? "Welcome back" : "Get started"}
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            {state === "login"
              ? "Enter your details to access your account"
              : "Fill in the information to create your account"}
          </p>
        </div>

        <div className="space-y-4">
          {state !== "login" && (
            <div className="group">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-1 block">
                Full Name
              </label>
              <div className="flex items-center w-full border border-gray-200 group-focus-within:border-green-500 rounded-2xl px-5 h-14 bg-gray-50/50 transition-all">
                <User2Icon
                  size={18}
                  className="text-gray-400 group-focus-within:text-green-500 transition-colors"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="group">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-1 block">
              Email Address
            </label>
            <div className="flex items-center w-full border border-gray-200 group-focus-within:border-green-500 rounded-2xl px-5 h-14 bg-gray-50/50 transition-all">
              <Mail
                size={18}
                className="text-gray-400 group-focus-within:text-green-500 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="hello@example.com"
                className={inputClasses}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="flex justify-between items-end mb-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 block">
                Password
              </label>
              {state === "login" && (
                <button
                  type="button"
                  className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="flex items-center w-full border border-gray-200 group-focus-within:border-green-500 rounded-2xl px-5 h-14 bg-gray-50/50 transition-all">
              <LockOpenIcon
                size={18}
                className="text-gray-400 group-focus-within:text-green-500 transition-colors"
              />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className={inputClasses}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full h-14 bg-gray-900 text-white font-bold rounded-2xl shadow-xl shadow-gray-200 hover:bg-green-600 hover:shadow-green-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              {state === "login" ? "Sign In" : "Create Account"}{" "}
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-gray-500 font-medium">
            {state === "login" ? "New here?" : "Already a member?"}{" "}
            <span
              onClick={() =>
                setState((prev) => (prev === "login" ? "register" : "login"))
              }
              className="text-green-600 font-bold cursor-pointer hover:text-green-700 underline-offset-4 hover:underline"
            >
              {state === "login" ? "Create an account" : "Sign in instead"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
