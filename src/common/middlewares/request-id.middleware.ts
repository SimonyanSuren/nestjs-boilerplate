import { REQUEST_ID_HEADER } from '@common/constants';
import { type Request, type Response } from 'express';

// Middleware function to generate and set a request ID if it doesn't exist
export const RequestIdMiddleware = (req: Request, res: Response, next: () => void): void => {
  // Check if the request ID header is missing
  if (!req.headers[REQUEST_ID_HEADER]) {
    // Generate a new UUID and set it as the request ID header
    req.headers[REQUEST_ID_HEADER] = crypto.randomUUID();
  }

  res.set(REQUEST_ID_HEADER, req.headers[REQUEST_ID_HEADER]);
  next();
};
