import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Loader from "../../../components/Loader/Loader";
import { login } from "../../../store/actions/index";
import { updateObject } from "../../../util/updateObject";
import validityCheck from "../../../util/validityCheck";
import { Button } from "@material-ui/core";
import axios from "../../../util/axiosMyannime";

import styles from "./Register.module.css";

class Authentication extends Component {
  state = {
    controls: {
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
    },
    showCount: false,
    count: 10,
    allInputValid: false,
    serverResponse: null,
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
    this.setState({
      ...this.state,
      allInputValid: false,
      serverResponse: "Please wait ...",
    });
    const { name, email, username, password } = this.state.controls;
    axios
      .post("/user/register", {
        name: name.value,
        email: email.value,
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        console.log(res.data);
        this.setState((prevState) => {
          return {
            ...prevState,
            allInputValid: false,
            showCount: true,
            serverResponse: res.data.message,
          };
        });
        const interval = setInterval(() => {
          this.setState((prevState) => {
            return {
              ...prevState,
              count: prevState.count - 1,
            };
          });
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          this.props.history.push("/");
        }, 10000);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        this.setState((prevState) => {
          return {
            ...prevState,
            serverResponse: e.response.data.message,
          };
        });
      });
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
          Register
        </Button>
      </form>
    );

    let errorMessage = null;

    if (this.state.serverResponse) {
      errorMessage = <p>{this.state.serverResponse}</p>;
    }

    if (this.props.loading) {
      form = <Loader />;
    }
    return (
      <div className={styles.Auth}>
        <h2>Register</h2>
        {this.props.authData ? <Redirect to="/" /> : null}
        {errorMessage}
        {this.state.showCount && (
          <p>
            You will be redirected back to the homepage in {this.state.count}
          </p>
        )}
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
