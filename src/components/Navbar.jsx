import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { User, LogOut, Menu, X, Heart, Video, Calendar, Phone, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/doctors", label: "Find Doctors" },
    { to: "/services", label: "Services" },
    { to: "/pharmacy", label: "Pharmacy" },
    { to: "/blog", label: "Blog" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-9">
          <div className="flex items-center gap-5">
            <Link to="/video-consult" className="flex items-center gap-1.5 hover:text-blue-300 transition">
              <Video size={13} /> Video Consult
            </Link>
            <Link to="/booking/1" className="flex items-center gap-1.5 hover:text-blue-300 transition">
              <Calendar size={13} /> Book Now
            </Link>
            <Link to="/emergency" className="flex items-center gap-1.5 hover:text-blue-300 transition">
              <Phone size={13} /> Emergency
            </Link>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400"><Phone size={12} /> 1-800-HEALTH</span>
            <span className="text-white/50">|</span>
            <Link to="/support" className="hover:text-blue-300 transition">24/7 Support</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/30">
                <Heart size={20} className="text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 leading-none tracking-tight">FITME</span>
                <span className="text-[9px] text-gray-400 tracking-wider">Your Health Partner</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-1 transition ${
                    isActive(link.to)
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button className="hidden lg:flex w-9 h-9 items-center justify-center text-gray-400 hover:text-blue-600 transition">
                <Search size={18} />
              </button>
              
              <Link to="/cart" className="relative w-9 h-9 flex items-center justify-center text-gray-600 hover:text-blue-600 transition">
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="hidden sm:flex px-4 py-2 text-sm font-semibold border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
                  >
                    Patient Portal
                  </Link>
                  <button
                    onClick={() => { logout(); navigate("/"); }}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden lg:flex px-4 py-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-700">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-sm ${isActive(link.to) ? "bg-blue-50 text-blue-600 font-semibold" : "hover:bg-gray-50"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-lg text-sm hover:bg-gray-50">Dashboard</Link>
          </div>
        )}
      </nav>
    </>
  );
}
