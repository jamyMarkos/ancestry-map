import { Handle, Position } from "@xyflow/react";
import React, { useState, useEffect } from "react";
import DetailPeople from "@/components/People/DetailPeople";
import AddPeople from "@/components/People/AddPeople";
import { birthJsonData } from "@/components/jsonData";
import axios from "axios";
import type { Node, NodeProps } from "@xyflow/react";
import useNodeStore from "@/stores/node-store";
import { globalStore } from "@/stores/global-store";
import { useRouter } from "next/navigation";

export type PersonNodeData = {
  id: number;
  firstName: string;
  lastName: string;
  parents: PersonNode[];
  label: {};
};

export type PersonNode = Node<PersonNodeData>;

type Parent = {
  id: number;
  firstName: string;
  lastName: string;
};

type ParentWrapper = {
  parent: Parent;
};

// Define a type for a person
type Person = {
  id: number;
  firstName: string;
  lastName: string;
  parents: ParentWrapper[];
};

interface SubNodeParentData {
  label: string;
  personId: number;
  spouse: string;
  spouseId: number;
}

const SubNodeParent = ({ data }: any) => {
  const router = useRouter();
  const { people } = useNodeStore();
  const personId = data.personId;

  const {
    spouseId,
    setSpouseId,
    isAddSpouseModalOpen,
    setIsAddSpouseModalOpen,
    childId,
    setChildId,
    addChildModal,
    setAddChildModal,
    addPeopleModal,
    setAddPeopleModal,
  } = globalStore();

  const findCountryCodeById = (people: any, personId: number) => {
    const person = people.find((p: any) => String(p.id) === String(personId));
    return person ? person.countryCode : "Unknown";
  };

  // Get the country codes
  const personCountryCode = findCountryCodeById(people, personId);
  const spouseCountryCode = findCountryCodeById(people, data.spouseId);

  const person = people.find((p: any) => String(p.id) === String(personId));

  const handleSpouseClick = () => {
    setSpouseId(data.personId);

    router.push("/add-People");
    setAddChildModal(false);

    // setChildId(childId);
    setAddPeopleModal(false);
    setIsAddSpouseModalOpen(true);
    console.log(
      "objectsss",
      isAddSpouseModalOpen,
      addChildModal,
      addPeopleModal
    );
  };

  return (
    <div className="nodrag">
      <Handle type="target" position={Position.Top} />
      <div className="">
        <div className="block p-0.5 line">
          <div className="flex rounded bg-white w-44 h-12">
            {/* Render based on gender */}

            {person?.gender === "male" ? (
              <>
                <DetailPeople
                  name={data?.label + ` `}
                  place="USA"
                  personId={data?.personId}
                  countryCode={personCountryCode}
                />
                {data?.spouse ? (
                  <DetailPeople
                    name={data?.spouse + ` `}
                    place="ETHIOPIA"
                    personId={data?.spouseId}
                    countryCode={spouseCountryCode}
                  />
                ) : (
                  <AddPeople title="Add spouse" onClick={handleSpouseClick} />
                )}
              </>
            ) : (
              <>
                {data?.spouse ? (
                  <DetailPeople
                    name={data?.spouse + ` `}
                    place="ETHIOPIA"
                    personId={data?.spouseId}
                    countryCode={spouseCountryCode}
                  />
                ) : (
                  <AddPeople title="Add spouse" onClick={handleSpouseClick} />
                )}
                <DetailPeople
                  name={data?.label + ` `}
                  place="USA"
                  personId={data?.personId}
                  countryCode={personCountryCode}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SubNodeParent;
