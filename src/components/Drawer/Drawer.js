import React from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

import toZawgyi from "../../util/convertToZg";

import classes from "./Drawer.module.css";

const drawer = (props) => {
  const HOMEPAGE_TEXT = "ပင်မစာမျက်နှာသို့";
  const GENRESPAGE_TEXT = "Anime Genres";
  const ABOUT_US = "ကျွန်ုပ်တို့အကြောင်း";
  return (
    <Drawer open={props.showDrawer} anchor="right" onClick={props.click}>
      <List>
        <ListItem>
          <img src="https://static.myannime.com/images/Drawer.png" alt="logo" />
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
              props.isZawgyi ? toZawgyi(GENRESPAGE_TEXT) : GENRESPAGE_TEXT
            }
          />
        </ListItem>
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
