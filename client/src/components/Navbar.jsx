import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <div className="flex justify-between border-b-1 border-b-blue-800 px-4 py-3 items-center sticky top-0">
        <h1 className="text-2xl text-blue-800 font-bold dark:text-blue-300">
          The Blog Network
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-5 text-xl items-center">
          <li>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `p-2 cursor-pointer dark:text-blue-300 hover:text-blue-800 hover:dark:text-blue-100 hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 text-blue-800 dark:text-blue-100" : ""
                }`
              }
            >
              Feed
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscriptions"
              className={({ isActive }) =>
                `p-2 cursor-pointer dark:text-blue-300 hover:text-blue-800 hover:dark:text-blue-100 hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 text-blue-800 dark:text-blue-100" : ""
                }`
              }
            >
              Subscriptions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `p-2 cursor-pointer dark:text-blue-300 hover:text-blue-800 hover:dark:text-blue-100 hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 text-blue-800 dark:text-blue-100" : ""
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="p-2 cursor-pointer text-blue-800 dark:text-blue-300 hover:text-red-600 hover:dark:text-blue-100 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div
          className="text-3xl md:hidden cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile Side Panel */}
      <div
        className={`fixed top-16 right-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col text-lg p-6 gap-4">
          <li className="cursor-pointer hover:text-blue-800 hover:bg-gray-100">
            Feed
          </li>
          <li className="cursor-pointer hover:text-blue-800 hover:bg-gray-100">
            Subscriptions
          </li>
          <li className="cursor-pointer hover:text-blue-800 hover:bg-gray-100">
            Profile
          </li>
          <li className="cursor-pointer hover:text-red-600 hover:bg-gray-100">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
