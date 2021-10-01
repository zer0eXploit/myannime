import React from "react";

import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemText, Typography } from "@material-ui/core";

function EpisodesList(props) {
  const { t } = useTranslation();

  let episodesList = null;

  if (props.episodes.length > 0) {
    episodesList = props.episodes.map((episode) => {
      return (
        <ListItem
          button
          key={episode.episode_id}
          component={RouterLink}
          to={"/anime/" + props.animeId + "/" + episode.episode_id}
        >
          <ListItemText
            primary={`${t("episodesList.episode")} ${episode.episode_number}`}
          />
        </ListItem>
      );
    });
  }

  return (
    <Fragment>
      <ListItem>
        <Typography variant="h5">{t("episodesList.episodes")}</Typography>
      </ListItem>
      {episodesList}
    </Fragment>
  );
}

export default EpisodesList;
