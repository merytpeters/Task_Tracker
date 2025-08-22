import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import authRouter from './routes/auth.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000', // for local dev
  'http://localhost:3001', // for local dev with Vite
  'https://task-tracker-nine-delta.vercel.app' // Vercel frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
))

app.options('*', cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.get('/api', (req, res) => {
  res.json({message: 'Welcome to the Home Page of Task Tracker'});
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter);


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
