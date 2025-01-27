const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const http = require('http');
const app = require('./app');  // Your Express app
const initializeSocketServer  = require('./utils/socketServer'); // Import initializeSocketServer

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception... Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to the database
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server and Redis adapter
initializeSocketServer(server); // Initialize only once here

// Start the server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection... Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
