import React from "react";

const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  onBlur,
  styled,
}) => {
  return (
    <div className="flex-col  w-full flex gap-5">
      <input
        placeholder={placeholder}
        name={name}
        className={`outline-none text-[#979DAA] px-5 py-3 bg-[#303030] rounded-md shadow-md ${styled}  `}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
