import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { sectuions } from "../constent";
import Persnolinfoform from "../components/persnolinfoform";

const ResumeBuilder = () => {
  const { resumeid } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    persona_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  const loadExistingResume = () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeid);

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const activeSection = sectuions[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, [resumeid]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon size={18} />
          Back to Dashboard
        </Link>
      </div>

      <div className=" max-w-7xl mx-auto px-4 pb-8">
        <div className=" grid lg:grid-cols-12 gap-8">
          {/* left Panel */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className=" bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progressbar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200 " />
              <hr
                className=" absolute top-0 left-0 bg-gradient-to-r form-gren-500 to-gren-600 border-none transition-all duration-1000 "
                style={{
                  width: `${(activeSectionIndex * 100) / (sectuions.length - 1)}%`,
                }}
              />
              {/* NAVGATION SECTION */}
              <div className=" flex  justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div></div>
                <div className=" flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((PREINX) =>
                          Math.max(PREINX - 1, 0),
                        )
                      }
                      className=" flex items-center gap-1 p-3 rounded-lg text-sm
                       font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className=" size-4 " /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((PREINX) =>
                        Math.max(PREINX + 1, sectuions.length - 1),
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm
                       font-medium text-gray-600 hover:bg-gray-50 transition-all 
                       ${activeSectionIndex === sectuions.length - 1 && "opacity-50"}`}
                    disabled={activeSectionIndex === 0}
                  >
                    Next <ChevronRight className=" size-4 " />
                  </button>
                </div>
              </div>

              {/* form content */}
              <div className=" space-y-6">
               {activeSection?.id === "personal" && (
  <Persnolinfoform
    data={resumeData.persona_info || {}}
    onChange={(data) => {
      setResumeData((prev) => ({
        ...prev,
        persona_info: data,
      }));
    }}
    removrBackground={removeBackground}
    setremovrBackground={setRemoveBackground}
  />
)}
              </div>
            </div>
          </div>
          {/* Right Panel */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
