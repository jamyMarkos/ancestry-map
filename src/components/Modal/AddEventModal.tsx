"use client";
import { FC, Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarMinus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TiLocationOutline } from "react-icons/ti";
import Dropdown from "@/ui-kits/Dropdown";
import Input from "@/ui-kits/Input";
import { globalStore } from "@/stores/global-store";
import axios from "axios";

const optionsEvent = [
  { label: "Marriage", value: "marriage" },
  { label: "Death", value: "death" },
];

const optionsGender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Transgender", value: "transgender" },
];

const AddEventModal: FC = () => {
  const [values, setValues] = useState({
    firstNameSpouse: "",
    secondNameSpouse: "",
    marriagePlace: "",
    gender: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedGender, setSelectedGender] = useState<any>(null);
  const { addEventModal, setAddEventeModal } = globalStore();
  const { push } = useRouter();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { newPersonId, setNewPersonId, selectedPersonId } = globalStore();

  const eventData = {
    id: Math.floor(Math.random() * (100000000 - 999999) + 999999),
    userId: "user_3gTTZQ6YXa",
    type: selectedEvent?.value,
    eventDate: startDate.toISOString(),
    details: null,
    marriageId: null,
    location: values.marriagePlace,
    personId: selectedPersonId ? Number(selectedPersonId) : newPersonId,
    marriage:
      selectedEvent?.value === "marriage"
        ? {
            id: Math.floor(Math.random() * (100000000 - 999999) + 999999),
            personId: selectedPersonId ? Number(selectedPersonId) : newPersonId,
            spouseId: null,
            status: "married",
            people: [
              {
                id: Math.floor(Math.random() * (100000000 - 999999) + 999999),
                firstName: values.firstNameSpouse,
                lastName: values.secondNameSpouse,
                gender: selectedGender?.value,
              },
            ],
          }
        : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/events", eventData);
      setAddEventeModal(false);
    } catch (error) {
      console.log("Error adding event:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Fragment>
      <ReactModal
        className="font-pathway mobile:w-[380px] w-72 m-auto md:h-[calc(100vh-237px)] h-[calc(100vh-64px)] overflow-auto z-50 absolute md:top-[237px] top-16 border-l border-[#E2E8F0] right-[0%] bg-white p-0 opacity-100 focus:outline-none overflow-y-auto"
        isOpen={addEventModal}
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
        onAfterClose={() => (document.body.style.overflow = "unset")}
      >
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between gap-2">
          <h2 className="text-lg text-black text-opacity-80 font-semibold">
            Add life event
          </h2>
          <div
            className="cursor-pointer"
            onClick={() => setAddEventeModal(false)}
          >
            <RxCross2 className="w-5 h-5" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-5">
            <div className="w-full">
              <p className="text-sm text-black text-opacity-75 font-medium pb-2">
                Event type
              </p>
              <Dropdown
                options={optionsEvent}
                value={selectedEvent}
                onChange={setSelectedEvent}
              />
            </div>
            <div className="w-full">
              <Input
                type="text"
                name="firstNameSpouse"
                id="firstNameSpouse"
                labelText="First name of spouse"
                resStyle="h-11"
                onChange={handleInputChange}
                value={values.firstNameSpouse}
              />
              <p className="text-[#C0C2D4] text-xs font-medium pt-2">
                As it appears on birth certificate.
              </p>
            </div>
            <div className="w-full">
              <Input
                type="text"
                name="secondNameSpouse"
                id="secondNameSpouse"
                labelText="Second name of spouse"
                onChange={handleInputChange}
                value={values.secondNameSpouse}
              />
              <p className="text-[#C0C2D4] text-xs font-medium pt-2">
                As it appears on birth certificate.
              </p>
            </div>
            <div className="w-full">
              <p className="text-sm text-black text-opacity-75 font-medium pb-2">
                Gender
              </p>
              <Dropdown
                options={optionsGender}
                value={selectedGender}
                onChange={setSelectedGender}
              />
              <p className="text-[#C0C2D4] text-xs font-medium pt-2">
                As it appears on birth certificate.
              </p>
            </div>
            <div className="w-full relative calender">
              <p className="text-sm text-black text-opacity-75 font-medium pb-2">
                Date of marriage
              </p>
              <FaRegCalendarMinus className="absolute left-3 top-10 text-[#ABADC6] w-[18px] h-[18px]" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                className="w-full bg-transparent pl-10 h-11 focus:border-black border border-[#E2E8F0] rounded-md"
              />
            </div>
            <div className="w-full relative">
              <TiLocationOutline className="absolute left-3 top-10 text-[#ABADC6] w-[22px] h-[22px]" />
              <Input
                type="text"
                name="marriagePlace"
                id="marriagePlace"
                labelText="Place of marriage"
                resStyle="!pl-10"
                onChange={handleInputChange}
                value={values.marriagePlace}
              />
            </div>
          </div>
          <div className="border-b border-[#E2E8F0]" />
          <div className="flex items-center gap-3 justify-end my-3 px-5">
            <button
              type="button"
              className="border border-[#E2E8F0] text-sm font-medium text-black text-opacity-75 py-2 w-20 rounded-md"
              onClick={() => setAddEventeModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black border border-[#E2E8F0] text-sm font-medium text-white py-2 w-20 rounded-md"
              onClick={() => push("/detail-page")}
            >
              Save
            </button>
          </div>
        </form>
      </ReactModal>
    </Fragment>
  );
};

export default AddEventModal;
