import "../styles/Profile.css";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [recentPosts, setRecentPosts] = useState([]);
  const [noRecentPosts, setNoRecentPosts] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiBaseDomain = import.meta.env.VITE_API_DOMAIN;

  useEffect(() => {
    fetch(`${apiBaseUrl}/users/me`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userData) => {
        setUserInfo(userData);
      });
    });

    // Fetch recent posts here
    fetch(`${apiBaseUrl}/posts/me/recent`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((postsData) => {
        if (postsData.data.mostRecentPosts.length === 0) {
          setNoRecentPosts(true); // Set noRecentPosts to true if no recent posts
        } else {
          setRecentPosts(postsData.data.mostRecentPosts);
          setNoRecentPosts(false); // Set noRecentPosts to false if there are recent posts
        }
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-avatar">
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1687070105835/HjhKsJQbK.png?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp" // Replace with your avatar image URL
            alt="Avatar"
            className="avatar-image"
          />
        </div>
        <div className="profile-bio">
          <h2>{userInfo.full_name}</h2>
          <p>
            👨‍💻 Software Engineer | 🛠️ MERN Stack Developer | 🧰 Backend
            Developer | 📚 Lifelong Learner | 🚀 Open Source Enthusiast
          </p>
        </div>
        <div className="edit-profile-button">
          <button>Edit Profile</button>
        </div>

        <div className="post-listing">
          <h2>Recent Activity</h2>
          <div className="post-list">
            {noRecentPosts ? (
              <p>No recent posts found.</p>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="post-item">
                  <img
                    src={`${apiBaseDomain}/${post.cover}`}
                    alt={post.title}
                  />
                  <h3>{post.title}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
