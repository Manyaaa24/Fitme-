import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Available
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">{doctor.specialty}</p>
            <h3 className="font-semibold text-lg text-textDark">{doctor.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="font-semibold text-sm">{doctor.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
          <MapPin size={12} />
          {doctor.location}
        </div>
        <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">{doctor.bio}</p>
        <div className="mt-5 flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm">
            <span className="font-bold text-textDark">₹{doctor.fee}</span>
            <span className="text-gray-400"> / visit</span>
          </div>
          <Link
            to={`/doctor/${doctor.id}`}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
