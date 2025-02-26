
import { z } from "zod";
import { useUserStore } from "@/context/useUserStore";
import { useState } from "react";
import { useParams } from "react-router";

import { FetchGenres } from "./useGenre";
import { useSerieStore } from "@/context/useSerieStore";
import useData, { useSingleData } from "./useData";
import { logError, logActionError } from "@/services/log-error";
import { createDocument, deleteDocument, updateDocument } from "@/services/serie-service";

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
        ).optional(),
    video: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "video/mp4"
                ].includes(file.type),
            { message: "Invalid video file type" }
        ).optional(),
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
        ).optional(),
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
    isOnGoing: z.boolean().optional(),
    poster: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/png"
                ].includes(file.type),
            { message: "Invalid image file type" }
        ).optional(),
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

export const useSeries = (serieQuery?: SerieQuery) => useData<FetchSeries>('/series',
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

export const useSingleSerie = (serieId?: string) => useSingleData<FetchSeries>(`/series/${serieId}`);

// export const useSeasons = (serieId: string) => useData<FetchSeasons>(`/series/${serieId}/seasons`)
export const useSingleSeason = (serieId?: string, seasonNumber?: string) => useSingleData<FetchSeasons>(`/series/${serieId}/seasons/${seasonNumber}`)

export const useSingleEpisode = (serieId?: string, seasonNumber?: string, episodeNumber?: string) => useSingleData<FetchSeasons>(`/series/${serieId}/seasons/${seasonNumber}/episodes/${episodeNumber}`)


export const useSeasons = (serieId?: string, serieQuery?: SerieQuery) => useData<FetchSeasons>(`/series/${serieId}/seasons`,
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

export const useEpisodes = (serieId?: string, seasonNumber?: string, serieQuery?: SerieQuery) => useData<FetchEpisodes>(`/series/${serieId}/seasons/${seasonNumber}/episodes`,
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
    const { serieId, seasonNumber } = useParams();
    const { updateActions } = useSerieStore();
    const { accessToken } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<string>("");

    const handleSerieCreate = async (payload: FormSerie) => {
        setAlert("");
        setLoading(true);
        try {
            await createDocument("/series", payload, accessToken)
            updateActions(["create-serie"]);
            setLoading(false);
            setAlert("Series created successfully.");
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }

    const handleSerieUpdate = async (payload: FormSerie, serie: FetchSeries) => {
        setAlert("");
        setLoading(true);

        const data = {
            ...payload,
            genreIds: Array.isArray(payload.genreIds) ? payload.genreIds : [payload.genreIds],
            rating: isNaN(payload.rating) ? serie.rating : payload.rating,
        };

        try {
            await updateDocument("/series", serie._id, data, accessToken)
            updateActions(["update-serie"]);
            setLoading(false);
            setAlert("Serie updated successfully");
        } catch (error: any) {
            setLoading(false);
            logActionError(error);
        }
    }

    const handleSerieDelete = async (id: string) => {
        setAlert("");
        setLoading(true);
        try {
            await deleteDocument('/series', id, accessToken);
            updateActions(['delete-serie']);
            setLoading(false);
            window.alert("Series deleted successfully");
        }
        catch (error: any) {
            logActionError(error);
            setLoading(false);
        }
    }

    const handleSeasonCreate = async (payload: FormSeason) => {
        setAlert("");
        setLoading(true);
        try {
            await createDocument(`/series/${serieId}/seasons`, payload, accessToken)
            updateActions(["create-season"]);
            setLoading(false);
            setAlert("Season created successfully.");
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }

    const handleSeasonUpdate = (payload: FormSeason, season: FetchSeasons) => {
        console.log(payload, season)
    }

    const handleSeasonDelete = async (season: FetchSeasons) => {
        setAlert("");
        setLoading(true);
        try {
            await deleteDocument(`/series/${serieId}/seasons`, String(season.seasonNumber), accessToken);
            updateActions(['delete-season']);
            setLoading(false);
            window.alert("Season deleted successfully");
        }
        catch (error: any) {
            logActionError(error);
            setLoading(false);
        }
    }

    const handleEpisodeCreate = async (payload: FormEpisode) => {
        setAlert("");
        setLoading(true);
        try {
            await createDocument(`/series/${serieId}/seasons/${seasonNumber}/episodes`, payload, accessToken)
            updateActions(["create-episode"]);
            setLoading(false);
            setAlert("Episode created successfully.");
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }

    const handleEpisodeUpdate = (payload: FormEpisode, episode: FetchEpisodes) => {
        console.log(payload, episode)
    }

    const handleEpisodeDelete = async (episode: FetchEpisodes) => {
        setAlert("");
        setLoading(true);
        try {
            await deleteDocument(`/series/${serieId}/seasons/${seasonNumber}/episodes`, String(episode.episodeNumber), accessToken);
            updateActions(['delete-season']);
            setLoading(false);
            window.alert("Season deleted successfully");
        }
        catch (error: any) {
            logActionError(error);
            setLoading(false);
        }
    }

    return {
        alert, accessToken, loading,
        handleSerieCreate, handleSerieUpdate, handleSerieDelete,
        handleSeasonCreate, handleSeasonUpdate, handleSeasonDelete,
        handleEpisodeCreate, handleEpisodeUpdate, handleEpisodeDelete
    }
}