/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  content,
  cover,
  createdAt,
  author,
}) {
  const maxWordsInSummary = 20; 

  // Split the content into words and get the first 'maxWordsInSummary' words
  const words = content.split(" ");
  const summaryWords = words.slice(0, maxWordsInSummary);
  const summary = summaryWords.join(" ");
  const shouldShowEllipsis = words.length > maxWordsInSummary;
  const apiBaseDomain = import.meta.env.VITE_API_DOMAIN;

  return (
    <div className="post">
      <div className="image">
        <Link to={`post/${_id}`}>
          <img src={`${apiBaseDomain}/${cover}`} alt={title} />
        </Link>
      </div>
      <div className="texts">
        <Link to={`post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            {author.full_name}
          </a>
          <time>{format(new Date(createdAt), "MMM d, YYY HH:mm")}</time>
        </p>
        <p className="summary">
          <span dangerouslySetInnerHTML={{ __html: summary }} />
          {shouldShowEllipsis && ' ... '}
          {/* "Read more" link */}
          <Link to={`post/${_id}`} className="read-more">Read more</Link>
        </p>
      </div>
    </div>
  );
}
