import { globalStore } from "@/stores/global-store";
import { peopleStore } from "@/stores/people-store";
import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const PersonDetail = () => {
  const { peopleDetailModal, setPeopleDetailModal } = globalStore();
  const { peopleData, setPeopleData, eventData, setEventeData } = peopleStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/people/addEvent-data.json");
        setEventeData(response?.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/people/people-data.json");
        setPeopleData(response?.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchData();
  }, []);

  console.log("peopleData", eventData);
  const peopleName = `${peopleData?.firstName || ""} ${
    peopleData?.lastName || ""
  }`;
  return (
    <div className="bg-[#F1F5F9] rounded-lg border border-[#CBD5E1] w-[400px]">
      <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between gap-2">
        <h2 className="text-lg text-black text-opacity-80 font-semibold">
          {peopleName}
        </h2>
        <div
          onClick={() => setPeopleDetailModal(!peopleDetailModal)}
          className="cursor-pointer"
        >
          <RxCross2 className="w-5 h-5" />
        </div>
      </div>
      <div className="p-5">
        <div className="-mt-[2px]">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-black"></div>
            <div className="text-base font-semibold text-black text-opacity-75">
              Born
            </div>
          </div>
          <div className="flex items-start gap-3 pl-1 -mt-[2px]">
            <div className="border-l-2 border-black h-20"></div>
            <div className="pl-[6px] pt-2">
              <p className="text-sm font-normal text-gray-500">
                {" "}
                {moment(peopleData?.dob).format("DD/MM/YYYY")}
              </p>
              <p className="text-sm font-normal text-gray-500">
                {peopleData?.birthPlace}
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-[2px]">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-black"></div>
            <div className="text-base font-semibold text-black text-opacity-75">
              Married {eventData?.marriage?.spouse?.firstName}{" "}
              {eventData?.marriage?.spouse?.lastName}
            </div>
          </div>
          <div className="flex items-start gap-3 pl-1 -mt-[2px]">
            <div className=" h-20"></div>
            <div className="pl-[6px] pt-2">
              <p className="text-sm font-normal text-gray-500">
                {" "}
                {moment(eventData?.marriage?.marriageDate).format("DD/MM/YYYY")}
              </p>
              <p className="text-sm font-normal text-gray-500">
                {eventData?.marriage?.marriagePlace}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E2E8F0] p-4">
        <div className="w-full bg-[#1E293B] rounded-3xl h-12 flex items-center justify-center text-white cursor-pointer hover:bg-opacity-95">
          Add or edit information
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
