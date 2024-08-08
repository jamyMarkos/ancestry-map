"use client";
import React, { Fragment, useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import moment from "moment";
import { IoMdAdd } from "react-icons/io";
import AddEventModal from "@/components/Modal/AddEventModal";
import EditEventModal from "@/components/Modal/EditEventModal";
import { globalStore } from "@/stores/global-store";
import axios from "axios";
import { EventType } from "@/components/SavedDataSection/FamilyDetails";
import { sortEventsByDate } from "@/utils/sortEvents";

const AddTree = () => {
  const {
    addEventModal,
    setAddEventeModal,
    editEventModal,
    setEditEventModal,
  } = globalStore();
  const [eventData, setEventData] = useState<EventType[]>([]);
  const { nodeSelectedId } = globalStore();
  const [selectedEventId, setSelectedEventId] = useState<number>(0);

  // Fetch the event data
  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${nodeSelectedId}`);

        const sortedEvents = sortEventsByDate(response.data.events);

        setEventData(sortedEvents);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchSingleEvent();
  }, [nodeSelectedId]);

  const handleEditClick = (eventId: number) => {
    setEditEventModal(true);
    setSelectedEventId(eventId);
  };

  return (
    <Fragment>
      <div className="birth-container">
        {eventData?.map((event: any, index: number) => (
          <div
            key={index}
            className="flex justify-between border border-birthborder rounded bg-white w-32 birth-line py-1 px-2 h-8"
          >
            <div className="block py-1 px-2 left-content">
              <span className="block text-birthtext text-6">
                {moment(event?.eventDate).format("DD/MM/YYYY")}
              </span>
              <span className="block text-birthtext text-6">
                {event?.place}
              </span>
            </div>
            <div className="block">
              <span className="block text-birthtext font-semibold text-8">
                {event?.type}
              </span>
              {event?.type === "Birth" && (
                <span className="block text-birthtext text-6">{`${event?.firstName} ${event.lastName}`}</span>
              )}
              {event?.type === "marriage" && (
                <span className="block text-birthtext text-6">
                  {`To ${event?.marriage?.people[0]?.firstName} ${event?.marriage?.people[0]?.lastName}`}{" "}
                  {`${event?.marriage?.people[0]?.id}`}
                </span>
              )}
            </div>
            <div></div>
            <div
              className="text-7 pt-1"
              onClick={() => handleEditClick(event?.id)}
            >
              <LuPencil />
            </div>
          </div>
        ))}
      </div>
      <div className="inline-block pb-2 ">
        <button
          onClick={() => setAddEventeModal(true)}
          className="flex items-center border border-birthborder rounded-sm bg-white text-7 py-1 px-1 font-medium w-full"
        >
          <span className="pr-0.5">
            <IoMdAdd />
          </span>{" "}
          Add life event
        </button>
      </div>
      {editEventModal && selectedEventId !== 0 && (
        <EditEventModal eventId={selectedEventId} />
      )}
      {addEventModal && <AddEventModal />}
    </Fragment>
  );
};

export default AddTree;
