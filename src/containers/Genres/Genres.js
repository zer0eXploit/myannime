import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import Loader from "../../components/Loader/Loader";
import axios from "../../util/axiosMyannime";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular,
  },
  margin: {
    margin: "5px",
  },
  genres: { display: "flex", justifyContent: "center", width: "100%" },
  genresContainer: {
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "center",
  },
  accordion: { borderRadius: "0 !important" },
}));

const Genres = (props) => {
  const classes = useStyles();
  const [genresInfo, setGenresInfo] = useState({});

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
                    pathname: "/Genre/" + genre.genre_name.replace(/ /g, "-"),
                  }}
                >
                  [See Animes]
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
        <title>Genres | MYAN-nime</title>
      </Helmet>
      <Grid container className={classes.genresContainer}>
        {/* <Typography variant="h5">{"Genre Information"}</Typography> */}
        <Grid container justify="center">
          {dynamicContent}
        </Grid>
      </Grid>
    </div>
  );
};

export default Genres;
