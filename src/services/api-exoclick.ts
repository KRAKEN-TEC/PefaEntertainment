import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
    baseURL: "https://api.exoclick.com/v2",
    headers: { Authorization: "Bearer 8f9c3969e55ad34ebc6ce5fe2ac268c9b1519756" }
});

export { AxiosError, CanceledError };