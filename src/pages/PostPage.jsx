/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import {UserContext} from "../context/UserContext";


export default function PostPage() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const apiBaseDomain = import.meta.env.VITE_API_DOMAIN;

    useEffect(() => {
        fetch(`${apiBaseUrl}/posts/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, [apiBaseUrl, id]);

    if (!postInfo) return null;
    return (
        <div className="post-page">
            <h1>{postInfo.data.title}</h1>
            <div className="image">
                <img src={`${apiBaseDomain}/${postInfo.data.cover}`} alt={postInfo.data.title} />
            </div>
            <time>{formatISO9075(new Date(postInfo.data.createdAt))}</time>
            <div className="author">by @{postInfo.data.author.full_name}</div>
            
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.data.content }} />

            {userInfo.id === postInfo.data.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo.data._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                </div>
            )}
        </div>
    )
}
