import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';


export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/users/me', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userData => {
        setUserInfo(userData);
      });
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    fetch('http://localhost:8000/api/v1/users/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const userName = userInfo?.full_name;
  return (
    <header>
      <Link to="/" className="logo">
        StoryLink
      </Link>

      <Link to="/" className="feed-link">
        My Feed
      </Link>

      <Link to="/explore" className="feed-link">
        Explore
      </Link>
      <nav>
        {userName && (
          <>
            <Link to="/draft" className='write-link'>Write</Link>
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
