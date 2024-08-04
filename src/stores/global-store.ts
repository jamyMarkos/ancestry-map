import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface States {
  addPeopleModal: boolean;
  peopleDetailModal: boolean;
  addEventModal: boolean;
  addChildModal: boolean;
  childId: number | null;
  parentId: number | null;
  selectedPersonId: string | number | null;
}

interface Actions {
  setAddPeopleModal: (data: boolean) => void;
  setAddEventeModal: (data: boolean) => void;
  setPeopleDetailModal: (data: boolean) => void;
  setAddChildModal: (data: boolean) => void;
  setChildId: (id: number) => void;
  setParentId: (id: number) => void;
  setSelectedPersonId: (id: string | number | null) => void;
}

export const globalStore = create<States & Actions>()(
  devtools(
    (set) => ({
      addPeopleModal: true,
      addEventModal: false,
      peopleDetailModal: false,
      addChildModal: true,
      childId: null,
      parentId: null,
      selectedPersonId: null,
      setChildId: (id: number) => set({ childId: id }),
      setParentId: (id: number) => set({ parentId: id }),
      setAddPeopleModal: (data) => set((state) => ({ addPeopleModal: data })),
      setAddEventeModal: (data) => set((state) => ({ addEventModal: data })),
      setAddChildModal: (data) => set((state) => ({ addChildModal: data })),
      setPeopleDetailModal: (data) =>
        set((state) => ({ peopleDetailModal: data })),
      setSelectedPersonId: (id) => set({ selectedPersonId: id }),
    }),
    { name: "AddPeople" }
  )
);
