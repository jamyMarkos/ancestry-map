import React, { Fragment } from "react";
import { Handle, Position } from "@xyflow/react";
import { useRouter } from "next/navigation";
import AddPeople from "@/components/People/AddPeople";

function AddParentNode() {
  const router = useRouter();
  return (
    <Fragment>
      <div className="">
        <div className="block p-0.5 line">
          <div className="flex rounded bg-white w-44 h-12">
            <AddPeople
              onClick={() => router.push("/add-People")}
              title="Add People"
            />
            <AddPeople
              onClick={() => router.push("/add-People")}
              title="Add People"
            />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Fragment>
  );
}

export default AddParentNode;
