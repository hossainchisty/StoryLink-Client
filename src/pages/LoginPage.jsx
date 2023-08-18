import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  async function login(event) {
    event.preventDefault();
    const requestBody = {
      email: email,
      password: password
    }
    const response = await fetch(`${apiBaseUrl}/users/login`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.status === 200) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true);
      })
    } else {
      alert('Wrong credentials')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form action="" onSubmit={login}>
      <h1>Login</h1>
      <input type="email" placeholder="Enter your email address" value={email} onChange={event => setEmail(event.target.value)} />
      <input type="password" placeholder="Enter your password" value={password} onChange={event => setPassword(event.target.value)} />
      <button>Login</button>
    </form>
  )
}
