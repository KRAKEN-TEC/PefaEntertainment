import axios, { CanceledError } from "axios";

// const backend_api = import.meta.env.MODE === 'production'
//     ? 'http://103.253.147.175:3001/api'
//     : 'http://localhost:3001/api';

export default axios.create({
    baseURL: 'http://103.253.147.175:3001/api',
    timeout: 10000,
});

export { CanceledError }