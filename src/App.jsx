import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import BookingPage from "./pages/BookingPage";
import MySeatsPage from "./pages/MySeatsPage";
import OopsPage from "./pages/OOPSConceptsPage";
import LibrarianDashboard from "./pages/LibrarianDashboard"; // <-- Import

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [seats, setSeats] = useState([]);

  // Fetch seats initially and refresh every 5 sec
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

  const groupSeatsByFloor = (seatsArray) => {
    const floorsMap = {};
    seatsArray.forEach((s) => {
      if (!floorsMap[s.floor]) floorsMap[s.floor] = [];
      floorsMap[s.floor].push({
        id: s.id,
        status: s.status,
        studentName: s.studentName,
        rollNo: s.rollNo,
        checkinTime: s.checkinTime,
        bookingEndTime: s.bookingEndTime,
      });
    });
    return Object.keys(floorsMap).map((floorName) => ({
      name: floorName,
      seats: floorsMap[floorName],
    }));
  };

  const isLibrarian = user?.name?.toLowerCase() === "librarian";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />

      <div className="flex-grow">
        {page === "login" && (
          <LoginPage setPage={setPage} setUser={setUser} />
        )}

        {user && page === "availability" && <AvailabilityPage seats={seats} />}

        {user && page === "booking" && (
          <BookingPage
            floors={groupSeatsByFloor(seats)}
            setFloors={(updatedFloors) => {
              const updatedSeats = updatedFloors.flatMap((f) =>
                f.seats.map((s) => ({ ...s, floor: f.name }))
              );
              setSeats(updatedSeats);
            }}
            user={user}
          />
        )}

        {/* MySeatsPage only for non-librarian users */}
        {user && page === "myseats" && !isLibrarian && (
          <MySeatsPage
            rollNo={user.rollNo}
            floors={groupSeatsByFloor(seats)}
            setFloors={(updatedFloors) => {
              const updatedSeats = updatedFloors.flatMap((f) =>
                f.seats.map((s) => ({ ...s, floor: f.name }))
              );
              setSeats(updatedSeats);
            }}
          />
        )}

        {page === "oops" && <OopsPage />}

        {/* Librarian dashboard only for librarian */}
        {user && page === "librarian" && isLibrarian && (
          <LibrarianDashboard />
        )}
      </div>
    </div>
  );
}
