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
      case "booked": return "bg-red-500";
      case "free": return "bg-green-500";
      case "soon": return "bg-yellow-400";
      case "occupied": return "bg-gray-500";
      default: return "bg-green-500";
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

          <div className="flex flex-col lg:flex-row items-start justify-center lg:space-x-14 space-y-10 lg:space-y-0 relative">


            {/* Lift */}
            <div className="absolute lg:left-6 lg:top-6 top-2 left-2 bg-blue-100 border-2 border-blue-400 text-blue-700 px-3 py-1 rounded-md font-bold shadow-sm text-sm">
              Lift
            </div>

            {/* LEFT 4-COL GRID */}
        <div className="grid grid-cols-4 gap-3 mt-4 lg:-mt-4">



              {floor.seats.slice(0, 16).map((seat) => (
                <div
                  key={seat.id}
                  className={`${getStatusColor(seat.status)} 
                              w-10 h-10 md:w-12 md:h-12 
                              flex items-center justify-center 
                              rounded-md text-white font-semibold text-sm`}
                >
                  {seat.id}
                </div>
              ))}
            </div>

            {/* CORRIDOR */}
            <div className="flex flex-col justify-center items-center bg-gray-200 
                            w-24 h-20 lg:w-20 lg:h-[300px] rounded-md mx-4">
              <span className="font-bold text-gray-700 tracking-widest text-xs lg:text-sm transform lg:-rotate-90">
                CORRIDOR
              </span>
            </div>

            {/* RIGHT 4-COL GRID + STAIRS */}
            <div className="flex flex-col items-center lg:items-end lg:mt-2">
              <div className="grid grid-cols-4 gap-3">
                {floor.seats.slice(16, 32).map((seat) => (
                  <div
                    key={seat.id}
                    className={`${getStatusColor(seat.status)} 
                                w-10 h-10 md:w-12 md:h-12 
                                flex items-center justify-center 
                                rounded-md text-white font-semibold text-sm`}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-100 border-2 border-yellow-500 
                              text-yellow-800 px-4 py-2 rounded-md 
                              font-bold shadow-sm text-sm">
                Stairs
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
