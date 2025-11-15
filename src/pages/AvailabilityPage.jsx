import React, { useEffect, useState } from "react";

export default function AvailabilityPage({ seats }) {
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    const floorNames = ["Ground Floor", "First Floor", "Second Floor", "Third Floor"];
    const grouped = floorNames.map((f) => ({
      name: f,
      seats: seats.filter((s) => s.floor === f),
    }));
    setFloors(grouped);
  }, [seats]);

  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-red-500";
      case "free":
        return "bg-green-500";
      case "soon":
        return "bg-yellow-400";
      case "occupied":
        return "bg-gray-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 space-y-12">
      {floors.map((floor, idx) => (
        <div
          key={idx}
          className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-[1100px] border"
        >
          <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
            {floor.name}
          </h1>

          {/* MAIN ROW */}
          <div
            className="flex flex-col lg:flex-row items-start justify-center 
                       gap-10 lg:gap-16 relative w-full"
          >
            {/* LIFT (TOP LEFT CORNER) */}
            <div className="absolute lg:left-6 lg:top-6 top-2 left-2 
                            bg-blue-100 border-2 border-blue-400 text-blue-700 
                            px-3 py-1 rounded-md font-bold shadow-sm text-sm">
              Lift
            </div>

            {/* LEFT SEATS GRID */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-6 lg:mt-0">
              {floor.seats.slice(0, 16).map((seat) => (
                <div
                  key={seat.id}
                  className={`${getStatusColor(seat.status)}
                              w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12
                              flex items-center justify-center 
                              rounded-md text-white font-semibold 
                              text-xs sm:text-sm`}
                >
                  {seat.id}
                </div>
              ))}
            </div>

            {/* CORRIDOR — FULL HEIGHT AUTO STRETCH */}
            <div
              className="flex flex-col justify-center items-center 
                         bg-gray-200 w-24 lg:w-20 
                         rounded-md px-2 self-stretch"
            >
              <span className="font-bold text-gray-700 text-xs sm:text-sm tracking-widest 
                               rotate-0 lg:-rotate-90">
                CORRIDOR
              </span>
            </div>

            {/* RIGHT SEATS GRID + STAIRS */}
            <div className="flex flex-col items-center lg:items-end self-stretch">
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {floor.seats.slice(16, 32).map((seat) => (
                  <div
                    key={seat.id}
                    className={`${getStatusColor(seat.status)}
                                w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12
                                flex items-center justify-center 
                                rounded-md text-white font-semibold 
                                text-xs sm:text-sm`}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>

              {/* STAIRS */}
              <div
                className="mt-4 sm:mt-6 bg-yellow-100 border-2 border-yellow-500 
                           text-yellow-800 px-3 py-1 sm:px-4 sm:py-2 
                           rounded-md font-bold shadow-sm 
                           text-xs sm:text-sm"
              >
                Stairs
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
