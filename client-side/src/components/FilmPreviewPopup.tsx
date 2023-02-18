import React from 'react'
import styled from 'styled-components'
import Film from '../models/Film'
import { useFilmsStore } from '../stores'
import FilmPreview from './FilmPreview'

const StyledFilmPreviewPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 16px;
  overflow: hidden;
  z-index: 4;

  .film-preview {
    padding: 32px;
    overflow: overlay;
  }
`

const StyledPopupBlocker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0, 0.7);
  z-index: 3;
`

const FilmPreviewPopup: React.FunctionComponent = () => {

  const selectedFilm = useFilmsStore((state) => state.selectedFilm);
  const setSelectedFilm = useFilmsStore((state) => state.setSelectedFilm);

  
  return selectedFilm ? (
    <>
      <StyledFilmPreviewPopup>
        <FilmPreview film={selectedFilm} />
      </StyledFilmPreviewPopup>
      <StyledPopupBlocker onClick={() => setSelectedFilm(null)} />
    </>
  ) : null
}

export default FilmPreviewPopup