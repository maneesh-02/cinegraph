import { apiGet } from "./client";

export const getActors = () => apiGet("/actors");
export const getActor = (id) => apiGet(`/actors/${id}`);
export const getActorMovies = (id) => apiGet(`/actors/${id}/movies`);
export const getActorDirectors = (id) => apiGet(`/actors/${id}/directors`);
