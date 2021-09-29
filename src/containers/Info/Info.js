import React from "react";

import {
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../components/Loader/Loader";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import EpisodesList from "../../components/EpisodesList/EpisodesList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import * as actions from "../../store/actions/index";

import toZawgyi from "../../util/convertToZg";

import classes from "./Info.module.css";

function AnimeInfo(props) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.info.error);
  const loading = useSelector((state) => state.video.loading);
  const isZawgyi = useSelector((state) => state.video.isZawgyi);
  const animeInfo = useSelector((state) => state.info.animeInfo);
  const animeBookmarked = useSelector((state) => state.info.animeBookmarked);

  // Directly checked for access token existence instead from state
  // because state update is async and if authData is updated only after
  // getting animeInfo, then auth headers will not be present in the
  // request to get anime info as access token is used to check if a user
  // has bookmarked the anime or not.
  const accessToken = localStorage.getItem("token");

  const { name, location, history } = props;

  const ANIME_INFO = "အချက်အလက်များ";
  const NUMBER_OF_EPISODES = "အပိုင်းအရေအတွက်";
  const ANIME_COMPLETION = "ဇာတ်လမ်းပြီးမြောက်မှု";
  const GENRES = "ဇာတ်လမ်းအမျိုးအစား";
  const SYNOPSIS = "ဇာတ်လမ်းအကျဥ်း";
  const BOOKMARK_TEXT = "သိမ်းဆည်းမည်";
  const REMOVE_BOOKMARK_TEXT = "သိမ်းဆည်းထားခြင်းမှ ပြန်ဖျက်မည်";

  useEffect(() => {
    const animeId = location.pathname.split("/")[2];
    if (name === animeId) return;

    const redirectFunc = history.push;

    if (accessToken) {
      dispatch(actions.fetchInfoData(animeId, redirectFunc, accessToken));
    } else {
      dispatch(actions.fetchInfoData(animeId, redirectFunc));
    }

    dispatch(actions.clearVideoData());
  }, [dispatch, accessToken, name, location, history]);

  const handleBookmarkChange = () => {
    const animeId = animeInfo.anime_id;
    dispatch(actions.setBookmarkOption(!animeBookmarked, animeId));
  };

  let dynamicContent = null;

  if (loading) {
    dynamicContent = <Loader />;
  }

  if (!loading && animeInfo) {
    dynamicContent = (
      <Grid item xs={10} sm={8} className={classes.MaxWidth}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${animeInfo.title} Information | MYAN-nime`}</title>
        </Helmet>
        <Breadcrumb name={animeInfo.title} anime_id={animeInfo.anime_id} />
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12} md={4} className={classes.CenterAlign}>
            <div className={classes.MiddleAlignImage}>
              <Grid item style={{ width: "100%" }}>
                <Paper className={classes.PosterPaper}>
                  <img src={animeInfo.poster_uri} alt={name} width="100%" />
                </Paper>
              </Grid>
            </div>
            <Grid item xs={12} className={classes.InfoCardsMargin}>
              <Paper className={classes.Paper}>
                <Typography variant="h5">
                  {isZawgyi ? toZawgyi(ANIME_INFO) : ANIME_INFO}
                </Typography>
                <div className={classes.AdditionalInfo}>
                  <Typography variant="subtitle1">
                    {isZawgyi
                      ? toZawgyi(NUMBER_OF_EPISODES)
                      : NUMBER_OF_EPISODES}
                  </Typography>
                  <Chip
                    label={animeInfo.number_of_episodes}
                    className={classes.Chip}
                    color="secondary"
                  />
                </div>
                <div className={classes.AdditionalInfo}>
                  <Typography variant="subtitle1">
                    {isZawgyi ? toZawgyi(ANIME_COMPLETION) : ANIME_COMPLETION}
                  </Typography>
                  <Chip
                    color="secondary"
                    label={animeInfo.status ? "Ongoing" : "Completed"}
                    className={classes.Chip}
                  />
                </div>
                <div className={classes.AdditionalInfo}>
                  <Typography variant="subtitle1">{"Release Date"}</Typography>
                  <Chip
                    color="secondary"
                    label={animeInfo.release}
                    className={classes.Chip}
                  />
                </div>
                <div className={classes.AdditionalInfo}>
                  <Typography variant="subtitle1">{"Rating"}</Typography>
                  <Chip
                    color="secondary"
                    label={animeInfo.rating}
                    className={classes.Chip}
                  />
                </div>
                <Typography variant="subtitle1">
                  {isZawgyi ? toZawgyi(GENRES) : GENRES}
                </Typography>
                {animeInfo.genres.map((genre) => {
                  return (
                    <NavLink
                      className={classes.GenreLink}
                      to={"/genre/" + genre.replace(/ /g, "-")}
                      key={genre}
                    >
                      <Button variant="contained" color="secondary">
                        {genre}
                      </Button>
                    </NavLink>
                  );
                })}
              </Paper>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={8}>
            <Grid item xs={12} className={classes.InfoCardsMargin}>
              <Paper className={classes.Paper}>
                <Typography variant="h5">{animeInfo.title}</Typography>
                <hr />
                <br />
                <Typography variant="h5">
                  {isZawgyi ? toZawgyi(SYNOPSIS) : SYNOPSIS}
                </Typography>
                <br />
                <div className={classes.Synopsis}>
                  <Typography variant="subtitle1">
                    {isZawgyi
                      ? toZawgyi(animeInfo.synopsis)
                      : animeInfo.synopsis}
                  </Typography>
                </div>
                <div className={classes.SaveAnimeSwitch}>
                  {/* Login button or Save anime switch */}
                  {accessToken ? (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={animeBookmarked}
                          onChange={handleBookmarkChange}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label={
                        animeBookmarked ? REMOVE_BOOKMARK_TEXT : BOOKMARK_TEXT
                      }
                    />
                  ) : (
                    <>
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push("/auth")}
                      >
                        Login to bookmark this anime
                      </Button>
                    </>
                  )}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.Paper}>
                <EpisodesList
                  isZawgyi={isZawgyi}
                  number={animeInfo.number_of_episodes}
                  animeId={animeInfo.anime_id}
                  episodes={animeInfo.episodes}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    dynamicContent = <ErrorMessage isZawgyi={isZawgyi} />;
  }

  return (
    <Grid container className={classes.Container}>
      {dynamicContent}
    </Grid>
  );
}

export default AnimeInfo;
