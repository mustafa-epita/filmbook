import styled from 'styled-components'
import Film from './Film'

const StyledFilmsTrack = styled.div`
  display: flex;
  gap: 24px;
  overflow: auto;
  padding-top: 35px;
`

const FilmsTrack = ({films, selectedFilm, onFilmSelect, className}: any) => {
  return !!films.length ? (
    <StyledFilmsTrack className={`films-track ${className}`}>
      {films.map((film: any) => (
        <Film key={film._id} film={film} onSelect={() => onFilmSelect(film)} selected={selectedFilm?._id === film._id} />
      ))}
    </StyledFilmsTrack>
  ) : null
}

export default FilmsTrack