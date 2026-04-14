import { format } from "date-fns";
import { Calendar, Clock, X, FileText, Download } from "lucide-react";

export default function AppointmentCard({ appointment, onCancel }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <img src={appointment.doctorImage} alt="" className="w-14 h-14 rounded-xl object-cover" />
          <div>
            <h4 className="font-semibold text-textDark">{appointment.doctorName}</h4>
            <p className="text-primary text-sm">{appointment.specialty}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          appointment.status === "confirmed"
            ? "bg-blue-50 text-blue-700"
            : appointment.status === "completed"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-700"
        }`}>
          {appointment.status}
        </span>
      </div>
      <div className="mt-4 flex gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          {appointment.date}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} />
          {appointment.time}
        </div>
      </div>
      
      {/* Action Area based on Status */}
      {appointment.status === "confirmed" && onCancel && (
        <button
          onClick={() => onCancel(appointment.id)}
          className="mt-4 flex items-center gap-1 text-sm text-red-500 hover:text-red-700 font-medium transition"
        >
          <X size={14} /> Cancel Appointment
        </button>
      )}

      {appointment.status === "completed" && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <FileText size={16} className={appointment.reportStatus === "Ready" ? "text-emerald-500" : "text-amber-500"} />
            <span className="font-medium text-slate-700">
              {appointment.reportStatus === "Ready" ? "Medical Report Ready" : "Report not there yet"}
            </span>
          </div>
          {appointment.reportStatus === "Ready" && (
            <a
              href={`/api/reports/${appointment.id}/download`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition"
            >
              <Download size={14} /> Download Report
            </a>
          )}
        </div>
      )}
    </div>
  );
}
