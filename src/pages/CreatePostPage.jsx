import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


export default function CreatePostPage() {
  const [title, setTitle] = useState('title');
  const [content, setContent] = useState('content');
  const [files, setFiles] = useState('files');
  const [redirect, setRedirect] = useState(false);

  async function createPost(event) {
    event.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('image', files[0]);
    const response = await fetch('http://localhost:8000/api/v1/posts', {
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
    <form onSubmit={createPost}>
      <input type="text"
        placeholder={'Write your article...'}
        onChange={event => setTitle(event.target.value)} />
      <input
        type="file"
        name="image"
        onChange={event => setFiles(event.target.files)}
      />
      <ReactQuill onChange={newValue => setContent(newValue)} />
      <button style={{ marginTop: '8px' }}>Publish Now</button>

    </form>
  )
}
