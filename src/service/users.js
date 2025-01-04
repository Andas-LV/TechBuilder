import { PrismaClient } from '@prisma/client';
import { deleteFileFromS3 } from "../utils/uploadAvatar.js";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/aws.js';
import { generateUniqueAvatarFileName } from "../utils/generateUniqueName.js";

const prisma = new PrismaClient();

export async function fetchUserById(userId) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            username: true,
            avatarUrl: true,
            updatedAt: true,
        },
    });
}

export async function checkUserExists({ email, username, excludeUserId }) {
    return prisma.user.findFirst({
        where: {
            OR: [
                email ? { email } : {},
                username ? { username } : {},
            ],
            NOT: { id: excludeUserId },
        },
    });
}

export async function updateUser(userId, data) {
    return prisma.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            email: true,
            username: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

export async function uploadAvatarToS3(file) {
    const fileName = generateUniqueAvatarFileName(file.originalname);

    await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    }));

    return `https://${process.env.AWS_STORAGE_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION_NAME}.amazonaws.com/${fileName}`;
}

export async function deleteOldAvatar(avatarUrl) {
    if (avatarUrl) {
        await deleteFileFromS3(avatarUrl);
    }
}
