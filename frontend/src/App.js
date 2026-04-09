// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const path = window.location.pathname;

//   if (path === "/dashboard") {
//     return <Dashboard />;
//   }

//   return <Login />;
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;