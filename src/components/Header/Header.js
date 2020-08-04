import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import { withRouter } from "react-router-dom";

import classes from "./Header.module.css";

import searchIcon from "./search.svg";

const header = (props) => {
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
              MYANnime
            </Typography>
          </Grid>
          <Grid item>
            <div>
              <FormControlLabel
                className={classes.ZG}
                checked={props.isZawgyi}
                onChange={handleChange}
                control={<Switch name="isZawgyi" color="secondary" />}
                label="ZG"
              />
              <IconButton
                color="inherit"
                aria-label="open search"
                onClick={props.handleMenuClick}
              >
                <img src={searchIcon} alt="Search Icon" />
              </IconButton>
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
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(header);
