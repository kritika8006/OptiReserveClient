import React, { useState, useEffect } from "react";

export default function BookingPage({ floors = [], setFloors, user }) {
  const [selectedFloor, setSelectedFloor] = useState(floors?.[0]?.name || "");

  // Individual booking
  const [studentName, setStudentName] = useState(user?.name || "");
  const [rollNo, setRollNo] = useState(user?.rollNo || "");
  const [checkinTime, setCheckinTime] = useState(0); // 0-30 min
  const [chosenSeatId, setChosenSeatId] = useState(null);

  // Group booking
  const [groupMode, setGroupMode] = useState(false);
  const [groupMembers, setGroupMembers] = useState([
    { name: "", roll: "" },
    { name: "", roll: "" },
    { name: "", roll: "" },
  ]);
  const [groupSeats, setGroupSeats] = useState([]);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications((prev) => [...prev.slice(-2), { id, msg }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const currentFloor = floors.find((f) => f.name === selectedFloor);

  // Calculate end time: 3 hours from now
  const calculateEndTime = () => {
    return new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours in ms
  };

  const findSuggestedSeat = () => {
    if (!currentFloor) return null;
    const free = currentFloor.seats.filter((s) => s.status === "free");
    if (!free.length) return null;

    const corner = free.filter((s) => s.id % 5 === 1 || s.id % 5 === 0);
    if (corner.length) return corner[0];

    const near = free.filter((s) => s.id % 5 === 2 || s.id % 5 === 4);
    if (near.length) return near[0];

    const mid = free.filter((s) => s.id % 5 === 3);
    return mid.length ? mid[0] : free[0];
  };

  useEffect(() => {
    const seat = findSuggestedSeat();
    setChosenSeatId(seat ? seat.id : null);
  }, [selectedFloor, floors]);

  const findAdjacentSeats = (count) => {
    if (!currentFloor) return [];
    const freeSeats = currentFloor.seats.filter((s) => s.status === "free");

    for (let i = 0; i < freeSeats.length; i++) {
      const start = freeSeats[i].id;
      const block = [];
      for (let j = 0; j < count; j++) {
        if (freeSeats.some((s) => s.id === start + j)) {
          block.push(start + j);
        } else break;
      }
      if (block.length === count) return block;
    }
    return [];
  };

  const updateGroupMember = (index, field, value) => {
    setGroupMembers((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleFindGroupSeats = () => {
    const required = groupMembers.filter(
      (m) => m.name.trim() && m.roll.trim()
    ).length;

    if (!required) {
      addNotification("Enter at least one valid member!");
      return;
    }

    const seats = findAdjacentSeats(required);
    if (seats.length < required) {
      addNotification("No adjacent seats available for your group!");
      return;
    }

    setGroupSeats(seats);
    addNotification(`Adjacent seats found: ${seats.join(", ")}`);
  };

  const handleBook = async () => {
    const endTime = calculateEndTime();
    let bookingUsers = [];
    let bookingSeats = [];

    if (!groupMode) {
      if (!studentName || !rollNo || !checkinTime || !chosenSeatId) {
        return addNotification("Fill all fields!");
      }
      bookingUsers = [{ name: studentName, roll: rollNo }];
      bookingSeats = [chosenSeatId];
    } else {
      bookingUsers = groupMembers.filter((m) => m.name && m.roll);
      if (bookingUsers.length !== groupSeats.length) {
        return addNotification(
          "Number of members must match number of seats selected"
        );
      }
      bookingSeats = groupSeats;
    }

    try {
      const res = await fetch("https://optireserveserver.onrender.com/api/seats/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatIds: bookingSeats,
          studentName,
          rollNo,
          checkinTime: new Date().toISOString(),
          bookingEndTime: endTime.toISOString(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        addNotification(data.message);

        setFloors((prev) =>
          prev.map((floor) => {
            if (floor.name !== selectedFloor) return floor;
            return {
              ...floor,
              seats: floor.seats.map((s) =>
                bookingSeats.includes(s.id)
                  ? {
                      ...s,
                      status: "booked",
                      studentName,
                      rollNo,
                      checkinTime: new Date().toISOString(),
                      bookingEndTime: endTime.toISOString(),
                    }
                  : s
              ),
            };
          })
        );

        setChosenSeatId(null);
        setGroupSeats([]);
        setStudentName(user?.name || "");
        setRollNo(user?.rollNo || "");
        setCheckinTime(0);
      } else {
        addNotification(data.message);
      }
    } catch (err) {
      console.error(err);
      addNotification("Server error");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      {/* Notifications */}
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

      <h1 className="text-3xl font-bold text-blue-600 mb-4">Booking Page</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        {/* Select Floor */}
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="w-full p-3 border rounded"
        >
          {floors.map((f) => (
            <option key={f.name}>{f.name}</option>
          ))}
        </select>

        {/* Toggle Group Mode */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={groupMode}
            onChange={() => setGroupMode(!groupMode)}
          />
          <span className="font-semibold">Enable Group Booking</span>
        </label>

        {/* Individual Booking Inputs */}
        {!groupMode && (
          <>
            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Roll No"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Check-in Time (0-30 min)"
              value={checkinTime}
              min={0}
              max={30}
              onChange={(e) => {
                const val = Math.min(30, Math.max(0, parseInt(e.target.value) || 0));
                setCheckinTime(val);
              }}
              className="w-full p-3 border rounded"
            />

            <select
              value={chosenSeatId || ""}
              onChange={(e) => setChosenSeatId(parseInt(e.target.value))}
              className="w-full p-3 border rounded"
            >
              {currentFloor &&
                currentFloor.seats
                  .filter((s) => s.status === "free")
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      Seat {s.id} - Ends at: {calculateEndTime().toLocaleTimeString()}
                      {s.id === chosenSeatId ? " (Selected)" : ""}
                    </option>
                  ))}
            </select>
          </>
        )}

        {/* Group Booking */}
        {groupMode && (
          <div className="space-y-3">
            {groupMembers.map((m, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Member ${i + 1} Name`}
                  value={m.name}
                  onChange={(e) => updateGroupMember(i, "name", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Roll No"
                  value={m.roll}
                  onChange={(e) => updateGroupMember(i, "roll", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                />
              </div>
            ))}
            <button
              onClick={handleFindGroupSeats}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg"
            >
              Find Adjacent Seats
            </button>
            {groupSeats.length > 0 && (
              <div className="space-y-1">
                {groupSeats.map((seatId, idx) => (
                  <p key={seatId} className="text-green-700 font-semibold">
                    Member {groupMembers[idx]?.name || idx + 1}: Seat {seatId} - Ends at{" "}
                    {calculateEndTime().toLocaleTimeString()}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Confirm Booking */}
        <button
          onClick={handleBook}
          className="w-full bg-blue-600 text-white p-4 rounded-lg mt-3"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
