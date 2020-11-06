import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function PaginationControlled(props) {
  const [page, setPage] = useState(1);
  const { currentPage, sortMethod } = props;
  const handleChange = (event, value) => {
    if (page === value) return;
    props.handlePaginate(value, sortMethod);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div style={{ marginTop: "3%" }}>
      <Pagination
        count={props.totalPages}
        page={props.currentPage}
        onChange={handleChange}
      />
    </div>
  );
}
