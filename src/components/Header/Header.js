import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@material-ui/core";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { withRouter, NavLink } from "react-router-dom";

import languages from "../../config/appLanguages";

import classes from "./Header.module.css";

const Header = (props) => {
  const { t, i18n } = useTranslation();

  const handleClick = () => {
    props.history.push("/");
  };

  // const handleChange = () => {
  //   props.handleSwitchChange();
  // };

  const handleLanChange = (lan) => {
    i18n.changeLanguage(lan);
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography
              variant="h6"
              onClick={handleClick}
              className={classes.SiteName}
            >
              {t("header.brand")}
            </Typography>
          </Grid>
          <Grid item>
            <Fragment>
              {props.authData && (
                <NavLink to={"/MyAccount"} className={classes.User}>
                  <Button variant="text">
                    <span style={{ color: "white" }}>
                      {props.authData.username}
                    </span>
                  </Button>
                </NavLink>
              )}
              {/* <FormControlLabel
                className={classes.ZG}
                checked={props.isZawgyi}
                onChange={handleChange}
                control={<Switch name="isZawgyi" color="default" />}
                label="Zawgyi"
              /> */}
              <Select
                labelId="server-select-label"
                id="server-select"
                value={
                  (typeof window !== "undefined" &&
                    window.localStorage.i18nextLng) ||
                  "en"
                }
                // className={classes.ServerSelect}
                style={{ color: "#fff" }}
                onChange={(event) => {
                  handleLanChange(event.target.value);
                }}
              >
                {Object.keys(languages).map((lan, idx) => {
                  return (
                    <MenuItem key={idx} value={lan}>
                      <span>{languages[lan]["displayName"]}</span>
                    </MenuItem>
                  );
                })}
              </Select>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.handleMenuClick}
              >
                <div>
                  <div className={classes.Hamburger}></div>
                  <div className={classes.Hamburger}></div>
                  <div className={classes.Hamburger}></div>
                </div>
              </IconButton>
            </Fragment>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
