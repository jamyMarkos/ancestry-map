import { globalStore } from "@/stores/global-store";
import { Handle, Position } from "@xyflow/react";
import axios from "axios";
import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";

interface DetailPeopleProps {
  personId: number | string | null;
  name: string;
  place: string;
  countryCode?: string;
  onClick?: () => void;
}
const DetailPeople = ({
  name,
  personId,
  onClick,
  place,
  countryCode,
}: DetailPeopleProps) => {
  const { peopleDetailModal, setPeopleDetailModal } = globalStore();
  const { selectedPersonId, setSelectedPersonId } = globalStore();

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await axios.get("https://flagcdn.com/en/codes.json");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFlag();

    return () => {
      // console.log("This will be logged on unmount");
    };
  }, []);

  // Construct the flag URL using the country code
  if (!countryCode) {
    return null;
  }
  const flagUrl = `https://flagpedia.net/data/flags/icon/16x12/${countryCode.toLowerCase()}.png`;

  const handleNodeClick = () => {
    setPeopleDetailModal(!peopleDetailModal);
    setSelectedPersonId(personId as number);
  };

  return (
    <div
      onClick={handleNodeClick}
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
            src={flagUrl}
            alt={`${countryCode} flag`}
            className="h-2.5 w-auto px-1"
          />
          <span className="font-medium">{place}</span>
        </span>
      </div>
    </div>
  );
};

export default DetailPeople;
