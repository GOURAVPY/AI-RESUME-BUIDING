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
    <div className="w-full bg-gray-100 flex justify-center overflow-hidden py-4 md:py-10">
      {/* SCALING CONTAINER: 
          On mobile, we scale the entire A4 sheet down so it fits the width.
          On desktop, it stays 100% size.
      */}
      <div className="resume-scale-wrapper">
        <div
          id="resume-preview"
          className={
            "bg-white shadow-2xl transition-all duration-300 " +
            "print:shadow-none print:border-none print:m-0 " + 
            classes
          }
        >
          {renderTemplate()}
        </div>
      </div>

      <style jsx="true">{`
        /* 1. Base A4 Dimensions for the preview */
        #resume-preview {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* 2. Responsive Scaling Logic */
        .resume-scale-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
        }

        @media (max-width: 210mm) {
          /* If the screen is smaller than 210mm (A4 width), 
             we shrink the preview to fit the screen width.
          */
          .resume-scale-wrapper {
            /* This math calculates how much to shrink based on screen width */
            transform: scale(calc(100vw / 230mm)); 
            transform-origin: top center;
            height: calc(310mm * (100vw / 230mm)); /* Adjust container height as it scales */
          }
        }

        /* 3. Print Specific Styles */
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
          }

          /* Hide UI elements during print */
          nav, button, .no-print {
            display: none !important;
          }

          /* Reset scaling for actual printing */
          .resume-scale-wrapper {
            transform: none !important;
            height: auto !important;
            display: block;
          }

          #resume-preview {
            width: 210mm !important;
            height: 297mm !important;
            position: absolute;
            top: 0;
            left: 0;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            visibility: visible !important;
          }

          /* Ensure all parent elements don't block the resume */
          html, body {
            width: 210mm;
            height: 297mm;
            overflow: visible;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;