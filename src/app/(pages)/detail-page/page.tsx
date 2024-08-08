"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "@/components/Header/DynamicHeader";
import FamilyDetails from "@/components/SavedDataSection/FamilyDetails";
import EventDetailFlow from "@/reactflow/eventDetail";
import { globalStore } from "@/stores/global-store";
import "@xyflow/react/dist/style.css";
import { FaPlus } from "react-icons/fa";
import { sortEventsByDate } from "@/utils/sortEvents";
import { EventType } from "@/components/SavedDataSection/FamilyDetails";

export default function EventDetail() {
  const { nodeSelectedId } = globalStore();
  const [eventsData, setEventsData] = useState<EventType[]>([]);

  // Fetch the event data
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`/api/events/${nodeSelectedId}`);
        const sortedEvents = sortEventsByDate(response.data.events);
        setEventsData(sortedEvents);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchEventData();
  }, [nodeSelectedId]);

  const handleAddEvent = () => {
    console.log("Back Event clicked");
  };
  const handleBackClick = () => {
    console.log("Back arrow clicked");
  };
  return (
    <>
      <PageHeader
        backArrow={true}
        onBackClick={handleBackClick}
        heading="New Family Member"
        subHeading="Grandparent"
        breadcrumb={[
          {
            icon: "./images/family.svg",
            label: "Family",
          },
          {
            icon: "./images/family.svg",
            label: "New Family Member",
          },
        ]}
        primaryAction={{
          label: "Add life event",
          icon: <FaPlus className="text-gray-500 sm:size-4 size-3" />,
          onClick: handleAddEvent,
        }}
      />
      <div className="w-full h-[calc(100vh-72px)] p-5 flex gap-5">
        <div className="w-[calc(100%-264px)]">
          <EventDetailFlow />
        </div>
        {eventsData.length > 0 && <FamilyDetails event={eventsData} />}
      </div>
    </>
  );
}
