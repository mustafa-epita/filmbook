import Actor from "./Actor"
import Rating from "./Rating"

interface Movie {
  id: string
  title: string
  releaseDate: string
  category: string
  movieDirector: string
  backdrop_path: string
  poster_path: string
  description: string
  trailer: string
  cast: Actor[]
  rating?: Rating[]
}

export default Movie;
