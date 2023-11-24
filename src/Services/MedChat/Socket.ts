import { Server, Socket } from 'socket.io';
import { openAI } from './Openai'; // Import your OpenAI service
import { Message } from '../../Models/mesage.model'; 
import log from '../../Utils/logger';

export const socketService = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on(
      'sendMessage',
      async (data: { message: string; userId: number }) => {
        const { message, userId } = data;
        const isMedicalPrompt = isMedicalMessage(message);

        if (isMedicalPrompt) {
          try {
            const medicalResponse = await openAI.generateMedicalResponse(
              message
            );
            const newMessage = await Message.query().insert({
              content: medicalResponse,
              userId, // Assuming userId is associated with the sender of the message
              timestamp: new Date(),
            });
            io.to(socket.id).emit('message', { message: newMessage });
          } catch (error) {
            log.error('Error generating or storing medical response:', error);
            io.to(socket.id).emit('message', {
              message: 'Failed to handle medical prompt',
            });
          }
        } else {
          io.to(socket.id).emit('message', {
            message: 'Please enter a medical-related prompt',
          });
        }
      }
    );
  });
};

const medicalPattern = /(medical|health|hospital|clinic|doctor|malaria|fever|covid|cold)/gi;

function isMedicalMessage(message: string): boolean {
  return medicalPattern.test(message);
}

