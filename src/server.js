const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let user_id = JSON.parse(localStorage.getItem("d_user"));
  

io.on('connection', (socket) => {
  socket.emit('user_added', user_id.id);
  console.log('A new client connected');

  // Handle events from the client
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || "https://dating-app-backend-xyrj.onrender.com:3000";
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
