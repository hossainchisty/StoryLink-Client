/* eslint-disable no-undef */
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate(); // Get the navigation function
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiBaseUrl}/users/me`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userData => {
        setUserInfo(userData);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    fetch(`${apiBaseUrl}/users/logout`, {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
      navigate('/login'); // Navigate to login page after logout
    });
  }

  const userName = userInfo?.full_name;
  return (
    <header>
      <Link to="/" className="logo">
        StoryLink
      </Link>

      <Link to="/explore" className="feed-link">
        Explore
      </Link>

      <nav>
        {userName && (
          <>
            <Link to="/draft" className='write-link'>Write</Link>
            <Link to="/me" className="profile-link">
              Profile
            </Link>
            <a onClick={logout} className='logout-link'>Log out</a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
