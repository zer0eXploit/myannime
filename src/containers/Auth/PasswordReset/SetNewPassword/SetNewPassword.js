import React, { useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { withSnackbar } from "notistack";

import axios from "../../../../util/axiosMyannime";

import styles from "./SetNewPassword.module.css";

const PasswordReset = (props) => {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const passwordIsValid = (password) => {
    return password.length >= 7;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // ?token=vxxx
    // split("?") => ["", "token=vxxx"]
    // split("=") => ["token", "vxxx"]

    const token = props.location.search.split("?")[1].split("=")[1];
    const formData = {
      new_password: password,
    };

    try {
      setPasswordValid(false);
      const response = await axios.post("/user/reset_password", formData, {
        params: {
          token: token,
        },
      });
      const data = response.data;
      props.enqueueSnackbar(data.message, { variant: "info" });
      setPassword("");
      // Redirect to login
      props.history.push("/Auth");
    } catch (e) {
      console.log(e.response);
      props.enqueueSnackbar(e.response.data.message, { variant: "error" });
      setPassword("");
      setPasswordValid(false);
    }
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordValid(passwordIsValid(e.target.value));
  };

  return (
    <Grid container justify="center">
      <Paper className={styles.Paper}>
        <div className={styles.FormContainer}>
          <h3 className={styles.Heading}>Reset Your Password</h3>
          <p className={styles.Info}>Please enter your new password.</p>
          <form onSubmit={submitHandler}>
            <label className={styles.Label}>New Password</label>
            <input
              type="password"
              className={styles.InputElement}
              value={password}
              onChange={passwordChangeHandler}
            ></input>
            <small className={styles.HitText}>
              Hint: Password must be more than 6 characters.
            </small>
            <Button
              className={styles.SubmitButton}
              variant="contained"
              color="primary"
              type="submit"
              disabled={!passwordValid}
            >
              Reset
            </Button>
          </form>
        </div>
      </Paper>
    </Grid>
  );
};

export default withSnackbar(PasswordReset);
