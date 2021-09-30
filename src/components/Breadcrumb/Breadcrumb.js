import React from "react";

import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import { Breadcrumbs, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import classes from "./Breadcrumb.module.css";

const BreadCrumb = (props) => {
  const { t } = useTranslation();
  return (
    <div className={classes.BreadCrumb}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="textSecondary"
          underline="hover"
          component={RouterLink}
          to="/"
        >
          {t("breadcrumb.home")}
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

export default BreadCrumb;
