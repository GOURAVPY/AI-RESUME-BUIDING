import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
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

  const Section = ({ title, children }) => (
    <section className="mb-8">
      <h2
        className="text-lg font-semibold mb-4 uppercase tracking-wide border-b pb-1"
        style={{ borderColor: accentColor, color: accentColor }}
      >
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white text-gray-800 leading-relaxed shadow-sm min-h-screen">

      {/* HEADER */}
      <header
        className="text-center mb-10 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-4xl font-bold tracking-tight mb-1"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* ADDED PROFESSION SECTION */}
        <p className="text-lg font-medium text-gray-600 uppercase tracking-[0.15em] mb-4">
          {data.personal_info?.profession || data.profession || "Professional Title"}
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} style={{ color: accentColor }} />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} style={{ color: accentColor }} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: accentColor }} />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={14} style={{ color: accentColor }} />
              <span className="break-all">
                {data.personal_info.linkedin}
              </span>
            </div>
          )}

          {data.personal_info?.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} style={{ color: accentColor }} />
              <span className="break-all">
                {data.personal_info.website}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.professional_summary && (
        <Section title="Professional Summary">
          <p className="text-gray-700 text-[15px] text-justify">
            {data.professional_summary}
          </p>
        </Section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <Section title="Professional Experience">
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="pl-4 border-l-2"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase tracking-wide">
                      {exp.position}
                    </h3>
                    <p className="font-semibold" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                  </div>

                  <span className="text-sm font-medium text-gray-500 italic">
                    {formatDate(exp.start_date)} —{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                {Array.isArray(exp.description) &&
                  exp.description.length > 0 && (
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-700 mt-2 space-y-1.5">
                      {exp.description.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* PROJECT */}
      {data.project?.length > 0 && (
        <Section title="Key Projects">
          <div className="space-y-5">
            {data.project.map((proj, index) => (
              <div key={index} className="pl-4 border-l-2 border-gray-200">
                <h3 className="font-bold text-gray-800 uppercase text-sm">
                  {proj.name}
                </h3>

                {proj.type && (
                  <p className="text-[11px] font-bold mb-2 uppercase tracking-wider" style={{ color: accentColor }}>
                    {proj.type}
                  </p>
                )}

                {Array.isArray(proj.description) &&
                  proj.description.length > 0 && (
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                      {proj.description.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <Section title="Education">
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex justify-between flex-wrap gap-2"
              >
                <div>
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700 italic">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 font-medium">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>

                <span className="text-sm font-medium text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <Section title="Technical Skills">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-[12px] font-bold px-3 py-1 border uppercase tracking-wider bg-gray-50"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

export default ClassicTemplate;