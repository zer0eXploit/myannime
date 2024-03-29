import React from "react";
import { Breadcrumbs, Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

import classes from "./Breadcrumb.module.css";

const breadCrumb = (props) => {
  return (
    <div className={classes.BreadCrumb}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="textSecondary"
          underline="hover"
          component={RouterLink}
          to="/"
        >
          Home
        </Link>
        {props.name ? (
          <Link
            color="textSecondary"
            underline="hover"
            component={RouterLink}
            to={props.anime_id ? "/Anime/" + props.anime_id : "#"}
          >
            <Typography color={props.episode ? "textSecondary" : "textPrimary"}>
              {props.name.length > 10
                ? props.name.slice(0, 10) + " ..."
                : props.name}
            </Typography>
          </Link>
        ) : null}
        {props.episode ? (
          <Typography color="textPrimary">{props.episode}</Typography>
        ) : null}
      </Breadcrumbs>
    </div>
  );
};

export default breadCrumb;
