import express, {Request, Response} from 'express';
import { getData } from '../controller/post.controller';
export const postRoutes = express.Router();

postRoutes.get('',getData)
