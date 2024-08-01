import { ChangeEvent, FC } from "react";

const Input: FC<{
  resStyle?: string;
  labelText?: string;
  type: string;
  placeholder?: string;
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  id?: string;
  maxLength?: number;
  onFocus?: void;
  onBlur?: void;
  errors?: string;
  touched?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  resStyle,
  labelText,
  type,
  placeholder,
  checked,
  name,
  disabled,
  readOnly,
  value,
  id,
  maxLength,
  onChange,
  errors,
  touched,
}) => {
  return (
    <div className="w-full">
      <p className="text-sm text-black text-opacity-75 font-medium pb-2">
        {labelText}
      </p>
      <input
        type={type}
        value={value}
        className={`font-medium w-full px-3 h-11 text-sm border focus:!border-black outline-none border-[#E2E8F0] placeholder:text-gray-400 text-black text-opacity-75 placeholder:text-sm rounded-md ${resStyle}`}
        placeholder={placeholder}
        checked={checked}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
        id={id}
        onChange={onChange}
      />
      {errors && touched && <div className="text-red-600 px-2">errors</div>}
    </div>
  );
};

export default Input;
