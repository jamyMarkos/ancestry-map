"use client";
import PageHeader from "@/components/Header/DynamicHeader";
import FamilyDetails from "@/components/SavedDataSection/FamilyDetails";
import EventDetailFlow from "@/reactflow/eventDetail";
import "@xyflow/react/dist/style.css";
import { FaPlus } from "react-icons/fa";
export default function EventDetail() {
  const handleAddEvent = () => {
    console.log("Back Event clicked");
  };
  const handleBackClick = () => {
    console.log("Back arrow clicked");
  };
  return (
    <>
      <PageHeader
        backArrow={true}
        onBackClick={handleBackClick}
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
          label: "Add life event",
          icon: <FaPlus className="text-gray-500 sm:size-4 size-3" />,
          onClick: handleAddEvent,
        }}
      />
      <div className="w-full h-[calc(100vh-72px)] p-5 flex gap-5">
        <div className="w-[calc(100%-264px)]">
          <EventDetailFlow />
        </div>
        <FamilyDetails />
      </div>
    </>
  );
}
