import React from "react";
import nitLogo from "../assets/nitjlogo.png"; // NITJ Logo

export default function Navbar({ page, setPage, user, setUser }) {
  const tabStyle = (tab) =>
    `px-4 py-2 rounded-md font-semibold cursor-pointer ${
      page === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  const isLibrarian = user?.name?.toLowerCase() === "librarian";

  return (
    <div className="w-full bg-white shadow-md p-4 flex items-center justify-between flex-wrap">
      
      {/* LEFT: Logo */}
      <div className="flex items-center">
        <img src={nitLogo} alt="NITJ Logo" className="h-12 w-auto" />
      </div>

      {/* CENTER: Tabs */}
      <div className="flex gap-4 justify-center items-center flex-wrap mt-2 md:mt-0">
        <button className={tabStyle("login")} onClick={() => setPage("login")}>
          Login
        </button>

        <button
          className={tabStyle("availability")}
          onClick={() => setPage("availability")}
        >
          Availability
        </button>

        <button
          className={tabStyle("booking")}
          onClick={() => setPage("booking")}
        >
          Booking
        </button>

        <button
          className={tabStyle("oops")}
          onClick={() => setPage("oops")}
        >
          OOPS Concepts
        </button>

        {/* Conditional tabs */}
        {user && !isLibrarian && (
          <button
            className={tabStyle("myseats")}
            onClick={() => setPage("myseats")}
          >
            My Seats
          </button>
        )}

        {user && isLibrarian && (
          <button
            className={tabStyle("librarian")}
            onClick={() => setPage("librarian")}
          >
            Librarian
          </button>
        )}
      </div>

      {/* RIGHT: Welcome + Logout */}
      <div className="flex items-center mt-2 md:mt-0">
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
