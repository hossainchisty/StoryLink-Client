import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/posts/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.data.title);
        setContent(postInfo.data.content);
        setFiles(postInfo.data.cover);
      });
    });
  }, [id]);

  async function handleEditPost(event) {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("image", files?.[0]);
    }
    await fetch(`http://localhost:8000/api/v1/posts/`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={handleEditPost}>
      <input
        type="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "8px" }}>Update Now</button>
    </form>
  );
}
