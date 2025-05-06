import { useState } from "react";
import z from "zod";

import { logError } from "@/services/log-error";
import { useMovieStore } from "@/context/useMovieStore";
import { useUserStore } from "@/context/useUserStore";
import useData from "./useData"
import apiPefa from "@/services/api-pefa";

// TYPE AND INTERFACE
export type FetchGenres = {
    "_id": string,
    "name": string,
}

export const schemaGenre = z.object({
    name: z.string()
        .min(3, "Genre name must be at least 3 characters long.")
        .max(20, "Genre name must not exceed 20 characters.")
        .regex(/^[a-z]+$/, "Genre name must be only small letters.") // Restricts to lowercase letters only
});

export type FormGenre = z.infer<typeof schemaGenre>;

// FUNCTIONS
export const useGenre = () => useData<FetchGenres>("/genres")

export const useGenreActions = () => {
    const { updateActions } = useMovieStore();
    const { accessToken } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<string>("");

    const handleCreate = async (payload: FormGenre) => {
        setAlert("");
        setLoading(true);
        try {
            await apiPefa.post("/genres", payload, {
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            updateActions(["create-genre"]);
            setLoading(false);
            setAlert("Genre created successfully.");
            setTimeout(() => setAlert(""), 3000);
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }
    return { handleCreate, loading, alert };
}

