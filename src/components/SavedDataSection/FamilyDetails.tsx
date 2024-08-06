import { familyData } from "@/shared/config";
import { globalStore } from "@/stores/global-store";
import { formatEventDate } from "@/utils/formatDate";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { sortEventsByDate } from "@/utils/sortEvents";
import { PeopleData } from "@/stores/people-store";

type Marriage = {
  id: number;
  type: string;
  people: Array<{ id: number }>;
};

export type EventType = {
  id?: number;
  userId: string;
  type: "birth" | "marriage" | "death"; // Union type for event types
  eventDate?: string | null;
  location?: string | null;
  details?: string | null;
  marriageId?: number | null;
  personId: number | string;
  createdAt: string;
  updatedAt: string;
  marriage?: Marriage | null;
};

const FamilyDetails = ({ event }: { event: EventType[] }) => {
  const { nodeSelectedId } = globalStore();
  const [spouseId, setSpouseId] = useState<number | undefined>(undefined);
  const [spouseData, setSpouseData] = useState<PeopleData | null>(null);

  useEffect(() => {
    event.map((data) => {
      if (data.type === "marriage") {
        setSpouseId(data.marriage?.people[1].id || undefined);
      }
    });
  }, [event]);

  // Fetch the event data
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`/api/family/${spouseId}`);
        setSpouseData(response.data?.result);
        console.log("in the family details, the wife data || ", spouseData);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchEventData();
  }, [spouseId]);

  return (
    <div className="w-64 h-full bg-[#F1F5F9] rounded-lg border border-[#CBD5E1] px-5">
      {/* {familyData.map((data) => (
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
      ))} */}
      <div>
        {event.map((data) => (
          <div className="flex flex-col items-center gap-3 mt-8" key={data.id}>
            <div className="flex items-center gap-1">
              <img src={familyData[0].icon} className="w-4 h-4" alt="Icon" />
              <h4 className="text-base font-semibold text-[#64748B]">
                {data.type} hey
              </h4>
            </div>
            <div className="border-2 border-[#DEE5ED] h-10 w-full rounded-md bg-white flex items-center justify-center text-[#1E293B] text-sm font-medium">
              {formatEventDate(data.eventDate as string)}
            </div>
            {data.type === "marriage" && spouseId !== undefined ? (
              <div className="border-2 border-[#DEE5ED] h-10 w-full rounded-md bg-white flex items-center justify-center text-[#1E293B] text-sm font-medium">
                {spouseData?.firstName} {spouseData?.lastName}
                {/* fetched */}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyDetails;
