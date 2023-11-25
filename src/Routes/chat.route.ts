import { Router } from 'express';
import ChatController from '../Controller/ChatController';
import { attachSocketIOMiddleware } from '../Utils/Middleware/chatMiddleware';
const chatRouter = Router();

chatRouter.post(
  '/med_chat',
  attachSocketIOMiddleware,
  ChatController.connectSocket.bind(ChatController)
);



export default chatRouter;
