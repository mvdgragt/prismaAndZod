import { Router } from "express";
import {
  getUsers,
  updateUser,
  deleteUsers,
} from "../controllers/userController.ts";

const router = Router();

router.get("/", getUsers);
router.put("/", updateUser);
router.delete("/", deleteUsers);

export default router;
