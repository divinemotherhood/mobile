import api from "../client";

export const loginApi = async (idToken: string) => {
    const res = await api.post("/auth/login", { idToken });
    return res.data;
};

export const getUserApi = async (token: string) => {
    const res = await api.get("/users/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};