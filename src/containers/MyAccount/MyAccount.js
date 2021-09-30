import React from "react";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

import { withSnackbar } from "notistack";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

import axios from "../../util/axiosMyannime";

import styles from "./MyAccount.module.css";

function AccountHome(props) {
  let username = null;
  let access_token = null;

  if (props.authData) {
    username = props.authData.username;
    access_token = props.authData.access_token;
  }

  const [control, setControl] = useState("");
  const [userData, setUserData] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showBookmarkList, setshowBookmarkList] = useState(false);
  const [showUpdatePassword, setshowUpdatePassword] = useState(false);
  const [enablePasswordResetButton, setEnablePasswordResetButton] =
    useState(true);

  const { t } = useTranslation();

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
        setUserData(res.data);
      })
      .catch((e) => {});
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
        setEnablePasswordResetButton(true);
      });
  };

  let userInfo = <Loader />;
  let bookmarkedAnimes = null;
  let bookmarkedAnimeList = null;

  let imageUpload = (
    <div>
      <h2>{t("myAccount.profilePic")}</h2>
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
          {t("myAccount.uploadNewPFP")}
        </label>
      </form>
      {fileSelected && !uploadStarted ? (
        <div className={styles.UploadButtonAndText}>
          <p>
            {t("myAccount.photo")} <strong>{fileSelected.name}</strong>{" "}
            {t("myAccount.selected")}
          </p>
          <Button
            variant="outlined"
            color="secondary"
            disabled={!fileSelected}
            onClick={onSubmitHandler}
            disableElevation
          >
            {t("myAccount.uploadNow")}
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
      <h2>{t("myAccount.accountSecurity")}</h2>
      {!showUpdatePassword ? (
        <Button
          className={styles.InputFormFieldContainer}
          type="submit"
          variant="outlined"
          color="primary"
          disableElevation
          onClick={() => setshowUpdatePassword(!showUpdatePassword)}
        >
          {t("myAccount.updatePw")}
        </Button>
      ) : (
        <div className={styles.UpdatePassword}>
          <form onSubmit={onPasswordUpdateHandler}>
            <h4>{t("myAccount.updatePw")}</h4>
            <div
              className={[styles.Input, styles.InputFormFieldContainer].join(
                " ",
              )}
            >
              <label className={styles.Label}>{t("myAccount.oldPw")}</label>
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
              <label className={styles.Label}>{t("myAccount.newPw")}</label>
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
              {t("myAccount.update")}
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
            {t("myAccount.cancel")}
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
          {t("myAccount.resetPw")}
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
          {t("myAccount.hide")}
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
      {t("myAccount.viewBookmarkedAnimes")}
    </Button>
  );

  if (userData) {
    if (!!userData.saved_animes.length) {
      bookmarkedAnimes = (
        <>
          <h2>{t("myAccount.bookmarkedAnimes")}</h2>
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
                    {t("myAccount.welcome")}
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
            <h2>{t("myAccount.memberDetails")}</h2>
            <p>
              <span className={styles.UserData}>
                {t("myAccount.username")} {userData.username}
              </span>
            </p>
            <p>
              <span className={styles.UserData}>
                {t("myAccount.email")} {userData.email}
              </span>
            </p>
            <p>
              <span className={styles.UserData}>
                {t("myAccount.role")} {userData.role}
              </span>
            </p>
            <p>
              <span className={styles.UserData}>
                {t("myAccount.memberSince")}{" "}
                {new Date(userData.joined).toLocaleDateString()}
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
