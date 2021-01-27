import React, { useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { withSnackbar } from "notistack";

import axios from "../../../util/axiosMyannime";

import styles from "./PasswordReset.module.css";

const PasswordReset = (props) => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-z]\w*[.\-_]*\w*@[a-z0-9]+\.[a-z]+$/gi;
    return regex.test(email);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
    };

    try {
      setEmailValid(false);
      const response = await axios.post(
        "/user/send_password_reset_email",
        formData,
      );
      const data = response.data;
      props.enqueueSnackbar(data.message, { variant: "info" });
      setEmail("");
    } catch (e) {
      console.log(e.response);
      props.enqueueSnackbar(e.response.data.message, { variant: "error" });
      setEmail("");
      setEmailValid(false);
    }
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  return (
    <Grid container justify="center">
      <Paper className={styles.Paper}>
        <div className={styles.FormContainer}>
          <h3 className={styles.Heading}>Reset Your Password</h3>
          <p className={styles.Info}>Please enter your email address below.</p>
          <form onSubmit={submitHandler}>
            <label className={styles.Label}>Email Address</label>
            <input
              type="email"
              className={styles.InputElement}
              value={email}
              onChange={emailChangeHandler}
            ></input>
            <Button
              className={styles.SubmitButton}
              variant="contained"
              color="primary"
              type="submit"
              disabled={!emailValid}
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>
    </Grid>
  );
};

export default withSnackbar(PasswordReset);
