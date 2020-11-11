import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
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
import { SnackbarProvider } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { DiscussionEmbed } from "disqus-react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import EpisodesList from "../../components/EpisodesList/EpisodesList";
import toZawgyi from "../../util/convertToZg";

import * as actions from "../../store/actions/index";

import classes from "./Video.module.css";

const Video = (props) => {
  const SHOW_EPISODES = "ဇာတ်လမ်း အပိုင်းများအားပြပါ။";
  const THANKS_MESSAGE = `
    မြန်နီမေးကို အသုံးပြုပေးလို့ ကျေးဇူးတင်ပါတယ်။  ^_^ 
    `;
  const SHOW_COMMENTS = "Comments များကိုပြပါ။";
  const urlParams = props.location.pathname.split("/");
  const episodeId = urlParams[3];
  const redirectFunc = props.history.push;
  const disqusShortname = "myannime";
  const disqusConfig = {
    url: `https://myannime.com${props.location.pathname}`,
    identifier: `myannime.com${props.location.pathname}`,
    title: `${urlParams[2]} ${urlParams[3]}`,
  };
  const disqusTag = (
    <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
  );
  let dynamicVideoPlayer = null;
  let serverSelector = null;
  let dynamicContent = null;
  let episodesList = (
    <ListItem button component={RouterLink} to={"/Anime/" + urlParams[2]}>
      <ListItemText
        primary={props.isZawgyi ? toZawgyi(SHOW_EPISODES) : SHOW_EPISODES}
      />
    </ListItem>
  );

  const { episodeInfo, handleFetchVideoData } = props;
  const [showComments, setShowComments] = useState(false);
  const [streamUrls, setStreamUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    handleFetchVideoData(episodeId, redirectFunc);
    setShowComments(false);
  }, [handleFetchVideoData, episodeId, redirectFunc]);

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

  const handleChangeStreamUrl = (newUrl) => {
    setCurrentUrl(newUrl);
  };

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

  if (props.animeInfo && episodeInfo) {
    if (props.animeInfo.anime_id === episodeInfo.anime_id) {
      episodesList = (
        <EpisodesList
          isZawgyi={props.isZawgyi}
          number={props.animeInfo.number_of_episodes}
          animeId={props.animeInfo.anime_id}
          episodes={props.animeInfo.episodes}
        />
      );
    }
  }

  dynamicContent = (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${props.animeInfo ? props.animeInfo.title : ""} Episode: ${
          episodeInfo ? episodeInfo.episode_number : ""
        } | MYAN-nime`}</title>
      </Helmet>
      <Breadcrumb
        name={props.animeInfo ? props.animeInfo.title : ""}
        episode={"Episode: " + (episodeInfo && episodeInfo.episode_number)}
        anime_id={props.animeInfo ? props.animeInfo.anime_id : null}
      />
      <Grid container item>
        <FormControl style={{ width: "100px", margin: "5px 0" }}>
          {serverSelector}
        </FormControl>
      </Grid>
      <Grid item style={{ marginTop: "8px" }}>
        <Typography>
          {props.isZawgyi ? toZawgyi(THANKS_MESSAGE) : THANKS_MESSAGE}
        </Typography>
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
            {props.isZawgyi ? toZawgyi(SHOW_COMMENTS) : SHOW_COMMENTS}
          </Button>
        )}
        <Paper className={classes.Paper}>{episodesList}</Paper>
      </Grid>
    </Fragment>
  );

  if (props.loading) {
    dynamicContent = <Loader />;
  }

  if (props.error) {
    dynamicContent = <ErrorMessage isZawgyi={props.isZawgyi} />;
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

const mapStateToProps = (state) => {
  return {
    episodeInfo: state.video.episodeInfo,
    animeInfo: state.info.animeInfo,
    loading: state.video.loading,
    error: state.video.error,
    isZawgyi: state.mmfont.isZawgyi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchVideoData: (pathName, redirectFunc) => {
      dispatch(actions.fetchVideoData(pathName, redirectFunc));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
