"use client";

import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface HeaderProps {
  isMobileOpen?: boolean;
  setIsMobileOpen?: any;
}

const Header: React.FC<HeaderProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  return (
    <div className="bg-[#F8FAFC] shadow-md md:h-[72px] h-16 flex items-center justify-between gap-5 md:px-7 px-4 border-b border-borderBottomHeader z-30">
      <div className="flex items-center md:gap-4 gap-2">
        <div
          className="md:hidden block cursor-pointer"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <RxHamburgerMenu className="text-gray-400 w-6 h-6" />
        </div>
        <h1 className="text-xl sm:text-3xl text-black font-semibold">
          AncestryPass
        </h1>
      </div>

      <div className="flex items-center md:gap-5 gap-3">
        <div className="flex items-center md:gap-5 gap-3 relative">
          <img
            src="/images/profileImg.svg"
            className="sm:w-12 w-10 sm:h-12 h-10"
            alt="Profile"
            onClick={() => setIsOpenProfile(!isOpenProfile)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
