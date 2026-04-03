import React from 'react';
import { Sparkles, ShieldCheck, Zap, Cpu, FileCheck, SearchCode } from 'lucide-react';

const Feature = () => {
  const features = [
    {
      title: "AI-Powered Optimization",
      description: "Our neural engine analyzes job descriptions and suggests the exact keywords needed to pass recruiter filters.",
      icon: <Cpu className="text-violet-600" size={28} />,
      iconBg: "bg-violet-100",
      borderColor: "hover:border-violet-300",
      tag: "Smart Engine"
    },
    {
      title: "99% ATS Pass Rate",
      description: "Templates engineered specifically for Applicant Tracking Systems, ensuring your resume never gets lost in the 'black hole'.",
      icon: <ShieldCheck className="text-emerald-600" size={28} />,
      iconBg: "bg-emerald-100",
      borderColor: "hover:border-emerald-300",
      tag: "Recruiter Approved"
    },
    {
      title: "Keyword Intelligence",
      description: "Automatically identify and integrate missing skills based on the specific industry you are targeting.",
      icon: <SearchCode className="text-blue-600" size={28} />,
      iconBg: "bg-blue-100",
      borderColor: "hover:border-blue-300",
      tag: "Live Scan"
    },
    {
      title: "Instant PDF Formatting",
      description: "Professional, clean, and standard-compliant PDF exports that preserve layout integrity across all devices.",
      icon: <FileCheck className="text-orange-600" size={28} />,
      iconBg: "bg-orange-100",
      borderColor: "hover:border-orange-300",
      tag: "Pro Export"
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-green-600 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} className="animate-pulse" />
            <span>Next-Gen Career Tools</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Beat the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Robot Screeners.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop guessing what recruiters want. Use our AI to build a 
            <span className="text-slate-900 font-bold"> high-scoring, ATS-optimized </span> 
            resume in minutes.
          </p>
        </div>

        {/* Features Grid - 2x2 Grid for a more 'App' feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-10 rounded-[2.5rem] border border-slate-200/60 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] ${feature.borderColor}`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Icon Box */}
                <div className={`shrink-0 p-5 rounded-3xl ${feature.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <span className="hidden sm:block px-2 py-0.5 rounded-md bg-slate-50 text-[10px] font-bold text-slate-400 border border-slate-100 uppercase tracking-tighter">
                      {feature.tag}
                    </span>
                  </div>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Background Glow Effect */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-transparent via-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Hook */}
        <div className="mt-16 text-center">
            <p className="text-slate-400 font-medium flex items-center justify-center gap-2">
                <Zap size={16} className="text-yellow-500 fill-yellow-500" />
                Trusted by 50,000+ job seekers at top tech companies
            </p>
        </div>
      </div>
    </section>
  );
};

export default Feature;