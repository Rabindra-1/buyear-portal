// const BASE = "http://localhost:5000";

// // Login
// export async function login(data) {
//   const res = await fetch(`${BASE}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// // Register
// export async function register(data) {
//   const res = await fetch(`${BASE}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// // Favourites
// export async function getFavourites(token) {
//   const res = await fetch(`${BASE}/favourites`, {
//     headers: { Authorization: token },
//   });
//   return res.json();
// }

// export async function addFavourite(token, property_id) {
//   const res = await fetch(`${BASE}/favourites`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: token },
//     body: JSON.stringify({ property_id }),
//   });
//   return res.json();
// }

// export async function removeFavourite(token, property_id) {
//   const res = await fetch(`${BASE}/favourites/${property_id}`, {
//     method: "DELETE",
//     headers: { Authorization: token },
//   });
//   return res.json();
// }

// Use the environment variable from Vercel, fallback to localhost for dev
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const getFavourites = async (token) => {
  const res = await fetch(`${API_URL}/favourites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const addFavourite = async (token, propertyName) => {
  const res = await fetch(`${API_URL}/favourites/add`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ name: propertyName }),
  });
  return res.json();
};

export const removeFavourite = async (token, propertyName) => {
  const res = await fetch(`${API_URL}/favourites/remove`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ name: propertyName }),
  });
  return res.json();
};