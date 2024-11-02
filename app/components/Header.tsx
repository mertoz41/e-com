import React from "react";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Buttons Section */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
            <button className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Sign Up
            </button>
          </div>

          {/* Logo Section */}
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://yourlogo.com/logo.png"
                alt="Company Logo"
              />
            </a>
          </div>

          {/* Search Box */}
          <div className="flex-1 flex items-center justify-end">
            <div className="w-full max-w-lg">
              <input
                type="text"
                className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
