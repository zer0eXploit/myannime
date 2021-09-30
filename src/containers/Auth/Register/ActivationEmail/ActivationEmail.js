import React from "react";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { withSnackbar } from "notistack";
import { Grid, Paper, Button } from "@material-ui/core";

import axios from "../../../../util/axiosMyannime";

import styles from "./ActivationEmail.module.css";

const ActivationEmail = (props) => {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);

  const usernameIsValid = (username) => {
    return username.length >= 3;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = {
      username: username,
    };

    try {
      setUsernameValid(false);
      const response = await axios.post(
        "/user/resend_activation_email",
        formData,
      );
      const data = response.data;
      props.enqueueSnackbar(data.message, { variant: "info" });
      setUsername("");
    } catch (e) {
      console.log(e.response);
      props.enqueueSnackbar(e.response.data.message, { variant: "error" });
      setUsername("");
      setUsernameValid(false);
    }
  };

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
    setUsernameValid(usernameIsValid(e.target.value));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Request Activation Email | MYANnime</title>
      </Helmet>
      <Grid container justify="center">
        <Paper className={styles.Paper}>
          <div className={styles.FormContainer}>
            <h3 className={styles.Heading}>
              Request for a new activation email
            </h3>
            <p className={styles.Info}>Please enter your username below.</p>
            <form onSubmit={submitHandler}>
              <label className={styles.Label}>Username</label>
              <input
                type="text"
                className={styles.InputElement}
                value={username}
                onChange={usernameChangeHandler}
              ></input>
              <Button
                className={styles.SubmitButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={!usernameValid}
              >
                Request
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default withSnackbar(ActivationEmail);
