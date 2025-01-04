import path from "path";

export const generateUniqueAvatarFileName = (originalName) => {
    const timestamp = Date.now();
    const extension = path.extname(originalName);
    return `avatars/${timestamp}-${Math.random().toString(36).substring(2, 15)}${extension}`;
};

export const generateUniqueMessageFileName = (originalName) => {
    const timestamp = Date.now();
    const extension = path.extname(originalName);
    return `messages/${timestamp}-${Math.random().toString(36).substring(2, 15)}${extension}`;
};