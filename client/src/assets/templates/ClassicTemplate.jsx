import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // ✅ FIX: moved OUTSIDE JSX
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
    <div className="max-w-4xl mx-auto p-10 bg-white text-gray-800 leading-relaxed shadow-sm">

      {/* HEADER */}
      <header
        className="text-center mb-10 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-3xl font-bold tracking-wide mb-2"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

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
          <p className="text-gray-700 text-[15px]">
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
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {exp.company}
                    </p>
                  </div>

                  <span className="text-sm text-gray-600">
                    {formatDate(exp.start_date)} —{" "}
                    {exp.is_current
                      ? "Present"
                      : formatDate(exp.end_date)}
                  </span>
                </div>

                {exp.description && (
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* PROJECTS */}
      {data.project?.length > 0 && (
        <Section title="Projects">
          <div className="space-y-5">
            {data.project.map((proj, index) => (
              <div key={index} className="pl-4 border-l-2 border-gray-300">
                <h3 className="font-semibold text-gray-800">
                  {proj.name}
                </h3>

                {proj.type && (
                  <p
                    className="text-xs mb-1"
                    style={{ color: accentColor }}
                  >
                    {proj.type}
                  </p>
                )}

                {proj.description && (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {proj.description.split("\n").map((line, i) => (
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
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>

                <span className="text-sm text-gray-600">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <Section title="Core Skills">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 border rounded-full"
                style={{ borderColor: accentColor }}
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