import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate(); // Get the navigate function

  async function login(event) {
    event.preventDefault();
    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/users/login`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.status === 200) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        navigate('/'); // Use navigate to redirect to the home page
      } else {
        toast.error('Wrong credentials')
      }
    } catch (error) {
      toast.error('Successfully toasted!')
    }
  }

  return (
    <form onSubmit={login}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
      <Link to='/forgotten-password' className="form-link ">Forgotten password?</Link>
    </form>
  );
}
