"use client";

// -- Constants --
const TOKEN_KEY = "jwt_token";
const ROLE_KEY = "user_role";
const USER_ID_KEY = "user_id";

// -- Types --
export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | null;

// -- Auth Helpers --

export const setAuth = (token: string, role: string, id: string | number) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(ROLE_KEY, role);
        localStorage.setItem(USER_ID_KEY, id.toString());
        // Set cookie for server-side access (expires in 7 days)
        document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    }
};

export const getAuthToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

export const getUserRole = (): UserRole => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(ROLE_KEY) as UserRole;
    }
    return null;
};

export const getUserId = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(USER_ID_KEY);
    }
    return null;
};

export const clearAuth = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
        localStorage.removeItem(USER_ID_KEY);
        // Clear cookie
        document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
    }
};

export const logout = (redirectUrl: string = "/") => {
    clearAuth();
    if (typeof window !== "undefined") {
        window.location.href = redirectUrl;
    }
};

export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return !!token; // Basic check; real apps might decode JWT to check expiry
};
