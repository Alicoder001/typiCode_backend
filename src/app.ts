import express, { Response, Request } from 'express';
import { postRoutes } from './routes/posts.routes';

const app = express();

app.use(express.json());

app.use('/posts', postRoutes);

export default app;
