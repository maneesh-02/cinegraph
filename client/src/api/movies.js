import { apiGet } from "./client";

export const getMovies = () => apiGet("/movies");
export const getMovie = (id) => apiGet(`/movies/${id}`);
export const getMovieActors = (id) => apiGet(`/movies/${id}/actors`);
export const getMovieConnections = (id) => apiGet(`/movies/${id}/connections`);
export const getMovieExplore = (id) => apiGet(`/movies/${id}/explore`);
export const getMovieDiscover = (id) => apiGet(`/movies/${id}/discover`);
