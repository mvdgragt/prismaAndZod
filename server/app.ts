import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/users", userRoutes);

export default app;
