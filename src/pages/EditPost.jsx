/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import toast from "react-hot-toast";


export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    fetch(`${apiBaseUrl}/posts/${id}`).then((response) => {
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
    await fetch(`${apiBaseUrl}/posts/`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    toast.success("Your content has been successfully updated.", {
      icon: "👏",
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
