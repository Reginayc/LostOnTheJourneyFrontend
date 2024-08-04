import axios, { Axios } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5211/api', // Adjust this URL to match your backend API
});

export default api;
