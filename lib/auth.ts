import { cookies } from "next/headers";

// -- Constants --
const TOKEN_KEY = "jwt_token";
const ROLE_KEY = "user_role";
const USER_ID_KEY = "user_id";

// -- Types --
export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | null;

// -- Auth Helpers (Server-Side Only) --

export const getAuthToken = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_KEY)?.value || null;
};

export const getUserRole = async (): Promise<UserRole> => {
    const cookieStore = await cookies();
    return (cookieStore.get(ROLE_KEY)?.value as UserRole) || null;
};

export const getUserId = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    return cookieStore.get(USER_ID_KEY)?.value || null;
};

export const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAuthToken();
    return !!token;
};
