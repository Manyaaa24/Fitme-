import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Heart size={16} className="text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-white leading-none">FITME</span>
              <span className="text-[8px] text-slate-500 tracking-wider">Your Health Partner</span>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed">Making healthcare simple, accessible, and human for everyone.</p>
          <div className="flex gap-3 mt-6">
            {["f", "t", "in", "ig"].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition text-xs font-bold">
                {s}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <Link to="/" className="block py-1.5 text-slate-400 hover:text-white transition">Home</Link>
          <Link to="/doctors" className="block py-1.5 text-slate-400 hover:text-white transition">Find Doctors</Link>
          <Link to="/dashboard" className="block py-1.5 text-slate-400 hover:text-white transition">Patient Portal</Link>
          <Link to="/about" className="block py-1.5 text-slate-400 hover:text-white transition">About Us</Link>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Our Services</h4>
          <Link to="/doctors" className="block py-1.5 text-slate-400 hover:text-white transition">Cardiology</Link>
          <Link to="/doctors" className="block py-1.5 text-slate-400 hover:text-white transition">Neurology</Link>
          <Link to="/doctors" className="block py-1.5 text-slate-400 hover:text-white transition">Orthopedics</Link>
          <Link to="/doctors" className="block py-1.5 text-slate-400 hover:text-white transition">Pediatrics</Link>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <Link to="/contact" className="block py-1.5 text-slate-400 hover:text-white transition">Contact Us</Link>
          <a href="#" className="block py-1.5 text-slate-400 hover:text-white transition">FAQs</a>
          <a href="#" className="block py-1.5 text-slate-400 hover:text-white transition">Privacy Policy</a>
          <div className="mt-6">
            <p className="text-slate-500 text-xs">© 2026 FitMe Healthcare. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
