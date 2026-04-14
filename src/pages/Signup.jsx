import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/mockApi";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, Sparkles } from "lucide-react";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleStep1 = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) { setError("All fields required"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const user = await api.signup(name, email, password);
      setUser(user);
      setStep(2); // Move to "preferred name" step
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    if (!preferredName) {
      navigate("/dashboard"); // skip if empty
      return;
    }
    setLoading(true);
    try {
      const updatedUser = await api.updateName(email, preferredName);
      setUser(updatedUser);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      navigate("/dashboard"); // proceed anyway on error
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10 border border-gray-100 relative overflow-hidden">
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
            <p className="text-center text-gray-500 text-sm mb-8">Join for easy healthcare access</p>
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
            <form onSubmit={handleStep1} className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 focus-within:border-primary transition">
                  <User size={16} className="text-gray-400" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="flex-1 py-3 px-3 text-sm outline-none" placeholder="John Doe" />
                </div>
              </div>
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
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 py-3 px-3 text-sm outline-none" placeholder="Min 6 characters" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-accent transition disabled:opacity-50">
                {loading ? "Creating account..." : "Sign up"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles size={28} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Account Created!</h1>
            <p className="text-gray-500 text-sm mb-8">Just one quick question before we go.</p>
            <form onSubmit={handleStep2} className="space-y-6">
              <div className="text-left">
                <label className="text-sm font-medium mb-2 block text-center">What should we call you?</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 focus-within:border-primary transition bg-gray-50">
                  <User size={16} className="text-gray-400" />
                  <input type="text" value={preferredName} onChange={(e) => setPreferredName(e.target.value)}
                    className="flex-1 py-3 px-3 text-sm outline-none bg-transparent text-center font-medium placeholder-gray-400" 
                    placeholder={`e.g. ${name.split(' ')[0]}`} autoFocus />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-md transition disabled:opacity-50">
                {loading ? "Saving..." : "Go to Dashboard"}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
