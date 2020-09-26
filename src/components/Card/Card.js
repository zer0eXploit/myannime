import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Card.module.css";
import toZg from "../../util/convertToZg";

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
  const WATCH_NOW = "ကြည့်မည်";
  const animeName = props.name.replace(/-/g, " ");

  return (
    <Card className={[classes.root, styles.Card].join(" ")}>
      <CardActionArea component={RouterLink} to={"/Anime/" + props.name}>
        <CardMedia
          className={classes.media}
          image={"https://static.myannime.com/images/" + props.posterURL}
          title={animeName}
        />
        <CardContent>
          <Typography variant="subtitle2">{animeName}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={RouterLink}
          to={"/Anime/" + props.name}
        >
          {props.isZawgyi ? toZg(WATCH_NOW) : WATCH_NOW}
        </Button>
      </CardActions>
    </Card>
  );
}
