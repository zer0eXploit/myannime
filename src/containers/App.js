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

const About = React.lazy(() => import("./About/About"));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#26c6da",
    },
    secondary: {
      main: "#9ccc65",
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
