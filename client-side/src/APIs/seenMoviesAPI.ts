import Film from "../models/Film";
import { fetchFilmsById } from "./filmsAPI";

export const fetchSeenMovies = async (userId: number) => {
  const seenMoviesRes = await fetch(`http://localhost:8092/movies/seen?user_id=${userId}`);
  const seenMovies = await seenMoviesRes.json();

  const seenMoviesWithDetails = await Promise.all(seenMovies.map(async (seenMovie: any) => {
    const movie: Film = await fetchFilmsById(seenMovie.externalId);
    return movie
  }))

  return seenMoviesWithDetails
}

export const postSeenMovie = async (movieId: string, userId: number) => {
  await fetch(`http://localhost:8092/movies/seen`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, movieExternalId: movieId }),
  });
}