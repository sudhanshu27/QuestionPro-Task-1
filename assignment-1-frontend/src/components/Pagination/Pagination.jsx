import React from "react";
import "./Pagination.css";

const Pagination = ({
  postsPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  // Only show currentPage -1, currentPage, currentPage +1
  const visiblePages = [];
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i >= 1 && i <= totalPages) {
      visiblePages.push(i);
    }
  }

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            type="button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &larr;
          </button>
        </li>

        {visiblePages.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &rarr;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
