import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();


const QUARKUS_URL = process.env.QUARKUS_BASE_URL || 'http://localhost:8080/api/users';

export const signupProxy = async (req, res) => {
    try {
        
        const response = await axios.post(`${QUARKUS_URL}/signup`, req.body);
        res.status(201).json(response.data); 
    } catch (err) {
        console.error("Signup Proxy Error:", err.message);
        res.status(err.response?.status || 400).json(
            err.response?.data || { error: "Signup service unavailable" }
        );
    }
};

export const loginProxy = async (req, res) => {
    try {
        
        const response = await axios.post(`${QUARKUS_URL}/login`, req.body);
        res.json(response.data); 
    } catch (err) {
        console.error("Login Proxy Error:", err.message);
        res.status(401).json({ error: "Unauthorized: Invalid credentials" });
    }
};

export const validateProxy = async (req, res) => {
    const { email } = req.params; 
    
    if (!email) {
        return res.status(400).json({ error: "Email parameter is required" });
    }

    
    const targetUrl = `${QUARKUS_URL}/validate-by-email/${email}`;
    console.log(`[Middleware] Proxying validation for: ${email}`);

    try {
        
        const response = await axios.patch(targetUrl);
        res.json(response.data);
    } catch (err) {
        const statusCode = err.response?.status || 500;
        console.error(`[Quarkus Error] Status: ${statusCode} - ${err.message}`);
        
        res.status(statusCode).json({ 
            error: statusCode === 404 ? "User not found" : "Backend validation failed" 
        });
    }
};