// Inside your Redis server file (e.g., redis.js)
const { createClient } = require('redis');

const redisPublisher = createClient();
const redisSubscriber = createClient();

// Connect Redis clients
redisPublisher.connect();
redisSubscriber.connect();

// Error handling
redisSubscriber.on('error', (err) => console.error('Redis Subscriber Error:', err));
redisPublisher.on('error', (err) => console.error('Redis Publisher Error:', err));

// Subscribe to the 'taskUpdates' channel
redisSubscriber.subscribe('taskUpdates', (message) => {
  const taskUpdate = JSON.parse(message);

  // Logic to notify the admin goes here
  console.log("Task update received: ", taskUpdate);
  // You can send a message to the admin via socket or another notification service.
});

module.exports = { redisPublisher, redisSubscriber };
