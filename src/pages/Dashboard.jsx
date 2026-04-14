import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";
import { api } from "../services/mockApi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Clock, Video, MapPin, Bell, Pill, FileText, Download, Activity, Heart, Droplets, Scale, ArrowRight } from "lucide-react";
import AppointmentCard from "../components/AppointmentCard";

export default function Dashboard() {
  const { user } = useAuth();
  const { appointments, refreshAppointments } = useAppointments();
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    api.getHealthData().then(setHealthData);
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Cancel this appointment?")) {
      await api.cancelAppointment(id);
      await refreshAppointments();
    }
  };

  const vitalIcons = [
    { icon: <Activity size={22} />, color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: <Heart size={22} />, color: "text-blue-500", bg: "bg-blue-50" },
    { icon: <Droplets size={22} />, color: "text-orange-500", bg: "bg-orange-50" },
    { icon: <Scale size={22} />, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  if (!healthData) return <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div></div>;

  const hasVitals = healthData.vitals !== null;
  const vitalsArray = hasVitals ? Object.entries(healthData.vitals) : [];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-500 mt-1">Here's your health dashboard</p>
        </div>

        {/* Conditional Rendering based on state */}
        {!hasVitals && appointments.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100 text-center mb-8 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">You're all set up!</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
              Welcome to your new personal health portal. To start analyzing and monitoring your important parameters, please book your first appointment with one of our specialists. Your dashboard will populate automatically once your first records are in.
            </p>
            <Link to="/doctors" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition">
              Book Your First Appointment <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            {/* Vitals Cards */}
            {hasVitals && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {vitalsArray.map(([key, vital], i) => (
                  <div key={key} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className={`w-11 h-11 ${vitalIcons[i].bg} ${vitalIcons[i].color} rounded-xl flex items-center justify-center mb-4`}>
                      {vitalIcons[i].icon}
                    </div>
                    <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-bold text-slate-900">{vital.value}</span>
                      {vital.unit && <span className="text-xs text-gray-400">{vital.unit}</span>}
                    </div>
                    <span className={`text-xs font-semibold mt-1 inline-block ${
                      vital.status === "Normal" || vital.status === "Healthy" ? "text-emerald-500" : "text-amber-500"
                    }`}>
                      {vital.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <Calendar size={20} className="text-blue-600" /> Upcoming Appointments
                </h2>
                <Link to="/history" className="text-sm text-blue-600 font-medium border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-50 transition">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {[...healthData.upcomingAppointments, ...appointments.filter(a => a.status === "confirmed")].map((appt, i) => (
                  <div key={appt.id || `upc-${i}`} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900">{appt.doctorName}</h4>
                        <p className="text-sm text-blue-600">{appt.specialty}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        (appt.type || "In-Person") === "Video"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {appt.type || "In-Person"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {appt.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {appt.time}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-md transition">
                        <Video size={14} /> Join Now
                      </button>
                      {appt.id ? (
                        <button onClick={() => handleCancel(appt.id)} className="px-4 py-2.5 border border-red-200 text-red-600 bg-red-50 rounded-xl text-sm font-medium hover:bg-red-100 transition">
                          Cancel
                        </button>
                      ) : (
                        <button className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                          Reschedule
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Medical Reports */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <FileText size={20} className="text-emerald-500" /> Recent Medical Reports
                </h2>
                <Link to="/history" className="text-sm text-blue-600 font-medium border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-50 transition">
                  View History
                </Link>
              </div>
              <div className="space-y-4">
                {appointments.filter(a => a.status === "completed").length > 0 ? (
                  appointments.filter(a => a.status === "completed").map((appt) => (
                    <AppointmentCard key={appt.id} appointment={appt} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-4 text-center">No past reports available yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Active Prescriptions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 mb-4">
                <Pill size={20} className="text-orange-500" /> Active Prescriptions
              </h2>
              <div className="space-y-3">
                {healthData.prescriptions.map((rx, i) => (
                  <div key={i} className="bg-orange-50/50 rounded-xl p-4 border border-orange-100">
                    <h4 className="font-semibold text-sm text-slate-900">{rx.name}</h4>
                    <p className="text-xs text-orange-600 mt-0.5">{rx.dosage}</p>
                    <p className="text-xs text-gray-400 mt-1">Valid until {rx.validUntil}</p>
                    <button className="mt-3 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-xs font-semibold hover:shadow-md transition">
                      Order Refill
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 mb-4">
                <Bell size={20} className="text-blue-600" /> Notifications
              </h2>
              <div className="space-y-3">
                {healthData.notifications.map((notif, i) => (
                  <div key={i} className={`rounded-xl p-3.5 border text-sm ${
                    notif.type === "reminder" ? "bg-blue-50 border-blue-100" :
                    notif.type === "lab" ? "bg-emerald-50 border-emerald-100" :
                    "bg-orange-50 border-orange-100"
                  }`}>
                    <h4 className="font-semibold text-xs text-slate-900">{notif.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
