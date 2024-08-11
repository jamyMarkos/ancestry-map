"use client";
import PageHeader from "@/components/Header/DynamicHeader";
import AddParentModal from "@/components/Modal/AddParentModal";
import AddChildModal from "@/components/Modal/AddChildModal";
import AddPeopleFlow from "@/reactflow/addPeople";
import { globalStore } from "@/stores/global-store";
import "@xyflow/react/dist/style.css";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import AddSpouseModal from "@/components/Modal/AddSpouseModal";

export default function AddPeople() {
  const { push } = useRouter();
  const {
    addPeopleModal,
    setAddPeopleModal,
    childId,
    addChildModal,
    setAddChildModal,
    nodeSelectedId,
    isAddSpouseModalOpen,
    spouseId,
  } = globalStore();

  console.log(
    "why is object",
    addPeopleModal,
    addChildModal,
    isAddSpouseModalOpen
  );

  return (
    <>
      <PageHeader
        backArrow={true}
        onBackClick={() => push("/")}
        heading="New Family Member"
        subHeading="Grandparent"
        breadcrumb={[
          {
            icon: "./images/family.svg",
            label: "Family",
          },
          {
            icon: "./images/family.svg",
            label: "New Family Member",
          },
        ]}
        primaryAction={{
          label: "Add People",
          icon: <FaPlus className="text-gray-500 sm:size-4 size-3" />,
          onClick: () => setAddPeopleModal(!addPeopleModal),
        }}
      />

      <div className="w-full h-[calc(100vh-72px)] p-5">
        {addPeopleModal && <AddParentModal childId={childId} />}
        {addChildModal && <AddChildModal />}
        {isAddSpouseModalOpen && <AddSpouseModal spouseId={spouseId} />}
      </div>
    </>
  );
}
