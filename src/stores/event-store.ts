import { create } from "zustand";
import axios from "axios";
import { devtools, persist } from "zustand/middleware";

interface People {
  id: number;
  firstName: string;
  lastName: string;
}

interface Marriage {
  id: number;
  personId: number;
  spouseId: number;
  status: string;
  people: People[];
}

interface Event {
  id: number;
  userId: string;
  type: string;
  eventDate: string | null;
  location: string | null;
  details: string | null;
  marriageId: number | null;
  personId: number | null;
  createdAt: string;
  updatedAt: string;
  marriage: Marriage | null;
}

interface EventStore {
  event: Event[];
  fetchEvent: () => Promise<void>;
}

const useEventStore = create<EventStore>()(
  devtools(
    persist(
      (set) => ({
        event: [],
        fetchEvent: async () => {
          try {
            const response = await axios.get("http://localhost:5000/events");
            set({ event: response.data });
          } catch (error) {
            console.error("Error fetching events:", error);
          }
        },
      }),
      { name: "event-store" }
    )
  )
);

export default useEventStore;
