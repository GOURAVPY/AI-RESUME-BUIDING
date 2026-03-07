import React from "react";
import { PlusIcon, UploadIcon } from "lucide-react";
const Dashboard = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className=" text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Gourav Suman
        </p>
        <div className="flex gap-4">
          <button
            className=" w-full bg-white sm:max-w-36 h-46 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 
          group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer
          "
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-b from-green-500 to-green-300 text-white rounded-full " />
            <p
              className="text-sm group-hover:text-green-600 transition-all m-[5px]
            duration-300"
            >
              Create Rusume
            </p>
          </button>
          <button
            className=" w-full bg-white sm:max-w-36 h-46 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 
          group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer
          "
          >
            <UploadIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-tr from-purple-500 to-purple-300 text-white rounded-full" />
            <p
              className="text-sm group-hover:text-purple-600 transition-all m-[5px]
            duration-300"
            >
             Upload Existing
            </p>
          </button>
        </div>

    <hr className="border-slate-300 my-6 sm:w-[305px]" />

      </div>
    </div>
  );
};

export default Dashboard;
