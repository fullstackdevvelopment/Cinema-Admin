import React from 'react';
import PropTypes from 'prop-types';

function Pagination(props) {
  const { totalPages, currentPage, handlePageChange } = props;
  const visiblePages = 6;
  const pages = [];

  const start = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(visiblePages / 2),
      totalPages - visiblePages + 1,
    ),
  );
  const end = Math.min(totalPages, start + visiblePages - 1);

  if (currentPage > 1) {
    pages.push(
      <span key="prev" className="pagination__btn" onClick={() => handlePageChange(currentPage - 1)}>&lt; Prev</span>,
    );
  } else {
    pages.push(<span key="empty-prev" className="empty" />);
  }

  // eslint-disable-next-line no-plusplus
  for (let i = start; i <= end; i++) {
    pages.push(
      <span
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? 'active' : ''}
      >
        {i}
      </span>,
    );
  }

  if (currentPage < totalPages) {
    pages.push(
      <span key="next" className="pagination__btn" onClick={() => handlePageChange(currentPage + 1)}>Next &gt;</span>,
    );
  } else {
    pages.push(<span key="empty-next" className="empty" />);
  }

  return <div className="pagination">{pages}</div>;
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
