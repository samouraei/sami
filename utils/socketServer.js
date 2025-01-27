const { redisSubscriber } = require('./redis'); // Import your redisSubscriber

module.exports = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: "*", // Allow all origins (adjust for production)
      methods: ["GET", "POST"],
    },
  });

  // Listen for Redis messages
  redisSubscriber.on('message', (channel, message) => {
    if (channel === 'taskUpdates') {
      const taskUpdate = JSON.parse(message);

      // Emit the task update to all connected clients (e.g., admin)
      io.emit('taskUpdate', taskUpdate);
    }
  });

  // Assuming admin user has a specific socket event they can listen to
  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Listen for notifications
    socket.on('adminNotification', (data) => {
      console.log("Admin notification received: ", data);
      // Send notification to admin client
      socket.emit('taskUpdate', data);
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected:', socket.id);
    });
  });

  return io;
};
