import { UserSchema } from "../user";
import { z } from "zod";

const API_BASE_URL = "http://localhost:3000";

export const userApi = {
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    return z.array(UserSchema).parse(data);
  },

  async updateUser() {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to update user");
    const data = await response.json();
    return UserSchema.parse(data);
  },

  async deleteUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete users");
    return await response.json();
  },
};
