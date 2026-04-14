import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, CheckCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const platformFee = cart.length > 0 ? 50 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + platformFee + tax;

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true);
    // Simulate real checkout delay
    setTimeout(() => {
      setLoading(false);
      clearCart();
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-3xl shadow-sm p-12 max-w-md border border-gray-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Order Placed Successfully!</h2>
          <p className="text-gray-500 mb-6">Your medicines will be delivered soon.</p>
          <button
            onClick={() => navigate("/pharmacy")}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/pharmacy" className="text-gray-400 hover:text-blue-600 transition">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center bg-white p-16 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-medium text-slate-500 mb-4">Your cart is empty</h2>
            <Link
              to="/pharmacy"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Go to Pharmacy
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">
                    {item.img}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.strip}</p>
                    <div className="font-bold text-blue-600 mt-1">₹{item.price}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm rounded-md transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.name, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm rounded-md transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="w-10 h-10 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 text-sm text-gray-600 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-medium text-slate-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-medium text-slate-900">₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (18%)</span>
                  <span className="font-medium text-slate-900">₹{tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-slate-900">Total Billing</span>
                <span className="text-2xl font-black text-blue-600">₹{total.toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-md shadow-blue-600/20 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${total.toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
