import { apiGet } from "./client";

export const getGenres = () => apiGet("/genres");
