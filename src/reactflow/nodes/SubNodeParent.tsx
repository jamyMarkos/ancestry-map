import { Handle, Position } from "@xyflow/react";
import React, { useState, useEffect } from "react";
import DetailPeople from "@/components/People/DetailPeople";
import AddPeople from "@/components/People/AddPeople";
import { birthJsonData } from "@/components/jsonData";
import axios from "axios";

export type PersonNode = {
  id: number;
  firstName: string;
  lastName: string;
};

export const SubNodeParent = ({ firstName, lastName }: PersonNode) => {
  return (
    <div className="nodrag">
      <Handle type="target" position={Position.Top} />
      <div className="">
        <div className="block p-0.5 line">
          <div className="flex rounded bg-white w-44 h-12">
            <DetailPeople name={firstName + ` ` + lastName} place="USA" />
            {/* <AddPeople title="Add Spouse" /> */}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
