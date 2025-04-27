# RBAC Blog Platform

A secure Blog platform with **Role-Based Access Control (RBAC)** built using Node.js, Express, Prisma, PostgreSQL (Supabase), and JWT Authentication.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT (JSON Web Token)
- **Authorization**: Role-Based (USER, ADMIN)

---

## 📦 Features

- Secure Signup/Login with password hashing (bcrypt)
- JWT Authentication
- Role-based Authorization (ADMIN vs USER)
- CRUD Operations on Blog posts
- Middleware-based security
- Clean modular code structure

---

<!-- ## 🛠️ Project Setup -->

1. Clone the Repository

```bash
git clone https://github.com/your-username/rbac-blog-platform.git
cd rbac-blog-platform

2. Install Dependencies
npm install

3. Setup Environment Variables
PORT=5000
DATABASE_URL=your_supabase_postgres_connection_url
JWT_SECRET=your_super_secret_key

4. Prisma setup
npx prisma generate
npx prisma migrate dev --name init

5. Run the application
npm run dev


# -----------------------------------------------Architecture Flow----------------------------------------------
Client (Postman/Frontend)
     |
     v
Express Server (Node.js)
     |
     v
Routes (authRoutes.js / blogRoutes.js)
     |
     v
Middlewares (authMiddleware.js, roleMiddleware.js)
     |
     v
Controllers (authController.js / blogController.js)
     |
     v
Services (authService.js / blogService.js)
     |
     v
Prisma ORM
     |
     v
PostgreSQL Database (Supabase)



