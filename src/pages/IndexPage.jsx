/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Post from "../components/Post";
import '../styles/Paginaion.css'

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiBaseUrl}/posts/list?page=${currentPage}`).then((response) => {
      response.json().then((data) => {
        setPosts(data.data.posts);
        setTotalPages(data.data.totalPages);
      });
    });
  }, []); // Empty dependency array, runs only on mount

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <>
      {posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}

      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}
