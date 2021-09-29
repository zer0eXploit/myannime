import React from "react";

import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback, Suspense } from "react";
import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";

import Home from "./Home/Home";
import Info from "./Info/Info";
import Video from "./Video/Video";
import FourOFour from "./404/404";
import Header from "../components/Header/Header";
import Drawer from "../components/Drawer/Drawer";
import Loader from "../components/Loader/Loader";

import * as actions from "../store/actions/index";
import themeInfo from "../config/muitheme";

import classes from "./App.module.css";

// Lazy Load Components
const PasswordReset = React.lazy(() =>
  import("./Auth/PasswordReset/PasswordReset"),
);
const RequestNewActivationEmail = React.lazy(() =>
  import("./Auth/Register/ActivationEmail/ActivationEmail"),
);
const SetNewPassword = React.lazy(() =>
  import("./Auth/PasswordReset/SetNewPassword/SetNewPassword"),
);

const Auth = React.lazy(() => import("./Auth/Auth"));
const About = React.lazy(() => import("./About/About"));
const Genres = React.lazy(() => import("./Genres/Genres"));
const Account = React.lazy(() => import("./MyAccount/MyAccount"));
const GenreInfo = React.lazy(() => import("./GenreInfo/GenreInfo"));
const Register = React.lazy(() => import("./Auth/Register/Register"));

const theme = createMuiTheme(themeInfo);

function MyApp() {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isZawgyi = useSelector((state) => state.mmfont.isZawgyi);
  const authData = useSelector((state) => state.auth.authData);

  useEffect(() => {
    dispatch(actions.autoAuth());
  }, [dispatch]);

  const handleMenuClick = useCallback(() => {
    setIsDrawerOpen((prevState) => !prevState);
  }, []);

  const handleSwitchChange = useCallback(
    () => dispatch(actions.toZawgyi()),
    [dispatch],
  );

  const logOut = useCallback(() => dispatch(actions.authLogout()), [dispatch]);

  const aboutRouteComponent = (
    <Route
      path="/about"
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
      path="/genres"
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
      path="/genre/:genreName"
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
      path="/auth"
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
      path="/myaccount"
      exact
      render={(props) => (
        <Suspense fallback={<Loader />}>
          <Account {...props} authData={authData} />
        </Suspense>
      )}
    />
  );

  const registerRouteComponent = (
    <Route
      path="/register"
      exact
      render={(props) => (
        <Suspense fallback={<Loader />}>
          <Register {...props} authData={authData} />
        </Suspense>
      )}
    />
  );

  const pwResetRouteComponent = (
    <Route
      path="/passwordreset"
      exact
      render={(props) => (
        <Suspense fallback={<Loader />}>
          <PasswordReset {...props} />
        </Suspense>
      )}
    />
  );

  const setNewPwRouteComponent = (
    <Route
      path="/reset_password"
      exact
      render={(props) => (
        <Suspense fallback={<Loader />}>
          <SetNewPassword {...props} />
        </Suspense>
      )}
    />
  );

  const requestNewActivationEmailComponent = (
    <Route
      path="/newactivationemail"
      exact
      render={(props) => (
        <Suspense fallback={<Loader />}>
          <RequestNewActivationEmail {...props} />
        </Suspense>
      )}
    />
  );

  return (
    <div className={classes.App}>
      <ThemeProvider theme={theme}>
        <Grid container direction="column" justify="center">
          <Drawer
            showDrawer={isDrawerOpen}
            click={handleMenuClick}
            authData={authData}
            logOut={logOut}
            isZawgyi={isZawgyi}
          />
          <Grid item>
            <Header
              handleMenuClick={handleMenuClick}
              isZawgyi={isZawgyi}
              handleSwitchChange={handleSwitchChange}
              authData={authData}
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
              {pwResetRouteComponent}
              {setNewPwRouteComponent}
              {requestNewActivationEmailComponent}
              <Route path="/anime/:animeInfo" component={Info} exact />
              <Route
                path="/anime/:animeInfo/:episode"
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

export default MyApp;
