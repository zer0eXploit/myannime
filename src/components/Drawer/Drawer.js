import React from "react";

import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

import classes from "./Drawer.module.css";

const NavDrawer = (props) => {
  const { t } = useTranslation();

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
          <ListItemText primary={t("drawer.home")} />
        </ListItem>

        <ListItem
          button
          className={classes.ListItem}
          component={RouterLink}
          to={"/Genres"}
        >
          <ListItemText primary={t("drawer.genres")} />
        </ListItem>
        {props.authData ? (
          <ListItem
            button
            className={classes.ListItem}
            component={RouterLink}
            to={"/MyAccount"}
          >
            <ListItemText primary={t("drawer.myaccount")} />
          </ListItem>
        ) : (
          <Fragment>
            <ListItem
              button
              className={classes.ListItem}
              component={RouterLink}
              to={"/Auth"}
            >
              <ListItemText primary={t("drawer.login")} />
            </ListItem>
            <ListItem
              button
              className={classes.ListItem}
              component={RouterLink}
              to={"/Register"}
            >
              <ListItemText primary={t("drawer.register")} />
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
            <ListItemText primary={t("drawer.logout")} />
          </ListItem>
        )}
        <ListItem
          button
          className={classes.ListItem}
          component={RouterLink}
          to={"/About"}
        >
          <ListItemText primary={t("drawer.about")} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavDrawer;
