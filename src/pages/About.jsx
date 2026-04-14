import { Heart, Users, Award, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="bg-neutral min-h-screen">
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">About FitMe</h1>
          <p className="text-xl text-white/80">Transforming healthcare access, one appointment at a time.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                FitMe was founded with a simple belief: healthcare should be accessible, transparent, and patient-first. We connect patients with verified, top-rated doctors for seamless appointment booking.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform serves 50,000+ patients in Chennai and is growing rapidly, helping people get the care they need without the traditional hassles of long queues and uncertain availability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Heart size={24} />, label: "Patient First", color: "bg-red-50 text-red-500" },
                { icon: <Users size={24} />, label: "200+ Doctors", color: "bg-blue-50 text-blue-600" },
                { icon: <Award size={24} />, label: "NABH Certified", color: "bg-amber-50 text-amber-600" },
                { icon: <Shield size={24} />, label: "100% Secure", color: "bg-emerald-50 text-emerald-600" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100 hover:shadow-md transition">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>{item.icon}</div>
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
