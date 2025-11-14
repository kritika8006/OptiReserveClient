export default function CartButton({ count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 bg-[#660033] text-white px-5 py-3 rounded-full shadow-lg"
    >
      🛒 Cart ({count})
    </button>
  );
}
