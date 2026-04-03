import {
  ClassicTemplate,
  MinimalimageTemplate,
  MinimalTemplate,
  ModernTemplate,
} from "../assets/templates/index";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalimageTemplate data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className=" w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none" + classes
        }
      >
        {renderTemplate()}
      </div>
      <style jsx='true'>{`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: white;
          }

          /* Hide everything */
          body * {
            visibility: hidden;
          }

          /* Show only resume */
          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          /* Position resume */
          #resume-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: none !important;
            border: none !important;
          }

          /* Hide buttons (important) */
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview ;
