const BASE = "http://localhost:5000";

// Login
export async function login(data) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Register
export async function register(data) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Favourites
export async function getFavourites(token) {
  const res = await fetch(`${BASE}/favourites`, {
    headers: { Authorization: token },
  });
  return res.json();
}

export async function addFavourite(token, property_id) {
  const res = await fetch(`${BASE}/favourites`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ property_id }),
  });
  return res.json();
}

export async function removeFavourite(token, property_id) {
  const res = await fetch(`${BASE}/favourites/${property_id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  return res.json();
}