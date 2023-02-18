import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Film, { Rating } from '../models/Film'
import { useFilmsStore } from '../stores'
import Button from './Button'
import Reviews from './Reviews'
import Typography from './Typography'

const StyledFilmPreview = styled.div<{image?: string}>`
  height: 100%;
  background: linear-gradient(rgba(0,0,0,.4) 4%, rgba(0,0,0,0.4) 100%), url(${({image}) => "https://image.tmdb.org/t/p/original/" + image});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;

  .container {
    height: 100%;
    padding-top: 100px;
    display: flex;
    max-width: 1440px;
    justify-content: space-around;
    align-items: flex-start;
    margin: auto;

    iframe {
      border: none;
      border-radius: 16px;
    }

    .film-desc {
      width: 45%;
    }
  }

  .cast {
    display: flex;
    gap: 20px;
    overflow: overlay;

    .actor {
      text-align: center;
      max-height: 260px;

      img {
        width: 120px;
        border-radius: 16px;
        object-fit: cover;
      }
    }
  }

  .film-details {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .reviews-button {
      border-color: white;
    }
  }
  
  .watch-button {
    width: 100%;
    background: #cc1d1d;
    font-size: 18px;
    font-weight: 600;
    padding: 16px;
  }
`

const FilmPreview = ({ film }: { film: Film }) => {
  const navigate = useNavigate();
  const [showReviews, setShowReviews] = useState(false);
  const setSelectedFilm = useFilmsStore((state) => state.setSelectedFilm)

  const calculateRating = (ratings: Rating[]) => {
    return ratings.reduce((acc, rating) => {
      return acc + rating.rating
    }, 0) / ratings.length;
  }

  const handleWatchNow = () => {
    setSelectedFilm(null);
    navigate(`film/${film._id}`, {
      state: {
        filmPoster: "https://image.tmdb.org/t/p/original/" + film.backdrop_path,
      }
    });
  }

  

  return (
    <StyledFilmPreview image={film.backdrop_path} className="film-preview">
      <div className="container">
        <div className='film-preview'>
          <h1>{film.title}</h1>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${film?.trailer}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <div className='film-details'>
            <div>
              <Typography styles={{margin: "0 0 10px"}}>Directed by {film.movieDirector}</Typography>
              <Typography styles={{margin: "0 0 10px"}}>Released {dayjs(film.releaseDate).format('DD-MM-YYYY')}</Typography>
              {film?.rating?.length && <Typography>Rating {calculateRating(film.rating)}/5</Typography>}
            </div>
            <Button color='white' minimal className='reviews-button' onClick={() => setShowReviews(true)}>Show Reviews</Button>
          </div>
        </div>
        <div className='film-desc'>
          <Typography weight='600'>Description</Typography>
          <Typography>{film.description}</Typography>
          <Typography  weight='600'>Cast</Typography>
          <div className='cast'>
            {film.cast.map((actor: any) => (
              <div key={actor.name} className='actor'>
                <img src={actor.image ? `https://image.tmdb.org/t/p/w200${actor.image}` : 'https://via.placeholder.com/120x180?text=No+Photo'}/>
                <Typography>{actor.name}</Typography>
              </div>
            ))}
          </div>
          <Button className='watch-button' onClick={handleWatchNow}>Watch Now</Button>
        </div>
      </div>
     {showReviews && film.rating && <Reviews reviews={film.rating} filmId={film._id} onClose={() => setShowReviews(false)} />}
    </StyledFilmPreview>
  )
}

export default FilmPreview