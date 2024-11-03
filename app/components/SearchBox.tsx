import React from "react";

function SearchBox() {
  return (
    <div className="flex items-center ml-6 max-w-md mx-auto w-80 shadow-md  overflow-hidden transition-all duration-300 ease-in-out transform focus-within:scale-105 ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-6 py-2 text-gray-700  focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-green-500"
      />
      <button className="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-gray-700"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchBox;
