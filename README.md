# InvenTrack — Inventory Management System (Frontend)

React frontend for a full-stack MERN inventory management application.

📦 **Live App**: https://inventory-management-system-fronten-lemon.vercel.app/
🔗 **Live API**: https://inventory-management-system-backend-wm6i.onrender.com
💻 **Backend Repo**: https://github.com/SathiyamoorthiSowmiya/inventory-management-system-backend-

> Backend is hosted on Render's free tier — the server sleeps after inactivity, so the first load after a while may take 30-50s while it wakes up.

## Tech Stack

- React (Vite)
- React Router
- Recharts (dashboard charts)
- Axios
- Context API (authentication state)

## Features

- Login with JWT auth
- Dashboard with stats cards, pie/bar charts and low-stock / out-of-stock alerts
- Product management with category dropdown and low-stock threshold
- Category management
- Stock In/Out logging with full transaction history

## Getting Started

### Prerequisites

- Node.js (v18+)
- The backend API running (see Backend README)

### Setup

```bash
npm install
```

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:5000/api
```

Run the dev server:

```bash
npm run dev
```

## Demo Login

- Admin: `admin@inventory.com` / `Admin@123`
