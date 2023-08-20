import '../styles/Profile.css';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const dummyPosts = [
    {
        id: 1,
        title: 'First Post',
        content: 'This is the content of the first post.',
    },
    {
        id: 2,
        title: 'Second Post',
        content: 'This is the content of the second post.',
    },
    // Add more dummy posts as needed
];


export default function Profile() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
      fetch(`${apiBaseUrl}/users/me`, {
        credentials: 'include',
      }).then(response => {
        response.json().then(userData => {
          setUserInfo(userData);
        });
      })
  
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
                        👨‍💻 Software Engineer | 🛠️ MERN Stack Developer | 🧰 Backend Developer | 📚 Lifelong Learner | 🚀 Open Source Enthusiast
                    </p>
                </div>
                <div className="edit-profile-button">
                    <button>Edit Profile</button>
                </div>

                <div className="post-listing">
                    <h2>Recent Activity</h2>
                    <div className="post-list">
                        {dummyPosts.map(post => (
                            <div key={post.id} className="post-item">

                                <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1690175267986/da3e5ed2-6240-41b5-8a53-dcf1ac2bc541.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" alt="Post Image" />

                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
