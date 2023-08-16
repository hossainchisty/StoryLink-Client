import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function login(event) {
    event.preventDefault();
    const requestBody = {
      email: email,
      password: password
    }
    const response = await fetch('http://localhost:8000/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
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
