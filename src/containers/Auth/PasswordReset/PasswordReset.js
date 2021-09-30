import React from "react";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { withSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { Grid, Paper, Button } from "@material-ui/core";

import axios from "../../../util/axiosMyannime";

import styles from "./PasswordReset.module.css";

const PasswordReset = (props) => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const { t } = useTranslation();

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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("auth.resetPwPageTitle")} | MYANnime</title>
      </Helmet>
      <Grid container justify="center">
        <Paper className={styles.Paper}>
          <div className={styles.FormContainer}>
            <h3 className={styles.Heading}>{t("auth.resetPw")}</h3>
            <p className={styles.Info}>{t("auth.enterEmail")}</p>
            <form onSubmit={submitHandler}>
              <label className={styles.Label}>{t("auth.emailAddress")}</label>
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
                {t("auth.submit")}
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default withSnackbar(PasswordReset);
