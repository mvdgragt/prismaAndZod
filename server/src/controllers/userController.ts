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

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age, isMarried, sport } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age,
        isMarried,
        sport,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await prisma.user.delete({
      where: { id },
    });
    res.json(deleted);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};
