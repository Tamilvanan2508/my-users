import React from "react";

const CommonPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex justify-center mt-4">
      <button
        className="mx-2 px-4 py-2 border rounded-full bg-gray-200 text-gray-700"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`mx-2 px-4 py-2 border rounded-full ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="mx-2 px-4 py-2 border rounded-full bg-gray-200 text-gray-700"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default CommonPagination;
