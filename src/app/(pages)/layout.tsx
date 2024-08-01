"use client";

import Header from "@/components/Layout/Header";
import LeftSidebar from "@/components/Layout/LeftSidebar";
import { useState, ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`bg-bgBody ${
        isMobileOpen ? "h-screen overflow-y-hidden" : "overflow-y-auto"
      }`}
    >
      <div className="md:h-[72px] h-16">
        <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      </div>
      <div className="h-[calc(100vh-72px)] overflow-y-auto flex flex-col">
        <div className="w-full flex flex-1">
          <LeftSidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
          <div
            className={`${
              !isOpen ? "md:w-[calc(100%-288px)] w-full" : "w-full"
            } transition-all duration-300 ease-in-out`}
          >
            <div className="md:h-[calc(100vh-72px)] overflow-y-auto thinScroll">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
