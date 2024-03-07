import express from 'express';
import { AuthController } from '../controllers/authController';

export namespace AuthRoutes {
    export const router = express.Router();

    router.post('/register', AuthController.register);
    router.post('/login', AuthController.login);
}


// const router = express.Router();

// router.post('/register', AuthController.register);
// router.post('/login', AuthController.login);

// module.exports = router;