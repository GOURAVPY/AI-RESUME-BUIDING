import React, { useState, useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    title: "Senior Frontend Developer",
    message: "Integrating this AI builder was seamless. It took my resume from basic to 'Big Tech' ready in under 10 minutes. The ATS optimization is a game changer.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Product Designer @ Meta",
    message: "The interface is incredibly intuitive. As a designer, I'm picky about layouts, but these templates are clean, professional, and perfectly balanced.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
  },
  {
    id: 3,
    name: "James Wilson",
    title: "Talent Acquisition Lead",
    message: "I see thousands of resumes. The ones built with this tool consistently stand out because they are readable, concise, and perfectly formatted for our systems.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
];

const TestimonialCard = ({ testimonial }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group w-full max-w-[380px] rounded-[2rem] bg-white border border-slate-200 p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePos.y - 150) / 25}deg) rotateY(${-(mousePos.x - 180) / 25}deg)` 
          : 'none'
      }}
    >
      {/* Spotlight Background Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 197, 94, 0.06), transparent 40%)`
        }}
      />

      {/* Quote Icon */}
      <div className="absolute top-6 right-8 text-slate-100 group-hover:text-green-50 transition-colors">
        <Quote size={48} fill="currentColor" />
      </div>

      <div className="relative z-10">
        {/* Rating */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-green-500 text-green-500" />
          ))}
        </div>

        <h4 className="text-xl font-bold text-slate-900 mb-4">
          "The best tool for job seekers"
        </h4>

        <p className="text-slate-600 leading-relaxed italic mb-8">
          {testimonial.message}
        </p>

        <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-none mb-1">
              {testimonial.name}
            </p>
            <p className="text-sm text-slate-500 font-medium">
              {testimonial.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Loved by Professionals
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
          Join thousands of successful candidates who landed roles at top-tier companies using our AI optimization.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 max-w-7xl mx-auto">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;