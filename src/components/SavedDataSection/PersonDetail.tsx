import { globalStore } from "@/stores/global-store";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { BASE_URL } from "../../../config";
import { peopleStore } from "@/stores/people-store";
import useNodeStore from "@/stores/node-store";
import { set } from "react-datepicker/dist/date_utils";
import { formatEventDate } from "@/utils/formatDate";
import { sortEventsByDate } from "@/utils/sortEvents";

// Type & Interface
export interface Event {
  id: number;
  userId: string;
  type: string;
  eventDate: string | null;
  location: string | null;
  details: string | null;
  marriageId: number | null;
  personId: number;
  createdAt: string;
  updatedAt: string;
  marriage: {
    id: number;
    type: string;
    people: Array<{ id: number }>;
  } | null;
}

const PersonDetail = () => {
  const router = useRouter();
  const { peopleDetailModal, setPeopleDetailModal } = globalStore();
  const {
    selectedPersonId,
    newPersonId,
    setNewPersonId,
    setAddEventeModal,
    addEventModal,
    nodeSelectedId,
    setNodeSelectedId,
  } = globalStore();
  const { people } = useNodeStore();
  const [error, setError] = useState(false);
  const [peopleName, setPeopleName] = useState("");
  const [selectedPersonData, setSelectedPersonData] = useState(null);
  const [eventsData, setEventsData] = useState<Event[] | null>(null);

  // Fetch the event data
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`/api/events/${selectedPersonId}`);
        const sortedEvents = sortEventsByDate(response.data.events);
        setEventsData(sortedEvents);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchEventData();
  }, [selectedPersonId]);

  // Update peopleName whenever peopleData changes
  useEffect(() => {
    // Find the person by selectedPersonId
    const selectedPerson = people.find(
      (person) => String(person.id) === String(selectedPersonId)
    );
    setPeopleName(`${selectedPerson?.firstName} ${selectedPerson?.lastName}`);
  }, [selectedPersonId]);

  const addEventHandler = () => {
    setNewPersonId(selectedPersonId as number);
    setPeopleDetailModal(!peopleDetailModal);
    // setAddEventeModal(!addEventModal);
    router.push(`/people-detail`);
  };

  const handleCloseModal = () => {
    setPeopleDetailModal(!peopleDetailModal);
  };

  return (
    <div className="bg-[#F1F5F9] rounded-lg border border-[#CBD5E1] w-[400px]">
      <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between gap-2">
        <h2 className="text-lg text-black text-opacity-80 font-semibold">
          {peopleName}
        </h2>
        <div onClick={handleCloseModal} className="cursor-pointer">
          <RxCross2 className="w-5 h-5" />
        </div>
      </div>
      <div className="p-5">
        <div>
          {eventsData && eventsData.length > 0 ? (
            eventsData.map((event, index) => (
              <div key={event.id} className="flex items-start mb-6 relative">
                <div className="w-2 h-2 rounded-full bg-gray-600 mt-1.5 relative z-10"></div>
                {index !== eventsData.length - 1 && (
                  <div
                    className="absolute left-[3px] top-2 w-[1px] h-full bg-gray-400 z-0"
                    style={{
                      height: `calc(100% + 1.5rem)`,
                    }}
                  ></div>
                )}
                <div className="ml-4 w-full">
                  <h4 className="text-sm font-bold capitalize">{event.type}</h4>
                  <p className="text-sm">{formatEventDate(event.eventDate)}</p>
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No events set!</p>
          )}
        </div>
      </div>
      <div className="border-t border-[#E2E8F0] p-4">
        <div
          className="w-full bg-[#1E293B] rounded-3xl h-12 flex items-center justify-center text-white cursor-pointer hover:bg-opacity-95"
          onClick={addEventHandler}
        >
          Add or edit information
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
