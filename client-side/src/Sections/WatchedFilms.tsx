import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FilmsTrack from '../components/FilmsTrack';
import Typography from '../components/Typography';
import { useFilmsStore } from '../stores';

const StyledWatchedFilms = styled.div`
  padding-top: 70px;
  max-width: 1440px;
  margin: auto;
`

const WatchedFilms: React.FunctionComponent = () => {

  const seenFilms = useFilmsStore((state) => state.seenFilms);
  const getSeenFilms = useFilmsStore((state) => state.getSeenFilms);
  const setSelectedFilm = useFilmsStore((state) => state.setSelectedFilm);

  useEffect(() => {
    getSeenFilms();
  }, [])
  

  return !!seenFilms.length ? (
    <StyledWatchedFilms>
      <Typography size={24} weight="600">Watch it again!</Typography>
      <FilmsTrack films={seenFilms} onFilmSelect={(film: any) => setSelectedFilm(film)}/>
    </StyledWatchedFilms>
  ) : null
}

export default WatchedFilms;
