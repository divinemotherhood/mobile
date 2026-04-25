import api from "../client";

export const loginApi = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    return res.data;
};