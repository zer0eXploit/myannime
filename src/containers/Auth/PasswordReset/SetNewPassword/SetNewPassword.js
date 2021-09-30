import React from "react";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { withSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { Grid, Paper, Button } from "@material-ui/core";

import axios from "../../../../util/axiosMyannime";

import styles from "./SetNewPassword.module.css";

const PasswordReset = (props) => {
  const { t } = useTranslation();

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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("auth.setNewPwPagTitle")} | MYANnime</title>
      </Helmet>
      <Grid container justify="center">
        <Paper className={styles.Paper}>
          <div className={styles.FormContainer}>
            <h3 className={styles.Heading}>{t("auth.resetPw")}</h3>
            <p className={styles.Info}>{t("auth.enterNewPw")}</p>
            <form onSubmit={submitHandler}>
              <label className={styles.Label}>{t("auth.newPw")}</label>
              <input
                type="password"
                className={styles.InputElement}
                value={password}
                onChange={passwordChangeHandler}
              ></input>
              <small className={styles.HitText}>{t("auth.newPwHint")}</small>
              <Button
                className={styles.SubmitButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={!passwordValid}
              >
                {t("auth.reset")}
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default withSnackbar(PasswordReset);
