import React from "react";
import Plyr from "plyr";
import axios from "axios";
import { withSnackbar } from "notistack";

import "./VideoPlayer.css";

import toZawgyi from "../../util/convertToZg";

class VideoPlayer extends React.Component {
  BASE_URI = "https://api.onedrive.com/v1.0/shares";
  FINAL_URI_PATH = "root?expand=children&select=id%2C%40content.downloadUrl";
  FETCH_ERROR =
    "တောင်းပန်ပါသည်။ ယခု server မှ ဗီဒီယို ကြည့်လို့မရနိုင်ပါ။ Server ပြောင်းကြည့်ပေးပါ။";

  componentDidMount() {
    console.log(this.props);
    this.player = new Plyr(this.videoNode);
    axios
      .get(`${this.BASE_URI}/u!${this.props.videoInfo}/${this.FINAL_URI_PATH}`)
      .then((res) => {
        const videoData = res.data;
        this.player.source = {
          title: "MYANnime Player",
          type: "video",
          sources: [
            {
              src: videoData["@content.downloadUrl"],
              type: "video/mp4",
              size: 720,
            },
            {
              src: videoData["@content.downloadUrl"],
              type: "video/mp4",
              size: 1080,
            },
          ],
        };
      })
      .catch((error) => {
        console.log(error.message);
        this.props.enqueueSnackbar(
          this.props.isZawgyi ? toZawgyi(this.FETCH_ERROR) : this.FETCH_ERROR,
          {
            variant: "error",
          }
        );
      });
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <video
          playsInline
          controls
          ref={(node) => (this.videoNode = node)}
        ></video>
      </div>
    );
  }
}

export default withSnackbar(VideoPlayer);
