import React, { Fragment } from "react";
import Select, {
  StylesConfig,
  ControlProps,
  OptionProps,
  SingleValueProps,
  ActionMeta,
  MultiValue,
  SingleValue,
} from "react-select";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value?: Option;
  onChange?:
    | ((
        newValue: MultiValue<Option> | SingleValue<Option>,
        actionMeta: ActionMeta<Option>
      ) => void)
    | undefined;
  errors?: string;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { options, value, onChange, errors } = props;

  const customStyles: StylesConfig<Option, boolean> = {
    control: (provided: any) => ({
      ...provided,
      minHeight: 44,
      maxHeight: 44,
      backgroundColor: "#fff",
      borderRadius: 6,
      outlineColor: "#E2E8F0",
      border: "1.25px solid #E2E8F0 !important",
      fontSize: 14,
      fontWeight: 500,
      color: "#424242",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      color: "#000",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#424242",
      padding: 2,
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#fff",
      overflow: "hidden",
      borderRadius: 6,
      marginTop: 2,
      border: "1px solid #E2E8F0",
      color: "#424242",
    }),
    option: (provided: any, state: OptionProps<Option>) => ({
      ...provided,
      color: state.isFocused ? "#424242" : "#424242",
      maxHeight: 24,
      fontSize: 14,
      padding: 0,
      textAlign: "center",
      backgroundColor: state.isFocused ? "#a9a9a9" : "#E2E8F0",
      wordBreak: "break-all",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      paddingRight: 0,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#424242",
      fontSize: 14,
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <Fragment>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={false}
        classNamePrefix="react-select"
        className="focus:outline-none outline-none"
        styles={customStyles}
      />
      {errors && (
        <div className="relative -bottom-1 pl-3 text-xs">
          <div className="text-red-600 flex items-center gap-2">
            <img src="/images/errorIcon.svg" className="w-4" />
            {errors}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dropdown;
