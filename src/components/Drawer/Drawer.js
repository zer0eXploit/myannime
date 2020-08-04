import React from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

import toZawgyi from "../../util/convertToZg";

import classes from "./Drawer.module.css";

const drawer = (props) => {
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
            primary={
              props.isZawgyi ? toZawgyi("ပင်မစာမျက်နှာ") : "ပင်မစာမျက်နှာ"
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
            primary={
              props.isZawgyi
                ? toZawgyi("ကျွန်ုပ်တို့ အကြောင်း")
                : "ကျွန်ုပ်တို့ အကြောင်း"
            }
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default drawer;
