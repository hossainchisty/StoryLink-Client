import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${apiBaseUrl}/users/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.status === 200) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        navigate("/"); // Redirect to the home page
      } else {
        toast.error("Wrong credentials");
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          autoFocus
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/forgotten-password" className="form-link">
        Forgotten password?
      </Link>
    </div>
  );
}