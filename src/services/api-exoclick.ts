import axios, { AxiosError, CanceledError } from "axios";

export default axios.create({
    baseURL: "https://api.exoclick.com/v2",
    headers: {
        Authorization: "Bearer dc2776486256a2706db646f2120c209b214bc6b1"
    }
});

export { AxiosError, CanceledError };