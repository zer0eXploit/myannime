import React from "react";
import { Redirect } from "react-router-dom";

const MyAccount = (props) => {
  if (!props.authData) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        padding: "3%",
      }}
    >
      <h2>Hello {props.authData.name}! This is your account! </h2>
      <p style={{ display: "block" }}>
        Currently you are signed in with username:{" "}
        <strong>{props.authData.username}</strong>
      </p>
      <p>
        Below is a kitty trying to thank you for registering. Thanks for being a
        part of MyanNime.
      </p>
      <div>
        <img
          src="https://veherthb.sirv.com/images/welcome.gif"
          alt="kitty-waving-tail"
          style={{
            borderRadius: "3%",
          }}
        />
      </div>
    </div>
  );
};

export default MyAccount;
