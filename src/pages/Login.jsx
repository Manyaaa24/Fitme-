import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/mockApi";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("patient@example.com");
  const [password, setPassword] = useState("123456");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("All fields required"); return; }
    setLoading(true);
    try {
      const user = await api.login(email, password);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10 border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-center text-gray-500 text-sm mb-8">Log in to your FitMe account</p>
        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 focus-within:border-primary transition">
              <Mail size={16} className="text-gray-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="flex-1 py-3 px-3 text-sm outline-none" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 focus-within:border-primary transition">
              <Lock size={16} className="text-gray-400" />
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                className="flex-1 py-3 px-3 text-sm outline-none" placeholder="••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-accent transition disabled:opacity-50">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
