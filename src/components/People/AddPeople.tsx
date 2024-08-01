import React from "react";
import { MdAdd } from "react-icons/md";

interface AddPeopleProps {
  title: string;
  onClick?: () => void;
}
const AddPeople = ({ title, onClick }: AddPeopleProps) => {
  return (

    <div
      onClick={onClick}
      className="flex items-center px-3 py-4 border-nodeborder border-r w-6/12"
    >
      <span className="text-nodetx text-10 px-0.5">
        <MdAdd />
      </span>
      <span className="text-nodetx text-8">{title}</span>
    </div>
  );
};

export default AddPeople;
