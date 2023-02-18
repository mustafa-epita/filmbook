import React from 'react'
import FeaturedFilms from '../Sections/FeaturedFilms'
import Recommendations from '../Sections/Recommendations'
import WatchedFilms from '../Sections/WatchedFilms'

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <FeaturedFilms />
      <WatchedFilms />
      <Recommendations />
    </div>
  )
}

export default Home