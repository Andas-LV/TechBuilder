import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

import { authRouter } from './routes/auth.js';
import { userRouter } from "./routes/users.js";
import { carRouter } from "./routes/cars.js";

const app = express();
const PORT = process.env.PORT || 8000;
const origins = process.env.CLIENT_URL || "*"
const httpServer = createServer(app);

app.use(cors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
    credentials: true,
}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/cars', carRouter);

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});