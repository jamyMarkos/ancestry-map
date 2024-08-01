import { LinkProps } from "@/ts/interface/UIKitInterface";
import Link from "next/link";
import React from "react";

const LinkTag: React.FC<LinkProps> = (props) => {
  const { children, text, path, target, resStyle, onClick, id } = props;

  return (
    <>
      <Link
        href={path || ""}
        onClick={onClick}
        target={target}
        id={id}
        className={`cursor-pointer font-medium font-pathway ${resStyle}`}
      >
        {text}
        {children}
      </Link>
    </>
  );
};
export default LinkTag;
