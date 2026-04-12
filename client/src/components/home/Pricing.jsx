import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      icon: <Rocket className="text-blue-500" size={24} />,
      price: isAnnual ? "0" : "0",
      description: "Perfect for a quick career refresh.",
      features: ["1 AI Resume", "ATS Keyword Analysis", "Basic PDF Export"],
      button: "Start for Free",
      highlight: false,
    },
    {
      name: "Pro",
      icon: <Zap className="text-green-500" size={24} />,
      price: isAnnual ? "12" : "19",
      description: "Everything you need to land the interview.",
      features: ["Unlimited Resumes", "AI Cover Letter Gen", "Direct Recruiter Link", "99.9% ATS Guarantee"],
      button: "Get Pro Access",
      highlight: true,
    },
    {
      name: "Expert",
      icon: <Crown className="text-amber-500" size={24} />,
      price: isAnnual ? "29" : "39",
      description: "Personalized coaching for top-tier roles.",
      features: ["Everything in Pro", "LinkedIn Optimization", "1-on-1 Resume Review", "Priority Support"],
      button: "Go Expert",
      highlight: false,
    },
  ];

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8"
          >
            Pricing for <br />
            <span className="text-green-600 italic">every ambition.</span>
          </motion.h2>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-16 h-8 bg-slate-100 rounded-full p-1 relative flex items-center"
            >
              <motion.div 
                animate={{ x: isAnnual ? 32 : 0 }}
                className="w-6 h-6 bg-green-500 rounded-full shadow-lg"
              />
            </button>
            <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
              Yearly <span className="text-green-600 ml-1 text-[10px] bg-green-50 px-2 py-1 rounded-full">-20%</span>
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-10 rounded-[3rem] border ${
                plan.highlight 
                ? 'border-green-500 bg-slate-900 text-white scale-105 z-10 shadow-[0_40px_80px_-15px_rgba(22,163,74,0.2)]' 
                : 'border-slate-100 bg-white text-slate-900'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.highlight ? 'bg-white/10' : 'bg-slate-50'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight">{plan.name}</h3>
                <p className={`text-sm mt-2 font-medium ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black italic">$</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={plan.price}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-6xl font-black tracking-tighter"
                    >
                      {plan.price}
                    </motion.span>
                  </AnimatePresence>
                  <span className={`text-sm font-bold ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-semibold">
                    <div className={`p-1 rounded-full ${plan.highlight ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600'}`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors ${
                  plan.highlight 
                  ? 'bg-green-500 text-white hover:bg-green-400' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.button}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;