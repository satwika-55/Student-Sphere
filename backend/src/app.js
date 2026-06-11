import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.routes.js';
import gitaRouter from "./routes/gita.routes.js";


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.use("/api/gita", gitaRouter);


export default app;