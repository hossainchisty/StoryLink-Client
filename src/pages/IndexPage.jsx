import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Post from "../components/Post";
import "../styles/Paginaion.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function IndexPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setLoading(true); // Start loading
    fetch(`${apiBaseUrl}/posts/list?page=${currentPage}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data.data.posts);
        setTotalPages(data.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Done loading
      });
  }, [apiBaseUrl, currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="index-page">
      {loading && (
        <div className="loading-container">
          <ClipLoader color={"rgba(106, 89, 187, 0.888)"} loading={loading} size={120} />
        </div>
      )}

      {!loading && (
        <>
          {posts.length > 0 &&
            posts.map((post) => <Post key={post._id} {...post} />)}
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
          />
        </>
      )}
    </div>
  );
}
