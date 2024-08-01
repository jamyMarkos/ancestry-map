import { globalStore } from "@/stores/global-store";
import React from "react";
import { MdAdd } from "react-icons/md";

interface DetailPeopleProps {
  name: string;
  place: string;
  onClick?: () => void;
}
const DetailPeople = ({ name, onClick, place }: DetailPeopleProps) => {
  const { peopleDetailModal, setPeopleDetailModal } = globalStore();
  return (
    <div
      onClick={() => setPeopleDetailModal(!peopleDetailModal)}
      className={`grid items-center text-center px-3 py-1.5 border-nodeborder border-r w-6/12 ${
        peopleDetailModal ? "border border-gray-800 rounded-l-lg" : ""
      }`}
    >
      <span className="block text-black text-8 font-semibold leading-3">
        {name}
      </span>
      <div className="text-center block -mt-1.5">
        <span className="inline-flex items-center text-nodetx text-8">
          <img
            src="https://flagicons.lipis.dev/flags/4x3/it.svg"
            alt=""
            className="h-1.5 px-1"
          />
          {place}
        </span>
      </div>
    </div>
  );
};

export default DetailPeople;
