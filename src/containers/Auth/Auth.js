import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import { login } from "../../store/actions/index";
import { updateObject } from "../../util/updateObject";
import validityCheck from "../../util/validityCheck";
import { Button } from "@material-ui/core";
import { Helmet } from "react-helmet";

import styles from "./Auth.module.css";

class Authentication extends Component {
  state = {
    controls: {
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
    },
    allInputValid: false,
  };

  switchFormMode = () => {
    this.props.history.push("/Register");
  };

  onChangeHandler = (event, elementIdentifier) => {
    const updatedElement = updateObject(
      this.state.controls[elementIdentifier],
      {
        value: event.target.value,
        valid: validityCheck(
          this.state.controls[elementIdentifier].validityCheck,
          event.target.value
        ),
        touched: true,
      }
    );

    const updatedControls = updateObject(this.state.controls, {
      [elementIdentifier]: updatedElement,
    });

    let overAllValidity = true;

    for (let key in updatedControls) {
      overAllValidity = updatedControls[key].valid && overAllValidity;
    }

    this.setState({
      controls: updatedControls,
      allInputValid: overAllValidity,
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const { username, password } = this.state.controls;
    this.props.onAuth(username.value, password.value, this.props.history.push);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = (
      <form onSubmit={this.onSubmitHandler}>
        {formElementsArray.map((ele) => {
          return (
            <Input
              elementType={ele.config.elementType}
              elementConfig={ele.config.elementConfig}
              value={ele.config.value}
              key={ele.id}
              changed={(event) => {
                this.onChangeHandler(event, ele.id);
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
          disabled={!this.state.allInputValid}
          onClick={this.onSubmitHandler}
          disableElevation
        >
          Login
        </Button>
        <div>
          <Button
            style={{ marginTop: "5px" }}
            color="secondary"
            onClick={this.switchFormMode}
          >
            <span style={{ padding: "7px" }}>Don't have an account?</span>
          </Button>
        </div>
      </form>
    );

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    if (this.props.loading) {
      form = <Loader />;
    }
    return (
      <div className={styles.Auth}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Authenticate | MYANnime</title>
        </Helmet>
        <h2>Login</h2>
        {this.props.authData ? <Redirect to="/" /> : null}
        {errorMessage}
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authData: state.auth.authData,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password, redirectTo) => {
      dispatch(login(username, password, redirectTo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
