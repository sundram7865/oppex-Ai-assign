import axios from 'axios';

const QUARKUS_URL = 'http://localhost:8080/api/users';

export const signupProxy = async (req, res) => {
    try {
        const response = await axios.post(`${QUARKUS_URL}/signup`, req.body);
        res.status(201).json(response.data); // Requirement 1: Signup
    } catch (err) {
        res.status(err.response?.status || 400).json(err.response?.data || { error: "Signup Failed" });
    }
};

export const loginProxy = async (req, res) => {
    try {
        const response = await axios.post(`${QUARKUS_URL}/login`, req.body);
        // Requirement 3 & 6: Session Management/JWT
        res.json(response.data); 
    } catch (err) {
        res.status(401).json({ error: "Unauthorized: Invalid credentials" });
    }
};

export const validateProxy = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.patch(`${QUARKUS_URL}/validate/${id}`);
        res.json(response.data); // Requirement 2: Email Validation
    } catch (err) {
        res.status(404).json({ error: "User not found" });
    }
};