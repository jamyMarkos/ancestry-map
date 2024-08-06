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
import { peopleStore } from "@/stores/people-store";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Transgender", value: "transgender" },
];

const AddChildModal: FC = () => {
  const {
    addChildModal,
    setAddChildModal,
    parentId,
    newPersonId,
    setNewPersonId,
  } = globalStore();
  const { peopleData, setPeopleData } = peopleStore();
  const router = useRouter();

  const [values, setValues] = useState({
    firstName: "",
    secondName: "",
    nickName: "",
    birthPlace: "",
  });
  // console.log("paaaaaaaaaarrrrreeeeeeeennnnnnnt", parentId);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const [selectedGender, setSelectedGender] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleGenderChange = (newValue: any) => {
    setSelectedGender(newValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tempId = Math.floor(Math.random() * (100000000 - 999999) + 999999);
    setNewPersonId(tempId);
    console.log(newPersonId);

    // Prepare the data to be sent
    const postData = {
      id: tempId,
      isUser: false,
      firstName: values.firstName,
      lastName: values.secondName,
      birthPlace: values.birthPlace,
      countryCode: "US",
      dob: startDate
        ? startDate.toISOString().slice(0, 19).replace("T", " ")
        : null, // Format the date
      gender: selectedGender ? selectedGender.value : null, // Get the selected gender value
      isAlive: true, // Assuming this is a static value
      parents: [], // Example parent IDs; modify as needed
    };

    try {
      // add the child to the people registry
      const response = await axios.post("/api/people", postData);

      // add the child to the family registry
      const res = await axios.post("/api/family", postData);

      // fetch the parent of the child
      const ress = await axios.get(`/api/family/${parentId}`);

      const result = await axios.patch(
        "/api/family/" + `${res.data?.result?.id}`,
        {
          parents: [{ parent: { ...ress?.data?.result } }],
        }
      );

      setAddChildModal(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Fragment>
      <ReactModal
        className="font-pathway mobile:w-[380px] w-72 m-auto md:h-[calc(100vh-237px)] h-[calc(100vh-64px)] overflow-auto z-50 absolute md:top-[237px] top-16 border-l border-[#E2E8F0] right-[0%] bg-white p-0 opacity-100 focus:outline-none overflow-y-auto"
        isOpen={addChildModal}
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
        onAfterClose={() => (document.body.style.overflow = "unset")}
      >
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between gap-2">
          <h2 className="text-lg text-black text-opacity-80 font-semibold">
            Birth - Add Child Modal
          </h2>
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <RxCross2 className="w-5 h-5" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-5">
            <Input
              type="text"
              name="firstName"
              id="firstName"
              labelText="First name"
              resStyle="h-11"
              onChange={handleInputChange}
              value={values.firstName}
            />
            <Input
              type="text"
              name="secondName"
              id="secondName"
              labelText="Second name"
              onChange={handleInputChange}
              value={values.secondName}
            />
            <Input
              type="text"
              name="nickName"
              id="nickName"
              labelText="Nickname (optional)"
              onChange={handleInputChange}
              value={values.nickName}
            />
            <div>
              <p className="text-sm text-black text-opacity-75 font-medium pb-2">
                Gender
              </p>
              <Dropdown
                options={genderOptions}
                value={selectedGender}
                onChange={handleGenderChange}
              />
            </div>
            <div className="relative calender">
              <p className="text-sm text-black text-opacity-75 font-medium pb-2">
                Date of birth
              </p>
              <FaRegCalendarMinus className="absolute left-3 top-10 text-[#ABADC6] w-[18px] h-[18px]" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                className="w-full bg-transparent pl-10 h-11 focus:border-black border border-[#E2E8F0] rounded-md"
              />
            </div>
            <div className="relative">
              <TiLocationOutline className="absolute left-3 top-10 text-[#ABADC6] w-[22px] h-[22px]" />
              <Input
                type="text"
                name="birthPlace"
                id="birthPlace"
                labelText="Place of birth"
                resStyle="!pl-10"
                onChange={handleInputChange}
                value={values.birthPlace}
              />
            </div>
          </div>
          <div className="border-b border-[#E2E8F0]" />
          <div className="flex items-center gap-3 justify-end my-3 px-5">
            <button
              onClick={() => setAddChildModal(false)}
              type="button"
              className="border border-[#E2E8F0] text-sm font-medium text-black text-opacity-75 py-2 w-20 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black border border-[#E2E8F0] text-sm font-medium text-white py-2 w-20 rounded-md"
              onClick={() => router.push("/people-detail")}
            >
              Save
            </button>
          </div>
        </form>
      </ReactModal>
    </Fragment>
  );
};

export default AddChildModal;