import { useState, useEffect } from "react";

import { useSeries } from "./useSerie";
import { useMovie } from "./useMovie";

import { FetchMovies } from '@/hooks/useMovie';
import { FetchSeries } from '@/hooks/useSerie';

export interface FetchPefa extends FetchSeries, FetchMovies { }

export function usePefa() {
    const { data: movie, error: movieError, loading: movieLoading } = useMovie();
    const { data: serie, error: serieError, loading: serieLoading } = useSeries();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 
    const data = [
        ...movie,
        ...serie
    ];

    // Update loading and error state when movieLoading or serieLoading and movieError or serireError changes
    useEffect(() => {
        setLoading(movieLoading || serieLoading);
        setError(movieError || serieError)
    }, [movieLoading, serieLoading, movieError, serieError]);

    return { data, error, loading }
}