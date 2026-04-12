import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Quote, Sparkles, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    title: "Frontend at Google",
    message: "The ATS optimization is a game changer. It took my resume from 'seen' to 'hired' in weeks.",
    color: "from-violet-500/10 to-purple-500/10",
    border: "group-hover:border-violet-500/50",
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Product Designer @ Meta",
    message: "As a designer, I'm picky about layouts. These templates are perfectly balanced and clean.",
    color: "from-emerald-500/10 to-teal-500/10",
    border: "group-hover:border-emerald-500/50",
  },
  {
    id: 3,
    name: "James Wilson",
    title: "Talent Lead @ Netflix",
    message: "I see thousands of resumes. These consistently stand out for their readability and flow.",
    color: "from-blue-500/10 to-cyan-500/10",
    border: "group-hover:border-blue-500/50",
  },
];

const TestimonialCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className={`group relative min-w-[320px] md:min-w-[400px] p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500 ${item.border}`}
    >
      {/* Glossy Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="p-3 bg-slate-900 rounded-2xl text-white">
            <Quote size={20} />
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full">
            <CheckCircle2 size={12} className="text-green-600" />
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-tighter italic">Verified Hire</span>
          </div>
        </div>

        <p className="text-2xl font-bold text-slate-900 leading-[1.3] mb-8 tracking-tight">
          "{item.message}"
        </p>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center font-black text-slate-400">
            {item.name[0]}
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-none">{item.name}</h4>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest">{item.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonial = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Create a smooth parallax movement for the cards
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={targetRef} className="py-40 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-green-600 mb-6"
            >
              <Sparkles size={18} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Social Proof</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]"
            >
              Don't take our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Word for it.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-right hidden md:block"
          >
            <div className="text-5xl font-serif italic text-slate-300">"Excellent"</div>
            <div className="text-xs font-bold text-slate-400 tracking-widest mt-2 uppercase">Trustpilot Review Score</div>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Draggable-feel Parallax Row */}
      <motion.div style={{ x }} className="flex gap-8 px-6 md:px-[10%] cursor-grab active:cursor-grabbing">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.id} item={t} index={i} />
        ))}
        {/* Repeating for infinite look */}
        {testimonials.map((t, i) => (
          <TestimonialCard key={`copy-${t.id}`} item={t} index={i + 3} />
        ))}
      </motion.div>

      {/* Decorative Branding */}
      <div className="mt-32 border-y border-slate-100 bg-white/50 backdrop-blur-md py-10">
        <div className="flex justify-around items-center opacity-30 grayscale contrast-125">
           {['Google', 'Meta', 'Amazon', 'Netflix', 'Apple'].map(logo => (
             <span key={logo} className="text-xl font-black tracking-tighter text-slate-900">{logo}</span>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;