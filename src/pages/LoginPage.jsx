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
      const res = await fetch("https://optireserveserver.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rollNo, branch }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Server error");
        return;
      }

      // ✅ Successful login
      let userData = data.user;

      // Force librarian role if name typed is "librarian"
      if (name.trim().toLowerCase() === "librarian") {
        userData = { name: "librarian", rollNo: rollNo, branch: branch };
      }

      setUser(userData);

      // Redirect based on role
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
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white drop-shadow-md">
        Welcome to Lib Booking System
      </h1>

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            {["ICE","ECE","CSE","DSE","CHE","CE","BE","TE","IT","VLSI"].map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
