import { Handle, Position } from "@xyflow/react";
import React, { useState, useEffect } from "react";
import DetailPeople from "@/components/People/DetailPeople";
import AddPeople from "@/components/People/AddPeople";
import { birthJsonData } from "@/components/jsonData";
import axios from "axios";
import type { Node, NodeProps } from "@xyflow/react";

import { JSONDATA } from "../flowData/nodes-edges-tree";

export type PersonNodeData = {
  id: number;
  firstName: string;
  lastName: string;
  parents: PersonNode[];
  label: {};
};

export type PersonNode = Node<PersonNodeData>;

// const JSONDATA = [
//   {
//     id: 12,
//     firstName: "You",
//     lastName: "",
//     parents: [
//       {
//         parent: {
//           id: 14,
//           firstName: "Jay",
//           lastName: "Pritchett",
//         },
//       },
//       {
//         parent: {
//           id: 1457,
//           firstName: "Akilas",
//           lastName: "Pritchett",
//         },
//       },
//     ],
//   },
//   {
//     id: 1457,
//     firstName: "Akilas",
//     lastName: "Pritchett",
//     parents: [],
//   },
//   {
//     id: 13,
//     firstName: "Frank",
//     lastName: "Pritchett",
//     parents: [],
//   },
//   {
//     id: 14,
//     firstName: "Jay",
//     lastName: "Pritchett",
//     parents: [
//       {
//         parent: {
//           id: 13,
//           firstName: "Frank",
//           lastName: "Pritchett",
//         },
//       },
//       {
//         parent: {
//           id: 15,
//           firstName: "Mary",
//           lastName: "Pritchett",
//         },
//       },
//     ],
//   },
//   {
//     id: 15,
//     firstName: "Mary",
//     lastName: "Pritchett",
//     parents: [],
//   },
// ];

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
  // const person = JSONDATA.find((p) => p.id === data.id);
  // const spouse = person ? JSONDATA.find((p) => p.id === person.spouseId) : null;

  console.log("Data 1 2", data);

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
              <AddPeople title="Add Spouse" />
            )}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SubNodeParent;
