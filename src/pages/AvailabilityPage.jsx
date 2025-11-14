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
        <div key={idx} className="bg-white p-10 rounded-2xl shadow-xl w-[1100px] relative border">
          <h1 className="text-2xl font-bold text-center mb-6">{floor.name}</h1>

          <div className="flex items-start justify-center relative space-x-14">
            <div className="absolute left-6 top-6 bg-blue-100 border-2 border-blue-400 text-blue-700 px-4 py-1.5 rounded-md font-bold shadow-sm">Lift</div>

            <div className="grid grid-cols-4 gap-3 ml-24">
              {floor.seats.slice(0, 16).map((seat) => (
                <div
                  key={seat.id}
                  className={`${getStatusColor(seat.status)} w-10 h-10 flex items-center justify-center rounded-md text-white font-semibold text-sm`}
                >
                  {seat.id}
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center items-center bg-gray-200 w-20 h-[300px] rounded-md">
              <span className="font-bold text-gray-700 transform -rotate-90 tracking-widest text-sm">CORRIDOR</span>
            </div>

            <div className="relative flex flex-col items-end">
              <div className="grid grid-cols-4 gap-3">
                {floor.seats.slice(16, 32).map((seat) => (
                  <div
                    key={seat.id}
                    className={`${getStatusColor(seat.status)} w-10 h-10 flex items-center justify-center rounded-md text-white font-semibold text-sm`}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>

              <div className="mt-6 mr-3 bg-yellow-100 border-2 border-yellow-500 text-yellow-800 px-4 py-2 rounded-md font-bold shadow-sm">Stairs</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
