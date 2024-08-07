import React, { Fragment } from "react";
import { Handle, Position } from "@xyflow/react";
import { useRouter } from "next/navigation";
import AddPeople from "@/components/People/AddPeople";
import { globalStore } from "@/stores/global-store";

function AddParentNode(props: any) {
  const router = useRouter();
  const { setChildId, addPeopleModal, setAddPeopleModal } = globalStore();

  const handleAddPeopleClick = () => {
    setChildId(props.data.childId);
    console.log("data", props.data, props.data.childId);
    router.push("/add-People");
    setAddPeopleModal(!addPeopleModal);
  };

  return (
    <Fragment>
      <div className="">
        <div className="block p-0.5 line">
          <div className="flex rounded bg-white w-44 h-12">
            <AddPeople
              onClick={handleAddPeopleClick}
              title={props.data.title}
              childId={props.data.childId}
              leftOrRight={0}
            />
            <AddPeople
              onClick={handleAddPeopleClick}
              title={props.data.title}
              childId={props.data.childId}
              leftOrRight={1}
            />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Fragment>
  );
}

export default AddParentNode;
