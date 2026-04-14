import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Pharmacy from "./pages/Pharmacy";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppointmentProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctor/:id" element={<DoctorProfile />} />
                <Route path="/booking/:doctorId" element={<Booking />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pharmacy" element={<Pharmacy />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/blog" element={<Blog />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <History />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </BrowserRouter>
        </AppointmentProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
