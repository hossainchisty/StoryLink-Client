import '../styles/Explore.css'; // Import your CSS file

const dummyPosts = [
  {
    id: 1,
    title: 'First Post',
    content: 'This is the content of the first post.',
    imageUrl: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1690175267986/da3e5ed2-6240-41b5-8a53-dcf1ac2bc541.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp', // Replace with your image URLs
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the content of the second post.',
    imageUrl: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1690175267986/da3e5ed2-6240-41b5-8a53-dcf1ac2bc541.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
  },
  // Add more dummy posts as needed
];

export default function Explore() {
  return (
    <div className="explore-container">
      <div className="search-bar">
        <input type="text" placeholder={'Start typing to search'} />
    
      </div>
      <div className="post-list">
        {dummyPosts.map(post => (
          <div key={post.id} className="post-item">
            <div className="post-image">
              <img src={post.imageUrl} alt="Post" />
            </div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
