import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import Pagnation from "../../components/Pagination/Pagination";
import Radio from "../../components/Radio/Radio";
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
    let pagination = null;
    let sortMethod = null;

    if (this.props.loading) {
      dynamicContent = <Loader />;
    }

    if (!this.props.loading && this.props.animeData) {
      dynamicContent = this.props.animeData.animes.map((anime) => {
        return (
          <Grid
            item
            container
            justify="center"
            key={anime.anime_id}
            xs={6}
            sm={4}
            md={3}
            lg={2}
          >
            <Card {...anime} isZawgyi={this.props.isZawgyi} />
          </Grid>
        );
      });

      pagination = (
        <Grid item container justify={"center"}>
          <Pagnation
            totalPages={this.props.animeData.total_pages}
            currentPage={this.props.animeData.current_page}
            handlePaginate={this.props.fetchAnimeData}
            sortMethod={this.props.sortMethod}
          />
        </Grid>
      );

      sortMethod = (
        <Grid style={{ marginTop: "2%" }} item container justify="center">
          <Radio
            currentPage={this.props.animeData.current_page}
            handlePaginate={this.props.fetchAnimeData}
            sortMethod={this.props.sortMethod}
          />
        </Grid>
      );
    }

    if (this.props.error) {
      dynamicContent = <ErrorMessage isZawgyi={this.props.isZawgyi} />;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home | MYAN-nime</title>
        </Helmet>
        <Grid item container xs={12} sm={10} style={{ maxWidth: "1500px" }}>
          <Grid
            container
            spacing={1}
            justify="flex-start"
            style={{ margin: 0 }}
          >
            {dynamicContent}
          </Grid>
          {sortMethod}
          {pagination}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animeData: state.home.animeData,
    loading: state.home.loading,
    sortMethod: state.home.sortMethod,
    error: state.home.error,
    isZawgyi: state.mmfont.isZawgyi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnimeData: (page, sortBy) => {
      dispatch(actions.fetchAnimeData(page, sortBy));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
