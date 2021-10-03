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
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../components/Loader/Loader";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import EpisodesList from "../../components/EpisodesList/EpisodesList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import * as actions from "../../store/actions/index";

import classes from "./Info.module.css";

function AnimeInfo(props) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.info.error);
  const loading = useSelector((state) => state.info.loading);
  const isZawgyi = useSelector((state) => state.mmfont.isZawgyi);
  const animeInfo = useSelector((state) => state.info.animeInfo);
  const animeBookmarked = useSelector((state) => state.info.animeBookmarked);

  const { t } = useTranslation();

  // Directly checked for access token existence instead from state
  // because state update is async and if authData is updated only after
  // getting animeInfo, then auth headers will not be present in the
  // request to get anime info as access token is used to check if a user
  // has bookmarked the anime or not.
  const accessToken = localStorage.getItem("token");

  const { match, history } = props;

  useEffect(() => {
    const animeId = match.params.animeInfo;
    if (animeInfo?.anime_id === animeId) return;

    const redirectFunc = history.push;

    if (accessToken) {
      dispatch(actions.fetchInfoData(animeId, redirectFunc, accessToken));
    } else {
      dispatch(actions.fetchInfoData(animeId, redirectFunc));
    }

    dispatch(actions.clearVideoData());
  }, [dispatch, accessToken, animeInfo, match, history]);

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
          <title>{`${t("animeInfo.pageTitle", {
            animeTitle: animeInfo.title,
          })} | MYAN-nime`}</title>
        </Helmet>
        <Breadcrumb name={animeInfo.title} anime_id={animeInfo.anime_id} />
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12} md={4} className={classes.CenterAlign}>
            <div className={classes.MiddleAlignImage}>
              <Grid item style={{ width: "100%" }}>
                <Paper className={classes.PosterPaper}>
                  <img
                    src={animeInfo.poster_uri}
                    alt={animeInfo.anime_id}
                    width="100%"
                  />
                </Paper>
              </Grid>
            </div>
            <Grid item xs={12} className={classes.InfoCardsMargin}>
              <Paper className={classes.Paper}>
                <Typography variant="h5">{t("animeInfo.info")}</Typography>
                <div className={classes.AdditionalInfo}>
                  <Typography variant="subtitle1">
                    {t("animeInfo.numEps")}
                  </Typography>
                  <Chip
                    label={animeInfo.number_of_episodes}
                    className={classes.Chip}
                    color="secondary"
                  />
                </div>
                <div className={classes.AdditionalInfo}>
                  <Typography variant="subtitle1">
                    {t("animeInfo.status")}
                  </Typography>
                  <Chip
                    color="secondary"
                    label={animeInfo.status ? "Ongoing" : "Completed"}
                    className={classes.Chip}
                  />
                </div>
                <div className={classes.AdditionalInfo}>
                  <Typography variant="subtitle1">
                    {t("animeInfo.release")}
                  </Typography>
                  <Chip
                    color="secondary"
                    label={animeInfo.release}
                    className={classes.Chip}
                  />
                </div>
                <div className={classes.AdditionalInfo}>
                  <Typography variant="subtitle1">
                    {t("animeInfo.rating")}
                  </Typography>
                  <Chip
                    color="secondary"
                    label={animeInfo.rating}
                    className={classes.Chip}
                  />
                </div>
                <Typography variant="subtitle1">
                  {t("animeInfo.genres")}
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
                <Typography variant="h5">{t("animeInfo.synopsis")}</Typography>
                <br />
                <div className={classes.Synopsis}>
                  <Typography variant="subtitle1">
                    {animeInfo.synopsis}
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
                        animeBookmarked
                          ? t("animeInfo.unbookmark")
                          : t("animeInfo.bookmark")
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
                        {t("animeInfo.loginToBookmark")}
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
