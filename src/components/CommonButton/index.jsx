import React from "react";

const CommonButton = (props) => {
  const { label, onClick } = props;

  return (
    <button
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CommonButton;
