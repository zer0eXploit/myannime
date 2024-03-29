import React from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Helmet } from "react-helmet";

import classes from "./About.module.css";

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>About | MYAN-nime</title>
        </Helmet>
        <CssBaseline />
        <Container maxWidth="md" className={classes.About}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">About MYANnime</Typography>
              <Typography variant="subtitle1">
                This is just a hobby project created as a mean to practise my
                skills.
              </Typography>
              <br />
              <Grid item>
                <Typography variant="h4">Legal Compliance</Typography>
                <Typography variant="subtitle1">
                  The files stored are not on our own servers and are only used
                  for demo purposes and will be removed upon request.
                </Typography>
              </Grid>
              <br />
              <Grid item>
                <Typography variant="h4">Contact</Typography>
                <Typography variant="subtitle1">
                  Please reach me out at zer0exploit[@]aol[.]com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isZawgyi: state.mmfont.isZawgyi,
  };
};

export default connect(mapStateToProps)(About);
