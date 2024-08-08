import { familyData } from "@/shared/config";
import { formatEventDate } from "@/utils/formatDate";
import React from "react";

type Marriage = {
  id: number;
  type: string;
  people: Array<{ id: number; firstName: string; lastName: string }>;
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
  return (
    <div className="w-64 h-full bg-[#F1F5F9] rounded-lg border border-[#CBD5E1] px-5">
      <div>
        {event.map((data) => (
          <div className="flex flex-col items-center gap-3 mt-8" key={data.id}>
            <div className="flex items-center gap-1">
              <img src={familyData[0].icon} className="w-4 h-4" alt="Icon" />
              <h4 className="text-base font-semibold text-[#64748B]">
                {data.type}
              </h4>
            </div>
            <div className="border-2 border-[#DEE5ED] h-10 w-full rounded-md bg-white flex items-center justify-center text-[#1E293B] text-sm font-medium">
              {formatEventDate(data.eventDate as string)}
            </div>
            {data.type === "marriage" ? (
              <div className="border-2 border-[#DEE5ED] h-10 w-full rounded-md bg-white flex items-center justify-center text-[#1E293B] text-sm font-medium">
                {data?.marriage?.people[0]?.firstName}{" "}
                {data?.marriage?.people[0]?.lastName}
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
