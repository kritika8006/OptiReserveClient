import React, { useEffect, useState } from "react";

export default function AvailabilityPage({ seats }) {
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    const floorNames = [
      "Ground Floor",
      "First Floor",
      "Second Floor",
      "Third Floor",
    ];

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 space-y-12">
      {floors.map((floor, idx) => (
        <div
          key={idx}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl 
                     w-full max-w-[1100px] border relative"
        >
          {/* LIFT (TOP LEFT) */}
          <div
            className="absolute top-3 left-3 
                       bg-blue-100 border-2 border-blue-400 text-blue-700
                       px-3 py-1 rounded-md font-bold shadow-sm text-[10px]"
          >
            Lift
          </div>

          {/* FLOOR NAME */}
          <h1 className="text-lg sm:text-xl font-bold text-center mb-6 mt-4">
            {floor.name}
          </h1>

          {/* MAIN ROW: ALWAYS ROW, EVEN MOBILE */}
          <div
            className="flex flex-row items-start justify-center 
                       gap-4 sm:gap-8 md:gap-12 w-full"
          >
            {/* LEFT SEATS (1–16) */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
              {floor.seats.slice(0, 16).map((seat) => (
                <div
                  key={seat.id}
                  className={`${getStatusColor(seat.status)} 
                              w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11
                              flex items-center justify-center 
                              rounded-md text-white font-semibold
                              text-[8px] sm:text-[10px] md:text-sm`}
                >
                  {seat.id}
                </div>
              ))}
            </div>

            {/* CORRIDOR – CENTER FULL HEIGHT */}
            <div
              className="flex flex-col justify-center items-center 
                         bg-gray-200 px-2 sm:px-3 md:px-4 
                         rounded-md self-stretch"
            >
              <span
                className="font-bold text-gray-700 
                           text-[8px] sm:text-[10px] md:text-sm 
                           tracking-widest -rotate-90"
              >
                CORRIDOR
              </span>
            </div>

            {/* RIGHT SEATS + STAIRS */}
            <div className="flex flex-col items-center md:items-end self-stretch">
              {/* RIGHT SEATS (17–32) */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
                {floor.seats.slice(16, 32).map((seat) => (
                  <div
                    key={seat.id}
                    className={`${getStatusColor(seat.status)} 
                                w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11
                                flex items-center justify-center 
                                rounded-md text-white font-semibold
                                text-[8px] sm:text-[10px] md:text-sm`}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>

              {/* STAIRS */}
              <div
                className="mt-3 sm:mt-4 bg-yellow-100 border-2 border-yellow-500
                           text-yellow-800 px-3 py-1 sm:px-4 sm:py-2 
                           rounded-md font-bold shadow-sm
                           text-[10px] sm:text-xs md:text-sm"
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
