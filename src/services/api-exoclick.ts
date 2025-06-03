import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
    baseURL: "https://api.exoclick.com/v2",
});

export { AxiosError, CanceledError };