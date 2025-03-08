import { z } from "zod";
import { useUserStore } from "@/context/useUserStore";
import { useState } from "react";
import { useParams } from "react-router";

import { FetchGenres } from "./useGenre";
import { useSerieStore } from "@/context/useSerieStore";
import useData, { useSingleData } from "./useData";
import { logError, logActionError } from "@/services/log-error";
import { createDocument, deleteDocument, deleteS3File, updateDocument, uploadS3File } from "@/services/serie-service";
import generateSlug from "@/services/generate-slug";

export interface FetchEpisodes {
    _id: string;
    title: string;
    episodeNumber: number;
    video_url: string;
    poster_url: string;
    releasedDate: string;
    description?: string;
}

export interface FetchSeasons {
    _id: string;
    title: string;
    seasonNumber: number;
    poster_url?: string;
    episodes: FetchEpisodes[];
    description?: string;
}

export interface FetchSeries {
    _id: string;
    title: string;
    slug: string;
    genres: FetchGenres[];
    seasons: FetchSeasons[];
    poster_url?: string;
    uploadDate: string;
    rating: number;
    description?: string;
    releasedDate: string;
    translator: string;
    encoder: string;
    isOnGoing: boolean;
    studio: string;
}

export const schemaEpisodes = z.object({
    title: z.string().min(1).max(255),
    episodeNumber: z.number({ invalid_type_error: "Episode number must be a number" }).min(1),
    description: z.string().min(0).max(510).or(z.literal('')).optional(),
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
    description: z.string().min(0).max(510).or(z.literal('')).optional(),
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
    description: z.string().min(0).max(510).or(z.literal('')).optional(),
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

export const useSingleSerie = (serieSlug?: string) => useSingleData<FetchSeries>(`/series/${serieSlug}`);
export const useSingleSeason = (serieSlug?: string, seasonNumber?: string) => useSingleData<FetchSeasons>(`/series/${serieSlug}/seasons/${seasonNumber}`)
export const useSingleEpisode = (serieSlug?: string, seasonNumber?: string, episodeNumber?: string) => useSingleData<FetchEpisodes>(`/series/${serieSlug}/seasons/${seasonNumber}/episodes/${episodeNumber}`)

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

export const useSeasons = (serieSlug?: string, serieQuery?: SerieQuery) => useData<FetchSeasons>(`/series/${serieSlug}/seasons`,
    {
        params: {
            page: serieQuery?.page,
            search: serieQuery?.search,
            ordering: serieQuery?.ordering
        }
    },
    [serieQuery, serieSlug]
);

export const useEpisodes = (serieSlug?: string, seasonNumber?: string, serieQuery?: SerieQuery) => useData<FetchEpisodes>(`/series/${serieSlug}/seasons/${seasonNumber}/episodes`,
    {
        params: {
            page: serieQuery?.page,
            search: serieQuery?.search,
            ordering: serieQuery?.ordering
        }
    },
    [serieQuery, seasonNumber, serieSlug]
);

export const useSerieActions = () => {
    const { serieSlug, seasonNumber } = useParams();
    const { updateActions } = useSerieStore();
    const { accessToken } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<string>("");
    const seasonEndPoint = `/series/${serieSlug}/seasons`
    const episodeEndPoint = `/series/${serieSlug}/seasons/${seasonNumber}/episodes`

    const handleSerieCreate = async (payload: FormSerie) => {
        setAlert("");
        setLoading(true);
        try {
            await createDocument("/series", payload, accessToken);
            if (payload.poster) await uploadS3File(payload.poster, "/series", generateSlug(payload.title), accessToken)
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
            await updateDocument("/series", serie.slug, data, accessToken)
            updateActions(["update-serie"]);
            setLoading(false);
            setAlert("Serie updated successfully");
        } catch (error: any) {
            setLoading(false);
            logActionError(error);
        }
    }

    const handleSerieDelete = async (serie: FetchSeries) => {
        setAlert("");
        setLoading(true);
        try {
            if (serie.poster_url) await deleteS3File(serie.poster_url);
            await deleteDocument('/series', serie.slug, accessToken);
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
            await createDocument(seasonEndPoint, payload, accessToken)
            if (payload.poster) await uploadS3File(payload.poster, seasonEndPoint, payload.seasonNumber, accessToken)
            updateActions(["create-season"]);
            setLoading(false);
            setAlert("Season created successfully.");
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }

    const handleSeasonUpdate = async (payload: FormSeason, season: FetchSeasons) => {
        setAlert("");
        setLoading(true);

        const data = {
            ...payload,
        };

        try {
            await updateDocument(seasonEndPoint, season.seasonNumber, data, accessToken)
            updateActions(["update-season"]);
            setLoading(false);
            setAlert("Serie updated successfully");
        } catch (error: any) {
            setLoading(false);
            logActionError(error);
        }
    }

    const handleSeasonDelete = async (season: FetchSeasons) => {
        setAlert("");
        setLoading(true);
        try {
            if (season.poster_url) await deleteS3File(season.poster_url);
            await deleteDocument(seasonEndPoint, season.seasonNumber, accessToken);
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
            await createDocument(episodeEndPoint, payload, accessToken)
            await uploadS3File(payload.poster, episodeEndPoint, payload.episodeNumber, accessToken)
            updateActions(["create"]);
            setLoading(false);
            setAlert("Episode created successfully! Your episode is now uploading.");

            await uploadS3File(payload.video, episodeEndPoint, payload.episodeNumber, accessToken)
            updateActions(["ready"])
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }

    const handleEpisodeUpdate = async (payload: FormEpisode, episode: FetchEpisodes) => {
        setAlert("");
        setLoading(true);

        const data = {
            ...payload,
        };

        try {
            await updateDocument(episodeEndPoint, episode.episodeNumber, data, accessToken)
            updateActions(["update-episode"]);
            setLoading(false);
            setAlert("Serie updated successfully");
        } catch (error: any) {
            setLoading(false);
            logActionError(error);
        }
    }

    const handleEpisodeDelete = async (episode: FetchEpisodes) => {
        setAlert("");
        setLoading(true);
        try {
            await deleteS3File(episode.poster_url)
            await deleteS3File(episode.video_url)
            await deleteDocument(episodeEndPoint, episode.episodeNumber, accessToken);
            updateActions(['delete-episode']);
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