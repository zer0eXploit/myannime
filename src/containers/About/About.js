import React from "react";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useTranslation } from "react-i18next";

import classes from "./About.module.css";

function AboutMyannime(_props) {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("aboutUs.pageTitle")} | MYAN-nime</title>
      </Helmet>
      <CssBaseline />
      <Container maxWidth="md" className={classes.About}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h4">{t("aboutUs.aboutMyanNime")}</Typography>
            <Typography variant="subtitle1">
              {t("aboutUs.aboutMyanNimeDescription")}
            </Typography>
            <br />
            <Grid item>
              <Typography variant="h4">{t("aboutUs.legal")}</Typography>
              <Typography variant="subtitle1">
                {t("aboutUs.legalDescription")}
              </Typography>
            </Grid>
            <br />
            <Grid item>
              <Typography variant="h4">{t("aboutUs.contact")}</Typography>
              <Typography variant="subtitle1">
                {t("aboutUs.contactDescription")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default AboutMyannime;
