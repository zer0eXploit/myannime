import React, { Fragment } from "react";
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

import { withRouter, NavLink } from "react-router-dom";
import toZg from "../../util/convertToZg";
import classes from "./Header.module.css";

const header = (props) => {
  const SITE_NAME = "မြန်နီမေး";
  const handleClick = () => {
    props.history.push("/");
  };

  const handleChange = () => {
    props.handleSwitchChange();
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
              {props.isZawgyi ? toZg(SITE_NAME) : SITE_NAME}
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
              <FormControlLabel
                className={classes.ZG}
                checked={props.isZawgyi}
                onChange={handleChange}
                control={<Switch name="isZawgyi" color="default" />}
                label="Zawgyi"
              />
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

export default withRouter(header);
