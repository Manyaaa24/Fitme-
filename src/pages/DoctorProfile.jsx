import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/mockApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { Star, MapPin, Clock, Award, ArrowLeft } from "lucide-react";

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDoctorById(id).then((d) => { setDoctor(d); setLoading(false); });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!doctor) return <div className="text-center py-20 text-gray-500">Doctor not found.</div>;

  const dates = Object.keys(doctor.availableSlots);

  return (
    <div className="bg-neutral min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/doctors" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition">
          <ArrowLeft size={16} /> Back to doctors
        </Link>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          <div className="md:flex">
            <img src={doctor.image} alt={doctor.name} className="w-full md:w-72 h-72 object-cover" />
            <div className="p-8 flex-1">
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-1">{doctor.specialty}</p>
              <h1 className="text-3xl font-bold text-textDark mb-2">{doctor.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><MapPin size={14} /> {doctor.location}</span>
                <span className="flex items-center gap-1 text-amber-500"><Star size={14} fill="currentColor" /> {doctor.rating} ({doctor.reviews} reviews)</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{doctor.bio}</p>
              <div className="flex gap-6">
                <div className="bg-neutral rounded-xl px-5 py-3 text-center"><p className="text-xs text-gray-400">Fee</p><p className="font-bold text-primary text-lg">₹{doctor.fee}</p></div>
                <div className="bg-neutral rounded-xl px-5 py-3 text-center"><p className="text-xs text-gray-400">Experience</p><p className="font-bold text-primary text-lg">15+ yrs</p></div>
                <div className="bg-neutral rounded-xl px-5 py-3 text-center"><p className="text-xs text-gray-400">Reviews</p><p className="font-bold text-primary text-lg">{doctor.reviews}</p></div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-100">
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-2"><Clock size={20} /> Available Slots</h3>
            {dates.length > 0 ? (
              <div className="space-y-6">
                {dates.map((date) => (
                  <div key={date}>
                    <p className="text-sm font-medium text-gray-700 mb-3">{date}</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.availableSlots[date].map((time) => (
                        <Link
                          key={time}
                          to={`/booking/${doctor.id}?date=${date}&time=${time}`}
                          className="px-4 py-2 border border-primary/30 text-primary rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition"
                        >
                          {time}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No slots available at this time.</p>
            )}
            <Link
              to={`/booking/${doctor.id}`}
              className="mt-8 inline-flex bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-accent transition shadow-md shadow-primary/20"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
