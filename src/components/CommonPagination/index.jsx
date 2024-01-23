import React from "react";

const CommonPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const Button = ({ onClick, disabled, children, additionalStyles = "" }) => (
    <button
      className={`${"mx-2 px-4 py-2 border rounded-full bg-gray-200"} ${additionalStyles} ${
        disabled ? "text-gray-500 cursor-not-allowed" : "text-gray-700"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );

  return (
    <div className="flex justify-center mt-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </Button>
      {pageNumbers.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          additionalStyles={
            currentPage === page ? "bg-purple-500 text-white" : ""
          }
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </Button>
    </div>
  );
};

export default CommonPagination;
