import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { postSeenMovie } from '../APIs/seenMoviesAPI';
import useUsersStore from '../stores/userStore';

const StyledFilmView = styled.div`
  video {
    height: calc(100vh - 80px);
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
`

const Film = () => {
  let params = useParams();
  const location = useLocation();
  let filmPoster = location?.state?.filmPoster;
  const user = useUsersStore((state) => state.user)

  useEffect(() => {
    if (params.movieId && user?.id) {
      postSeenMovie(params.movieId, user.id);
    }
  }, [])

  return (
    <StyledFilmView>
      <video width="400" controls poster={filmPoster} autoPlay>
        <source src="https://cdn.discordapp.com/attachments/612002213090295811/670674461954932756/Shrek_1.mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </StyledFilmView>
  )
}

export default Film