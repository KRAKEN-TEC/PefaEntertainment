import { z } from "zod";

import { logActionError, logError } from "@/services/log-error";
import { useUserStore } from "@/context/useUserStore";
import { useMovieStore } from "@/context/useMovieStore";
import { useState } from "react";
import { FetchGenres } from "./useGenre";
import useData, { useSingleData } from "./useData";
import apiPefa from "@/services/api-pefa";
import { createDocument, uploadS3File } from "@/services/serie-service";

export interface FetchMovies {
  _id: string;
  title: string;
  slug: string;
  genres: FetchGenres[];
  poster_url: string;
  video_url: string;
  uploadDate: string;
  rating: number;
  description: string;
  releasedDate: string;
  translator: string;
  encoder: string;
  studio: string;
}

export const schemaMovie = z.object({
  title: z.string().min(1).max(255),
  genreIds: z
    .array(z.string().min(1))
    .min(1, { message: "You have to choose at least one genre" }),
  rating: z
    .number({ invalid_type_error: "Rating must be a number" })
    .min(0)
    .max(10),
  description: z.string().min(0).max(255).or(z.literal("")).optional(),
  releasedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid. Fomat example: YYYY-MM-DD"),
  translator: z.string().min(1),
  encoder: z.string().min(1),
  studio: z.string().min(1),
  poster: z
    .instanceof(File)
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Invalid image file type",
    }),
  video: z
    .instanceof(File)
    .refine((file) => ["video/mp4"].includes(file.type), {
      message: "Invalid video file type",
    }),
});

export type FormMovie = z.infer<typeof schemaMovie>;

export interface MovieQuery {
  page: number;
  genres: FetchGenres;
  search: string;
  ordering: string;
}

export const useMovie = (movieQuery?: MovieQuery) => useData<FetchMovies>("/movies",
  {
    params: {
      page: movieQuery?.page,
      genres: movieQuery?.genres,
      search: movieQuery?.search,
      ordering: movieQuery?.ordering,
    },
  },
  [movieQuery]
);

export const useSingleMovie = (id?: string) => useSingleData<FetchMovies>(`movies/${id}`);

export const useMovieActions = () => {
  const { updateActions } = useMovieStore();
  const { accessToken } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string>("");

  const handleCreate = async (payload: FormMovie) => {
    setAlert(""); // Reset the alert
    setLoading(true);

    try {
      // CREATE DOCUMENT IN DATABASE
      const response = await createDocument('/movies', payload, accessToken);
      updateActions(["create"]);
      setAlert("Movie created successfully! Your movie is now uploading");
      setLoading(false);

      // UPLOAD TO S3
      await uploadS3File(payload.poster, '/movies', response.data._id, accessToken);
      await uploadS3File(payload.video, '/movies', response.data._id, accessToken);
      updateActions(["ready"]);

    }
    catch (error: any) {
      logError(error, setAlert);
      setLoading(false);
    }
  };

  const handleUpdate = async (payload: FormMovie, movie: FetchMovies) => {
    setAlert("");
    setLoading(true);

    const data = {
      ...payload,
      genreIds: Array.isArray(payload.genreIds) ? payload.genreIds : [payload.genreIds],
      rating: isNaN(payload.rating) ? movie.rating : payload.rating,
    };

    try {
      await apiPefa.put(`/movies/${movie._id}`, data, {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json", // set content type to json
        },
      });
      updateActions(["put"]);
      setLoading(false);
      setAlert("Movie updated successfully");
    } catch (error: any) {
      setLoading(false);
      logActionError(error);
    }
  };

  const handleDelete = async (movie: FetchMovies) => {
    setAlert("");
    setLoading(true);
    try {
      const posterKey = movie.poster_url.split("net/")[1];
      const videoKey = movie.video_url.split("net/")[1];

      const presigned_poster = await apiPefa.post("/presigned-url/delete-url", {
        key: posterKey,
      });

      const presigned_video = await apiPefa.post("/presigned-url/delete-url", {
        key: videoKey,
      });

      // DELETE DOCUMENT FROM S3
      await apiPefa.delete(`/movies/${movie._id}`, {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });


      // DELETE FILES FROM S3
      await fetch(presigned_poster.data.url, {
        method: "DELETE",
      });


      await fetch(presigned_video.data.url, {
        method: "DELETE",
      });

      // UPDATE ACTIONS IN STORE
      updateActions(["delete"]);
      setLoading(false);
      setAlert("Movie deleted successfully");
    }
    catch (error: any) {
      setLoading(false);
      logActionError(error);
    }
  };

  return { accessToken, loading, alert, handleDelete, handleUpdate, handleCreate, };
};
