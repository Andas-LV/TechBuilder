import { z } from 'zod';

export const registerSchema = z.object({
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    username: z.string().min(3).max(20),
    password: z.string().min(3)
});

export const loginSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string()
});