const { createClient } = require('redis');

// Create Redis clients
const redisPublisher = createClient();
const redisSubscriber = createClient();

// Connect Redis clients
redisPublisher.connect();
redisSubscriber.connect();

// Error handling
redisSubscriber.on('error', (err) => console.error('Redis Subscriber Error:', err));
redisPublisher.on('error', (err) => console.error('Redis Publisher Error:', err));

module.exports = { redisPublisher, redisSubscriber };
