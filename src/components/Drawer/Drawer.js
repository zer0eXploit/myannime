import React, { Fragment } from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

import toZawgyi from "../../util/convertToZg";

import classes from "./Drawer.module.css";

const drawer = (props) => {
  const HOMEPAGE_TEXT = "ပင်မစာမျက်နှာသို့";
  const GENRES_PAGE_TEXT = "Anime Genres";
  const ABOUT_US = "ကျွန်ုပ်တို့အကြောင်း";
  const LOGIN = "Login to my Account";
  return (
    <Drawer open={props.showDrawer} anchor="right" onClick={props.click}>
      <List>
        <ListItem>
          <img src="https://veherthb.sirv.com/images/Drawer.png" alt="logo" />
        </ListItem>
        <ListItem
          button
          className={classes.ListItem}
          component={RouterLink}
          to={"/"}
        >
          <ListItemText
            primary={props.isZawgyi ? toZawgyi(HOMEPAGE_TEXT) : HOMEPAGE_TEXT}
          />
        </ListItem>

        <ListItem
          button
          className={classes.ListItem}
          component={RouterLink}
          to={"/Genres"}
        >
          <ListItemText
            primary={
              props.isZawgyi ? toZawgyi(GENRES_PAGE_TEXT) : GENRES_PAGE_TEXT
            }
          />
        </ListItem>
        {props.authData ? (
          <ListItem
            button
            className={classes.ListItem}
            component={RouterLink}
            to={"/MyAccount"}
          >
            <ListItemText primary={"My Account"} />
          </ListItem>
        ) : (
          <Fragment>
            <ListItem
              button
              className={classes.ListItem}
              component={RouterLink}
              to={"/Auth"}
            >
              <ListItemText primary={LOGIN} />
            </ListItem>
            <ListItem
              button
              className={classes.ListItem}
              component={RouterLink}
              to={"/Register"}
            >
              <ListItemText primary={"Register"} />
            </ListItem>
          </Fragment>
        )}
        {props.authData && (
          <ListItem
            button
            className={classes.ListItem}
            component={RouterLink}
            to={"#"}
            onClick={() => {
              props.logOut();
              window.location.href = "/";
            }}
          >
            <ListItemText primary={"Logout"} />
          </ListItem>
        )}
        <ListItem
          button
          className={classes.ListItem}
          component={RouterLink}
          to={"/About"}
        >
          <ListItemText
            primary={props.isZawgyi ? toZawgyi(ABOUT_US) : ABOUT_US}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default drawer;
