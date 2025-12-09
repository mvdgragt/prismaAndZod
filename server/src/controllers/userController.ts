import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { sport: { in: ["cycling", "swimming"] } },
    });
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: "sofia.nyman@sundsgarden.se" },
      data: {
        isMarried: true,
        sport: "cycling",
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const deleted = await prisma.user.deleteMany({
      where: { age: { gt: 30 } },
    });
    res.json(deleted);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};
