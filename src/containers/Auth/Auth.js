import React from "react";

import { Helmet } from "react-helmet";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";

import { login, clearError } from "../../store/actions/index";

import validityCheck from "../../util/validityCheck";
import { updateObject } from "../../util/updateObject";

import styles from "./Auth.module.css";

function MyannimeLogin(props) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const authData = useSelector((state) => state.auth.authData);

  const { t } = useTranslation();

  const [allInputValid, setAllInputValid] = useState(false);
  const [controls, setControls] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: t("auth.username"),
      },
      value: "",
      invalidMessage: t("auth.enterValidUname"),
      validityCheck: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: t("auth.password"),
      },
      value: "",
      invalidMessage: t("auth.enterValidPw"),
      validityCheck: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const { history } = props;

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const switchFormMode = () => {
    history.push("/Register");
  };

  const switchToPwResetHandler = () => {
    history.push("/PasswordReset");
  };

  const onChangeHandler = (event, elementIdentifier) => {
    const updatedElement = updateObject(controls[elementIdentifier], {
      value: event.target.value,
      valid: validityCheck(
        controls[elementIdentifier].validityCheck,
        event.target.value,
      ),
      touched: true,
    });

    const updatedControls = updateObject(controls, {
      [elementIdentifier]: updatedElement,
    });

    let overAllValidity = true;

    for (let key in updatedControls) {
      overAllValidity = updatedControls[key].valid && overAllValidity;
    }

    setControls(updatedControls);
    setAllInputValid(overAllValidity);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const { username, password } = controls;
    dispatch(login(username.value, password.value, history.push));
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = (
    <form onSubmit={onSubmitHandler}>
      {formElementsArray.map((ele) => {
        return (
          <Input
            elementType={ele.config.elementType}
            elementConfig={ele.config.elementConfig}
            value={ele.config.value}
            key={ele.id}
            changed={(event) => {
              onChangeHandler(event, ele.id);
            }}
            invalid={!ele.config.valid}
            invalidMessage={ele.config.invalidMessage}
            shouldValidate={ele.config.validityCheck}
            touched={ele.config.touched}
            label={ele.config.elementConfig.placeholder}
          />
        );
      })}
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: "5px" }}
        disabled={!allInputValid}
        onClick={onSubmitHandler}
        type="submit"
        disableElevation
      >
        <span style={{ padding: "7px" }}>{t("auth.login")}</span>
      </Button>
      <div>
        <Button
          style={{ margin: "2px 2px" }}
          color="primary"
          variant="outlined"
          onClick={switchToPwResetHandler}
        >
          <span style={{ padding: "7px" }}>{t("auth.forgotPw")}</span>
        </Button>
        <Button
          style={{ margin: "2px 2px" }}
          color="secondary"
          variant="outlined"
          onClick={switchFormMode}
        >
          <span style={{ padding: "7px" }}>{t("auth.noAccount")}</span>
        </Button>
      </div>
      <Button
        style={{ marginTop: "3px" }}
        color="primary"
        onClick={() => {
          history.push("/NewActivationEmail");
        }}
      >
        <span style={{ padding: "7px" }}>{t("auth.noActivationEmail")}</span>
      </Button>
    </form>
  );

  let errorMessage = null;

  if (error) {
    if (error.message_1) {
      const messages = [];
      for (let key in error) {
        messages.push(error[key]);
      }
      errorMessage = messages.map((msg, idx) => <p key={idx}>{msg}</p>);
    } else {
      errorMessage = <p>{error}</p>;
    }
  }

  if (loading) {
    form = <Loader />;
  }
  return (
    <div className={styles.Auth}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("auth.pageTitle")} | MYANnime</title>
      </Helmet>
      <h2>{t("auth.login")}</h2>
      {authData ? <Redirect to="/" /> : null}
      {errorMessage}
      {form}
    </div>
  );
}

export default MyannimeLogin;
