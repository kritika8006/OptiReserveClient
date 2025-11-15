import React, { useState, useEffect } from "react";

export default function MySeatsPage({ rollNo, floors, setFloors }) {
  const [mySeats, setMySeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications((prev) => [...prev.slice(-2), { id, msg }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const fetchMySeats = async () => {
    if (!rollNo) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://optireservenserver.onrender.com/api/seats/my/${rollNo}`
      );
      const data = await res.json();
      setMySeats(data);
    } catch (err) {
      console.error(err);
      addNotification("Failed to fetch your seats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMySeats();
    const interval = setInterval(fetchMySeats, 5000);
    return () => clearInterval(interval);
  }, [rollNo]);

  const handleRelease = async (seatId) => {
    try {
      const res = await fetch(
        `https://optireservenserver.onrender.com/api/seats/${seatId}/release`,
        { method: "POST" }
      );

      const data = await res.json();

      if (res.ok) {
        addNotification(`Seat ${seatId} released`);

        // Update floors
        setFloors((prev) =>
          prev.map((floor) => ({
            ...floor,
            seats: floor.seats.map((s) =>
              s.id === seatId
                ? {
                    ...s,
                    status: "free",
                    studentName: "",
                    rollNo: "",
                    checkinTime: null,
                    endAtTime: null,
                  }
                : s
            ),
          }))
        );

        fetchMySeats();
      } else {
        addNotification(data.message || "Failed to release seat");
      }
    } catch (err) {
      console.error(err);
      addNotification("Error releasing seat");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        Loading your booked seats...
      </div>
    );

  if (!mySeats.length)
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        You have no booked seats
      </div>
    );

  return (
    <div className="p-4 sm:p-6 flex flex-col items-center w-full">
      {/* Notifications */}
      <div className="fixed top-4 right-4 w-64 sm:w-72 space-y-2 z-50">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-3 rounded shadow"
          >
            {n.msg}
          </div>
        ))}
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-5 text-center">
        My Booked Seats
      </h1>

      {/* Cards Container */}
      <div className="w-full max-w-2xl space-y-4">
        {mySeats.map((seat) => (
          <div
            key={seat.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-white rounded-2xl shadow-md border border-gray-200 gap-4"
          >
            {/* Seat info */}
            <div className="text-gray-700 space-y-1">
              <p className="text-base sm:text-lg">
                <strong>Seat ID:</strong> {seat.id}
              </p>
              <p className="text-base sm:text-lg">
                <strong>Floor:</strong> {seat.floor}
              </p>
              <p className="text-base sm:text-lg">
                <strong>Check-in:</strong>{" "}
                {seat.checkinTime
                  ? new Date(seat.checkinTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </p>
              <p className="text-base sm:text-lg">
                <strong>Ends at:</strong>{" "}
                {seat.endAtTime
                  ? new Date(seat.endAtTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </p>
            </div>

            {/* Release Button */}
            <button
              onClick={() => handleRelease(seat.id)}
              className="w-full sm:w-auto bg-red-500 text-white py-2 px-6 rounded-xl text-lg font-semibold hover:bg-red-600 transition-all"
            >
              Release
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
