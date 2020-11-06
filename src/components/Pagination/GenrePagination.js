import React from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function PaginationControlled(props) {
  const handleChange = (event, value) => {
    props.handleChange(value);
  };

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
