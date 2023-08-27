/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Explore.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const apiBaseDomain = import.meta.env.VITE_API_DOMAIN;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchPosts = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResult([]); // Clear search result if search term is empty
      return;
    }

    fetch(`${apiBaseUrl}/posts/search?title=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResult(data.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchPosts(searchTerm);
  }, [searchTerm]);

  return (
    <div className="explore-container">
      <div className="search-bar">
        <input
          autoFocus
          type="text"
          placeholder="Start typing to search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="post-list">
        {searchResult.map((post) => (
          <div key={post.id} className="post-item">
            <div className="post-image">
              <img src={`${apiBaseDomain}/${post.cover}`} alt={post.title} />
            </div>
            <h3>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
