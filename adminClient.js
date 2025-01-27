const io = require('socket.io-client');

// Connect to the server (replace with your actual server address)
const socket = io('http://localhost:3000', {
  transports: ['websocket'],  // Use WebSocket for communication
});

// Listen for task updates
socket.on('taskUpdate', (taskUpdate) => {
  console.log('Task update received from socket:', taskUpdate);
});

// Simulate a connection
socket.on('connect', () => {
  console.log('Connected to server as admin.');
});

// Listen for disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});
