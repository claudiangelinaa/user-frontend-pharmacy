import React from "react";
import "../Styles/Components/Paginate.css"

export default function PaginateComponent({
  totalPosts,
  postsPerPage,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="Paginate">
      <nav>
        <ul className="pagination" style={{ textAlign: "center" }}>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
