import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import dbSetup from './src/Config/db/db-setup';
import authRouter from './src/Routes/Auth/auth.route';
import userRouter from './src/Routes/Auth/user.route';
import chatRouter from './src/Routes/chat.route';
import * as dotenv from 'dotenv';
import { socketService } from './src/Services/MedChat/Socket';
import https from 'https'; // Import 'https' module
import log from './src/Utils/logger';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Create an HTTP server
const httpServer = http.createServer(app);

// Ignore SSL certificate errors for all HTTPS requests globally
https.globalAgent.options.rejectUnauthorized = false;

const io = new SocketIOServer(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'development'
        ? false
        : ['http://localhost:4000', 'http://127.0.0.1:4000'],
  },
});

app.use(express.json());
dbSetup();
app.use(cookieParser(process.env.JWT_SECRET));

// Routes
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', chatRouter);

app.get('/api/v1', (req, res) => {
  res.send('Hello Medi-chat!');
});

// Socket.IO setup
socketService(io);

io.on('connection', (socket) => {
  log.info(`Socket connected: ${socket.id}`);

  // Handle events here
  socket.on('sendMessage', (data) => {
    // Process and emit messages
    io.emit('newMessage', { message: 'A new message' });
  });

  // Other event handlers can be added here
});

httpServer.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
