import styled from 'styled-components'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import FilmPreviewPopup from './components/FilmPreviewPopup'
import { useFilmsStore } from './stores'
import useUsersStore from './stores/userStore'


const StyledApp = styled.div<{image?: string}>`
  position: relative;
`

interface Film {
  id: number
  backdrop_path: string
}

function App() {

  const selectedFilm = useFilmsStore((state) => state.selectedFilm);
  const user = useUsersStore((state) => state.user);

  return (
    <StyledApp className="App">
      <BrowserRouter>
        {user && <Header />}
        <Router />
        {selectedFilm && <FilmPreviewPopup />}
      </BrowserRouter>
    </StyledApp>
  )
}

export default App
