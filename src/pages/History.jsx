import { useAppointments } from "../context/AppointmentContext";
import AppointmentCard from "../components/AppointmentCard";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const { appointments } = useAppointments();

  return (
    <div className="bg-neutral min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-8">Appointment History</h1>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-400">No appointment history yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
