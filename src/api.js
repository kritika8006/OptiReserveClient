const API = "https://optireserveserver.onrender.com";

// LOGIN
export async function loginUser(username, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return await res.json();
}

// GET ALL SEATS
export async function getSeats() {
  const res = await fetch(`${API}/api/seats/`);
  return await res.json();
}

// BOOK SEAT
export async function bookSeat(data) {
  const res = await fetch(`${API}/api/seats/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

// UNBOOK SEAT
export async function unbookSeat(data) {
  const res = await fetch(`${API}/api/seats/unbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
