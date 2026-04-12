import React from 'react';
import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Zap, Cpu, FileCheck, SearchCode, ArrowUpRight } from 'lucide-react';

const Feature = () => {
  const features = [
    {
      title: "AI-Powered Optimization",
      description: "Our neural engine analyzes job descriptions and suggests the exact keywords needed to pass recruiter filters.",
      icon: <Cpu size={28} />,
      color: "violet",
      tag: "Neural Engine"
    },
    {
      title: "99% ATS Pass Rate",
      description: "Templates engineered specifically for Applicant Tracking Systems, ensuring your resume never gets lost in the 'black hole'.",
      icon: <ShieldCheck size={28} />,
      color: "emerald",
      tag: "Verified Rate"
    },
    {
      title: "Keyword Intelligence",
      description: "Automatically identify and integrate missing skills based on the specific industry you are targeting.",
      icon: <SearchCode size={28} />,
      color: "blue",
      tag: "Live Scan"
    },
    {
      title: "Instant PDF Formatting",
      description: "Professional, clean, and standard-compliant PDF exports that preserve layout integrity across all devices.",
      icon: <FileCheck size={28} />,
      color: "orange",
      tag: "Standard Compliant"
    }
  ];

  return (
    <section id="features" className="relative py-32 px-6 bg-white overflow-hidden selection:bg-emerald-100">
      {/* 1. Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-emerald-50/40 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-0 -right-1/4 w-[1000px] h-[1000px] bg-blue-50/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-2xl shadow-emerald-200"
          >
            <Sparkles size={12} className="text-emerald-400" />
            <span>Next-Gen Career Tools</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]"
          >
            Outsmart the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600">
               Robot Screeners.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Stop guessing what recruiters want. Use our <span className="text-slate-900 underline decoration-emerald-400 decoration-4 underline-offset-4">proprietary AI</span> to build high-scoring resumes in seconds.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.01 }}
              className="group relative p-12 rounded-[3.5rem] border border-slate-100 bg-white/60 backdrop-blur-xl hover:bg-white transition-all duration-500 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {/* Corner Accent Icon */}
              <ArrowUpRight className="absolute top-10 right-10 text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={24} />

              <div className="flex flex-col gap-10">
                {/* Floating Icon Box */}
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl 
                  ${feature.color === 'violet' ? 'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white shadow-violet-100' : ''}
                  ${feature.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white shadow-emerald-100' : ''}
                  ${feature.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-blue-100' : ''}
                  ${feature.color === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white shadow-orange-100' : ''}
                `}>
                  {feature.icon}
                </div>

                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    {feature.tag}
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg lg:pr-12">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Bottom Decorative Pattern */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                 {feature.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Feature;