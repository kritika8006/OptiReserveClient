import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function LibrarianDashboard() {
  const [seats, setSeats] = useState([]);
  const [activeTab, setActiveTab] = useState("table");

  // Fetch seats every 5 seconds
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await fetch("https://optireservenserver.onrender.com/api/seats");
        const data = await res.json();
        setSeats(data);
      } catch (err) {
        console.error("Error fetching seats:", err);
      }
    };

    fetchSeats();
    const interval = setInterval(fetchSeats, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderTableRows = () =>
    seats.map((seat) => {
      let endTime = "-";
      let checkinTime = "-";

      if (seat.status !== "free" && seat.checkinTime) {
        const checkinDate = new Date(seat.checkinTime);
        checkinTime = checkinDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        checkinDate.setHours(checkinDate.getHours() + 3);
        endTime = checkinDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }

      return (
        <tr key={seat.id} className={`${seat.status === "free" ? "bg-green-100" : "bg-red-100"}`}>
          <td className="py-2 px-4 border text-sm">{seat.id}</td>
          <td className="py-2 px-4 border text-sm">{seat.floor}</td>
          <td className="py-2 px-4 border text-sm">
            {seat.status === "free" ? "-" : seat.studentName}
          </td>
          <td className="py-2 px-4 border text-sm">
            {seat.status === "free" ? "-" : seat.rollNo}
          </td>
          <td className="py-2 px-4 border text-sm">{checkinTime}</td>
          <td className="py-2 px-4 border text-sm">{endTime}</td>
        </tr>
      );
    });

  const graphData = () => {
    const floorMap = {};
    seats.forEach((seat) => {
      if (!floorMap[seat.floor]) floorMap[seat.floor] = { booked: 0, total: 0 };
      floorMap[seat.floor].total += 1;
      if (seat.status !== "free") floorMap[seat.floor].booked += 1;
    });

    return Object.keys(floorMap).map((floor) => ({
      floor,
      booked: floorMap[floor].booked,
      total: floorMap[floor].total,
    }));
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-[1400px] mx-auto">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Librarian Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6 mt-4">
        <button
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            activeTab === "table" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("table")}
        >
          Seats Overview
        </button>
        <button
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            activeTab === "graph" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("graph")}
        >
          Traffic Graph
        </button>
      </div>

      {/* Seats Table */}
      {activeTab === "table" && (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white p-4">
          {seats.length === 0 ? (
            <p className="text-center text-sm sm:text-base">All seats are free.</p>
          ) : (
            <table className="min-w-full text-center rounded-lg">
              <thead className="bg-gray-200 text-sm">
                <tr>
                  <th className="py-2 px-4 border">Seat ID</th>
                  <th className="py-2 px-4 border">Floor</th>
                  <th className="py-2 px-4 border">Student Name</th>
                  <th className="py-2 px-4 border">Roll No</th>
                  <th className="py-2 px-4 border">Check-in</th>
                  <th className="py-2 px-4 border">Ends At</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          )}
        </div>
      )}

      {/* Graph Section */}
      {activeTab === "graph" && (
        <div className="w-full bg-white p-4 shadow-md rounded-lg">

          {/* Info Box */}
          <div className="w-full p-4 mb-6 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-blue-100">

            <div className="flex flex-col sm:flex-row justify-between sm:justify-center sm:gap-4 mb-4">
              <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow border-l-4 border-blue-500 w-full sm:w-1/3 my-1">
                <span className="text-gray-500 text-sm">Total Seats</span>
                <span className="font-bold text-xl">{seats.length}</span>
              </div>

              <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow border-l-4 border-red-500 w-full sm:w-1/3 my-1">
                <span className="text-gray-500 text-sm">Booked</span>
                <span className="font-bold text-xl text-red-600">
                  {seats.filter((s) => s.status !== "free").length}
                </span>
              </div>

              <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow border-l-4 border-green-500 w-full sm:w-1/3 my-1">
                <span className="text-gray-500 text-sm">Unbooked</span>
                <span className="font-bold text-xl text-green-700">
                  {seats.filter((s) => s.status === "free").length}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span>Floors: {new Set(seats.map((s) => s.floor)).size}</span>
              <span>
                Last Updated:{" "}
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-600">
            Library Seat Traffic
          </h2>

          {/* Graph */}
          <div className="w-full h-72 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="floor" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="booked" stroke="#ff4d4f" strokeWidth={2} />
                <Line type="monotone" dataKey="total" stroke="#4caf50" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
