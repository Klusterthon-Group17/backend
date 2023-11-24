import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import dbSetup from './src/Config/db/db-setup';
import authRouter from './src/Routes/Auth/auth.route';
import * as dotenv from 'dotenv';
import { socketService } from './src/Services/MedChat/Socket';
import { createServer } from 'http'; // Import createServer function
import { Agent } from 'https';
dotenv.config();

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.json());

dbSetup();
app.use(cookieParser(process.env.JWT_SECRET));
const port = process.env.PORT;

// Routes
app.use('/', authRouter);

app.get('/api/v1', (req, res) => {
  res.send('Hello Medi-chat!');
});

// Socket.IO setup
socketService(io);

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
