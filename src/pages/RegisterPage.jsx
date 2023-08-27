import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleFullNameChange = event => setFullName(event.target.value);
  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  async function sendRegistrationRequest() {
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

    return response;
  }

  async function register(event) {
    event.preventDefault();

    const response = await sendRegistrationRequest();

    if (response.status === 201) {
      toast.success("Congratulations, you're all set!", {
        icon: "🚀"
      });
      navigate('/login');
    } else {
      const alertMessage =
        response.status === 429
          ? 'Too Many Requests, please try again later'
          : 'Registration failed';
      toast.error(alertMessage);
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text" placeholder="Enter your name" value={fullName} onChange={handleFullNameChange} />
      <input type="email" placeholder="Enter your email address" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
      <button>Register</button>
      <Link to='/login' className="form-link">Already have an account?</Link>
    </form>
  );
}
