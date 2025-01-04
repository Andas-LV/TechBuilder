import { Router } from 'express';
import { registerController, loginController } from "../controller/auth.js";

const router = Router();

router.post('/register', registerController);

router.post('/login', loginController);

export const authRouter = router;
