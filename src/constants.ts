export const API_BASE_URL = process.env.environment === "production" ? process.env.API_PRIVATE_URL : process.env.API_PUBLIC_URL;

export const API_USERS_URL = `${API_BASE_URL}/users`;