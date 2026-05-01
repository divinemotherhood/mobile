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

export const personalizeProfileApi = async (data: FormData) => {
    console.log("data1", data)
    const res = await api.post("/users/update-profile", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export const updatePregnancyDetailApi = async (data: any) => {
    const res = await api.post("/users/pregnancy-detail", data);
    return res.data;
}