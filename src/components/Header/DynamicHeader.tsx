import React from "react";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";

interface BaseProps {
  pageName?: string;
  backArrow?: boolean;
  onBackClick?: () => void;
  subHeading?: string;
  heading?: string;
  breadcrumb?: {
    icon: string;
    label: string;
  }[];
  primaryAction?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
}

interface WithBackArrow extends BaseProps {
  backArrow: true;
  onBackClick: () => void;
}

interface WithoutBackArrow extends BaseProps {
  backArrow?: false;
  onBackClick?: never;
}

type PageHeaderProps = WithBackArrow | WithoutBackArrow;

const PageHeader: React.FC<PageHeaderProps> = ({
  backArrow,
  subHeading,
  heading,
  breadcrumb,
  primaryAction,
  onBackClick,
}) => {
  const calculateHeight = () => {
    return breadcrumb ? "mobile:h-[173px]" : "mt-0";
  };
  return (
    <div
      className={`w-full bg-white border-b border-[#E2E8F0] py-5 px-5 ${calculateHeight} h-auto sticky top-0 z-20`}
    >
      {/* Breadcrumbs */}
      {breadcrumb && (
        <div className="flex items-center gap-3 sm:pt-3">
          {breadcrumb.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index === 0 &&
                crumb.icon && ( // Check if it's the first item and there's an icon
                  <img
                    src={crumb.icon}
                    className="w-5 h-5"
                    alt="Breadcrumb Icon"
                  />
                )}
              <h4
                className={`text-13 font-semibold ${
                  index === 0 ? "text-gray-500" : "text-[#1E293B]"
                }`}
              >
                {crumb.label}
              </h4>
              {index < breadcrumb.length - 1 && (
                <FaChevronRight className="w-3 h-3 text-gray-500" />
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className={`${
          breadcrumb ? "mt-8" : ""
        } mobile:flex items-center justify-between block`}
      >
        <div>
          <div className="flex items-center gap-4 pb-1">
            {backArrow && (
              <div className="cursor-pointer" onClick={onBackClick}>
                <FaArrowLeft className="text-xl text-black text-opacity-75" />
              </div>
            )}
            {heading && (
              <h1 className="sm:text-3xl text-xl text-black text-opacity-75 font-semibold">
                {heading}
              </h1>
            )}
          </div>
          {subHeading && (
            <h1 className="sm:text-xl text-lg text-gray-500 font-medium ml-9">
              {subHeading}
            </h1>
          )}
        </div>
        {primaryAction && (
          <div
            onClick={primaryAction.onClick}
            className="mobile:w-fit mt-4 sm:mt-0 ml-9 sm:ml-0 flex justify-center gap-2 items-center border border-gray-500 rounded-md px-3 py-3 cursor-pointer"
          >
            {primaryAction.icon}
            <span className="sm:text-sm text-xs text-black text-opacity-75 font-semibold">
              {primaryAction.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
