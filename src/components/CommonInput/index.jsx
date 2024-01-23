import React from "react";

const CommonInput = (props) => {
  const {
    placeHolder = "",
    onChange,
    value = "",
    name = "",
    disabled = false,
    type = "text",
  } = props;

  return (
    <div>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-purple-300 text-black"
        placeholder={placeHolder}
        disabled={disabled}
        value={value}
        maxLength={100}
      />
    </div>
  );
};

export default CommonInput;
