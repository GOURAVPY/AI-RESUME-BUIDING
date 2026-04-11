import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const primary = accentColor || "#3b82f6";

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const cleanUrl = (url) => {
    if (!url) return "";
    return url.replace(/^https?:\/\/(www\.)?/, "");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 print:p-4">
      
      {/* Header */}
      <header
        className="p-8 text-white"
        style={{
          background: `linear-gradient(135deg, ${primary}, #00000020)`,
        }}
      >
        <h1 className="text-4xl font-light mb-3">
          {data.personal_info?.full_name || "John Doe"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={data.personal_info.linkedin}
              className="flex items-center gap-2"
            >
              <Linkedin className="size-4" />
              <span className="break-all text-xs">
                {cleanUrl(data.personal_info.linkedin)}
              </span>
            </a>
          )}

          {data.personal_info?.website && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={data.personal_info.website}
              className="flex items-center gap-2"
            >
              <Globe className="size-4" />
              <span className="break-all text-xs">
                {cleanUrl(data.personal_info.website)}
              </span>
            </a>
          )}
        </div>
      </header>

      <div className="p-8">
        
        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b"
              style={{ borderColor: primary }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-2xl font-semibold mb-6 pb-2 border-b"
              style={{ borderColor: primary }}
            >
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-6 border-l border-gray-200"
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute -left-[6px] top-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: primary }}
                  />

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-medium">
                        {exp.position}
                      </h3>
                      <p style={{ color: primary }}>
                        {exp.company}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current
                        ? "Present"
                        : formatDate(exp.end_date)}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-gray-700 mt-2 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* project */}
        {data.project?.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b"
              style={{ borderColor: primary }}
            >
              project
            </h2>

            <div className="space-y-6">
              {data.project.map((p, i) => (
                <div
                  key={i}
                  className="relative pl-6 border-l border-gray-200"
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-[6px] top-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: primary }}
                  />

                  <h3 className="text-lg font-medium">
                    {p.name}
                  </h3>

                  {p.description && (
                    <p className="text-gray-700 text-sm mt-2">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-8">
          
          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2
                className="text-2xl font-semibold mb-4 pb-2 border-b"
                style={{ borderColor: primary }}
              >
                Education
              </h2>

              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-semibold">
                      {edu.degree}{" "}
                      {edu.field && `in ${edu.field}`}
                    </h3>

                    <p style={{ color: primary }}>
                      {edu.institution}
                    </p>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {formatDate(edu.graduation_date)}
                      </span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2
                className="text-2xl font-semibold mb-4 pb-2 border-b"
                style={{ borderColor: primary }}
              >
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm text-white rounded-full hover:opacity-80 transition"
                    style={{ backgroundColor: primary }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;