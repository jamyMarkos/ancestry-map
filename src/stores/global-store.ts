import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface States {
  addPeopleModal: boolean;
  peopleDetailModal: boolean;
  addEventModal: boolean;
  childId: number | null;
}

interface Actions {
  setAddPeopleModal: (data: boolean) => void;
  setAddEventeModal: (data: boolean) => void;
  setPeopleDetailModal: (data: boolean) => void;
  setChildId: (id: number) => void;
}

export const globalStore = create<States & Actions>()(
  devtools(
    (set) => ({
      addPeopleModal: true,
      addEventModal: false,
      peopleDetailModal: false,
      childId: null,
      setChildId: (id: number) => set({ childId: id }),
      setAddPeopleModal: (data) => set((state) => ({ addPeopleModal: data })),
      setAddEventeModal: (data) => set((state) => ({ addEventModal: data })),
      setPeopleDetailModal: (data) =>
        set((state) => ({ peopleDetailModal: data })),
    }),
    { name: "AddPeople" }
  )
);
