import { Router } from 'express';
import { authenticateToken } from '../middleware/index.js';
import { getUserMe, updateUserMe, uploadAvatar} from "../controller/users.js";
import { upload } from "../utils/uploadAvatar.js";
import multer from 'multer';

const router = Router();

router.use(authenticateToken)

router.get('/me', getUserMe);

router.patch('/me', updateUserMe);

router.patch('/me/avatar', upload.single('avatar'), uploadAvatar);

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error' });
    }
    next(error);
});
export const userRouter = router;