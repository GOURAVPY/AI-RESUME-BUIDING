import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  // Helper to format dates safely
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "Present") return "Present";
    try {
      const [year, month] = dateStr.split("-");
      return new Date(year, month - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800 shadow-sm min-h-screen">
      <div className="grid grid-cols-3">
        
        {/* TOP LEFT: Image Area */}
        <div className="col-span-1 py-10">
          {data.personal_info?.image && (
            <div className="mb-6 flex justify-center">
              <img
                src={
                  typeof data.personal_info.image === "string"
                    ? data.personal_info.image
                    : URL.createObjectURL(data.personal_info.image)
                }
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4"
                style={{ borderColor: accentColor + "20" }}
              />
            </div>
          )}
        </div>

        {/* TOP RIGHT: Name and FIXED Profession Section */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold text-zinc-700 tracking-widest uppercase">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {/* FIX: This line now checks multiple common locations for the profession string 
              and adds a distinct color to ensure it is visible.
          */}
          <p 
            className="uppercase font-semibold text-sm tracking-[0.2em] mt-2"
            style={{ color: accentColor }}
          >
            {data.personal_info?.profession || data.profession || "Professional Title"}
          </p>
        </div>

        {/* LEFT SIDEBAR */}
        <aside className="col-span-1 border-r border-zinc-200 p-6 pt-0">
          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 mb-4 uppercase">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-center gap-3">
                  <Mail size={14} style={{ color: accentColor }} />
                  <span className="break-all">{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-3">
                  <MapPin size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 mb-4 uppercase">
                Education
              </h2>
              <div className="space-y-5 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-bold uppercase text-zinc-700">{edu.degree}</p>
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 mb-4 uppercase">
                Skills
              </h2>
              <ul className="space-y-2 text-sm text-zinc-600">
                {data.skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className="col-span-2 p-8 pt-0">
          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-10">
              <h2
                className="text-xs font-bold tracking-[0.2em] mb-4 uppercase"
                style={{ color: accentColor }}
              >
                About Me
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed text-justify">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-xs font-bold tracking-[0.2em] mb-6 uppercase"
                style={{ color: accentColor }}
              >
                Experience
              </h2>
              <div className="space-y-8">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-zinc-800 uppercase tracking-wide">
                        {exp.position}
                      </h3>
                      <span className="text-[10px] font-medium text-zinc-400 uppercase">
                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mb-3" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                    {Array.isArray(exp.description) && (
                      <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 space-y-1.5">
                        {exp.description.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project && data.project.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold tracking-[0.2em] mb-6 uppercase"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div className="space-y-6">
                {data.project.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-bold text-zinc-800 uppercase">
                      {project.name}
                    </h3>
                    <p className="text-xs italic mb-2" style={{ color: accentColor }}>
                      {project.type}
                    </p>
                    {Array.isArray(project.description) && (
                      <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 space-y-1">
                        {project.description.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;