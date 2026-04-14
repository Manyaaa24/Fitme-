import { Link } from "react-router-dom";
import { Heart, Brain, Bone, Baby, Stethoscope, Eye, Pill, ArrowRight } from "lucide-react";

const services = [
  { icon: <Heart size={28} />, name: "Cardiology", desc: "Complete heart health management including ECG, Echo, and stress tests.", color: "bg-red-50 text-red-500", doctors: 24 },
  { icon: <Brain size={28} />, name: "Neurology", desc: "Expert care for migraines, epilepsy, stroke, and neurodegenerative disorders.", color: "bg-purple-50 text-purple-500", doctors: 18 },
  { icon: <Bone size={28} />, name: "Orthopedics", desc: "Joint replacements, fracture care, sports injuries, and spine surgery.", color: "bg-blue-50 text-blue-500", doctors: 20 },
  { icon: <Baby size={28} />, name: "Pediatrics", desc: "Comprehensive child healthcare from newborns to adolescents.", color: "bg-pink-50 text-pink-500", doctors: 15 },
  { icon: <Stethoscope size={28} />, name: "General Medicine", desc: "Primary care, preventive checkups, and management of chronic diseases.", color: "bg-emerald-50 text-emerald-500", doctors: 35 },
  { icon: <Eye size={28} />, name: "Dermatology", desc: "Skin treatments, cosmetic procedures, and laser therapy.", color: "bg-amber-50 text-amber-500", doctors: 12 },
];

export default function Services() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">Our Medical Services</h1>
          <p className="text-white/70">Comprehensive healthcare services across 20+ specialties</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">{s.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">{s.doctors} doctors available</span>
                <Link to="/doctors" className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
