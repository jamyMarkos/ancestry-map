"use client";
import React, { Fragment, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import moment from "moment";
import { IoMdAdd } from "react-icons/io";
import AddEventModal from "@/components/Modal/AddEventModal";
import { globalStore } from "@/stores/global-store";
import { peopleStore } from "@/stores/people-store";
import axios from "axios";

const AddTree = () => {
    const { addEventModal, setAddEventeModal } = globalStore();
    const { eventData, setEventeData } = peopleStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/people/allEvent-data.json');
                setEventeData(response);
            } catch (err) {
                console.log("Error:", err);
            }
        };
        fetchData();
    }, [setEventeData]);

    return (
        <Fragment>
            <div className="birth-container">
                {eventData?.data?.map((event: any, index: number) => (
                    <div
                        key={index}
                        className="flex justify-between border border-birthborder rounded bg-white w-32 birth-line py-1 px-2 h-8"
                    >
                        <div className="block py-1 px-2 left-content">
                            <span className="block text-birthtext text-6">
                                {moment(event?.date).format("DD/MM/YYYY")}
                            </span>
                            <span className="block text-birthtext text-6">
                                {event?.place}
                            </span>
                        </div>
                        <div className="block">
                            <span className="block text-birthtext font-semibold text-8">
                                {event?.type}
                            </span>
                            {event?.type === "Birth" && (
                                <span className="block text-birthtext text-6">{`${event?.firstName} ${event.lastName}`}</span>
                            )}
                            {event?.type === "marriage" && (
                                <span className="block text-birthtext text-6">{`To ${event?.marriage?.spouse?.firstName} ${event.marriage?.spouse?.lastName}`}</span>
                            )}
                        </div>
                        <div></div>
                        <div className="text-7 pt-1">
                            <LuPencil />
                        </div>
                    </div>
                ))}
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
};

export default AddTree;
