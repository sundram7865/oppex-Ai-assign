import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // Step 1: Import dotenv
import authRoutes from './routes/authRoutes.js';

// Step 2: Load the environment variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/proxy', authRoutes);

export default app; 

if (process.env.NODE_ENV !== 'test') {
    // Step 3: Provide a fallback port
    const PORT = process.env.PORT ||3000; 
    
    app.listen(PORT, () => {
        // Use the actual PORT variable for the log
        console.log(`🚀 Middleware running in ${process.env.NODE_ENV || 'development'} mode`);
        console.log(`🔗 Accessible at: http://localhost:${PORT}`);
    });
}