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
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import EpisodesList from "../../components/EpisodesList/EpisodesList";
import toZawgyi from "../../util/convertToZg";

import * as actions from "../../store/actions/index";

import classes from "./Video.module.css";

class Video extends Component {
  updateVideo() {
    if (this.props.loading) {
      return;
    }
    if (this.props.match.params.episode) {
      if (
        !this.props.currentEpisode ||
        this.props.currentEpisode !== this.props.match.params.episode
      ) {
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
    let dynamicIframe = null;
    let serverSelector = null;
    let dynamicContent = null;
    let episodesList = (
      <ListItem button component={RouterLink} to={"/Anime/" + pathNames[2]}>
        <ListItemText
          primary={
            this.props.isZawgyi
              ? toZawgyi("ဇာတ်လမ်း အပိုင်းများအားပြပါ")
              : "ဇာတ်လမ်း အပိုင်းများအားပြပါ"
          }
        />
      </ListItem>
    );

    if (this.props.streamUrls && this.props.streamUrls.length) {
      serverSelector = (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
        <Breadcrumb name={pathNames[2]} episode={pathNames[3]} />
        <Grid container item>
          <FormControl style={{ width: "100px", margin: "5px 0" }}>
            {serverSelector}
          </FormControl>
        </Grid>
        <Grid item>
          <br />
          <Typography variant="subtitle2" className={classes.Gomen}>
            {this.props.isZawgyi
              ? toZawgyi(
                  "Gomen for the Ads. Free Video Hosting ဖြစ်တဲ့အတွက် ကြောင့်ပါ။ :)"
                )
              : "Gomen for the Ads. Free Video Hosting ဖြစ်တဲ့အတွက် ကြောင့်ပါ။ :)"}
          </Typography>
        </Grid>
        <Grid item>
          <br />
          <Typography
            color="secondary"
            variant="subtitle2"
            className={classes.Gomen}
          >
            {this.props.isZawgyi
              ? toZawgyi("Error ဖြစ်လျှင် ဆက်သွယ်ရန် ")
              : "Error ဖြစ်လျှင် ဆက်သွယ်ရန် "}
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
              ? toZawgyi(
                  "Facebook Page လေးကိုလည်း အပန်းမကြီးရင် Like လုပ်ထားပေးကြပါဦး။"
                )
              : "Facebook Page လေးကိုလည်း အပန်းမကြီးရင် Like လုပ်ထားပေးကြပါဦး။"}
          </Typography>
          <iframe
            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FmyanNime&width=78&layout=button&action=like&size=large&share=false&height=21&appId"
            width="78"
            height="30"
            title="Facebook Like"
            style={{
              border: "none",
              overflow: "hidden",
            }}
            scrolling="no"
            frameborder="0"
            allowTransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Grid>
        <Grid item className={classes.IframeContainer}>
          {dynamicIframe}
        </Grid>
        <Grid item>
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
