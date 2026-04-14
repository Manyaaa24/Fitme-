import { Link } from "react-router-dom";
import { Search, Calendar, Users, Award, Shield, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/mockApi";
import DoctorCard from "../components/DoctorCard";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => { api.getDoctors().then(d => setDoctors(d.slice(0, 3))); }, []);

  return (
    <>
      <section className="hero-bg text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <Shield size={16} /> Trusted by 50,000+ patients
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Find The Best<br />
              <span className="text-emerald-300">Doctor</span> Near You.
            </h1>
            <p className="mt-6 text-xl text-white/80 max-w-md leading-relaxed">
              Book appointments with top-rated doctors, specialists, and healthcare professionals with just a few clicks.
            </p>
            <div className="mt-10 bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center max-w-lg border border-white/20">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="text-white/70" size={20} />
                <input type="text" placeholder="Search doctors, clinics, hospitals..." className="bg-transparent outline-none flex-1 text-white placeholder:text-white/50 text-sm" />
              </div>
              <Link to="/doctors" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:scale-105 transition text-sm shadow-lg">
                Search
              </Link>
            </div>
            <div className="mt-10 flex gap-10 text-sm">
              <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Calendar size={18} /></div><div><div className="font-bold text-lg">10,482</div><div className="text-white/60 text-xs">Appointments today</div></div></div>
              <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Users size={18} /></div><div><div className="font-bold text-lg">284</div><div className="text-white/60 text-xs">Doctors online</div></div></div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-4 shadow-2xl border border-white/20">
                <img src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=600" alt="Doctor" className="rounded-2xl w-full h-[420px] object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold">✓</div>
                <div><p className="font-bold text-sm text-slate-900">98%</p><p className="text-xs text-gray-500">Patient Satisfaction</p></div>
              </div>
              <div className="absolute -top-3 -right-3 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-2 animate-bounce" style={{animationDuration: '4s', animationDelay:'1s'}}>
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">❤️</div>
                <div><p className="font-bold text-xs text-slate-900">24/7</p><p className="text-[10px] text-gray-500">Emergency</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white py-5 border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-10 gap-y-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
          <div className="flex items-center gap-2"><Award size={16} /> NABH Accredited</div>
          <div>ISO 9001:2015</div>
          <div>50,000+ Happy Patients</div>
          <div>4.9★ Average Rating</div>
        </div>
      </div>

      <section className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose FitMe?</h2>
          <p className="text-center text-gray-500 mb-14 max-w-lg mx-auto">Everything you need for seamless healthcare, in one platform.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📅", title: "Instant Booking", desc: "Choose date & time from real-time doctor availability. No waiting.", color: "bg-blue-50 text-blue-600" },
              { icon: "🩺", title: "Verified Doctors", desc: "All doctors are licensed & background-checked for your safety.", color: "bg-emerald-50 text-emerald-600" },
              { icon: "💰", title: "Transparent Pricing", desc: "No hidden fees. See consultation costs upfront before booking.", color: "bg-amber-50 text-amber-600" },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-50">
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6 text-2xl`}>{f.icon}</div>
                <h3 className="font-semibold text-xl mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-baseline mb-10">
            <div>
              <h2 className="text-3xl font-bold">Our Top Rated Doctors</h2>
              <p className="text-gray-500 mt-2">Meet our team of experienced professionals.</p>
            </div>
            <Link to="/doctors" className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              See all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)}
          </div>
        </div>
      </section>

      <section className="hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-white/80 mb-8 text-lg">Join 50,000+ patients who trust FitMe for their healthcare needs.</p>
          <Link to="/signup" className="inline-flex bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:scale-105 transition shadow-xl">
            Get Started Free
          </Link>
        </div>
      </section>
    </>
  );
}
