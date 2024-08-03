import React, { Fragment } from "react";
import { Handle, Position } from "@xyflow/react";
import { useRouter } from "next/navigation";
import AddPeople from "@/components/People/AddPeople";

function AddParentNode(props: any) {
  console.log("inside parent node");
  const router = useRouter();
  return (
    <Fragment>
      <div className="">
        <div className="block p-0.5 line">
          <div className="flex rounded bg-white w-44 h-12">
            <AddPeople
              onClick={() => router.push("/add-People")}
              title={props.data.title}
              childId={props.data.childId}
            />
            <AddPeople
              onClick={() => router.push("/add-People")}
              title={props.data.title}
              childId={props.data.childId}
            />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Fragment>
  );
}

export default AddParentNode;
