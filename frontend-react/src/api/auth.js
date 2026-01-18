import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/proxy`,
});

export const signupUser = (data) => API.post('/signup', data);
export const loginUser = (data) => API.post('/login', data);
export const validate = (email) => API.patch(`/validate/${email}`);
