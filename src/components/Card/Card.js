import React from "react";

import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import styles from "./Card.module.css";

const useStyles = makeStyles({
  root: {
    maxWnameth: 345,
    width: 200,
  },
  media: {
    height: 250,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={[classes.root, styles.Card].join(" ")}>
      <CardActionArea component={RouterLink} to={"/anime/" + props.anime_id}>
        <CardMedia
          className={classes.media}
          image={props.poster_uri}
          title={props.title}
        />
        <CardContent>
          <Typography variant="subtitle2">
            {props.title.length > 15
              ? props.title.slice(0, 15) + " ..."
              : props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={RouterLink}
          to={"/anime/" + props.anime_id}
        >
          {t("card.watch")}
        </Button>
      </CardActions>
    </Card>
  );
}
