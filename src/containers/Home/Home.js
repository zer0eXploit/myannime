import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import * as actions from "../../store/actions/index";

class Home extends Component {
  componentDidMount() {
    if (this.props.animeData) {
      return;
    }
    this.props.fetchAnimeData();
  }

  render() {
    let dynamicContent = null;

    if (this.props.loading) {
      dynamicContent = <Loader />;
    }

    if (this.props.animeData) {
      dynamicContent = this.props.animeData.map((videoCard) => {
        return (
          <Grid
            item
            container
            justify="center"
            key={videoCard.name}
            xs={6}
            sm={4}
            md={3}
            lg={2}
          >
            <Card {...videoCard} isZawgyi={this.props.isZawgyi} />
          </Grid>
        );
      });
    }

    if (this.props.error) {
      dynamicContent = <ErrorMessage isZawgyi={this.props.isZawgyi} />;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Grid item container xs={12} sm={10} style={{ maxWidth: "1500px" }}>
          <Grid container spacing={1} justify="center" style={{ margin: 0 }}>
            {dynamicContent}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animeData: state.home.animeData,
    loading: state.home.loading,
    error: state.home.error,
    isZawgyi: state.mmfont.isZawgyi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnimeData: () => {
      dispatch(actions.fetchAnimeData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
