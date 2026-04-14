import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-neutral min-h-screen">
      <section className="hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-white/70">We're here to help. Get in touch anytime.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <MapPin size={22} />, title: "Visit Us", info: "123 Health Street, Tambaram, Chennai 600045", color: "bg-primary/10 text-primary" },
            { icon: <Phone size={22} />, title: "Call Us", info: "+91 98765 43210", color: "bg-emerald-50 text-emerald-600" },
            { icon: <Mail size={22} />, title: "Email Us", info: "support@fitme.com", color: "bg-accent/10 text-accent" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.info}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          {submitted && <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-4">Message sent! We'll get back to you shortly.</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" required className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition" />
              <input type="email" placeholder="Email" required className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition" />
            </div>
            <input type="text" placeholder="Subject" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition" />
            <textarea rows={4} placeholder="Your message..." required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition resize-none" />
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-accent transition flex items-center justify-center gap-2">
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
