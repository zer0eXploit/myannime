import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function RadioButtons(props) {
  const handleChange = (event) => {
    props.handleChange(event.target.value);
  };

  return (
    <RadioGroup style={{ display: "inline-block" }}>
      <FormLabel component="legend">Default sort order -</FormLabel>
      <FormControlLabel
        value="Title"
        control={
          <Radio
            checked={props.sortBy === "title"}
            onChange={handleChange}
            value="title"
            name="title-sort"
            inputProps={{ "aria-label": "Title" }}
          />
        }
        label="Title"
        labelPlacement="end"
      />

      <FormControlLabel
        value="Rating"
        control={
          <Radio
            checked={props.sortBy === "rating"}
            onChange={handleChange}
            value="rating"
            name="rating-sort"
            inputProps={{ "aria-label": "Rating" }}
          />
        }
        label="Rating"
        labelPlacement="end"
      />
    </RadioGroup>
  );
}
