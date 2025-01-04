import { z } from 'zod';
import { registerSchema, loginSchema } from '../schemas/auth.js';
import { registerUser, loginUser } from '../service/auth.js';

export async function registerController(req, res) {
    try {
        const validatedData = registerSchema.parse(req.body);
        const { token, user } = await registerUser(validatedData);
        res.json({ token, user });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        if (error.message === 'User already exists') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function loginController(req, res) {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { token, user } = await loginUser(validatedData);
        res.json({ token, user });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        if (error.message === 'Invalid credentials') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
}
