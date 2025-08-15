import express from 'express';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', chatRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
