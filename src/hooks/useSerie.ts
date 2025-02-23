
import { z } from "zod";
import { useUserStore } from "@/context/useUserStore";
import { useState } from "react";
import { FetchGenres } from "./useGenre";
import { useSerieStore } from "@/context/useSerieStore";
import useData, { useSingleData } from "./useData";


export interface FetchEpisodes {
    _id: string;
    title: string;
    episodeNumber: number;
    video_url: string;
    poster_url: string;
    releasedDate: string;
    description: string;
}

export interface FetchSeasons {
    _id: string;
    title: string;
    seasonNumber: number;
    episodes: FetchEpisodes[];
    description: string;
}

export interface FetchSeries {
    _id: string;
    title: string;
    genres: FetchGenres[];
    seasons: FetchSeasons[];
    poster_url: string;
    uploadDate: string;
    rating: number;
    description: string;
    releasedDate: string;
    translator: string;
    encoder: string;
    isOnGoing: boolean;
    studio: string;
}

export const schemaEpisodes = z.object({
    title: z.string().min(1).max(255),
    episodeNumber: z.number({ invalid_type_error: "Episode number must be a number" }).min(1),
    description: z.string().min(0).max(255).or(z.literal('')).optional(),
    releasedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid. Fomat example: YYYY-MM-DD"),
    poster: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/png"
                ].includes(file.type),
            { message: "Invalid image file type" }
        ),
    video: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "video/mp4"
                ].includes(file.type),
            { message: "Invalid video file type" }
        ),
});

export const schemaSeasons = z.object({
    title: z.string().min(1).max(255),
    seasonNumber: z.number({ invalid_type_error: "Season number must be a number" }).min(1),
    description: z.string().min(0).max(255).or(z.literal('')).optional(),
    poster: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/png"
                ].includes(file.type),
            { message: "Invalid image file type" }
        ),
});

export const schemaSeries = z.object({
    title: z.string().min(1).max(255),
    genreIds: z.array(z.string().min(1)).min(1, { message: "You have to choose at least one genre" }),
    rating: z.number({ invalid_type_error: "Rating must be a number" }).min(0).max(10),
    description: z.string().min(0).max(255).or(z.literal('')).optional(),
    releasedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid. Fomat example: YYYY-MM-DD"),
    translator: z.string().min(1),
    encoder: z.string().min(1),
    studio: z.string().min(1),
    poster: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/png"
                ].includes(file.type),
            { message: "Invalid image file type" }
        ),
});

export type FormEpisode = z.infer<typeof schemaEpisodes>;
export type FormSeason = z.infer<typeof schemaSeasons>;
export type FormSerie = z.infer<typeof schemaSeries>;

export interface SerieQuery {
    page: number,
    genres: FetchGenres,
    search: string,
    ordering: string,
}

export const useSerie = (serieQuery?: SerieQuery) => useData<FetchSeries>('/series',
    {
        params: {
            page: serieQuery?.page,
            genres: serieQuery?.genres,
            search: serieQuery?.search,
            ordering: serieQuery?.ordering
        }
    },
    [serieQuery]
)

export const useSeason = (serieId?: string, serieQuery?: SerieQuery) => useSingleData<FetchSeasons[]>(`/series/${serieId}/seasons`,
    {
        params: {
            page: serieQuery?.page,
            genres: serieQuery?.genres,
            search: serieQuery?.search,
            ordering: serieQuery?.ordering
        }
    },
    [serieQuery]
);

export const useEpisode = (serieId?: string, seasonNumber?: string, serieQuery?: SerieQuery) => useSingleData<FetchEpisodes[]>(`/series/${serieId}/seasons/${seasonNumber}/episodes`,
    {
        params: {
            page: serieQuery?.page,
            genres: serieQuery?.genres,
            search: serieQuery?.search,
            ordering: serieQuery?.ordering
        }
    },
    [serieQuery]
);

export const useSerieActions = () => {
    const { updateActions } = useSerieStore();
    const { accessToken } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<string>("");

    const handleSerieCreate = (payload: FormSerie) => {
        // ...
    }

    const handleSerieUpdate = (payload: FormSerie, serie: FetchSeries) => {
        // ...
    }

    const handleSerieDelete = (serie: FetchSeries) => {
        // ...
    }

    const handleSeasonCreate = (payload: FormSeason) => {
        // ...
    }

    const handleSeasonUpdate = (payload: FormSeason, season: FetchSeasons) => {
        // ...
    }

    const handleSeasonDelete = (season: FetchSeasons) => {
        // ...
    }

    const handleEpisodeCreate = (payload: FormEpisode) => {
        // ...
    }

    const handleEpisodeUpdate = (payload: FormEpisode, episode: FetchEpisodes) => {
        // ...
    }

    const handleEpisodeDelete = (episode: FetchEpisodes) => {
        // ...
    }

    return {
        alert, accessToken, loading,
        handleSerieCreate, handleSerieUpdate, handleSerieDelete,
        handleSeasonCreate, handleSeasonUpdate, handleSeasonDelete,
        handleEpisodeCreate, handleEpisodeUpdate, handleEpisodeDelete
    }
}