import { Handle, Position } from "@xyflow/react";
import React, { useState, useEffect } from "react";
import DetailPeople from "@/components/People/DetailPeople";
import AddPeople from "@/components/People/AddPeople";
import { birthJsonData } from "@/components/jsonData";
import axios from "axios";
export const SubNodeParent = () => {
  const [family, setFamily] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/family");
        console.log("responseeeeeeeeeeeeeee", response?.data);
        setFamily(response?.data);
        // console.log("axiosssssssssssss", response?.data[0]?.firstName);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="nodrag">
      <Handle type="target" position={Position.Top} />
      <div className="">
        <div className="block p-0.5 line">
          <div className="flex rounded bg-white w-44 h-12">
            <DetailPeople
              name={family[2]?.lastName + ` ` + family[2]?.firstName}
              place={family[2]?.birthPlace}
            />
            <AddPeople title="Add Spouse" />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
