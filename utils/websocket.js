const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const { redisPublisher, redisSubscriber } = require('./redis');
const SECRET_KEY = 'your_jwt_secret'; // Replace with your actual secret

// WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map(); // Map to store user connections

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return null;
  }
}

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  // Parse and verify token from query parameters
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const token = urlParams.get('token');
  const user = verifyToken(token);

  if (!user) {
    ws.close(4001, 'Invalid token');
    return;
  }

  console.log(`User ${user.id} connected`);
  clients.set(user.id, ws);

  // Listen for incoming messages (optional)
  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  // Clean up on disconnection
  ws.on('close', () => {
    console.log(`User ${user.id} disconnected`);
    clients.delete(user.id);
  });
});

// Listen for Redis messages and broadcast to WebSocket clients
redisSubscriber.subscribe('taskUpdates', (message) => {
  const taskUpdate = JSON.parse(message);

  // Send the update to the relevant user
  const ws = clients.get(taskUpdate.userId);
  if (ws) {
    ws.send(JSON.stringify({
      type: 'taskUpdated',
      task: taskUpdate.task,
    }));
  }
});

console.log('WebSocket server running on ws://localhost:8080');
