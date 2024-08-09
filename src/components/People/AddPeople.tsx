import { globalStore } from "@/stores/global-store";
import React from "react";
import { MdAdd } from "react-icons/md";

interface AddPeopleProps {
  title: string;
  childId?: number;
  onClick?: () => void;
  leftOrRight?: number;
  spouseId?: number;
  onSpouseClick?: () => void;
}
const AddPeople = ({
  title,
  childId,
  onClick,
  leftOrRight,
  spouseId,
}: AddPeopleProps) => {
  const { setLeftOrRight } = globalStore();
  const handleAddPeopleClick = () => {
    if (leftOrRight !== undefined) {
      setLeftOrRight(leftOrRight);
    }
  };

  return (
    <div
      onClick={() => {
        if (onClick) onClick();
        handleAddPeopleClick();
      }}
      className="flex items-center font-medium px-3 py-4 border-nodeborder border-r w-6/12"
    >
      <span className="text-nodetx text-10 px-0.5">
        <MdAdd />
      </span>
      <span className="text-nodetx text-8 text-nowrap">{title}</span>
    </div>
  );
};

export default AddPeople;
