import { Request, Response } from 'express';
import { socketService } from '../Services/MedChat/Socket'; // Import the Socket.IO service

class ChatController {
  public connectSocket(req: Request, res: Response): void {
    const { io, userId } = req; // Assuming userId is obtained from the authenticated user

    socketService(io, userId); // Pass userId to the socketService
    res.status(200).send('Socket connection established');
  }
}

export default new ChatController();
