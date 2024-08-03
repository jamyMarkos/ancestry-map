import { create } from "zustand";
import axios from "axios";
import { devtools, persist } from "zustand/middleware";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: string | null;
  dob: string | null;
  deathDate: string | null;
  birthPlace: string | null;
  countryCode: string | null;
  isUser: boolean;
  isAlive: boolean | null;
  isAdopted: boolean;
  hasChangedName: boolean;
  hasChangedGender: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  parents: { parent: Person }[];
  relatedEvents: { id: number; type: string; people: { id: number }[] }[];
}

interface NodeStore {
  people: Person[];
  fetchPeople: () => Promise<void>;
}

const useNodeStore = create<NodeStore>()(
  devtools(
    persist(
      (set) => ({
        people: [],
        fetchPeople: async () => {
          try {
            const response = await axios.get("http://localhost:5000/family");
            set({ people: response.data });
          } catch (error) {
            console.error("Error fetching nodes:", error);
          }
        },
      }),
      { name: "node-store" }
    )
  )
);

export default useNodeStore;
