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


const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const cors=require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true // Allow cookies or authorization tokens

}))
const mongoURI = process.env.MONGo_URI; // Replace with your connection string


mongoose.connect("mongodb+srv://sunnyjadaun63:SQthu1fut0pWIFZY@chatapplication.8jcskd1.mongodb.net/?retryWrites=true&w=majority&appName=ChatApplication", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173', // Adjust the origin based on your frontend URL
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