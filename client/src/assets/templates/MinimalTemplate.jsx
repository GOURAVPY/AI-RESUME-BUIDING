import React from 'react';

const MinimalTemplate = ({ data, accentColor = "#0f172a" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const Section = ({ title, children, className = "" }) => (
    <section className={`mb-10 break-inside-avoid ${className}`}>
      <h2
        className="text-[11px] uppercase tracking-[0.25em] mb-4 font-bold border-b pb-1"
        style={{ color: accentColor, borderImage: `linear-gradient(to right, ${accentColor}, transparent) 1` }}
      >
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto p-12 bg-white text-slate-800 font-sans antialiased shadow-sm my-8 print:my-0 print:shadow-none">
      
      {/* Header - Centered & Refined */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-light tracking-tight text-slate-900 mb-4">
          {data.personal_info?.full_name?.split(' ').map((n, i) => 
            i === 0 ? <span key={i} className="font-semibold">{n} </span> : n
          )}
        </h1>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-slate-500 font-medium">
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.email && (
            <a href={`mailto:${data.personal_info.email}`} className="hover:underline text-slate-700">{data.personal_info.email}</a>
          )}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.linkedin && (
            <span className="opacity-60">|</span>
          )}
          {data.personal_info?.linkedin && (
            <span className="hover:text-slate-900 cursor-pointer">{data.personal_info.linkedin.replace('https://', '')}</span>
          )}
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-2">
        
        {/* Summary */}
        {data.professional_summary && (
          <Section title="Profile">
            <p className="text-slate-600 text-[14px] leading-relaxed max-w-3xl">
              {data.professional_summary}
            </p>
          </Section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <Section title="Professional Experience">
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                      {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold mb-3" style={{ color: accentColor }}>{exp.company}</div>

                  {exp.description && (
                    <ul className="list-disc ml-4 space-y-2 text-slate-600 text-[14px]">
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i} className="pl-1">{line.replace(/^[•*-]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Bottom Grid: Education & Skills side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Education */}
          {data.education?.length > 0 && (
            <Section title="Education">
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-slate-800 text-[15px]">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-slate-600 italic">{edu.institution}</p>
                    <div className="flex justify-between text-[12px] mt-1 text-slate-500 font-medium">
                      <span>{edu.field}</span>
                      <span>{formatDate(edu.graduation_date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <Section title="Expertise">
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 uppercase tracking-wider rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* project */}
        {data.project?.length > 0 && (
          <Section title="Selected project">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.project.map((proj, index) => (
                <div key={index} className="border-l-2 border-slate-100 pl-4">
                  <h3 className="text-[15px] font-bold text-slate-800 mb-1">{proj.name}</h3>
                  <p className="text-slate-600 text-sm leading-snug">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;