# Buyear Portal 🏠

A high-performance full-stack property management application designed to bridge the gap between buyers and real estate listings. This portal features secure authentication, property browsing, and a personalized favorites dashboard.

## 🚀 Live Demo
* **Frontend:** [https://buyear-portal.vercel.app](https://buyear-portal.vercel.app)
* **Backend:** [https://buyear-portal.onrender.com](https://buyear-portal.onrender.com)

---

## 🛠 Tech Stack

- **Frontend:** React.js, React Router, CSS3 (BEM Methodology)
- **Backend:** Node.js, Express.js
- **Database:** SQLite (via `better-sqlite3`)
- **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 📂 Project Structure

```text
buyear-portal/
├── backend/            # Node/Express server & SQLite database
│   ├── routes/         # Auth and Favourites logic
│   ├── db.js           # SQLite connection and initialization
│   └── server.js       # Main entry point with CORS handling
└── frontend/           # React application (CRA)
    ├── src/
    │   ├── api.js      # Centralized API service with Env support
    │   └── pages/      # Dashboard, Login, Register components
    └── public/         # Static assets
```

## 🛠️ Local Development Run Guide

Follow these steps to get a local copy of the project up and running on your machine.

### 1. Prerequisites
Ensure you have the following installed:
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

---

### 2. Setup the Backend
The backend handles user authentication and favorites using Express and SQLite.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a file named `.env` in the `backend/` folder and add:
    ```env
    PORT=5000
    JWT_SECRET=your_secret_key_here
    FRONTEND_URL=http://localhost:3000
    ```
4.  **Start the server:**
    ```bash
    node server.js
    ```
    *The server will start at `http://localhost:5000`*

---

### 3. Setup the Frontend
The frontend is built with React and connects to the backend API.

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a file named `.env` in the `frontend/` folder and add:
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```
4.  **Start the application:**
    ```bash
    npm start
    ```
    *The app will open automatically in your browser at `http://localhost:3000`*

---
