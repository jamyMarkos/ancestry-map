import { Handle, Position } from "@xyflow/react";
import React, { useState, useEffect } from "react";
import DetailPeople from "@/components/People/DetailPeople";
import AddPeople from "@/components/People/AddPeople";
import { birthJsonData } from "@/components/jsonData";
import axios from "axios";
import type { Node, NodeProps } from "@xyflow/react";

export type PersonNodeData = {
  id: number;
  firstName: string;
  lastName: string;
  parents: PersonNode[];
  label: {};
};

export type PersonNode = Node<PersonNodeData>;

type Parent = {
  id: number;
  firstName: string;
  lastName: string;
};

type ParentWrapper = {
  parent: Parent;
};

// Define a type for a person
type Person = {
  id: number;
  firstName: string;
  lastName: string;
  parents: ParentWrapper[];
};

const SubNodeParent = ({ data }: any) => {
  console.log("SubNodeParent data", data);

  return (
    <div className="nodrag">
      <Handle type="target" position={Position.Top} />
      <div className="">
        <div className="block p-0.5 line">
          <div className="flex rounded bg-white w-44 h-12">
            <DetailPeople name={data?.label + ` `} place="USA" />
            {data?.spouse ? (
              <DetailPeople name={data?.spouse + ` `} place="ETH" />
            ) : (
              <AddPeople title="Add spouse" />
            )}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SubNodeParent;
