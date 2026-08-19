import { apiGet } from "./client";

export const getStats = () => apiGet("/stats");
