import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Typography, Chip, Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
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
    const animeId = this.props.location.pathname.split("/")[2];
    if (this.props.name === animeId) {
      return;
    }
    const redirectFunc = this.props.history.push;
    this.props.fetchInfoData(animeId, redirectFunc);
    this.props.clearVideoData();
  }

  render() {
    let dynamicContent = null;

    if (this.props.loading) {
      dynamicContent = <Loader />;
    }

    if (!this.props.loading && this.props.animeInfo) {
      dynamicContent = (
        <Grid item xs={10} sm={8} className={classes.MaxWidth}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`${this.props.animeInfo.title} Information | MYAN-nime`}</title>
          </Helmet>
          <Breadcrumb
            name={this.props.animeInfo.title}
            anime_id={this.props.animeInfo.anime_id}
          />
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} className={classes.CenterAlign}>
              <div className={classes.MiddleAlignImage}>
                <Grid item style={{ width: "100%" }}>
                  <Paper className={classes.PosterPaper}>
                    <img
                      src={this.props.animeInfo.poster_uri}
                      alt={this.props.name}
                      width="100%"
                    />
                  </Paper>
                </Grid>
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
                      label={this.props.animeInfo.number_of_episodes}
                      className={classes.Chip}
                      color="secondary"
                    />
                  </div>
                  <div className={classes.AdditionalInfo}>
                    <Typography variant="subtitle1">
                      {this.props.isZawgyi
                        ? toZawgyi(this.ANIME_COMPLETION)
                        : this.ANIME_COMPLETION}
                    </Typography>
                    <Chip
                      color="secondary"
                      label={
                        this.props.animeInfo.status ? "Ongoing" : "Completed"
                      }
                      className={classes.Chip}
                    />
                  </div>
                  <div className={classes.AdditionalInfo}>
                    <Typography variant="subtitle1">
                      {"Release Date"}
                    </Typography>
                    <Chip
                      color="secondary"
                      label={this.props.animeInfo.release}
                      className={classes.Chip}
                    />
                  </div>
                  <div className={classes.AdditionalInfo}>
                    <Typography variant="subtitle1">{"Rating"}</Typography>
                    <Chip
                      color="secondary"
                      label={this.props.animeInfo.rating}
                      className={classes.Chip}
                    />
                  </div>
                  <Typography variant="subtitle1">
                    {this.props.isZawgyi ? toZawgyi(this.GENRES) : this.GENRES}
                  </Typography>
                  {this.props.animeInfo.genres.map((genre) => {
                    return (
                      <NavLink
                        className={classes.GenreLink}
                        to={"/Genre/" + genre.replace(/ /g, "-")}
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
                  <Typography variant="h5">
                    {this.props.animeInfo.title}
                  </Typography>
                  <hr />
                  <br />
                  <Typography variant="h5">
                    {this.props.isZawgyi
                      ? toZawgyi(this.SYNOPSIS)
                      : this.SYNOPSIS}
                  </Typography>
                  <br />
                  <div className={classes.Synopsis}>
                    <Typography variant="subtitle1">
                      {this.props.isZawgyi
                        ? toZawgyi(this.props.animeInfo.synopsis)
                        : this.props.animeInfo.synopsis}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.Paper}>
                  <EpisodesList
                    isZawgyi={this.props.isZawgyi}
                    number={this.props.animeInfo.number_of_episodes}
                    animeId={this.props.animeInfo.anime_id}
                    episodes={this.props.animeInfo.episodes}
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
    animeInfo: state.info.animeInfo,
    error: state.info.error,
    loading: state.info.loading,
    isZawgyi: state.mmfont.isZawgyi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfoData: (animeId, redirectFunc) => {
      dispatch(actions.fetchInfoData(animeId, redirectFunc));
    },
    clearVideoData: () => {
      dispatch(actions.clearVideoData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
