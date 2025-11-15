import React, { useState } from "react";

export default function LoginPage({ setPage, setUser }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://optireservenserver.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rollNo, branch }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Server error");
        return;
      }

      let userData = data.user;

      // Librarian shortcut login
      if (name.trim().toLowerCase() === "librarian") {
        userData = { name: "librarian", rollNo, branch };
      }

      setUser(userData);

      if (userData.name.toLowerCase() === "librarian") {
        setPage("librarian");
      } else {
        setPage("myseats");
      }
    } catch (err) {
      console.error(err);
      setError("Server error: could not connect");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center px-4 py-10">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 md:p-10 animate-fadeIn">
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-blue-700">
          Welcome to Lib Booking System
        </h1>

        {error && (
          <p className="text-red-600 mb-3 text-center text-sm font-medium">
            {error}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            {["ICE", "ECE", "CSE", "DSE", "CHE", "CE", "BE", "TE", "IT", "VLSI"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
