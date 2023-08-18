import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from "../components/Editor";


export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


  async function handleCreatePost(event) {
    event.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('image', files[0]);
    const response = await fetch(`${apiBaseUrl}/posts`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
    if (response.status === 201) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={handleCreatePost}>
      <input type="text"
        placeholder={'Write your article...'}
        onChange={event => setTitle(event.target.value)} />
      <input
        type="file"
        name="image"
        onChange={event => setFiles(event.target.files)}
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '8px' }}>Publish Now</button>

    </form>
  )
}
