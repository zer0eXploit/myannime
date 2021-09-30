import React, { useState, useEffect, Component } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Loader from "../../../components/Loader/Loader";
import { login } from "../../../store/actions/index";
import { updateObject } from "../../../util/updateObject";
import validityCheck from "../../../util/validityCheck";
import { Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import axios from "../../../util/axiosMyannime";

import styles from "./Register.module.css";

function MyannimeRegister(props) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const authData = useSelector((state) => state.auth.authData);

  const [count, setCount] = useState(10);
  const [showCount, setShowCount] = useState(false);
  const [allInputValid, setAllInputValid] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [controls, setControls] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name",
      },
      value: "",
      invalidMessage: "Please Enter A Valid Name!",
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
        placeholder: "Email",
      },
      value: "",
      invalidMessage: "Please Enter A Valid Email!",
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
        placeholder: "Username",
      },
      value: "",
      invalidMessage: "Please Enter A Valid Username!",
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
        placeholder: "Password",
      },
      value: "",
      invalidMessage: "Password must be more than 5 characters!",
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
    history.push("/Auth");
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
        Register
      </Button>
      <span> | </span>
      <Button color="secondary" variant="outlined" onClick={switchFormMode}>
        Login Instead?
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
      <h2>Register</h2>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register an Account | MYAN-nime</title>
      </Helmet>
      {authData ? <Redirect to="/" /> : null}
      {errorMessage}
      {showCount && (
        <p>You will be redirected back to the homepage in {count}</p>
      )}
      {form}
    </div>
  );
}

export default MyannimeRegister;
