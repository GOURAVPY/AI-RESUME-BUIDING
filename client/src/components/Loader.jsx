import React from "react";

const Loader = () => {
  return (
    <div className="loader-wrapper flex flex-col">
      <div className="loader">
        <div className="box box1"></div>
        <div className="box box2"></div>
        <div className="box box3"></div>
        
      </div>
       {/* Loading Text */}
      <p className="mt-4 text-lg font-medium text-gray-600 animate-pulse tracking-wide">
        Loading...
      </p>
    </div>
  );
};

export default Loader;