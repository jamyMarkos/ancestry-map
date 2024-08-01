import AddEventModal from "@/components/Modal/AddEventModal";
import { globalStore } from "@/stores/global-store";
import { peopleStore } from "@/stores/people-store";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
function AddBirthNode() {
  const { addEventModal, setAddEventeModal } = globalStore();
  const { peopleData } = peopleStore();
  console.log("peopleData", peopleData);

  return (
    <Fragment>
      <div className="flex justify-between border border-birthborder rounded bg-white w-32 birth-line px-2 py-1.5">
        <div className="block py-1 px-2 left-content">
          <span className="block text-birthtext text-6">
            {moment(peopleData?.dob).format("DD/MM/YYYY")}
          </span>
          <span className="block text-birthtext text-6">
            {peopleData?.birthPlace}
          </span>
        </div>
        <div className="block">
          <span className="block text-birthtext font-semibold text-8">
            Birth
          </span>
          <span className="block text-birthtext text-6">{`${peopleData?.firstName} ${peopleData?.lastName} (${peopleData?.gender})`}</span>
        </div>
        <div className="text-7 pt-1">
          <LuPencil />
        </div>
      </div>
      <div className="inline-block pb-2">
        <button
          onClick={() => setAddEventeModal(true)}
          className="flex items-center border border-birthborder rounded-sm bg-white text-7 py-1 px-1 font-medium w-full"
        >
          <span className="pr-0.5">
            <IoMdAdd />
          </span>{" "}
          Add life event
        </button>
      </div>
      {addEventModal && <AddEventModal />}
    </Fragment>
  );
}
export default AddBirthNode;
