import { apiGet } from "./client";

export const getDirectors = () => apiGet("/directors");
