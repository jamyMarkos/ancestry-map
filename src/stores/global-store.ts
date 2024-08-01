import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface States {
  addPeopleModal: boolean;
  peopleDetailModal: boolean;
  addEventModal: boolean;
}

interface Actions {
  setAddPeopleModal: (data: boolean) => void;
  setAddEventeModal: (data: boolean) => void;
  setPeopleDetailModal: (data: boolean) => void;
}

export const globalStore = create<States & Actions>()(
  devtools(
    (set) => ({
      addPeopleModal: true,
      addEventModal: false,
      peopleDetailModal: false,
      setAddPeopleModal: (data) => set((state) => ({ addPeopleModal: data })),
      setAddEventeModal: (data) => set((state) => ({ addEventModal: data })),
      setPeopleDetailModal: (data) =>
        set((state) => ({ peopleDetailModal: data })),
    }),
    { name: "AddPeople" }
  )
);
