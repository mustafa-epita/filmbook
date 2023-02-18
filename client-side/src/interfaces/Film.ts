interface Film {
  id: string
  backdrop_path: string
  overview: string
  posterUrl: string
  releaseDate: string,
  title: string
  rate: number,
  trailer: { url: string, site: string }
}

export default Film
