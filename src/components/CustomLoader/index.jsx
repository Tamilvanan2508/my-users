import React from "react";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid"></div>
    </div>
  );
};

export default CustomLoader;
