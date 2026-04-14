import { Pill, Search, ShoppingCart, Truck, Shield, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const medicines = [
  { name: "Paracetamol 500mg", category: "Pain Relief", price: 35, strip: "10 tablets", img: "💊" },
  { name: "Cetirizine 10mg", category: "Allergy", price: 45, strip: "10 tablets", img: "💊" },
  { name: "Vitamin D3 60K", category: "Supplements", price: 120, strip: "4 capsules", img: "💛" },
  { name: "Azithromycin 500mg", category: "Antibiotics", price: 95, strip: "3 tablets", img: "💊" },
  { name: "Omeprazole 20mg", category: "Gastric", price: 55, strip: "10 capsules", img: "💊" },
  { name: "Metformin 500mg", category: "Diabetes", price: 40, strip: "10 tablets", img: "💊" },
  { name: "Multivitamin Gold", category: "Supplements", price: 350, strip: "30 tablets", img: "✨" },
  { name: "Amoxicillin 250mg", category: "Antibiotics", price: 65, strip: "10 capsules", img: "💊" },
];

export default function Pharmacy() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAdd = (med) => {
    addToCart(med);
    setAddedItems((prev) => ({ ...prev, [med.name]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [med.name]: false }));
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">Online Pharmacy</h1>
          <p className="text-white/70 mb-8">Order medicines, health products & get them delivered to your doorstep</p>
          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center border border-white/20">
            <Search className="text-white/60 ml-3" size={20} />
            <input type="text" placeholder="Search medicines, health products..." className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-white/50 text-sm outline-none" />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-xs font-medium text-gray-400">
          <span className="flex items-center gap-1.5"><Truck size={14} /> Free delivery over ₹500</span>
          <span className="flex items-center gap-1.5"><Shield size={14} /> 100% Genuine Medicines</span>
          <span className="flex items-center gap-1.5"><Pill size={14} /> Licensed Pharmacy</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8">Popular Medicines</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {medicines.map((med, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">{med.img}</div>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">{med.category}</span>
              <h3 className="font-semibold text-sm text-slate-900 mt-1 mb-1">{med.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{med.strip}</p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                <span className="font-bold text-slate-900">₹{med.price}</span>
                <button
                  onClick={() => handleAdd(med)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    addedItems[med.name]
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {addedItems[med.name] ? (
                    <>
                      <Check size={12} /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={12} /> Add
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
