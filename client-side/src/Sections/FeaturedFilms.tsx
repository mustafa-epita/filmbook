import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FilmPreview from '../components/FilmPreview'
import FilmsTrack from '../components/FilmsTrack'
import Typography from '../components/Typography'
import { useFilmsStore } from '../stores'
import films from './../movies.json'

const StyledFeaturedFilms = styled.div`
  position: relative;
  height: 100vh;
  min-height: 850px;
  margin-bottom: 100px;

  .featured-films-track {

    position: absolute;
    bottom: -60px;
    left: 0;
    width: 100%;
    background: linear-gradient(0deg, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%);

    .container {
      max-width: 1440px;
      margin: auto;
    }
  }

  
`

const FeaturedFilms = () => {
  // const [films, setFilms] = useState([]);
  const films = useFilmsStore((state) => state.films);
  const getFilms = useFilmsStore((state) => state.getFilms);
  const [selectedFilm, setSelectedFilm] = useState<any>(null);

  useEffect(() => {
    getFilms()
  }, [])

  useEffect(() => {
    if (films.length) {
      setSelectedFilm(films[0])
    }
  }, [films])

  

  return (
    <StyledFeaturedFilms>
      {selectedFilm && <FilmPreview film={selectedFilm} />}
      <div className='featured-films-track'>
        <div className='container'>
          <Typography size={24} weight="600">Featured Films</Typography>
          {selectedFilm && <FilmsTrack films={films} selectedFilm={selectedFilm} onFilmSelect={(film: any) => setSelectedFilm(film)} />}
        </div>
      </div>
    </StyledFeaturedFilms>
  )
}

export default FeaturedFilms