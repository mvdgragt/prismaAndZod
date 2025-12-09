import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  isMarried: z.boolean(),
  sport: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export const NewUserSchema = UserSchema.omit({ id: true });
export type NewUser = z.infer<typeof NewUserSchema>;
