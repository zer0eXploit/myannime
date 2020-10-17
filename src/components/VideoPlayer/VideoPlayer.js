import React from "react";
import Plyr from "plyr";

import "./VideoPlayer.css";

class VideoPlayer extends React.Component {
  logEventToGA = (event_name) => {
    try {
      window.firebase.analytics().logEvent(event_name);
    } catch (error) {
      console.log(`[GA LOG:] ${error.message}`);
    }
  };

  componentDidMount() {
    this.player = new Plyr(this.videoNode);
    this.player.source = {
      title: "MYANnime Player",
      type: "video",
      sources: [
        {
          src: this.props.videoInfo,
          type: "video/mp4",
          size: 720,
        },
        {
          src: this.props.videoInfo,
          type: "video/mp4",
          size: 1080,
        },
      ],
    };
    this.player.on("play", (event) => {
      this.logEventToGA("video_play");
    });
    this.player.on("ended", (event) => {
      this.logEventToGA("video_ended");
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

export default VideoPlayer;
