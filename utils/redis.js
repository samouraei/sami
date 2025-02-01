const { createClient } = require('redis');

const redisPublisher = createClient({
  socket: { host: "redis", port: 6379 }, // Use the service name "redis"
});

const redisSubscriber = createClient({
  socket: { host: "redis", port: 6379 }, // Use the service name "redis"
});

// Rest of your code...

// Connect Redis clients
(async () => {
  try {
    await redisPublisher.connect();
    await redisSubscriber.connect();
    console.log("✅ Connected to Redis successfully!");
  } catch (err) {
    console.error("❌ Redis Connection Error:", err);
  }
})();

// Error handling
redisSubscriber.on('error', (err) => console.error('❌ Redis Subscriber Error:', err));
redisPublisher.on('error', (err) => console.error('❌ Redis Publisher Error:', err));

// Subscribe to the 'taskUpdates' channel
redisSubscriber.subscribe('taskUpdates', (message) => {
  try {
    const taskUpdate = JSON.parse(message);
    console.log("🔔 Task update received:", taskUpdate);
  } catch (error) {
    console.error("❌ Error parsing Redis message:", error);
  }
});

module.exports = { redisPublisher, redisSubscriber };
