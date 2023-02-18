import React, { useEffect } from 'react'
import styled from 'styled-components'
import FilmsTrack from '../components/FilmsTrack'
import Typography from '../components/Typography'
import { useFilmsStore } from '../stores'

const StyledRecommendations = styled.div`
  padding-top: 70px;
  max-width: 1440px;
  margin: auto;
`

const Recommendations: React.FunctionComponent = () => {
  const setSelectedFilm = useFilmsStore((state) => state.setSelectedFilm);
  const getRecommendedFilms = useFilmsStore((state) => state.getRecommendedFilms);
  const recommendedFilms = useFilmsStore((state) => state.recommendedFilms);

  useEffect(() => {
    getRecommendedFilms()
  }, [])
  

  return !!recommendedFilms.length ? (
    <StyledRecommendations>
      <Typography size={24} weight="600">Recommendations</Typography>
      <FilmsTrack films={recommendedFilms} onFilmSelect={(film: any) => setSelectedFilm(film)}/>
    </StyledRecommendations>
  ) : null
}

export default Recommendations