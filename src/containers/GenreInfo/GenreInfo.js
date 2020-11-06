import React, { useState, useEffect, Fragment } from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { Helmet } from "react-helmet";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  genreIntro: {
    padding: "2%",
    borderRadius: "0",
    marginBottom: "3%",
  },
  title: {
    marginBottom: "15px",
  },
}));

const GenreInfo = (props) => {
  const classes = useStyles();
  const [genreInfo, setGenreInfo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const genreName = props.location.pathname.split("/")[2];
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:5000/v1/genre/${genreName}`)
      .then((response) => {
        setGenreInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Something went wrong! :(", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  }, [genreName, enqueueSnackbar]);

  let toRender = null;
  let animeCards = null;

  if (isLoading) {
    toRender = <Loader />;
  } else if (!isLoading && genreInfo) {
    if (genreInfo.animes.length) {
      animeCards = genreInfo.animes.map((anime) => {
        return (
          <Grid
            item
            container
            justify="center"
            key={anime.anime_id}
            xs={6}
            sm={4}
            md={3}
            lg={2}
          >
            <Card {...anime} isZawgyi={false} />
          </Grid>
        );
      });
    } else {
      animeCards = (
        <p className={classes.title}>
          Currently, there is no anime in this genre. Please check back again.
        </p>
      );
    }

    toRender = (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{genreInfo.genre_name} | MYAN-nime</title>
        </Helmet>
        <Grid container direction="column" justify="flex-start">
          <Paper className={classes.genreIntro}>
            <Typography variant={"h5"}>{genreInfo.genre_name}</Typography>
            <Typography variant={"subtitle1"}>
              {genreInfo.genre_explanation}
            </Typography>
          </Paper>
          <Grid
            item
            container
            xs={12}
            sm={10}
            style={{ maxWidth: "1500px", padding: "2%", paddingTop: "0.2%" }}
          >
            <Typography variant={"h5"} className={classes.title}>
              {"Anime List"}
            </Typography>
            <Grid container spacing={1} justify="flex-start">
              {animeCards}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  return toRender;
};

export default GenreInfo;
