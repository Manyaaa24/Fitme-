import { useState, useEffect } from "react";
import { api } from "../services/mockApi";
import DoctorCard from "../components/DoctorCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, SlidersHorizontal } from "lucide-react";

const specialties = ["All", "Cardiology", "Orthopedics", "Pediatrics", "Dermatology", "Neurology", "General Medicine"];

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");

  useEffect(() => {
    api.getDoctors().then((d) => { setDoctors(d); setLoading(false); });
  }, []);

  const filtered = doctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = specialty === "All" || d.specialty === specialty;
    return matchSearch && matchSpecialty;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-neutral min-h-screen">
      <section className="hero-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">Find Your Doctor</h1>
          <p className="text-white/70 mb-8">Search from our network of 200+ verified specialists</p>
          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center border border-white/20">
            <Search className="text-white/60 ml-3" size={20} />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or specialty..."
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-white/50 text-sm outline-none"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <SlidersHorizontal size={16} className="text-gray-400 shrink-0" />
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSpecialty(s)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                specialty === s
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-6">{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-2">No doctors found</p>
            <p className="text-sm">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
