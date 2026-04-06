import React, { useEffect, useState } from "react";
import ResumePreview from "../components/ResumePreview";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import Loader from "../components/Loader";
import { ArrowLeft } from "lucide-react";
import endPoint from './../configs/api';

const Preview = () => {
  
  const { resumeId } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
  try {
    const { data } = await endPoint.get(`/api/resumes/public/${resumeId}`);
    if (data?.resume) {
      setResumeData(data.resume);
    } else {
      console.warn("Resume not found for ID:", resumeId);
      setResumeData(null);
    }
  } catch (error) {
    console.error("Failed to load resume:", error);
    setResumeData(null);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Loader />
    </div>
  );
}

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <p className="mb-4 text-xl font-semibold text-gray-700">
             Resume Not Found
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {resumeData.title}
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
        </div>

        {/* Resume Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;