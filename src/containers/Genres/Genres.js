import React from "react";

import { Helmet } from "react-helmet";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import Loader from "../../components/Loader/Loader";

import axios from "../../util/axiosMyannime";

import themer from "../../config/genreTheme";

const useStyles = makeStyles(themer);

const Genres = (props) => {
  const classes = useStyles();
  const [genresInfo, setGenresInfo] = useState({});

  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("/genres")
      .then((response) => {
        setGenresInfo(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  let dynamicContent = <Loader />;

  if (genresInfo["genres"]) {
    dynamicContent = genresInfo["genres"].map((genre) => {
      return (
        <Grid item lg={6} md={12} xs={12} key={genre.genre_name}>
          <Accordion key={genre.genre_name} className={classes.accordion}>
            <AccordionSummary
              className={classes.margin}
              expandIcon={"⮟"}
              aria-controls="panel1a-content"
              id={genre.genre_name}
            >
              <Typography className={classes.heading}>
                {genre.genre_name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {genre.genre_explanation}
                <br />
                <br />
                <NavLink
                  style={{
                    color: "black",
                  }}
                  to={{
                    pathname: "/genre/" + genre.genre_name.replace(/ /g, "-"),
                  }}
                >
                  {`[${t("genres.seeAnimes")}]`}
                </NavLink>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      );
    });
  }

  return (
    <div className={classes.genres}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("genres.pageTitle")} | MYAN-nime</title>
      </Helmet>
      <Grid container className={classes.genresContainer}>
        <Grid container justify="center">
          {dynamicContent}
        </Grid>
      </Grid>
    </div>
  );
};

export default Genres;
