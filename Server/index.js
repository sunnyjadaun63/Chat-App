// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const socketio = require('socket.io');


// const http = require('http');
// const { Server } = require('socket.io'); // Import from socket.io




// dotenv.config();

// const app = express();



// const mongoURI = process.env.MONGO_URI; // Replace with your connection string
// console.log('mongoURI: ', mongoURI);

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));




// // Middleware
// app.use(cors());
// app.use(express.json()); // Parse incoming JSON data

// // Routes (implement authentication, message handling, etc.)

// const PORT = process.env.PORT || 5000;

// // const server = app.listen(PORT, () =>
// //     console.log(`Server listening on port ${PORT}`)
// // );
// const server = http.createServer(app);

// const io = socketio(server);
// io.on('connection', (socket) => {
    
//     console.log('A user connected');

//     // Handle socket events (e.g., sending and receiving messages)
//     socket.on('send_message', (data) => {
//         console.log('data: ', data);
//         // Broadcast the message to all connected clients
//         io.emit('receive_message', data);
//     });

//     // Handle disconnect event (optional)
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });


// server.listen(PORT,()=>{
//     console.log(`Server started on port ${PORT}`)

// })

// // Socket.io event handlers for real-time communication


import  express from 'express';
import http from "http"
import dotenv from "dotenv"
import { Server } from 'socket.io';
import cors from "cors"
import mongoose from  "mongoose"
import connectDB from './Mongo.js';
import router from './Routes/Message.js';
import bodyParser from 'body-parser';
dotenv.config()
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true // Allow cookies or authorization tokens

}))
app.use(bodyParser())

const server = http.createServer(app);
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI)
app.use("/api",router)
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust the origin based on your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});