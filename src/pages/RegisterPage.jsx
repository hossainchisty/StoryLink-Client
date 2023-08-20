import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


  async function register(event) {
    event.preventDefault();

    const requestBody = {
      full_name: fullName,
      email: email,
      password: password
    };

    const response = await fetch(`${apiBaseUrl}/users/register`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 201) {
      return <Navigate to={'/login'} />
    } else if (response.status === 429) {
      alert('Too Many Requests, please try again later');
    }
    else {
      alert('Registration failed');
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text" placeholder="Enter your name" value={fullName} onChange={event => setFullName(event.target.value)} />
      <input type="email" placeholder="Enter your email address" value={email} onChange={event => setEmail(event.target.value)} />
      <input type="password" placeholder="Enter your password" value={password} onChange={event => setPassword(event.target.value)} />
      <button>Register</button>
    </form>
  );
}
