import React, { useState } from "react";
import nitLogo from "../assets/nitjlogo.png";

export default function Navbar({ page, setPage, user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const tabStyle = (tab) =>
    `px-4 py-2 rounded-md font-semibold cursor-pointer w-full md:w-auto text-center ${
      page === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  const handleLogout = () => {
    setUser(null);
    setPage("login");
    setMenuOpen(false);
  };

  const isLibrarian = user?.name?.toLowerCase() === "librarian";

  return (
    <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
      
      {/* LOGO */}
      <div className="flex items-center">
        <img src={nitLogo} alt="NITJ Logo" className="h-12 w-auto" />
      </div>

      {/* HAMBURGER (mobile only) */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-6 h-1 bg-gray-700"></span>
        <span className="w-6 h-1 bg-gray-700"></span>
        <span className="w-6 h-1 bg-gray-700"></span>
      </button>

      {/* MENU (responsive) */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full md:w-auto md:flex md:items-center mt-4 md:mt-0`}
      >
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">

          <button
            className={tabStyle("login")}
            onClick={() => {
              setPage("login");
              setMenuOpen(false);
            }}
          >
            Login
          </button>

          <button
            className={tabStyle("availability")}
            onClick={() => {
              setPage("availability");
              setMenuOpen(false);
            }}
          >
            Availability
          </button>

          <button
            className={tabStyle("booking")}
            onClick={() => {
              setPage("booking");
              setMenuOpen(false);
            }}
          >
            Booking
          </button>

          <button
            className={tabStyle("oops")}
            onClick={() => {
              setPage("oops");
              setMenuOpen(false);
            }}
          >
            OOPS Concepts
          </button>

          {/* CONDITIONAL TABS */}
          {user && !isLibrarian && (
            <button
              className={tabStyle("myseats")}
              onClick={() => {
                setPage("myseats");
                setMenuOpen(false);
              }}
            >
              My Seats
            </button>
          )}

          {user && isLibrarian && (
            <button
              className={tabStyle("librarian")}
              onClick={() => {
                setPage("librarian");
                setMenuOpen(false);
              }}
            >
              Librarian
            </button>
          )}
        </div>

        {/* WELCOME + LOGOUT (mobile inside menu, desktop right) */}
        <div className="md:hidden mt-4">
          {user && (
            <div className="flex flex-col gap-2 items-start font-semibold">
              Welcome, {user.name}
              <button onClick={handleLogout} className="text-red-500 underline">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE (desktop only) */}
      <div className="hidden md:flex items-center">
        {user && (
          <span className="font-semibold flex items-center gap-2">
            Welcome, {user.name}
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
