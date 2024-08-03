import React from "react";
import { MdAdd } from "react-icons/md";

interface AddPeopleProps {
  title: string;
  childId?: number;
  onClick?: () => void;
}
const AddPeople = ({ title, childId, onClick }: AddPeopleProps) => {
  console.log("childId", childId);
  return (
    <div
      onClick={onClick}
      className="flex items-center font-medium px-3 py-4 border-nodeborder border-r w-6/12"
    >
      <span className="text-nodetx text-10 px-0.5">
        <MdAdd />
      </span>
      <span className="text-nodetx text-8 text-nowrap ">
        {title}

        {/* {childId} */}
      </span>
    </div>
  );
};

export default AddPeople;
