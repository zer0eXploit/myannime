import React from "react";
import axios from "axios";

import { Helmet } from "react-helmet";
import { useSnackbar } from "notistack";
import { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";

import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import Radio from "../../components/Radio/GenreRadio";
import Pagnation from "../../components/Pagination/GenrePagination";

import themer from "../../config/genreInfoTheme";

const useStyles = makeStyles(themer);

const GenreInfo = (props) => {
  const classes = useStyles();
  const [genreInfo, setGenreInfo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const { enqueueSnackbar } = useSnackbar();

  const genreName = props.location.pathname.split("/")[2];

  const handleChange = (value) => setPageNumber(value);
  const handleChangeRadio = (value) => setSortBy(value);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/genre/${genreName}?page=${pageNumber}&sort_by=${sortBy}`)
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
  }, [genreName, enqueueSnackbar, pageNumber, sortBy]);

  let toRender = null;
  let animeCards = null;
  let pagination = null;
  let sortRadio = null;

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
      pagination = (
        <Grid item container justify={"center"}>
          <Pagnation
            totalPages={genreInfo.total_pages}
            currentPage={genreInfo.current_page}
            handleChange={handleChange}
          />
        </Grid>
      );
      sortRadio = (
        <Grid item container justify={"center"} style={{ marginTop: "3%" }}>
          <Radio
            sortBy={genreInfo.sorted_by}
            handleChange={handleChangeRadio}
          ></Radio>
        </Grid>
      );
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
          <Grid item style={{ maxWidth: "1500px" }}>
            <Paper className={classes.genreIntro}>
              <Typography variant={"h5"}>{genreInfo.genre_name}</Typography>
              <Typography variant={"subtitle1"}>
                {genreInfo.genre_explanation}
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            container
            style={{ maxWidth: "1500px", padding: "2%", paddingTop: "0.2%" }}
          >
            <Typography variant={"h5"} className={classes.title}>
              {"Anime List"}
            </Typography>
            <Grid container spacing={1} justify="flex-start">
              {animeCards}
              {pagination}
              {sortRadio}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  return toRender;
};

export default GenreInfo;
