import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Film from '../models/Film';
import { useFilmsStore } from '../stores';
import FilmPreview from './FilmPreview';
import Input from './Input';

const StyledSearchFilms = styled.div`
  .search-results {
    position: fixed;
    width: 100%;
    left: 0;
    background: black;
    top: 100%;
    max-height: 500px;
    overflow: overlay;
    z-index: 2;

    ul {
      list-style: none;
      padding: 15px 40px;
      margin: 0;

      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        padding: 10px;
        border-bottom: 1px solid #222;
        cursor: pointer;

        img {
          width: 60px;
          border-radius: 10px;
        }
      }
    }


  }

  .search-blocker {
      position: fixed;
      top: 80px;
      left: 0;
      height: calc(100vh - 80px);
      width: 100vw;
      background: rgba(0,0,0,.5);
      z-index: 1;
    }
`

const SearchFilms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const setSelectedFilm = useFilmsStore((state) => state.setSelectedFilm);

  const searchFilm = async () => {
    const resultsRes = await fetch(`http://localhost:4500/movies/search/${searchQuery}`);
    const results = await resultsRes.json();

    setSearchResults(results);
  }

  useEffect(() => {
    if (searchQuery) {
      searchFilm();
    }
  }, [searchQuery]);

  const handleFilmSelection = (film: Film) => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedFilm(film);
  }
  

  return (
    <StyledSearchFilms>
      <Input placeholder="Search films" style={{ width: "280px" }} value={searchQuery} onChange={({target}: any) => setSearchQuery(target.value)}/>
      {!!searchResults.length && <>
        <div className='search-results'>
          <ul>
            {searchResults.map((result) => (
              <li key={result._id} onClick={() => handleFilmSelection(result)}>
                <img src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`} />
                {result.title}
              </li>
            ))}
          </ul>
        </div>
        <div className='search-blocker' onClick={() => setSearchResults([])} />
      </>}
    </StyledSearchFilms>
  )
}

export default SearchFilms