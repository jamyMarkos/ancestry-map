"use client";

import React, { FC, useState } from "react";
import { usePathname } from "next/navigation";
import LinkTag from "@/ui-kits/LinkTag";
import { applicationData } from "@/shared/config";
import { FaPlus } from "react-icons/fa";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

interface SidebarProps {
  resStyle?: string;
  isMobileOpen?: boolean;
  setIsMobileOpen?: any;
  isOpen?: boolean;
  setIsOpen?: any;
}

const LeftSidebar: FC<SidebarProps> = ({
  resStyle,
  isMobileOpen,
  setIsMobileOpen,
  isOpen,
  setIsOpen,
}) => {
  const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState(true);
  const pathname = usePathname();

  const toggleSubMenu = (index: number) => {
    if (activeMenuItem === index) {
      setActiveMenuItem(null);
    } else {
      setActiveMenuItem(index);
    }
  };
  const handleActive = (link: string) => {
    if (pathname == "/Application/" && link == "#") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div
        className={`md:h-fit h-full inline-flex absolute md:relative left-0 top-0 z-50 md:z-0 ${resStyle}`}
      >
        <div
          className={`h-full md:h-[calc(100vh-72px)] overflow-y-auto thinScroll  bg-[#F8FAFC] flex-1 border-r border-borderBottomHeader
          ${isOpen ? "md:w-28" : "md:w-72"}
          ${!isMobileOpen ? "w-0" : "w-72"}
             transition-all duration-300 ease-in-out relative`}
        >
          <div
            className="cursor-pointer flex justify-end mt-5 mr-5"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsMobileOpen(!isMobileOpen);
            }}
          >
            <HiChevronDoubleLeft className="size-8 text-gray-500" />
          </div>

          <div
            className={`flex flex-col justify-start transition-all duration-300 ease-in-out ${
              isOpen ? "md:px-4 px-1" : "md:px-4 px-1"
            }`}
          >
            <ul>
              {applicationData.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    pathname === item?.link || handleActive(item?.link)
                      ? "bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl my-1"
                      : "last:mt-1"
                  } ${item.text === "Orders" ? "mb-40" : ""}`}
                >
                  <LinkTag
                    path={item.link}
                    resStyle="flex gap-3 items-center h-12 bg-transparent transition-all duration-200 ease-in hover:bg-[#F1F5F9] border border-transparent hover:border-[#E2E8F0] rounded-xl px-5"
                    onClick={() => {
                      if (item.link) {
                        toggleSubMenu(index);
                      }
                      if (item.link === "#" && window.innerWidth <= 767) {
                        setIsMobileOpen(true);
                      } else {
                        setIsMobileOpen(false);
                      }
                      setOpenSubMenu(!openSubMenu);
                    }}
                  >
                    <img
                      className="min-w-6 max-w-6 h-5"
                      src={item.icon}
                      alt="icon"
                    />
                    <div className="w-full flex items-center justify-between">
                      <p
                        className={`text-gray-600 font-medium text-sm font-pathway pr-4 md:${
                          isOpen ? "hidden" : "block"
                        }  ${isOpen ? "block" : "block"}`}
                      >
                        {item.text}
                      </p>
                      {item.subMenu && (
                        <div>
                          {openSubMenu ? (
                            <RiArrowDropUpLine
                              className={`text-gray-600 ${
                                !isOpen ? "w-9 h-9" : ""
                              }`}
                            />
                          ) : (
                            <RiArrowDropDownLine
                              className={`text-gray-600 ${
                                !isOpen ? "w-9 h-9" : ""
                              }`}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </LinkTag>
                  {item.subMenu && index === activeMenuItem ? null : (
                    <ul className="flex flex-col gap-5">
                      {item?.subMenu?.map((subItem: any, subIndex: number) => (
                        <li
                          key={subIndex}
                          className="last:border-b last:border-[#E2E8F0] last:pb-5 last:mb-2"
                        >
                          <div className="flex items-center gap-4 hover:bg-[#F1F5F9] border border-transparent hover:border-[#E2E8F0] rounded-xl py-2 px-5">
                            <div className="w-4 h-4">
                              <img
                                className="min-w-4 max-w-4 h-4"
                                src={subItem.subIcon}
                                alt="icon"
                              />
                            </div>
                            <div className="flex flex-col gap-0 cursor-pointer">
                              <p
                                className={`text-gray-500 font-medium text-sm font-pathway pr-4 md:${
                                  isOpen ? "hidden" : "block"
                                }  ${isOpen ? "block" : "block"}`}
                              >
                                {subItem.subText}
                              </p>
                              <p
                                className={`text-gray-400 font-medium text-xs font-pathway md:${
                                  isOpen ? "hidden" : "block"
                                }  ${isOpen ? "block" : "block"}`}
                              >
                                {subItem.subTextDesc}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
