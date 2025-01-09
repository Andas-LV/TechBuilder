import {
    fetchUserById,
    checkUserExists,
    updateUser,
    uploadAvatarToS3,
    deleteOldAvatar,
} from '../service/users.js';
import { Roles } from '../utils/consts.js';

export async function getUserMe(req, res) {
    try {
        const user = await fetchUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error in /me endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateUserMe(req, res) {
    try {
        const { username, phone, role  } = req.body;

        if (role) {
            if (!['ADMIN', 'SUPERADMIN'].includes(req.user.role)) {
                return res.status(403).json({ error: 'Permission denied to update role' });
            }

            if (!Roles.includes(role)) {
                return res.status(400).json({ error: 'Invalid role' });
            }
        }

        if (phone || username) {
            const existingUser = await checkUserExists({ phone, username, excludeUserId: req.user.id });

            if (existingUser) {
                return res.status(400).json({ error: 'Phone or username already taken' });
            }
        }

        const updatedUser = await updateUser(
            req.user.id,
            {
                ...(username && { username }),
                ...(phone && { phone }),
                ...(role && { role }),
            }
        );

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function uploadAvatar(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const userId = req.user.id;

        const user = await fetchUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newAvatarUrl = await uploadAvatarToS3(req.file);

        await updateUser(userId, { avatarUrl: newAvatarUrl });

        await deleteOldAvatar(user.avatarUrl);

        res.json({
            message: 'Avatar updated successfully',
            avatarUrl: newAvatarUrl,
        });
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({ error: 'Failed to update avatar' });
    }
}
