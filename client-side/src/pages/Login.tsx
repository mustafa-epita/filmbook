import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { loginUser, registerUser } from '../APIs/userAPI'
import FilmBookLogo from '../assets/filmbook.Logo'
import Button from '../components/Button'
import Input from '../components/Input'
import Typography from '../components/Typography'
import useUsersStore from '../stores/userStore'

const StyledLoginPage = styled.div`
  background: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .container {
    width: 500px;
    max-height: 500px;
  }

  input {
    margin-bottom: 32px;
  }

  button {
    width: 100%;
    background: #cc1d1d;
    font-size: 18px;
    font-weight: 600;
    padding: 16px;
  }

  .tabs {
    display: flex;
    list-style: none;
    margin: 45px 0;
    padding: 0;
    cursor: pointer;
    
    li {
      flex: 1;
      &.active {
        border-bottom: 3px solid #cc1d1d;
      }
    }
  }
`

const Login = () => {
  const [tab, setTab] = useState("login")
  const isRegister = tab === "register"
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const setUsers = useUsersStore((state) => state.setUsers);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value});
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    if (!state.username || !state.password) {
      setError("Username and Password are both required for login");
      return
    }

    try {
      const user = await loginUser({ username: state.username, password: state.password});
      setUsers(user);
      navigate("/");
    } catch (error) {
      console.log(error)
      setError("There was a problem logging in");
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    if (state.password !== state.confirmPassword) {
      setError("Passwords do not match");
      return
    }

    try {
      const user = await registerUser({ username: state.username, password: state.password});
      setUsers(user);
      navigate("/");
    } catch (error) {
      setError("There was a problem creating your account");
    }
  }

  return (
    <StyledLoginPage>
      <div className='container'>
        <FilmBookLogo />
        <ul className='tabs'>
          <li className={!isRegister ? 'active' : ''} onClick={() => setTab("login")}><Typography size={24} weight="500">Login</Typography></li>
          <li className={isRegister ? 'active' : ''}  onClick={() => setTab("register")}><Typography size={24} weight="500">Register</Typography></li>
        </ul>
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <Input name="username" type="text" placeholder="Username" value={state.username} onChange={handleChange} />
          <Input name="password" placeholder="Password" value={state.password} onChange={handleChange} type="password" />
          {isRegister && <Input name="confirmPassword" placeholder="Confirm Password" value={state.confirmPassword} onChange={handleChange} type="password" />}
          <Button type="submit">{isRegister ? "Register" : "Login"}</Button>
        </form>
        {error && <Typography color='#cc1d1d'>{error}</Typography>}
      </div>
    </StyledLoginPage>
  )
}

export default Login