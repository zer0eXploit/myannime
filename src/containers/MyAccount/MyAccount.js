import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Helmet from "react-helmet";
import { Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";

import axios from "../../util/axiosMyannime";

import styles from "./MyAccount.module.css";

import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

function AccountHome(props) {
  let username = null;
  let access_token = null;

  if (props.authData) {
    username = props.authData.username;
    access_token = props.authData.access_token;
  }
  const [uploadStarted, setUploadStarted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [control, setControl] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [userData, setUserData] = useState(null);
  const [showBookmarkList, setshowBookmarkList] = useState(false);
  const [showUpdatePassword, setshowUpdatePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [enablePasswordResetButton, setEnablePasswordResetButton] = useState(
    true,
  );

  const URI = `${axios.defaults.baseURL}user/avatar/${username}`;

  // Get user information from server
  useEffect(() => {
    axios
      .get(`/user/info`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [access_token]);

  // Get user profile image
  useEffect(() => {
    axios
      .get(`${URI}`)
      .then(() => setProfileImageUrl(`${URI}?v=${new Date().getTime()}`))
      .catch((e) => {
        const defaultImageURI =
          "https://veherthb.sirv.com/MYANNime/default-avatar.jpg?w=400";
        setProfileImageUrl(defaultImageURI);
      });
  }, [URI, username, setProfileImageUrl]);

  if (!props.authData) {
    return <Redirect to="/" />;
  }

  const onChangeHandler = (event, elementIdentifier) => {
    setControl(event.target.value);
    setFileSelected(event.target.files[0]);
  };

  const cleanUp = () => {
    setFileSelected("");
    setControl("");
    setUploadStarted(false);
    setUploadProgress(0);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", fileSelected);
    setUploadStarted(true);
    axios
      .put("/user/avatar", formData, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        onUploadProgress: (p) => {
          let progress = Math.floor((p.loaded / p.total) * 100);
          setUploadProgress(progress);
        },
      })
      .then((d) => {
        props.enqueueSnackbar("Upload successful.", {
          variant: "info",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
        setProfileImageUrl(`${URI}?v=${new Date().getTime()}`);
        cleanUp();
      })
      .catch((e) => {
        props.enqueueSnackbar("Upload failed.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
        cleanUp();
        console.log(e.response);
      });
  };

  const onPasswordUpdateHandler = (e) => {
    e.preventDefault();
    const formData = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    axios
      .put("/user/update_password", formData, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((d) => {
        props.enqueueSnackbar(d.data.message, {
          variant: "info",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
        setOldPassword("");
        setNewPassword("");
        setshowUpdatePassword(!showUpdatePassword);
      })
      .catch((e) => {
        props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
        console.log(e.response);
        setOldPassword("");
        setNewPassword("");
      });
  };

  const handleResetPassword = () => {
    setEnablePasswordResetButton(false);
    axios
      .post(
        "/user/send_password_reset_email",
        {
          email: userData.email,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then((d) => {
        props.enqueueSnackbar(d.data.message, {
          variant: "info",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
        //  Re-enable password button after 5 mins
        //  In case, user might not recieve the password.
        setTimeout(() => setEnablePasswordResetButton(true), 300000);
      })
      .catch((e) => {
        props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
        console.log(e.response);
        setEnablePasswordResetButton(true);
      });
  };

  let userInfo = <Loader />;
  let bookmarkedAnimes = null;
  let bookmarkedAnimeList = null;

  let imageUpload = (
    <div>
      <h2>Profile Picture</h2>
      <form style={{ width: "80%", height: "fit-content" }}>
        <label
          className={[styles.CustomFileUpload, styles.ButtonGroup].join(" ")}
          style={{
            display: fileSelected ? "none" : "block",
          }}
        >
          <input
            value={control}
            type="file"
            accept="image/*"
            onChange={onChangeHandler}
          />
          Upload new photo
        </label>
      </form>
      {fileSelected && !uploadStarted ? (
        <div className={styles.UploadButtonAndText}>
          <p>
            {"Photo "}
            <strong>{fileSelected.name}</strong>
            {" has been selected. Ready to upload."}
          </p>
          <Button
            variant="outlined"
            color="secondary"
            disabled={!fileSelected}
            onClick={onSubmitHandler}
            disableElevation
          >
            Upload Now
          </Button>
        </div>
      ) : null}
      {uploadStarted && (
        <div className={styles.UploadProgress}>
          <LinearProgress
            style={{ width: "100%" }}
            variant="determinate"
            color="secondary"
            value={uploadProgress}
          />
          <p>{uploadProgress + "%"}</p>
        </div>
      )}
    </div>
  );

  let accountSecurity = (
    <>
      <h2>Account Security</h2>
      {!showUpdatePassword ? (
        <Button
          className={styles.InputFormFieldContainer}
          type="submit"
          variant="outlined"
          color="primary"
          disableElevation
          onClick={() => setshowUpdatePassword(!showUpdatePassword)}
        >
          Update My Password
        </Button>
      ) : (
        <div className={styles.UpdatePassword}>
          <form onSubmit={onPasswordUpdateHandler}>
            <h4>Update Password</h4>
            <div
              className={[styles.Input, styles.InputFormFieldContainer].join(
                " ",
              )}
            >
              <label className={styles.Label}>Old Password</label>
              <input
                type="password"
                className={styles.InputElement}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              ></input>
            </div>
            <div
              className={[styles.Input, styles.InputFormFieldContainer].join(
                " ",
              )}
            >
              <label className={styles.Label}>New Password</label>
              <input
                type="password"
                className={styles.InputElement}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
            </div>
            <Button
              className={styles.BlockBtn}
              type="submit"
              variant="outlined"
              color="secondary"
              disableElevation
              disabled={!(!!oldPassword && !!newPassword)}
            >
              Update
            </Button>
          </form>
          <Button
            className={styles.BlockBtn}
            type="submit"
            variant="outlined"
            color="primary"
            disableElevation
            onClick={() => setshowUpdatePassword(!showUpdatePassword)}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Reset Password Button */}
      <div style={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={handleResetPassword}
          disabled={!enablePasswordResetButton}
        >
          Reset My Password
        </Button>
      </div>
    </>
  );

  bookmarkedAnimeList = showBookmarkList ? (
    <>
      <div style={{ marginBottom: "5px" }}>
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={() => setshowBookmarkList(!showBookmarkList)}
        >
          Hide
        </Button>
      </div>
      <Grid container spacing={1} justify="flex-start">
        {userData.saved_animes.map((anime) => {
          return (
            <Grid
              item
              container
              justify="center"
              key={anime.anime_id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            >
              <Card {...anime} isZawgyi={props.isZawgyi} />
            </Grid>
          );
        })}
      </Grid>
    </>
  ) : (
    <Button
      variant="outlined"
      color="primary"
      disableElevation
      onClick={() => setshowBookmarkList(!showBookmarkList)}
    >
      View Bookmarked Animes
    </Button>
  );

  if (userData) {
    if (!!userData.saved_animes.length) {
      bookmarkedAnimes = (
        <>
          <h2>Bookmarked Animes</h2>
          {bookmarkedAnimeList}
        </>
      );
    }

    userInfo = (
      <Grid container justify="center">
        <Grid item lg={12}>
          <div className={styles.ProfileHeadContainer}>
            {/* Profile pic and form start */}
            <Grid container justify="center">
              <Grid item container justify="center" direction="column" lg={6}>
                <div className={styles.ProfileAndEditContainer}>
                  <div className={styles.ProfilePicContainer}>
                    {profileImageUrl && (
                      <img
                        className={styles.ProfilePic}
                        src={profileImageUrl}
                        width="200"
                        height="200"
                        alt="avatar"
                      />
                    )}
                  </div>
                </div>
              </Grid>
              {/* Profile pic and form end */}
              <Grid item lg={6}>
                <div className={styles.NameContainer}>
                  <p className={styles.Name}>
                    {"Welcome!"}
                    <br />
                    {props.authData.name}
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item container lg={12} justify="center">
          <div className={styles.ProfileDetails}>
            <h2>Membership Details</h2>
            <p>
              <span className={styles.UserData}>
                Username: {userData.username}
              </span>
            </p>
            <p>
              <span className={styles.UserData}>Email: {userData.email}</span>
            </p>
            <p>
              <span className={styles.UserData}>
                Member Role: {userData.role}
              </span>
            </p>
            <p>
              <span className={styles.UserData}>
                Member since: {new Date(userData.joined).toLocaleDateString()}
              </span>
            </p>
            {imageUpload}
            {accountSecurity}
            {bookmarkedAnimes}
          </div>
        </Grid>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${props.authData.name} | MYAN-nime`}</title>
      </Helmet>
      <div className={styles.UserProfile}>{userInfo}</div>
    </React.Fragment>
  );
}

export default withSnackbar(AccountHome);
