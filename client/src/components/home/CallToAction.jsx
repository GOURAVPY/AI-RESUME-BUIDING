import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="relative mb-[150px] mt-[150px] px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-green-200/20 blur-[120px] -z-10 rounded-full"></div>

      <div className="max-w-5xl mx-auto relative group">
        {/* Main Container */}
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_48px_80px_-24px_rgba(22,163,74,0.1)]">
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles size={14} />
                <span>Boost your career</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Build a professional resume <br className="hidden lg:block" /> 
                <span className="text-green-600">that gets you hired.</span>
              </h2>
              
              <p className="text-lg text-slate-500 max-w-lg font-medium leading-relaxed">
                Stand out from the crowd with a polished, ATS-friendly resume designed by industry experts.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="https://github.com/GOURAVPY"
                className="group/btn relative flex items-center gap-3 rounded-2xl py-5 px-10 bg-slate-900 overflow-hidden transition-all duration-300 hover:bg-green-600 hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                
                <span className="relative text-white font-bold text-lg">Get Started Now</span>
                <ArrowRight className="relative text-white group-hover/btn:translate-x-1 transition-transform" size={22} />
              </a>
              
              <p className="text-center text-slate-400 text-sm mt-4 font-medium">
                No credit card required
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Corner Accents */}
        <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-green-500/20 rounded-tr-3xl"></div>
        <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-green-500/20 rounded-bl-3xl"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default CallToAction;