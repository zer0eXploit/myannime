import React from "react";

import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { SnackbarProvider } from "notistack";
import { DiscussionEmbed } from "disqus-react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../components/Loader/Loader";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import EpisodesList from "../../components/EpisodesList/EpisodesList";

import * as actions from "../../store/actions/index";

import classes from "./Video.module.css";

const Video = (props) => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.info.error);
  const loading = useSelector((state) => state.video.loading);
  const isZawgyi = useSelector((state) => state.video.isZawgyi);
  const animeInfo = useSelector((state) => state.info.animeInfo);
  const episodeInfo = useSelector((state) => state.video.episodeInfo);

  const [showComments, setShowComments] = useState(false);
  const [streamUrls, setStreamUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");

  const { t } = useTranslation();

  const urlParams = props.location.pathname.split("/");

  const episodeId = urlParams[3];
  const redirectFunc = props.history.push;

  const disqusShortname = "myannime";
  const disqusConfig = {
    url: `https://myannime.com${props.location.pathname}`,
    identifier: `myannime.com${props.location.pathname}`,
    title: `${urlParams[2]} ${urlParams[3]}`,
  };

  // Handlers
  const handleChangeStreamUrl = (newUrl) => {
    setCurrentUrl(newUrl);
  };

  let dynamicVideoPlayer = null;
  let serverSelector = null;
  let dynamicContent = null;
  let episodesList = (
    <ListItem button component={RouterLink} to={"/anime/" + urlParams[2]}>
      <ListItemText primary={t("video.viewEpList")} />
    </ListItem>
  );

  const disqusTag = (
    <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
  );

  // Effects!
  useEffect(() => {
    setShowComments(false);
    dispatch(actions.fetchVideoData(episodeId, redirectFunc));
  }, [dispatch, episodeId, redirectFunc]);

  useEffect(() => {
    if (episodeInfo) {
      const urls = [];
      for (let i = 0; i <= 5; i++) {
        if (episodeInfo["episode_uri_" + i]) {
          urls.push(episodeInfo["episode_uri_" + i]);
        }
      }
      setStreamUrls(urls);
      setCurrentUrl(urls[0]);
    }
  }, [episodeInfo]);
  // End Effects

  if (streamUrls.length) {
    serverSelector = (
      <Select
        labelId="server-select-label"
        id="server-select"
        value={currentUrl}
        className={classes.ServerSelect}
        onChange={(event) => {
          handleChangeStreamUrl(event.target.value);
        }}
      >
        {streamUrls.map((name, idx) => {
          return (
            <MenuItem key={idx} value={name}>
              {"Server " + (idx + 1)}
            </MenuItem>
          );
        })}
      </Select>
    );
  }

  if (currentUrl) {
    dynamicVideoPlayer = (
      <Fragment>
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            title={currentUrl}
            src={currentUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </Fragment>
    );
  }

  if (animeInfo && episodeInfo) {
    if (animeInfo.anime_id === episodeInfo.anime_id) {
      episodesList = (
        <EpisodesList
          isZawgyi={isZawgyi}
          number={animeInfo.number_of_episodes}
          animeId={animeInfo.anime_id}
          episodes={animeInfo.episodes}
        />
      );
    }
  }

  dynamicContent = (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${animeInfo ? animeInfo.title : ""} Episode: ${
          episodeInfo ? episodeInfo.episode_number : ""
        } | MYAN-nime`}</title>
      </Helmet>
      <Breadcrumb
        name={animeInfo ? animeInfo.title : ""}
        episode={"Episode: " + (episodeInfo && episodeInfo.episode_number)}
        anime_id={animeInfo ? animeInfo.anime_id : null}
      />
      <Grid container item>
        <FormControl style={{ width: "100px", margin: "5px 0" }}>
          {serverSelector}
        </FormControl>
      </Grid>
      <Grid item style={{ marginTop: "8px" }}>
        <Typography>{t("video.appreciationText")}</Typography>
      </Grid>
      <Grid item className={classes.IframeContainer}>
        {dynamicVideoPlayer}
      </Grid>
      <Grid item>
        {showComments ? (
          <Paper className={classes.Paper}>{disqusTag}</Paper>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              setShowComments(true);
            }}
          >
            {t("video.showComments")}
          </Button>
        )}
        <Paper className={classes.Paper}>{episodesList}</Paper>
      </Grid>
    </Fragment>
  );

  if (loading) {
    dynamicContent = <Loader />;
  }

  if (error) {
    dynamicContent = <ErrorMessage isZawgyi={isZawgyi} />;
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <Grid container>
        <Grid item xs={1} sm={2}></Grid>
        <Grid item xs={10} sm={8}>
          {dynamicContent}
        </Grid>
        <Grid item xs={1} sm={2}></Grid>
      </Grid>
    </SnackbarProvider>
  );
};

export default Video;
