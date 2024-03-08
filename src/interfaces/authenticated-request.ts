import { Request } from 'express';

/**
 * Interface for authenticated request
 */
export interface AuthenticatedRequest extends Request {
	userId? : string;
}