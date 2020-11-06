import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import { Switch, Route } from "react-router-dom";
import Video from "./Video/Video";
import Drawer from "../components/Drawer/Drawer";
import Info from "./Info/Info";
import Loader from "../components/Loader/Loader";
import FourOFour from "./404/404";
import * as actions from "../store/actions/index";

import classes from "./App.module.css";
// import GenreInfo from "./GenreInfo/GenreInfo";

const About = React.lazy(() => import("./About/About"));
const Genres = React.lazy(() => import("./Genres/Genres"));
const GenreInfo = React.lazy(() => import("./GenreInfo/GenreInfo"));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: ['"Myanmar Sans Pro"', '"Open Sans"', "sans-serif"].join(","),
  },
});

class App extends Component {
  state = {
    drawerOpen: false,
  };

  handleMenuClick = () => {
    this.setState((prevState) => {
      return { showDrawer: !prevState.showDrawer };
    });
  };

  render() {
    const aboutRouteComponent = (
      <Route
        path="/About"
        render={() => {
          return (
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          );
        }}
      />
    );

    const genresRouteComponent = (
      <Route
        path="/Genres"
        exact
        render={() => (
          <Suspense fallback={<Loader />}>
            <Genres />
          </Suspense>
        )}
      />
    );

    const genreInfoRouteComponent = (
      <Route
        path="/Genre/:genreName"
        exact
        render={(props) => (
          <Suspense fallback={<Loader />}>
            <GenreInfo {...props} />
          </Suspense>
        )}
      />
    );

    return (
      <div className={classes.App}>
        <ThemeProvider theme={theme}>
          <Grid container direction="column" justify="center">
            <Drawer
              showDrawer={this.state.showDrawer}
              click={this.handleMenuClick}
              isZawgyi={this.props.isZawgyi}
            />
            <Grid item>
              <Header
                handleMenuClick={this.handleMenuClick}
                isZawgyi={this.props.isZawgyi}
                handleSwitchChange={this.props.handleSwitchChange}
              />
            </Grid>
            <Grid item container className={classes.ContentMargin}>
              <Switch>
                <Route path="/" component={Home} exact />
                {aboutRouteComponent}
                {genresRouteComponent}
                {genreInfoRouteComponent}
                <Route path="/Anime/:animeInfo" component={Info} exact />
                <Route
                  path="/Anime/:animeInfo/:episode"
                  exact
                  component={Video}
                />
                <Route component={FourOFour} />
              </Switch>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isZawgyi: state.mmfont.isZawgyi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSwitchChange: () => {
      dispatch(actions.toZawgyi());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
