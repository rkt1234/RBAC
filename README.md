# RBAC Blog Platform (Real-Time)

This is a fullstack blog management platform with:
- User Authentication and Role-Based Access Control (RBAC)
- Admin-only Create, Update, Delete blog access
- Real-time blog updates using WebSocket (Socket.IO)
- Fully protected frontend routes

## 🛠 Tech Stack

- **Frontend**: React.js, Axios, React Router, React Toastify, Socket.IO Client
- **Backend**: Node.js, Express.js, Prisma ORM, Supabase PostgreSQL, Socket.IO
- **Hosting**:
  - Frontend: Vercel (preferred)
  - Backend: Railway.app or Render.com

## 📂 Project Structure

```
root/
├── backend/       # Node.js + Express backend
├── frontend/      # React frontend
├── .gitignore
└── README.md
```

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/rbac-blog-platform.git
cd rbac-blog-platform
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env  # Create your .env with correct values
npm run dev
```

Example `.env` for backend:

```
DATABASE_URL=your-supabase-database-url
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:3000
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
cp .env.example .env  # Create your frontend .env
npm start
```

Example `.env` for frontend:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 4. Development Notes

- Use `npm run dev` in backend (nodemon auto restart)
- Use `npm start` in frontend (CRA development server)
- WebSocket automatically reconnects after backend restarts.

### 5. Deployment Notes

- Frontend deploy to **Vercel**
- Backend deploy to **Railway** or **Render** with environment variables
- Ensure CORS is properly configured between frontend and backend

---

## 🚀 Features

- User Signup/Login
- JWT Authentication
- Role-Based Access (USER vs ADMIN)
- Blogs Listing (for all users)
- Blog Create/Update/Delete (for Admins only)
- Real-Time Blog Updates via WebSocket (Socket.IO)
- Protected Frontend Routes (React Router + AuthContext)
- Toast Notifications (React Toastify)

---

## ✨ Future Improvements

- Blog comments and likes
- User profile pages
- Admin dashboard for managing users
- Better websocket namespaces for multiple rooms

---

## 📜 License

This project is licensed under the MIT License.

