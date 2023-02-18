import React, { useRef } from 'react'
import styled from 'styled-components'

const StyledFilm = styled.div<{image: string, selected: boolean}>`
  position: relative;
  transition: top .2s ease;
  top: ${({selected}) =>  selected ? `-35px;` : '0'};
  min-width: 192px;
  
  .film_poster {
    width: 100%;
    height: 270px;
    border-radius: 8px;
    flex-grow: 1;
    background-image: url(${({image}) => "https://image.tmdb.org/t/p/w200/" + image});
    background-size: cover;
    margin-bottom: 10px;
  }

  .title {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 0 5px;
  }

  .rate {
    margin: 0 0 5px;
  }

  cursor: pointer;
`

const Film = ({ film, onSelect, selected }: {film: any, onSelect: (film: any) => void, selected: boolean}) => {
  const filmRef = useRef<any>(null);

  const handleSelect = () => {
    onSelect(film)
    filmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  return (
    <StyledFilm onClick={handleSelect} image={film.poster_path} selected={selected} >
      <div className='film_poster' ref={filmRef} />
      <p className='title'>{film.title}</p>
      {/* <p className='rate'>{film.vote_average}/10</p> */}
    </StyledFilm>
  )
}

export default Film