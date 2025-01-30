const { createClient } = require('redis');

const redisPublisher = createClient({
  socket: { host: "127.0.0.1", port: 6379 }, // Force IPv4
});

const redisSubscriber = createClient({
  socket: { host: "127.0.0.1", port: 6379 }, // Force IPv4
});

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
