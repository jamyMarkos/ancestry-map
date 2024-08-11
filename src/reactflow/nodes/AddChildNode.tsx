import AddPeople from "@/components/People/AddPeople";
import { Handle, Position } from "@xyflow/react";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { MdAdd } from "react-icons/md";
import { globalStore } from "@/stores/global-store";
function AddChildNode(props: any) {
  const router = useRouter();
  const {
    setParentId,
    addChildModal,
    setAddChildModal,
    isAddSpouseModalOpen,
    addPeopleModal,
    setIsAddSpouseModalOpen,
    setAddPeopleModal,
  } = globalStore();

  const handleClick = () => {
    setParentId(props.data.parentId);
    router.push("/add-People");
    setAddPeopleModal(false);
    setIsAddSpouseModalOpen(false);
    setAddChildModal(true);
  };

  return (
    <Fragment>
      <Handle type="target" position={Position.Top} />
      <div className="" onClick={handleClick}>
        <div className="inline-block rounded-lg p-0.5">
          <div className="flex rounded bg-white  w-24 h-12">
            <div className="flex items-center px-3 py-3">
              <span className="text-nodetx text-10 px-0.5">
                <MdAdd />
              </span>
              <span className="text-nodetx text-center text-8">Add Child</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddChildNode;
