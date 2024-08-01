import { Handle, Position } from "@xyflow/react";
import React, { Fragment } from "react";
import { MdAdd } from "react-icons/md";
function AddChildNode() {
    return (
        <Fragment>
            <Handle type="target" position={Position.Top} />
            <div className="">
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