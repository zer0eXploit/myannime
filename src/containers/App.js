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
const Auth = React.lazy(() => import("./Auth/Auth"));
const Account = React.lazy(() => import("./MyAccount/MyAccount"));
const Register = React.lazy(() => import("./Auth/Register/Register"));

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

  componentDidMount() {
    this.props.autoAuth();
  }

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

    const authRouteComponent = (
      <Route
        path="/Auth"
        exact
        render={(props) => (
          <Suspense fallback={<Loader />}>
            <Auth {...props} />
          </Suspense>
        )}
      />
    );

    const accountRouteComponent = (
      <Route
        path="/MyAccount"
        exact
        render={(props) => (
          <Suspense fallback={<Loader />}>
            <Account {...props} authData={this.props.authData} />
          </Suspense>
        )}
      />
    );

    const registerRouteComponent = (
      <Route
        path="/Register"
        exact
        render={(props) => (
          <Suspense fallback={<Loader />}>
            <Register {...props} authData={this.props.authData} />
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
              authData={this.props.authData}
              logOut={this.props.logOut}
              isZawgyi={this.props.isZawgyi}
            />
            <Grid item>
              <Header
                handleMenuClick={this.handleMenuClick}
                isZawgyi={this.props.isZawgyi}
                handleSwitchChange={this.props.handleSwitchChange}
                authData={this.props.authData}
              />
            </Grid>
            <Grid item container className={classes.ContentMargin}>
              <Switch>
                <Route path="/" component={Home} exact />
                {aboutRouteComponent}
                {genresRouteComponent}
                {genreInfoRouteComponent}
                {authRouteComponent}
                {accountRouteComponent}
                {registerRouteComponent}
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
    authData: state.auth.authData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSwitchChange: () => {
      dispatch(actions.toZawgyi());
    },
    autoAuth: () => dispatch(actions.autoAuth()),
    logOut: () => dispatch(actions.authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
