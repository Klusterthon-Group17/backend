import { Server } from 'socket.io';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    io?: Server; // Declare the io property on the Request interface
  }
}

// Socket.IO middleware function
export const attachSocketIOMiddleware = (io: Server) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.io = io;
    next();
  };
};
