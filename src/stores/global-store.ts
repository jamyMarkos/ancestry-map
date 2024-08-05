import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface States {
  addPeopleModal: boolean;
  peopleDetailModal: boolean;
  addEventModal: boolean;
  addChildModal: boolean;
  newPersonId: number | null;
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
  setNewPersonId: (id: number) => void;
  setSelectedPersonId: (id: string | number | null) => void;
}

export const globalStore = create<States & Actions>()(
  devtools(
    (set) => ({
      addPeopleModal: false,
      addEventModal: false,
      peopleDetailModal: false,
      addChildModal: false,
      childId: null,
      parentId: null,
      newPersonId: null,
      selectedPersonId: null,
      setChildId: (id: number) => set({ childId: id }),
      setParentId: (id: number) => set({ parentId: id }),
      setNewPersonId: (id: number) => set({ newPersonId: id }),
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
