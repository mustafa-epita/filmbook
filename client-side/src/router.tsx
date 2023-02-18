import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import Film from './pages/Film';
import Login from "./pages/Login";
import useUsersStore from "./stores/userStore";
import { useEffect } from "react";

const PrivateRoute = ({children}: any) => {
  const user = useUsersStore((state) => state.user);
  const navigate = useNavigate();

  useEffect( () => {
    if (!user) {
      navigate("/login")
    }
  }, []) 

  return children
}

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="film/:movieId" element={<PrivateRoute><Film /></PrivateRoute>} />
      <Route path="login" element={<PrivateRoute><Login /></PrivateRoute>} />
      <Route path="*" element={<></>} />
    </Routes>
  )
}

export default Router