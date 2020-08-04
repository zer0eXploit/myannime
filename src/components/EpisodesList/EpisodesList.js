import React, { Fragment, Component } from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { Waypoint } from "react-waypoint";
import { Link as RouterLink } from "react-router-dom";
import Loader from "../Loader/Loader";
import toZawgyi from "../../util/convertToZg";

class EpisodesList extends Component {
  state = {
    episodesList: [],
    moreToLoad: true,
    loading: true,
    lastEpisodeNumber: 20,
  };

  handleWayPointEnter = () => {
    if (this.state.moreToLoad) {
      this.setState({ ...this.state, loading: true });

      const episodes = this.appendToList(this.state.lastEpisodeNumber + 1);
      this.setState({
        ...this.state,
        episodesList: [...this.state.episodesList, ...episodes],
        moreToLoad: this.props.number > this.state.episodesList.length + 20,
        //+20 because state (async) is not updated yet to account for newly appended episodes
        lastEpisodeNumber: this.state.episodesList.length + episodes.length,
        //same here
        loading: false,
      });
    }
  };

  appendToList = (start) => {
    let episodes = [];
    let end = start + 20;
    if (end > this.props.number) {
      end = this.props.number + 1;
    }
    for (let i = start; i < end; i++) {
      if (i === end - 1) {
        episodes.push(
          <Waypoint
            onEnter={this.handleWayPointEnter}
            key={"Episode" + i + new Date().getTime()}
          >
            <ListItem
              button
              component={RouterLink}
              to={"/Anime/" + this.props.animeName + "/E" + i}
            >
              <ListItemText primary={"Episode " + i} />
            </ListItem>
          </Waypoint>
        );
      } else {
        episodes.push(
          <ListItem
            button
            key={"Episode" + i + new Date().getTime()}
            component={RouterLink}
            to={"/Anime/" + this.props.animeName + "/E" + i}
          >
            <ListItemText primary={"Episode " + i} />
          </ListItem>
        );
      }
    }
    return episodes;
  };

  componentDidMount() {
    const episodes = this.appendToList(1);
    this.setState({
      ...this.state,
      episodesList: [...this.state.episodesList, ...episodes],
      moreToLoad: this.props.number > 20,
      lastEpisodeNumber: episodes.length,
      loading: false,
    });
  }

  render() {
    let episodesList = null;

    if (this.state.episodesList.length > 0) {
      episodesList = this.state.episodesList.map((episode) => {
        return episode;
      });
    }
    return (
      <Fragment>
        <ListItem>
          <Typography variant="h5">
            {this.props.isZawgyi
              ? toZawgyi("ဇာတ်လမ်း အပိုင်းများ")
              : "ဇာတ်လမ်း အပိုင်းများ"}
          </Typography>
        </ListItem>
        {episodesList}
        {this.state.loading && <Loader />}
      </Fragment>
    );
  }
}

export default EpisodesList;
