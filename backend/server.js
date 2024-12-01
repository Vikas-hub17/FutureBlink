const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database'); // Ensure this path is correct
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(); // This is where the error occurs

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
