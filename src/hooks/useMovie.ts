import { z } from "zod";

import { logActionError, logError } from "@/services/log-error";
import { useUserStore } from "@/context/useUserStore";
import { useMovieStore } from "@/context/useMovieStore";
import { useState } from "react";
import { FetchGenres } from "./useGenre";
import useData from "./useData";
import apiPefa from "@/services/api-pefa";

export interface FetchMovies {
  _id: string;
  title: string;
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
  page?: number;
  genres?: FetchGenres;
  search?: string;
  ordering?: string;
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

export const useMovieActions = () => {
  const { updateActions } = useMovieStore();
  const { accessToken } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string>("");

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
      updateActions(["movie-update"]);
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
      const poster_key = movie.poster_url.split("com/")[1];
      const presigned_poster = await apiPefa.post("/presigned-url/delete-url", {
        KEY: poster_key,
      });

      const video_key = movie.video_url.split("com/")[1];
      const presigned_video = await apiPefa.post("/presigned-url/delete-url", {
        KEY: video_key,
      });

      await apiPefa.delete(`/movies/${movie._id}`, {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // await fetch (url, {method: 'DELETE'})
      // Delete the file from S3 using the pre-signed URL after the movie is successfully deleted
      await fetch(presigned_poster.data.url, {
        method: "DELETE",
      });

      // Delete the file from S3 using the pre-signed URL after the movie is successfully deleted
      await fetch(presigned_video.data.url, {
        method: "DELETE",
      });

      // Update the actions in the store
      updateActions(["movie-delete"]);
      setLoading(false);
      setAlert("Movie deleted successfully");
    } catch (error: any) {
      setLoading(false);
      logActionError(error);
    }
  };

  const handleCreate = async (payload: FormMovie) => {
    setAlert(""); // Reset the alert
    setLoading(true);
    try {
      // Get the pre-signed URL from the backend
      const presigned_poster = await apiPefa.post("/presigned-url/post-url", {
        name: payload.poster.name,
        type: payload.poster.type,
      });
      const presigned_video = await apiPefa.post("/presigned-url/post-url", {
        name: payload.video.name,
        type: payload.video.type,
      });

      // send the payload to the backend
      const { poster, video, ...rest } = payload; // Separate the poster file from the payload
      await apiPefa.post(
        `/movies`,
        {
          ...rest,
          posterName: payload.poster.name,
          videoName: payload.video.name,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Upload the file to S3 using the pre-signed URL after the movie is successfully posted
      await fetch(presigned_poster.data.url, {
        method: "PUT",
        headers: { "Content-Type": payload.poster.type },
        body: payload.poster,
      });

      // Upload the file to S3 using the pre-signed URL after the movie is successfully posted
      await fetch(presigned_video.data.url, {
        method: "PUT",
        headers: { "Content-Type": payload.video.type },
        body: payload.video,
      });

      // Update the actions in the store
      updateActions(["movie-post"]);
      setAlert("Movie posted successfully");
      setLoading(false);
    } catch (error: any) {
      // Handle the error
      logError(error, setAlert);
      setLoading(false);
    }
  };

  return {
    accessToken,
    loading,
    alert,
    handleDelete,
    handleUpdate,
    handleCreate,
  };
};
