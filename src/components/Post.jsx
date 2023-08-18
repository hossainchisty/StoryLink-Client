/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id, title, content, cover, createdAt, author}) {
  return (
    <div className="post">
        <div className="image">
          <Link to={`post/${_id}`}>
          
          <img
            src={`http://localhost:8000/${cover}`}
            alt={title}
          />
          </Link>
        </div>
        <div className="texts">
        <Link to={`post/${_id}`}>
          <h2>
            {title}
          </h2>
          </Link>
          <p className="info">
            <a href="" className="author">{author.full_name}</a>
            <time>{format(new Date(createdAt), 'MMM d, YYY HH:mm')}</time>
          </p>
          <p 
            className="summary" 
            dangerouslySetInnerHTML={{ __html: content }} >
          </p>
        </div>
      </div>
  )
}
