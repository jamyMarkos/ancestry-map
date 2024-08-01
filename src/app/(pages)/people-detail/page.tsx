"use client";
import PageHeader from "@/components/Header/DynamicHeader";
import PeopleDetailFlow from "@/reactflow/peopleDetail";
import { peopleStore } from "@/stores/people-store";
import "@xyflow/react/dist/style.css";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function PeopleDetail() {
  const { push } = useRouter();

  const { peopleData } = peopleStore();
  console.log("peopleData", peopleData);
  const handleAddEvent = () => {
    console.log("Back Event clicked");
  };

  return (
    <>
      <PageHeader
        backArrow={true}
        onBackClick={() => push("/add-People")}
        heading={`${peopleData?.firstName || ""} ${peopleData?.lastName || ""}`}
        subHeading="Grandparent"
        breadcrumb={[
          {
            icon: "./images/family.svg",
            label: "Family",
          },
          {
            icon: "./images/family.svg",
            label: `${peopleData?.firstName || ""} ${
              peopleData?.lastName || ""
            } `,
          },
        ]}
        primaryAction={{
          label: "Add life event",
          icon: <FaPlus className="text-gray-500 sm:size-4 size-3" />,
          onClick: handleAddEvent,
        }}
      />

      <div className="w-full h-[calc(100vh-72px)] p-5">
        <PeopleDetailFlow />
      </div>
    </>
  );
}
