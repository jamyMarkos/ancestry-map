"use client";
import PageHeader from "@/components/Header/DynamicHeader";
import AddParentModal from "@/components/Modal/AddParentModal";
import AddPeopleFlow from "@/reactflow/addPeople";
import { globalStore } from "@/stores/global-store";
import "@xyflow/react/dist/style.css";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function AddPeople() {
  const { push } = useRouter();
  const { addPeopleModal, setAddPeopleModal } = globalStore();
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
        <AddPeopleFlow />
        {addPeopleModal && <AddParentModal />}
      </div>
    </>
  );
}
