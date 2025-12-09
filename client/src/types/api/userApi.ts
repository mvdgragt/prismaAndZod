// userApi.ts
import { UserSchema, NewUserSchema, type User, type NewUser } from "../user";
import { z } from "zod";

const API_BASE_URL = "http://localhost:3000";

export const userApi = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    return z.array(UserSchema).parse(data);
  },

  async createUser(user: NewUser): Promise<User> {
    const parsed = NewUserSchema.parse(user); // validate before sending

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });

    if (!response.ok) throw new Error("Failed to create user");

    const data = await response.json();
    return UserSchema.parse(data);
  },

  async updateUser(id: number, updates: Partial<NewUser>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Failed to update user");

    const data = await response.json();
    return UserSchema.parse(data);
  },

  async deleteUser(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete user");

    const data = await response.json();
    return UserSchema.parse(data);
  },
};
