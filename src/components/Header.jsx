import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';


export default function Header() {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/users/me', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userData =>{
        console.log(userData.full_name)
        setUserName(userData.full_name)
      });
    })

  }, []);

  function logout() {
    fetch('http://localhost:8000/api/v1/users/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserName(null);
  }
  return (
    <header>
        <Link to="/" className="logo">
          StoryLink
        </Link>
        <nav>
        {userName && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
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
