import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../services/mockApi";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { CheckCircle, Calendar, Clock } from "lucide-react";

export default function Booking() {
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshAppointments } = useAppointments();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [date, setDate] = useState(searchParams.get("date") || "");
  const [time, setTime] = useState(searchParams.get("time") || "");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    api.getDoctorById(doctorId).then((d) => { setDoctor(d); setLoading(false); });
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    if (!date || !time) return;
    setSubmitting(true);
    await api.bookAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorImage: doctor.image,
      specialty: doctor.specialty,
      patientEmail: user.email,
      patientName: user.name,
      date, time, notes,
    });
    await refreshAppointments();
    setSubmitting(false);
    setSuccess(true);
  };

  if (loading) return <LoadingSpinner />;
  if (!doctor) return <div className="text-center py-20 text-gray-500">Doctor not found.</div>;

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-lg p-12 max-w-md border border-gray-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-textDark mb-3">Appointment Confirmed!</h2>
          <p className="text-gray-500 mb-2">Your visit with <strong>{doctor.name}</strong></p>
          <div className="flex justify-center gap-4 text-sm text-gray-600 my-4">
            <span className="flex items-center gap-1"><Calendar size={14} /> {date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {time}</span>
          </div>
          <button onClick={() => navigate("/dashboard")} className="mt-4 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-accent transition">
            View Dashboard
          </button>
        </div>
      </div>
    );
  }

  const availableDates = Object.keys(doctor.availableSlots);
  const availableTimes = date ? doctor.availableSlots[date] || [] : [];

  return (
    <div className="bg-neutral min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
        <p className="text-gray-500 mb-8">with {doctor.name} — {doctor.specialty}</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6 border border-gray-100">
          <div className="flex gap-4 items-center p-4 bg-neutral rounded-xl">
            <img src={doctor.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <h3 className="font-semibold">{doctor.name}</h3>
              <p className="text-primary text-sm">{doctor.specialty}</p>
              <p className="text-sm text-gray-500">₹{doctor.fee} / visit</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Date</label>
            <div className="flex flex-wrap gap-2">
              {availableDates.map((d) => (
                <button type="button" key={d} onClick={() => { setDate(d); setTime(""); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${date === d ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {date && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Time</label>
              <div className="flex flex-wrap gap-2">
                {availableTimes.length > 0 ? availableTimes.map((t) => (
                  <button type="button" key={t} onClick={() => setTime(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${time === t ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary"}`}>
                    {t}
                  </button>
                )) : <p className="text-sm text-gray-400">No slots on this date.</p>}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition resize-none"
              placeholder="Describe your symptoms or concerns..."
            />
          </div>
          {date && time && (
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-slate-900 mb-3">Billing Summary</h4>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Consultation Fee</span>
                  <span>₹{doctor.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹50</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-primary text-lg">₹{doctor.fee + 50}</span>
                </div>
              </div>
            </div>
          )}

          <button type="submit" disabled={!date || !time || submitting}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20 flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay ₹${doctor.fee + 50} & Confirm`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
