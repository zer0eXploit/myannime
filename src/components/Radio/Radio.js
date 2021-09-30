import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function RadioButtons(props) {
  const { t } = useTranslation();

  const [selectedValue, setSelectedValue] = useState("title");
  const { sortMethod } = props;
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    const currentPage = props.currentPage;
    props.handlePaginate(currentPage, event.target.value);
  };

  useEffect(() => {
    setSelectedValue(sortMethod);
  }, [sortMethod]);

  return (
    <RadioGroup style={{ display: "inline-block" }}>
      <FormLabel component="legend">{t("home.sortOrder")} -</FormLabel>
      <FormControlLabel
        value="Title"
        control={
          <Radio
            checked={selectedValue === "title"}
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
            checked={selectedValue === "rating"}
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
