
import { useEffect, useState } from "react"
import { AxiosRequestConfig } from "axios";

import { useUserStore } from "@/context/useUserStore";
import { useMovieStore } from "@/context/useMovieStore";
import { CanceledError } from "../services/api-pefa"
import apiPefa from "../services/api-pefa"
import { useSerieStore } from "@/context/useSerieStore";

export interface FetchResponse<T> {
    count: number;
    page_size: number;
    results: T[];
}

function useData<T>(endpoint: string, requestConfig?: AxiosRequestConfig, dep?: any[]) {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { actions: userStoreActions } = useUserStore();
    const { actions: movieStoreActions } = useMovieStore();
    const { actions: serieStoreActions } = useSerieStore();

    useEffect(() => {
        setLoading(true)

        const controller = new AbortController();

        apiPefa
            .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
            .then(response => {
                setData(response.data.results)
                setLoading(false)
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                switch (error.status) {
                    case 400:
                    case 404:
                    case 401:
                    case 403:
                        setError(error.response.data.message);
                        break;
                    case 500:
                        if (error.response.data.message === "jwt malformed") {
                            setError("Please log in first.");
                        }
                        else if (error.response.data.message === "jwt expired") {
                            setError("Please refresh.");
                        }
                        else {
                            setError(error.response.data.message);
                        }
                        break;
                    default:
                        console.log(error)
                        setError("Error Status Code 500! An unexpected error occurred");
                }
                setLoading(false)
            })

        return () => {
            controller.abort()
        }
    }, dep ? [...dep, userStoreActions, movieStoreActions, serieStoreActions] : [userStoreActions, movieStoreActions, serieStoreActions])

    return { data, error, loading };
}

export function useSingleData<T>(endpoint: string, requestConfig?: AxiosRequestConfig, dep?: any[]) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { actions } = useSerieStore();

    useEffect(() => {
        setLoading(true)

        const controller = new AbortController();

        apiPefa
            .get<T>(endpoint, { signal: controller.signal, ...requestConfig })
            .then(response => {
                setData(response.data)
                setLoading(false)
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                switch (error.status) {
                    case 400:
                    case 404:
                    case 401:
                    case 403:
                        setError(error.response.data.message);
                        break;
                    case 500:
                        if (error.response.data.message === "jwt malformed") {
                            setError("Please log in first.");
                        }
                        else if (error.response.data.message === "jwt expired") {
                            setError("Please refresh.");
                        }
                        else {
                            setError(error.response.data.message);
                        }
                        break;
                    default:
                        console.log(error)
                        setError("Error Status Code 500! An unexpected error occurred");
                }
                setLoading(false)
            })

        return () => {
            controller.abort()
        }
    }, dep ? [...dep, actions] : [actions])

    return { data, error, loading };
}

export default useData;