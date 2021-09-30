import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  FormControlLabel,
  Switch,
  Button,
} from "@material-ui/core";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { withRouter, NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const Header = (props) => {
  const { t } = useTranslation();

  const handleClick = () => {
    props.history.push("/");
  };

  // const handleChange = () => {
  //   props.handleSwitchChange();
  // };
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
