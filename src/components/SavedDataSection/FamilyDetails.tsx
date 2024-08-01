import { familyData } from "@/shared/config";
import React from "react";

const FamilyDetails = () => {
  return (
    <div className="w-64 h-full bg-[#F1F5F9] rounded-lg border border-[#CBD5E1] px-5">
      {familyData.map((data) => (
        <div className="flex flex-col items-center gap-3 mt-8" key={data.id}>
          <div className="flex items-center gap-1">
            <img src={data.icon} className="w-4 h-4" alt="Icon" />
            <h4 className="text-base font-semibold text-[#64748B]">
              {data.title}
            </h4>
          </div>
          {data.name.map((name: any) => (
            <div
              className="border-2 border-[#DEE5ED] h-10 w-full rounded-md bg-white flex items-center justify-center text-[#1E293B] text-sm font-medium"
              key={name.id}
            >
              {name.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FamilyDetails;
