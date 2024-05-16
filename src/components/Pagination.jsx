import React from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <nav className="flex justify-center mt-4 space-x-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        <ChevronLeft />
      </button>
      <span className="px-4 py-2">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;
