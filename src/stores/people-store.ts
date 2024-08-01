import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface PeopleData {
  isUser: boolean
  firstName: string
  lastName: string
  birthPlace: string
  dob: string
  gender: string
  isAlive: boolean
  parents: number[]
  children: number[]
  spouses: {
    id: number
    status: string
  }[]
}

interface States {
  peopleData: PeopleData | null;
  eventData: any;
}

interface Actions {
  setPeopleData: (data: PeopleData) => void;
  setEventeData: (data: any) => void;
}

export const peopleStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        peopleData: null,
        eventData: null,
        setPeopleData: (data) => set(() => ({ peopleData: data })),
        setEventeData: (data) => set(() => ({ eventData: data })),
      }),
      { name: "people-details" }
    )
  )
);
