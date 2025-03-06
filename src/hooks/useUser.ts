import { useState } from "react";
import z from "zod";
import useData from "./useData"

import { logError, logActionError } from "@/services/log-error";
import { useUserStore } from "@/context/useUserStore";
import apiPefa from "@/services/api-pefa";

export type Role = {
    "_id": string,
    "title": string,
}

// TYPE AND INTERFACE
export interface FetchUser {
    "_id": string,
    "name": string,
    "email": string,
    "phone": string,
    "password": string,
    "role": Role,
}

export interface UserLogin {
    email: string,
    password: string,
}

export const schemaUser = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string()
        .min(3, "Phone number must be at least 3 characters long.")
        .max(10, "Phone number must not exceed 10 characters.")
        .regex(/^\+?[0-9]+$/, "Phone number must contain only numbers and an optional '+' sign at the beginning.")
        .or(z.literal('')).optional(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .max(20, "Password must not exceed 20 characters.")
        .regex(
            /[A-Z]/,
            "Password must contain at least one uppercase letter."
        )
        .regex(
            /[a-z]/,
            "Password must contain at least one lowercase letter."
        )
        .regex(
            /[0-9]/,
            "Password must contain at least one number."
        )
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character."
        ),
    roleId: z.string().optional(),

});

export type FormUser = z.infer<typeof schemaUser>;

export interface userQuery {
    roleIds: string[],
    search: string,
}

// FUNCTIONS
export const useUser = (userQuery?: userQuery) => useData<FetchUser>("/users",
    {
        params: {
            roleIds: userQuery?.roleIds,
            search: userQuery?.search
        }
    },
    [userQuery]
)

export const useUserActions = () => {
    const { accessToken, updateAccessToken, updateEmail, logout, updateActions } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<string>("");

    // LOGIN
    const handleLogin = async (payload: UserLogin) => {
        setAlert("")
        setLoading(true);
        try {
            const response = await apiPefa.post("/users/login", payload, { withCredentials: true });
            updateAccessToken(response.data.accessToken);
            updateEmail(payload.email);
            setLoading(false);
            setAlert("Login successful!");
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }

    // LOGOUT
    const handleLogout = async () => {
        try {
            await apiPefa.post('/users/logout', null, { withCredentials: true }); // clear refresh tokken in cookies
            logout(); // clear the token and email from the state (or in-memory)
            window.alert("You have been logged out");
        }
        catch (error: any) {
            window.alert(error);
        }
    };

    // REGISTER
    const handleRegister = async (payload: FormUser) => {
        setAlert("");
        setLoading(true);
        try {
            await apiPefa.post("/users", payload, {
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            updateActions(["user-register"]);
            setLoading(false);
            setAlert("Registered successfully!");
        }
        catch (error: any) {
            logError(error, setAlert);
            setLoading(false);
        }
    }

    // UPDATE
    const handleUpdate = async (payload: FetchUser, id: string) => {
        setAlert("");
        setLoading(true);
        try {
            await apiPefa.put(`/users/${id}`, payload, {
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "application/json"
                }
            })

            updateActions(["user-update"]);
            setLoading(false);
            setAlert("User updated successfully!");
        }
        catch (error: any) {
            logActionError(error);
            setLoading(false);
        }
    };

    // DELETE
    const handleDelete = async (id: string) => {
        setAlert("");
        setLoading(true);
        try {
            await apiPefa.delete(`/users/${id}`, {
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            updateActions(['user-delete']);
            setLoading(false);
            window.alert("User deleted successfully");
        }
        catch (error: any) {
            logActionError(error);
            setLoading(false);
        }
    };

    return { accessToken, loading, alert, handleLogin, handleLogout, handleRegister, handleDelete, handleUpdate };
}

