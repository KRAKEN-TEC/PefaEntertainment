
import { useEffect, useState } from "react"
import { AxiosRequestConfig } from "axios";

import { useUserStore } from "@/context/useUserStore";
import { useMovieStore } from "@/context/useMovieStore";
import { CanceledError } from "../services/api-pefa"
import apiPefa from "../services/api-pefa"

export interface FetchResponse<T> {
    count: number;
    page_size: number;
    results: T[];
}

export function useSingleData<T>(endpoint: string, requestConfig?: AxiosRequestConfig, dep?: any[]) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
                setError(error.message)
                setLoading(false)
            })

        return () => {
            controller.abort()
        }
    }, dep ? [...dep] : [])

    return { data, error, loading };
}


function useData<T>(endpoint: string, requestConfig?: AxiosRequestConfig, dep?: any[]) {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { actions: userStoreActions } = useUserStore();
    const { actions: movieStoreActions } = useMovieStore();

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
                setError(error.message)
                setLoading(false)
            })

        return () => {
            controller.abort()
        }
    }, dep ? [...dep, userStoreActions, movieStoreActions] : [userStoreActions, movieStoreActions])

    return { data, error, loading };
}

export default useData;