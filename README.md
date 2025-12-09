📘 User Management App

A full-stack CRUD application built with React, TailwindCSS, Express, Prisma, and PostgreSQL.

<p align="center"> <img src="https://img.shields.io/badge/React-18-blue?logo=react" /> <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" /> <img src="https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss" /> <img src="https://img.shields.io/badge/Express.js-4-black?logo=express" /> <img src="https://img.shields.io/badge/Prisma-ORM-2d3748?logo=prisma" /> <img src="https://img.shields.io/badge/PostgreSQL-15-4169e1?logo=postgresql" /> </p>
📷 Screenshots

(Replace these images with your own once your UI is finalized.)

Users List Edit Modal

✨ Features
Frontend (React + TypeScript + TailwindCSS)

Fetch and display users

Add a new user

Edit user via modal (name, email, age, sport, married)

Delete individual users

Toggle married/unmarried

Zod for runtime validation

Clean Tailwind UI

Backend (Express + Prisma + PostgreSQL)

REST API (/users)

CRUD operations

Prisma Client for DB access

Schema-driven validation

CORS support

JSON request parsing

🛠️ Tech Stack
Frontend

React (Vite)

TypeScript

TailwindCSS

Zod

Fetch API

Backend

Node.js

Express

Prisma ORM

PostgreSQL

CORS middleware

TypeScript

📂 Folder Structure
project/
│
├── backend/
│ ├── app.ts
│ ├── server.ts
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── migrations/
│ └── src/
│ ├── routes/
│ │ └── userRoutes.ts
│ └── controllers/
│ └── userController.ts
│
└── frontend/
├── src/
│ ├── App.tsx
│ ├── types/
│ │ ├── user.ts
│ │ └── api/userApi.ts
│ └── index.css
└── vite.config.ts

🚀 Getting Started
1️⃣ Backend Setup (Express + Prisma)
Install dependencies
cd backend
npm install

Configure PostgreSQL

Create a .env file:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE"

Prisma Setup
npx prisma migrate dev
npx prisma generate

Start backend
npm run dev

Running at:

http://localhost:3000

2️⃣ Frontend Setup (React + TailwindCSS)
Install dependencies
cd frontend
npm install

Start frontend
npm run dev

Running at:

http://localhost:5173

🔌 API Endpoints (REST)
Method Endpoint Description Body
GET /users Get all users —
POST /users Create new user { name, email, age, isMarried, sport }
PUT /users/:id Update a specific user Partial user body
DELETE /users/:id Delete a specific user —
User Model
{
id: number
name: string
email: string
age: number
isMarried: boolean
sport: string
}

🧱 Database Schema (Prisma)
model User {
id Int @id @default(autoincrement())
name String
email String @unique
age Int
isMarried Boolean
sport String
}

🧩 Architecture Diagram
┌──────────────────┐ HTTP REST ┌──────────────────┐
│ Frontend │ ─────────────────────> │ Express API │
│ React + Tailwind │ │ /users endpoints │
└──────────────────┘ <────────────────────── └──────────────────┘
▲ │
│ ▼
│ ┌──────────────┐
│ Prisma Client (Type-safe) │ PostgreSQL │
└────────────────────────────────────│ DB │
└──────────────┘

🧪 Example Requests
Create a user
POST /users
{
"name": "Jane",
"email": "jane@example.com",
"age": 28,
"isMarried": false,
"sport": "running"
}

Update a user
PUT /users/1
{
"sport": "swimming",
"isMarried": true
}

Delete a user
DELETE /users/1

🛠️ Troubleshooting
❗ Updates not syncing to Prisma

Make sure:

1. Backend route uses correct path:
   router.put("/:id", updateUser);

2. Body is passed to Prisma:
   prisma.user.update({
   where: { id },
   data: req.body
   });

3. You convert age string → number:
   age: Number(editingForm.age)

4. You restart backend after changes:
   Ctrl + C → npm run dev

5. Check Network tab:

200 OK = backend succeeded

500 = Prisma error

404 = wrong route path

204 = no body to parse
