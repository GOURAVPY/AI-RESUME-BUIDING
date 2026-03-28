const MinimalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // ✅ FIX: moved outside JSX
  const Section = ({ title, children }) => (
    <section className="mb-12">
      <h2
        className="text-xs uppercase tracking-[0.2em] mb-6 font-semibold"
        style={{ color: accentColor }}
      >
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white text-gray-900 font-light leading-relaxed">
      
      {/* Header */}
      <header className="mb-12 border-b pb-6">
        <h1 className="text-4xl font-extralight tracking-wide mb-3">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.linkedin && (
            <span className="break-all">{data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <Section title="Summary">
          <p className="text-gray-700 text-[15px]">
            {data.professional_summary}
          </p>
        </Section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <Section title="Experience">
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} —{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                <p className="text-gray-600 mb-2">{exp.company}</p>

                {exp.description && (
                  <p className="text-gray-700 text-[15px] whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {data.project?.length > 0 && (
        <Section title="Projects">
          <div className="space-y-6">
            {data.project.map((proj, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium">{proj.name}</h3>
                <p className="text-gray-600 text-[15px]">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <Section title="Education">
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>

                <span className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="text-sm px-3 py-1 border rounded-full text-gray-700"
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

export default MinimalTemplate;