import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// video.js player from the docs: https://github.com/videojs/video.js/blob/master/docs/guides/react.md

class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props);
    // function onPlayerReady() {
    //   console.log("onPlayerReady", this);
    // }
  }

  // use `ref` to give Video JS a reference to the video DOM element: https://reactjs.org/docs/refs-and-the-dom
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }} data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
          className={"video-js"}
        ></video>
      </div>
    );
  }
}

export default VideoPlayer;
