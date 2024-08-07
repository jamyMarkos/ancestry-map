import React, { Fragment } from "react";
function BirthNode() {
  return (
    <Fragment>
      <div className="block border border-birthborder rounded bg-white w-32 birth-line">
        <div className="block py-1.5 px-2 text-birthtext font-semibold text-8">
          Birth
        </div>
      </div>
    </Fragment>
  );
}
export default BirthNode;
