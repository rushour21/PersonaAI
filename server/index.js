import express from 'express';
import dotenv from 'dotenv';
//import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();

//app.use(express.json());

// Routes
//app.use('/api', chatRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
