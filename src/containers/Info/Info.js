import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Typography, Chip } from "@material-ui/core";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import EpisodesList from "../../components/EpisodesList/EpisodesList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import toZawgyi from "../../util/convertToZg";
import * as actions from "../../store/actions/index";

import classes from "./Info.module.css";

class Info extends Component {
  ANIME_INFO = "အချက်အလက်များ";
  NUMBER_OF_EPISODES = "အပိုင်းအရေအတွက်";
  ANIME_COMPLETION = "ဇာတ်လမ်းပြီးမြောက်မှု";
  GENRES = "ဇာတ်လမ်းအမျိုးအစား";
  SYNOPSIS = "ဇာတ်လမ်းအကျဥ်း";
  EPISODES_LIST = "ဇာတ်လမ်းအပိုင်းများ";
  componentDidMount() {
    const animeName = this.props.location.pathname.split("/")[2];
    if (this.props.name === animeName) {
      return;
    }
    const redirectFunc = this.props.history.push;
    this.props.fetchInfoData(animeName, redirectFunc);
    this.props.clearVideoData();
  }

  render() {
    let dynamicContent = null;

    if (this.props.loading) {
      dynamicContent = <Loader />;
    }

    if (!this.props.loading && this.props.posterURL) {
      dynamicContent = (
        <Grid item xs={10} sm={8} className={classes.MaxWidth}>
          <Breadcrumb name={this.props.name} />
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} className={classes.CenterAlign}>
              <div className={classes.MiddleAlignImage}>
                <Paper className={classes.PosterPaper}>
                  <img
                    src={
                      "https://static.myannime.com/images/" +
                      this.props.posterURL
                    }
                    alt={this.props.name}
                    width="100%"
                  />
                </Paper>
              </div>
              <Grid item xs={12} className={classes.InfoCardsMargin}>
                <Paper className={classes.Paper}>
                  <Typography variant="h5">
                    {this.props.isZawgyi
                      ? toZawgyi(this.ANIME_INFO)
                      : this.ANIME_INFO}
                  </Typography>
                  <div className={classes.AdditionalInfo}>
                    <Typography variant="subtitle1">
                      {this.props.isZawgyi
                        ? toZawgyi(this.NUMBER_OF_EPISODES)
                        : this.NUMBER_OF_EPISODES}
                    </Typography>
                    <Chip
                      label={this.props.episodes}
                      className={classes.Chip}
                    />
                  </div>
                  <div className={classes.AdditionalInfo}>
                    <Typography variant="subtitle1">
                      {this.props.isZawgyi
                        ? toZawgyi(this.ANIME_COMPLETION)
                        : this.ANIME_COMPLETION}
                    </Typography>
                    <Chip
                      color="primary"
                      label={this.props.onGoing ? "Ongoing" : "Completed"}
                      className={classes.Chip}
                    />
                  </div>
                  <Typography variant="subtitle1">
                    {this.props.isZawgyi ? toZawgyi(this.GENRES) : this.GENRES}
                  </Typography>
                  {this.props.genres.map((genre) => {
                    return (
                      <Chip
                        color="secondary"
                        label={genre}
                        className={classes.Chip}
                        key={genre}
                      />
                    );
                  })}
                </Paper>
              </Grid>
            </Grid>
            <Grid item container xs={12} md={8}>
              <Grid item xs={12} className={classes.InfoCardsMargin}>
                <Paper className={classes.Paper}>
                  <Typography variant="h5">
                    {this.props.isZawgyi
                      ? toZawgyi(this.SYNOPSIS)
                      : this.SYNOPSIS}
                  </Typography>
                  <div className={classes.Synopsis}>
                    <Typography variant="subtitle1">
                      {this.props.isZawgyi
                        ? toZawgyi(this.props.synopsis)
                        : this.props.synopsis}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.Paper}>
                  <EpisodesList
                    isZawgyi={this.props.isZawgyi}
                    number={this.props.episodes}
                    animeName={this.props.name}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }

    if (this.props.error) {
      dynamicContent = <ErrorMessage isZawgyi={this.props.isZawgyi} />;
    }

    return (
      <Grid container className={classes.Container}>
        {/* <Grid item xs={1} sm={2}></Grid> */}
        {dynamicContent}
        {/* <Grid item xs={1} sm={2}></Grid> */}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posterURL: state.info.posterURL,
    synopsis: state.info.synopsis,
    name: state.info.name,
    episodes: state.info.episodes,
    genres: state.info.genres,
    onGoing: state.info.onGoing,
    error: state.info.error,
    loading: state.info.loading,
    isZawgyi: state.mmfont.isZawgyi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfoData: (animeName, redirectFunc) => {
      dispatch(actions.fetchInfoData(animeName, redirectFunc));
    },
    clearVideoData: () => {
      dispatch(actions.clearVideoData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
