import { create } from 'zustand'
import { fetchFilms, fetchRecommendedFilms } from '../APIs/filmsAPI'
import { fetchSeenMovies } from '../APIs/seenMoviesAPI'
import Film from '../models/Film'
import useUsersStore from './userStore'

interface FilmState {
  films: Film[]
  selectedFilm: Film | null
  seenFilms: Film[]
  recommendedFilms: Film[]
  getSeenFilms: () => void
  getFilms: () => void
  setSelectedFilm: (film: Film | null) => void
  getRecommendedFilms: () => void
}

const useFilmsStore = create<FilmState>((set, get) => ({
  films: [],
  selectedFilm: null,
  seenFilms: [],
  recommendedFilms: [],
  getFilms: async () => {
    const films = await fetchFilms();
    set({ films })
  },
  getSeenFilms: async () => {
    const user = useUsersStore.getState().user;
    if (!user) return
    const { id: userId } = user;
    const seenFilms = await fetchSeenMovies(userId);
    set({ seenFilms })
  },
  setSelectedFilm: (film) => {
    set({selectedFilm: film})
  },
  getRecommendedFilms: async () => {
    const films = await fetchRecommendedFilms();
    set({ films })
  },
}))

export default useFilmsStore