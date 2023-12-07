import { ElementTypeMap } from "@definedTypes/steps.types";
import classNames from "classnames";
import { FC } from "react";
import YouTube from "react-youtube";

type IPropsType = {
  containerClassName: string;
} & ElementTypeMap["video"];

const VideoPlayer: FC<IPropsType> = ({ containerClassName, videoId }) => {
  const opts = {
    height: "405px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (ev: any) => {
    ev.target.pauseVideo();
  };
  return (
    <div className={classNames("", containerClassName)}>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};

export default VideoPlayer;
