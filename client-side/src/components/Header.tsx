import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import FilmBookLogo from '../assets/filmbook.Logo'
import useUsersStore from '../stores/userStore'
import Button from './Button'
import SearchFilms from './SearchFilms'
import Typography from './Typography'

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 80px;

  backdrop-filter: blur(5px);
  background: rgba(0,0,0,0.5);

  .container {
    max-width: 1440px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  svg {
    height: 50px;
    width: auto;
  }

  .header-controls {
    display: flex;
    gap: 32px;
    align-items: center;
  }
`

const Header: React.FunctionComponent = () => {
  const user = useUsersStore((state) => state.user);
  const removeUser = useUsersStore((state) => state.removeUser);
  const navigate = useNavigate();

  const handleSignOut = () => {
    removeUser();
    navigate("/login");
  }

  return (
    <StyledHeader>
      <div className="container">
        <Link to=""><FilmBookLogo /></Link>
        <div className='header-controls'>
          <SearchFilms />
          <Typography size={18} weight="500" styles={{ margin: 0}}>Hi, {user?.username}</Typography>
          <Button minimal color="white" onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    </StyledHeader>
  )
}

export default Header