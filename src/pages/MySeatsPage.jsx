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
    const res = await fetch(`https://optireserveserver.onrender.com/api/seats/my/${rollNo}`);
    const data = await res.json();
    console.log("My Seats fetched:", data); // <-- Add this
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
    const interval = setInterval(fetchMySeats, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, [rollNo]);

  const handleRelease = async (seatId) => {
    try {
      const res = await fetch(`https://optireserveserver.onrender.com/api/seats/${seatId}/release`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        addNotification(`Seat ${seatId} released`);
        // Update local floors
        setFloors((prev) =>
          prev.map((floor) => ({
            ...floor,
            seats: floor.seats.map((s) =>
             s.id === seatId
  ? { ...s, status: "free", studentName: "", rollNo: "", checkinTime: null, endAtTime: null }
  : s

            ),
          }))
        );
        // Refresh mySeats after release
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
    return <div className="p-6 text-center text-gray-500">Loading your booked seats...</div>;

  if (!mySeats.length)
    return <div className="p-6 text-center text-gray-500">You have no booked seats</div>;

  return (
    <div className="p-6 flex flex-col items-center w-full">
      <div className="fixed top-4 right-4 w-72 space-y-2 z-50">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 rounded shadow"
          >
            {n.msg}
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-blue-600 mb-4">My Booked Seats</h1>
      <div className="w-full max-w-2xl space-y-4">
        {mySeats.map((seat) => (
          <div
            key={seat.id}
            className="flex justify-between items-center p-4 bg-white rounded shadow"
          >
            <div>
              <p><strong>Seat ID:</strong> {seat.id}</p>
              <p><strong>Floor:</strong> {seat.floor}</p>
            <p><strong>Check-in:</strong>{" "}
  {seat.checkinTime ? new Date(seat.checkinTime).toLocaleTimeString() : "-"}
</p>
<p><strong>Ends at:</strong>{" "}
  {seat.endAtTime ? new Date(seat.endAtTime).toLocaleTimeString() : "-"}
</p>


            </div>
            <button
              onClick={() => handleRelease(seat.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Release
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
