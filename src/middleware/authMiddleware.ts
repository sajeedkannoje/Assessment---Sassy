import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces/authenticated-request';

const JWT_SECRET : string = process.env.JWT_SECRET

export namespace AuthMiddleware {
    export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
}
