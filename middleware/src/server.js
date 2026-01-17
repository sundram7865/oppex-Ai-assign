import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/proxy', authRoutes);

// Export for Testing (Requirement 5)
export default app; 

// CONDITIONAL START: This prevents the EADDRINUSE error during tests
if (process.env.NODE_ENV !== 'test') {
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Node.js Middleware running on http://localhost:${PORT}`);
    });
}