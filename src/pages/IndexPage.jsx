/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import Post from '../components/Post'


export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/posts/list').then(response => {
      response.json().then(posts => {
        setPosts(posts.data.posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post}/>
      ))}
    </>
  );
}