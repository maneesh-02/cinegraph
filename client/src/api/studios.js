import { apiGet } from "./client";

export const getStudios = () => apiGet("/studios");
