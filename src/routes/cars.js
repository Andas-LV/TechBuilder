import { Router } from 'express';
import { getCars } from "../controller/cars.js";

const router = Router();

router.get('/', getCars);

export const carRouter = router;
