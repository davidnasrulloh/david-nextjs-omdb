import axios from "axios";

const olympic = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

// olympic.interceptors.request.use((config) => {
//     const access_token = sessionStorage.getItem("accessToken");
//     if (access_token) {
//         config.headers.Authorization = `Bearer ${access_token}`;
//     }
//     return config;
// });

olympic.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response || ![400].includes(error.response.status)) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default olympic;
