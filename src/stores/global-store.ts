import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface States {
  addPeopleModal: boolean;
  peopleDetailModal: boolean;
  addEventModal: boolean;
  editEventModal: boolean;
  addChildModal: boolean;
  newPersonId: number | null;
  childId: number | null;
  parentId: number | null;
  selectedPersonId: number | null;
  nodeSelectedId: number | null;
  leftOrRight: number;
  spouseId: number | null;
  isAddSpouseModalOpen: boolean;
}

interface Actions {
  setAddPeopleModal: (data: boolean) => void;
  setAddEventeModal: (data: boolean) => void;
  setEditEventModal: (data: boolean) => void;
  setPeopleDetailModal: (data: boolean) => void;
  setAddChildModal: (data: boolean) => void;
  setChildId: (id: number) => void;
  setParentId: (id: number) => void;
  setNewPersonId: (id: number) => void;
  setSelectedPersonId: (id: number) => void;
  setNodeSelectedId: (data: number) => void;
  setLeftOrRight: (id: number) => void;
  setSpouseId: (id: number) => void;

  setIsAddSpouseModalOpen: (data: boolean) => void;
}

export const globalStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        isAddSpouseModalOpen: false,
        addPeopleModal: false,
        addEventModal: false,
        editEventModal: false,
        peopleDetailModal: false,
        addChildModal: false,
        nodeSelectedId: null,
        childId: null,
        parentId: null,
        newPersonId: null,
        selectedPersonId: null,
        leftOrRight: 0,
        spouseId: null,
        setSpouseId: (id: number) => set({ spouseId: id }),
        setLeftOrRight: (id: number) => set({ leftOrRight: id }),
        setChildId: (id: number) => set({ childId: id }),
        setParentId: (id: number) => set({ parentId: id }),
        setNewPersonId: (id: number) => set({ newPersonId: id }),
        setNodeSelectedId: (id: number) => set({ nodeSelectedId: id }),
        setSelectedPersonId: (id: number) => set({ selectedPersonId: id }),
        setAddPeopleModal: (data) => set((state) => ({ addPeopleModal: data })),
        setEditEventModal: (data) => set((state) => ({ editEventModal: data })),
        setAddEventeModal: (data) => {
          set((state) => ({ addEventModal: data }));
        },
        setAddChildModal: (data) => set((state) => ({ addChildModal: data })),

        setPeopleDetailModal: (data) =>
          set((state) => ({ peopleDetailModal: data })),
        setIsAddSpouseModalOpen: (data) => set({ isAddSpouseModalOpen: data }),
      }),
      { name: "AddPeople" }
    )
  )
);
