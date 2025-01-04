import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwt_key = process.env.JWT_SECRET || '123';

export async function registerUser(validatedData) {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { phone: validatedData.phone },
                { username: validatedData.username }
            ]
        }
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
        data: {
            phone: validatedData.phone,
            username: validatedData.username,
            password: hashedPassword
        }
    });

    const token = jwt.sign(
        { userId: user.id },
        jwt_key,
        { expiresIn: '10d' }
    );

    return { token, user };
}

export async function loginUser(validatedData) {
    const user = await prisma.user.findUnique({
        where: { username: validatedData.username }
    });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(validatedData.password, user.password);
    if (!validPassword) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { userId: user.id },
        jwt_key,
        { expiresIn: '10d' }
    );

    return { token, user };
}
