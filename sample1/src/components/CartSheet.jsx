import React from "react";

export default function CartSheet({ open, onClose, cart, removeItem }) {
  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-[#FFF7FB] shadow-2xl 
                  rounded-t-3xl p-6 border-t-4 border-[#660033]
                  transition-transform duration-500 ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#660033]">Your Cart</h2>
        <button onClick={onClose} className="text-xl font-bold text-[#660033]">
          ✖
        </button>
      </div>

      {/* If empty */}
      {cart.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="max-h-64 overflow-y-auto">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 mb-3 border-b border-[#660033]"
              >
                <div>
                  <h3 className="font-semibold text-[#660033]">{item.title}</h3>
                  <p className="text-gray-700">{item.price}</p>
                </div>

                <button
                  onClick={() => removeItem(i)}
                  className="text-red-500 font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 font-bold text-lg">
            Total:{" "}
            <span className="text-[#660033]">
              ₹
              {cart
                .reduce(
                  (sum, item) => sum + Number(item.price.replace("₹", "")),
                  0
                )
                .toLocaleString()}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
