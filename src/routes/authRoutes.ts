import { Router } from 'express';
import { AuthController } from '../controllers/authController';

export namespace AuthRoutes {
    export const router = Router();
    router.post('/register', AuthController.register);
    router.post('/login', AuthController.login);
}