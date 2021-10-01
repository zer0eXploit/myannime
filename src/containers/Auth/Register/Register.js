import React from "react";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

import axios from "../../../util/axiosMyannime";
import validityCheck from "../../../util/validityCheck";
import { updateObject } from "../../../util/updateObject";

import Input from "../../../components/Input/Input";
import Loader from "../../../components/Loader/Loader";

import styles from "./Register.module.css";

function MyannimeRegister(props) {
  const loading = useSelector((state) => state.auth.loading);
  const authData = useSelector((state) => state.auth.authData);

  const { t } = useTranslation();

  const [count, setCount] = useState(10);
  const [showCount, setShowCount] = useState(false);
  const [allInputValid, setAllInputValid] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [controls, setControls] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: t("auth.name"),
      },
      value: "",
      invalidMessage: t("auth.enterValidName"),
      validityCheck: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: t("auth.email"),
      },
      value: "",
      invalidMessage: t("auth.enterValidEmail"),
      validityCheck: {
        email: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
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

  const switchFormMode = () => {
    history.push("/auth");
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
    setAllInputValid(false);
    setServerResponse("Please wait...");

    const { name, email, username, password } = controls;
    axios
      .post("/user/register", {
        name: name.value,
        email: email.value,
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        setAllInputValid(false);
        setShowCount(true);
        setServerResponse(res.data.message);

        const interval = setInterval(() => {
          setCount((prevState) => prevState - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          history.push("/");
        }, 10000);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setServerResponse(e.response.data.message);
      });
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
        disabled={!allInputValid}
        onClick={onSubmitHandler}
        disableElevation
      >
        {t("auth.registerNow")}
      </Button>
      <span> | </span>
      <Button color="secondary" variant="outlined" onClick={switchFormMode}>
        {t("auth.loginInstead")}
      </Button>
    </form>
  );

  let errorMessage = null;

  if (serverResponse) {
    errorMessage = <p>{serverResponse}</p>;
  }

  if (loading) {
    form = <Loader />;
  }
  return (
    <div className={styles.Auth}>
      <h2>{t("auth.register")}</h2>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("auth.registerPageTitle")} | MYAN-nime</title>
      </Helmet>
      {authData ? <Redirect to="/" /> : null}
      {errorMessage}
      {showCount && (
        <p>
          {t("auth.willBeRedirectedIn")} {count}
        </p>
      )}
      {form}
    </div>
  );
}

export default MyannimeRegister;
