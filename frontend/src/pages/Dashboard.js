import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getFavourites, addFavourite, removeFavourite } from "../api";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const userRaw = localStorage.getItem("user");
  const user = userRaw && userRaw !== "undefined" ? JSON.parse(userRaw) : null;
  const token = localStorage.getItem("token");

  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState("");

  const sampleProperties = [
    { id: 1, name: "Modern Apartment", location: "Kathmandu" },
    { id: 2, name: "Luxury Villa", location: "Pokhara" },
    { id: 3, name: "Budget Room", location: "Lalitpur" },
    { id: 4, name: "Office Space", location: "Bhaktapur" },
    { id: 5, name: "Studio Flat", location: "Thamel" }
  ];

  // Memoized fetch function to satisfy ESLint and prevent infinite loops
  const fetchFavourites = useCallback(async () => {
    if (!token) return;
    try {
      const res = await getFavourites(token);
      if (res.success) setFavourites(res.data || []);
    } catch (err) {
      setError("Error fetching favourites");
    }
  }, [token]);

  useEffect(() => {
    if (!user || !token) {
      navigate("/");
    } else {
      fetchFavourites();
    }
  }, [user, token, navigate, fetchFavourites]);

  const toggleFavourite = async (property) => {
    const exists = favourites.includes(property.name);
    try {
      if (exists) {
        await removeFavourite(token, property.name);
        setFavourites(favourites.filter((p) => p !== property.name));
      } else {
        await addFavourite(token, property.name);
        setFavourites([...favourites, property.name]);
      }
    } catch (err) {
      setError("Error updating favourite");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {error && <div className="error">{error}</div>}

      <h3>Available Properties</h3>
      <div className="card-grid">
        {sampleProperties.map((prop) => {
          const isFav = favourites.includes(prop.name);
          return (
            <div key={prop.id} className="card">
              <div className="card-body">
                <h4>{prop.name}</h4>
                <p>{prop.location}</p>
              </div>
              <button
                className={`heart ${isFav ? "active" : ""}`}
                onClick={() => toggleFavourite(prop)}
              >
                {isFav ? "❤️" : "🤍"}
              </button>
            </div>
          );
        })}
      </div>

      <h3>My Favourites</h3>
      <div className="card-grid">
        {favourites.length === 0 && <p>No favourites yet.</p>}
        {favourites.map((prop, idx) => (
          <div key={idx} className="card fav">
            <h4>{prop}</h4>
            <button
              className="heart active"
              onClick={() => toggleFavourite({ name: prop })}
            >
              ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// import { useState, useEffect, useCallback } from "react"; // 1. Added useCallback
// import { useNavigate } from "react-router-dom";
// import { getFavourites, addFavourite, removeFavourite } from "../api";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const userRaw = localStorage.getItem("user");
//   const user = userRaw && userRaw !== "undefined" ? JSON.parse(userRaw) : null;
//   const token = localStorage.getItem("token");

//   const [favourites, setFavourites] = useState([]);
//   const [error, setError] = useState("");

//   const sampleProperties = [
//     { id: 1, name: "Modern Apartment", location: "Kathmandu" },
//     { id: 2, name: "Luxury Villa", location: "Pokhara" },
//     { id: 3, name: "Budget Room", location: "Lalitpur" },
//     { id: 4, name: "Office Space", location: "Bhaktapur" },
//     { id: 5, name: "Studio Flat", location: "Thamel" }
//   ];

//   // 2. Wrap the fetch function in useCallback
//   const fetchFavourites = useCallback(async () => {
//     if (!token) return;
//     try {
//       const res = await getFavourites(token);
//       if (res.success) setFavourites(res.data || []);
//     } catch (err) {
//       setError("Error fetching favourites");
//     }
//   }, [token]); // token is the only external dependency here

//   // 3. Now it is safe to include fetchFavourites in this dependency array
//   useEffect(() => {
//     if (!user || !token) {
//       navigate("/");
//     } else {
//       fetchFavourites();
//     }
//   }, [user, token, navigate, fetchFavourites]); 

//   const toggleFavourite = async (property) => {
//     const exists = favourites.includes(property.name);

//     try {
//       if (exists) {
//         await removeFavourite(token, property.name);
//         setFavourites(favourites.filter((p) => p !== property.name));
//       } else {
//         await addFavourite(token, property.name);
//         setFavourites([...favourites, property.name]);
//       }
//     } catch (err) {
//       setError("Error updating favourite");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   if (!user) return null;

//   return (
//     <div className="dashboard-container">
//       {/* ... rest of your JSX remains the same ... */}
//       <div className="dashboard-header">
//         <h2>Welcome, {user.name}</h2>
//         <button className="logout-btn" onClick={logout}>Logout</button>
//       </div>

//       {error && <div className="error">{error}</div>}

//       <h3>Available Properties</h3>
//       <div className="card-grid">
//         {sampleProperties.map((prop) => {
//           const isFav = favourites.includes(prop.name);
//           return (
//             <div key={prop.id} className="card">
//               <div className="card-body">
//                 <h4>{prop.name}</h4>
//                 <p>{prop.location}</p>
//               </div>
//               <button
//                 className={`heart ${isFav ? "active" : ""}`}
//                 onClick={() => toggleFavourite(prop)}
//               >
//                 {isFav ? "❤️" : "🤍"}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       <h3>My Favourites</h3>
//       <div className="card-grid">
//         {favourites.length === 0 && <p>No favourites yet.</p>}
//         {favourites.map((prop, idx) => (
//           <div key={idx} className="card fav">
//             <h4>{prop}</h4>
//             <button
//               className="heart active"
//               onClick={() => toggleFavourite({ name: prop })}
//             >
//               ❤️
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }