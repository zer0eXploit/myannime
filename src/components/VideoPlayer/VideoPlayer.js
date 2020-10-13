import React from "react";
import Plyr from "plyr";
import "./VideoPlayer.css";

class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = new Plyr(this.videoNode);
    this.player.source = {
      title: "MYANnime Player",
      type: "video",
      sources: this.props.sources,
    };
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <video
          playsinline
          controls
          ref={(node) => (this.videoNode = node)}
        ></video>
      </div>
    );
  }
}

export default VideoPlayer;
