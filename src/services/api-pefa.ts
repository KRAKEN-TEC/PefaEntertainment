import axios, { CanceledError } from "axios";

const backend_api = import.meta.env.MODE === 'production'
    ? 'https://api.pefaentertainment.com/api'
    : 'http://localhost:3001/api';

// const backend_api = 'https://api.pefaentertainment.com/api'

export default axios.create({
    baseURL: backend_api,
    timeout: 10000,
});

export { CanceledError }
