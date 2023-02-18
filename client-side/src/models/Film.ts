interface Actor {
  name: string
  image: string
}

export interface Rating {
  rating: number
  commentTitle: string
  commentContent: string
  userId: number
}

interface Film {
  _id: string
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

export default Film