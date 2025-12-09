# 📘 User Management App

_A full-stack CRUD application built with React, TailwindCSS, Express, Prisma, and PostgreSQL._

## ✨ Features

### **Frontend (React + TypeScript + TailwindCSS)**

- Fetch and display users
- Add a new user
- Edit user via modal (name, email, age, sport, married)
- Delete individual users
- Toggle married/unmarried
- Zod for runtime validation
- Clean Tailwind UI

### **Backend (Express + Prisma + PostgreSQL)**

- REST API (`/users`)
- CRUD operations
- Prisma Client for DB access
- Schema-driven validation
- CORS support
- JSON request parsing

---

## 🛠️ Tech Stack

### **Frontend**

- React (Vite)
- TypeScript
- TailwindCSS
- Zod
- Fetch API

### **Backend**

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- CORS middleware
- TypeScript

---

## 📂 Folder Structure

```
project/
│
├── backend/
│   ├── app.ts
│   ├── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── routes/
│       │   └── userRoutes.ts
│       └── controllers/
│           └── userController.ts
│
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── types/
    │   │   ├── user.ts
    │   │   └── api/userApi.ts
    │   └── index.css
    └── vite.config.ts
```

---

# 🚀 Getting Started

## 1️⃣ Backend Setup (Express + Prisma)

### **Install dependencies**

```bash
cd backend
npm install
```

### **Configure PostgreSQL**

Create a `.env` file:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE"
```

### **Prisma Setup**

```bash
npx prisma migrate dev
npx prisma generate
```

### **Start backend**

```bash
npm run dev
```

Running at:

```
http://localhost:3000
```

---

## 2️⃣ Frontend Setup (React + TailwindCSS)

### Install dependencies

```bash
cd frontend
npm install
```

### Start frontend

```bash
npm run dev
```

Running at:

```
http://localhost:5173
```

---

# 🔌 API Endpoints (REST)

| Method | Endpoint     | Description            | Body                                     |
| ------ | ------------ | ---------------------- | ---------------------------------------- |
| GET    | `/users`     | Get all users          | —                                        |
| POST   | `/users`     | Create new user        | `{ name, email, age, isMarried, sport }` |
| PUT    | `/users/:id` | Update a specific user | Partial user body                        |
| DELETE | `/users/:id` | Delete a specific user | —                                        |

### **User Model**

```ts
{
  id: number;
  name: string;
  email: string;
  age: number;
  isMarried: boolean;
  sport: string;
}
```

---

# 🧱 Database Schema (Prisma)

```prisma
model User {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  age       Int
  isMarried Boolean
  sport     String
}
```

---

# 🧩 Architecture Diagram

```
┌──────────────────┐        HTTP REST        ┌──────────────────┐
│     Frontend     │  ─────────────────────> │     Express API  │
│ React + Tailwind │                         │  /users endpoints│
└──────────────────┘ <────────────────────── └──────────────────┘
        ▲                                          │
        │                                          ▼
        │        Prisma Client (Type-safe)   ┌──────────────┐
        └────────────────────────────────────│   PostgreSQL │
                                             │     DB       │
                                             └──────────────┘
```

---

# 🧪 Example Requests

### Create a user

```json
POST /users
{
  "name": "Jane",
  "email": "jane@example.com",
  "age": 28,
  "isMarried": false,
  "sport": "running"
}
```

### Update a user

```json
PUT /users/1
{
  "sport": "swimming",
  "isMarried": true
}
```

### Delete a user

```
DELETE /users/1
```

---

# 🛠️ Troubleshooting

### ❗ Updates not syncing to Prisma

Make sure:

1. Backend route path is correct:

```ts
router.put("/:id", updateUser);
```

2. Your controller updates fields:

```ts
prisma.user.update({
  where: { id },
  data: req.body,
});
```

3. Age is converted properly:

```ts
age: Number(editingForm.age);
```

4. Backend is restarted after edits:

```
Ctrl + C
npm run dev
```

5. Check the browser Network tab for status codes.
