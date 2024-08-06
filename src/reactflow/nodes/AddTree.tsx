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
import { PeopleData } from "@/stores/people-store";
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
  const [spouseId, setSpouseId] = useState<number | undefined>(undefined);
  const [spouseData, setSpouseData] = useState<PeopleData | null>(null);
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

  // useEffect(() => {
  //   eventData.map((data) => {
  //     if (data.type === "marriage") {
  //       setSpouseId(data.marriage?.people[0]?.id || undefined);
  //     }
  //   });
  // }, [eventData]);

  useEffect(() => {
    eventData.forEach((data) => {
      if (
        data.type === "marriage" &&
        data.marriage &&
        data.marriage.people &&
        data.marriage.people.length > 0
      ) {
        setSpouseId(data.marriage.people[0].id);
      }
    });
  }, [eventData]);

  // Fetch the spouse of the selected person
  useEffect(() => {
    const fetchSpouse = async () => {
      try {
        const response = await axios.get(`/api/family/${spouseId}`);
        setSpouseData(response.data?.result);
        console.log("hey");
        console.log("in the family details, the wife data || ", spouseData);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchSpouse();
  }, [spouseId]);

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
                {moment(event?.date).format("DD/MM/YYYY")}
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
              {/* {event?.type === "marriage" && (
                <span className="block text-birthtext text-6">{`To ${event?.marriage?.people?.firstName} ${event.marriage?.people?.lastName}`}</span>
              )} */}
              {/* i wrote the below line of code */}
              {event?.type === "marriage" && (
                <span className="block text-birthtext text-6">
                  {`To ${spouseData?.firstName} ${spouseData?.lastName}`}{" "}
                  {`${event?.id}`}
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
      <div className="inline-block pb-2 bg-red-300">
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
