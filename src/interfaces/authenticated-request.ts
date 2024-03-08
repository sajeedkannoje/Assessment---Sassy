
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    userId?: string; // Assuming userId is of type string
}