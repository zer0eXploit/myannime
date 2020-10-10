import React, { Fragment, Component } from "react";
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
  Link,
  Button,
} from "@material-ui/core";
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

class Video extends Component {
  SHOW_EPISODES = "ဇာတ်လမ်း အပိုင်းများအားပြပါ။";
  ADS_INFO = "ကြော်ငြာတွေအတွက် ခွင့်လွှတ်ပါ။ ^_^";
  ERROR_REPORT = "Error ဖြစ်လျှင် ဆက်သွယ်ရန် ";
  LIKE_SOCIAL = "နောက်ဆုံး Update တွေကိုသိဖို့ FB ကို Like လုပ်ပေးထားကြပါဦး။";
  SHOW_COMMENTS = "Comments များကိုပြပါ။";
  state = {
    showComments: false,
  };

  updateVideo() {
    if (this.props.loading) {
      return;
    }
    if (this.props.match.params.episode) {
      if (
        !this.props.currentEpisode ||
        this.props.currentEpisode !== this.props.match.params.episode
      ) {
        this.setState({
          showComments: false,
        });
        const urlParams = this.props.location.pathname.split("/");
        const pathName = urlParams[2] + "/" + urlParams[3];
        const redirectFunc = this.props.history.push;
        this.props.handleFetchVideoData(pathName, redirectFunc);
      }
    }
  }

  componentDidMount() {
    this.updateVideo();
  }

  componentDidUpdate() {
    this.updateVideo();
  }

  render() {
    const pathNames = this.props.location.pathname.split("/");
    const disqusShortname = "myannime";
    const disqusConfig = {
      url: `https://myannime.com${this.props.location.pathname}`,
      identifier: `myannime.com${this.props.location.pathname}`,
      title: `${pathNames[2]} ${pathNames[3]}`,
    };
    const disqusTag = (
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    );
    let dynamicIframe = null;
    let serverSelector = null;
    let dynamicContent = null;
    let episodesList = (
      <ListItem button component={RouterLink} to={"/Anime/" + pathNames[2]}>
        <ListItemText
          primary={
            this.props.isZawgyi
              ? toZawgyi(this.SHOW_EPISODES)
              : this.SHOW_EPISODES
          }
        />
      </ListItem>
    );

    if (this.props.streamUrls && this.props.streamUrls.length) {
      serverSelector = (
        <Select
          labelId="server-select-label"
          id="server-select"
          value={this.props.currentUrl}
          onChange={(event) => {
            this.props.handleChangeStreamUrl(event.target.value);
          }}
        >
          {this.props.streamUrls.map((url, idx) => {
            return (
              <MenuItem key={idx} value={url}>
                {"Server " + (idx + 1)}
              </MenuItem>
            );
          })}
        </Select>
      );
    }

    if (this.props.currentUrl) {
      dynamicIframe = (
        <iframe
          title="test"
          src={this.props.currentUrl}
          frameBorder="0"
          marginWidth="0"
          marginHeight="0"
          scrolling="no"
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
      );
    }

    if (this.props.episodes && this.props.name) {
      episodesList = (
        <EpisodesList
          isZawgyi={this.props.isZawgyi}
          number={this.props.episodes}
          animeName={this.props.name}
        />
      );
    }

    dynamicContent = (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${pathNames[2]} ${pathNames[3]} | MYAN-nime`}</title>
        </Helmet>
        <Breadcrumb name={pathNames[2]} episode={pathNames[3]} />
        <Grid container item>
          <FormControl style={{ width: "100px", margin: "5px 0" }}>
            {serverSelector}
          </FormControl>
        </Grid>
        <Grid item>
          <br />
          <Typography variant="subtitle2" className={classes.Gomen}>
            {this.props.isZawgyi ? toZawgyi(this.ADS_INFO) : this.ADS_INFO}
          </Typography>
        </Grid>
        <Grid item>
          <br />
          <Typography variant="subtitle2" className={classes.Gomen}>
            {this.props.isZawgyi
              ? toZawgyi(this.ERROR_REPORT)
              : this.ERROR_REPORT}
            <Link
              href="https://m.me/myanNime"
              target="_blank"
              rel="noopener noreferer"
              color="primary"
            >
              Messenger
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <br />
          <Typography variant="subtitle2" className={classes.Gomen}>
            {this.props.isZawgyi
              ? toZawgyi(this.LIKE_SOCIAL)
              : this.LIKE_SOCIAL}
          </Typography>
          <iframe
            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FmyanNime&width=78&layout=button&action=like&size=large&share=false&height=30&appId"
            width="78"
            height="30"
            title="Facebook Like"
            scrolling="no"
            frameBorder="0"
            allow="encrypted-media"
            className={classes.Fb}
          ></iframe>
        </Grid>
        <Grid item className={classes.IframeContainer}>
          {dynamicIframe}
        </Grid>
        <Grid item>
          {this.state.showComments ? (
            <Paper className={classes.Paper}>{disqusTag}</Paper>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                this.setState({ showComments: true });
              }}
            >
              {this.props.isZawgyi
                ? toZawgyi(this.SHOW_COMMENTS)
                : this.SHOW_COMMENTS}
            </Button>
          )}
          <Paper className={classes.Paper}>{episodesList}</Paper>
        </Grid>
      </Fragment>
    );

    if (this.props.loading) {
      dynamicContent = <Loader />;
    }

    if (this.props.error) {
      dynamicContent = <ErrorMessage isZawgyi={this.props.isZawgyi} />;
    }

    return (
      <Grid container>
        <Grid item xs={1} sm={2}></Grid>
        <Grid item xs={10} sm={8}>
          {dynamicContent}
        </Grid>
        <Grid item xs={1} sm={2}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentEpisode: state.video.currentEpisode,
    currentUrl: state.video.currentUrl,
    streamUrls: state.video.streamUrls,
    loading: state.video.loading,
    error: state.video.error,
    name: state.info.name,
    episodes: state.info.episodes,
    isZawgyi: state.mmfont.isZawgyi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchVideoData: (pathName, redirectFunc) => {
      dispatch(actions.fetchVideoData(pathName, redirectFunc));
    },
    handleChangeStreamUrl: (newValue) => {
      dispatch(actions.changeStreamUrl(newValue));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
