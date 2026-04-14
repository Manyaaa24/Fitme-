import { Clock, User, ArrowRight } from "lucide-react";

const articles = [
  { title: "10 Foods to Keep Your Heart Healthy and Strong", category: "Heart Health", color: "bg-red-50 text-red-600", author: "Dr. Priya Sharma", date: "Oct 12, 2026", readTime: "5 min", img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=250&fit=crop" },
  { title: "Understanding Anxiety: Triggers and Coping Mechanisms", category: "Mental Health", color: "bg-purple-50 text-purple-600", author: "Dr. Meena Iyer", date: "Oct 8, 2026", readTime: "7 min", img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop" },
  { title: "The Ultimate Guide to a Balanced Diet", category: "Nutrition", color: "bg-emerald-50 text-emerald-600", author: "Sarah Davis", date: "Oct 5, 2026", readTime: "6 min", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop" },
  { title: "COVID Booster Shots: What You Need to Know", category: "Vaccines", color: "bg-blue-50 text-blue-600", author: "Dr. Suresh Reddy", date: "Sep 28, 2026", readTime: "4 min", img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=250&fit=crop" },
  { title: "Managing Diabetes: A Complete Guide", category: "Diabetes", color: "bg-amber-50 text-amber-600", author: "Dr. Rajesh Kumar", date: "Sep 22, 2026", readTime: "8 min", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop" },
  { title: "The Importance of Regular Health Checkups", category: "Wellness", color: "bg-teal-50 text-teal-600", author: "Dr. Ananya Patel", date: "Sep 15, 2026", readTime: "5 min", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop" },
];

export default function Blog() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">Health Blog & Resources</h1>
          <p className="text-white/70">Stay updated with the latest medical insights and wellness tips</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${article.color} mb-3`}>
                  {article.category}
                </span>
                <h3 className="font-bold text-lg text-slate-900 mb-3 leading-snug line-clamp-2">{article.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                    <span>{article.date}</span>
                  </div>
                  <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
