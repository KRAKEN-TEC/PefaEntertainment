import { useState } from "react";
import z from "zod";

import { logError } from "@/services/log-error";
import { useUserStore } from "@/context/useUserStore";
import useData from "./useData"
import apiPefa from "@/services/api-pefa";

// TYPE AND INTERFACE
export type FetchRoles = {
    "_id": string,
    "title": string,
}

export const schemaRole = z.object({
    title: z.string()
        .min(3, "Role title must be at least 3 characters long.")
        .max(10, "Role title must not exceed 10 characters.")
        .regex(/^[a-z]+$/, "Role title must be only small letters.") // Restricts to lowercase letters only
});

export type FormRole = z.infer<typeof schemaRole>;

// FUNCTIONS
export const useRole = () => useData<FetchRoles>("/roles")

export const useRoleActions = () => {
    const { accessToken, updateActions } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<string>("");

    const handleCreate = async (payload: FormRole) => {
        setAlert("");
        setLoading(true);
        try {
            await apiPefa.post("/roles", payload, {
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            updateActions(["create-role"]);
            setLoading(false);
            setAlert("Role created successfully.");
            setTimeout(() => setAlert(""), 3000);
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }
    return { handleCreate, loading, alert };
}

