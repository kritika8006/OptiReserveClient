import React, { useState } from "react";
import { clothesData } from "../components/ClothesData";
import CartButton from "../components/CartButton";
import CartSheet from "../components/CartSheet";

export default function SalePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [notification, setNotification] = useState("");

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);

    setNotification(`${item.title} added to cart`);
    setTimeout(() => setNotification(""), 2000);
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const filtered = clothesData.filter((item) => {
    return (
      (gender ? item.gender === gender : true) &&
      (category ? item.type === category : true)
    );
  });

  return (
    <div
      className="w-full min-h-screen p-6 flex flex-col items-center"
      style={{ backgroundColor: "#DBD4FF" }}
    >
      {/* ✅ Notification */}
      {notification && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-500"
          style={{ backgroundColor: "#660033" }}
        >
          {notification}
        </div>
      )}

      {/* Heading */}
      <h1
        className="text-4xl font-extrabold mb-6 text-center"
        style={{ color: "#660033" }}
      >
        Sale. Grab Early, Grab Fast
      </h1>

      {/* Search Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition"
        style={{ backgroundColor: "#FDFBD4", color: "#660033" }}
      >
        Search Filters
      </button>

      {/* Filters */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden mt-5 w-full max-w-xl 
        ${showFilters ? "opacity-100 max-h-40" : "opacity-0 max-h-0"}`}
      >
        <div className="flex gap-4">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-1/2 p-3 rounded-xl shadow"
            style={{ backgroundColor: "#FDFBD4", color: "#660033" }}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-1/2 p-3 rounded-xl shadow"
            style={{ backgroundColor: "#FDFBD4", color: "#660033" }}
          >
            <option value="">Category</option>
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select>
        </div>
      </div>

      {/* ✅ Clothing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mt-10">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl shadow-lg hover:scale-105 transition border"
            style={{ backgroundColor: "#FFFFE3", borderColor: "#660033" }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="rounded-lg w-full h-48 object-cover mb-3"
            />

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold" style={{ color: "#660033" }}>
                {item.title}
              </h2>
              <p className="font-bold" style={{ color: "#660033" }}>
                {item.price}
              </p>
            </div>

            <p className="text-gray-700 mt-2 text-sm">{item.desc}</p>

            {/* ✅ Add to Cart (inside card, matching colors) */}
            <button
              onClick={() => addToCart(item)}
              className="mt-3 w-full py-2 rounded-lg font-semibold border-2 transition hover:opacity-80"
              style={{
                borderColor: "#660033",
                backgroundColor: "#660033",
                color: "white",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Cart Button */}
      <CartButton count={cart.length} onClick={() => setCartOpen(true)} />

      {/* ✅ Cart Sheet */}
      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        removeItem={removeItem}
      />
    </div>
  );
}
