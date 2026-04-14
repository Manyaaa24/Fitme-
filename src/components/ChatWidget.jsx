import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const quickReplies = [
  "How do I book an appointment?",
  "What are your working hours?",
  "How to cancel an appointment?",
  "Insurance & payment options",
];

const botResponses = {
  "How do I book an appointment?": "To book an appointment, go to 'Find Doctors', select a doctor, choose a date and time slot, and click 'Book Appointment'. You can also call us at 1-800-HEALTH.",
  "What are your working hours?": "Our clinic hours are Monday-Saturday, 8:00 AM – 8:00 PM. Emergency services are available 24/7.",
  "How to cancel an appointment?": "You can cancel any upcoming appointment from your Dashboard. Click the 'Cancel' button on the appointment card. Cancellations are free up to 24 hours before.",
  "Insurance & payment options": "We accept all major insurance providers. Cash, UPI, credit/debit cards, and net banking are accepted. EMI options are available for procedures above ₹5,000.",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I'm FitMe's virtual assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");

    setTimeout(() => {
      const botReply = botResponses[userMsg] || "Thanks for reaching out! A support agent will get back to you shortly. You can also call us at 1-800-HEALTH for immediate assistance.";
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? "bg-gray-600 rotate-90" : "bg-blue-600 hover:bg-blue-700 hover:scale-110"
        }`}
      >
        {isOpen ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>

      {/* Help icon */}
      {!isOpen && (
        <div className="fixed bottom-6 right-[5.5rem] z-[9999] w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500 shadow-sm">
          ?
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[380px] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">FitMe Support</h4>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span> Online now
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px] bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-gray-100 bg-white">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent py-3 text-sm outline-none"
              />
              <button
                onClick={() => handleSend()}
                className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
