 

export const fetchFilms = async () => {
  const moviesRes = await fetch('http://localhost:4500/movies');
  const movies = await moviesRes.json();

  return movies
}

export const fetchFilmsById = async (filmId: string) => {
  const movieRes = await fetch(`http://localhost:4500/movies/${filmId}`);
  const movie = await movieRes.json();

  return movie
}

export const fetchRecommendedFilms = async () => {
  const movieRes = await fetch(`http://localhost:4500/movies/recommended`);
  const movie = await movieRes.json();

  return movie
}