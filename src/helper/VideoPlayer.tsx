import { useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";

import "videojs-contrib-ads"
import "video.js/dist/video-js.css";
import "videojs-ima";

// GUIDE =>>> https://videojs.com/guides/react/

interface Props {
  id: string;
  posterUrl: string;
  videoUrl: string;
  onReady?: (player: Player) => void;
}

const VideoPlayer = ({ id, posterUrl, videoUrl, onReady }: Props) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered");
    videoElement.setAttribute("id", id);
    if (videoRef.current) videoRef.current.appendChild(videoElement);

    const isHLS = videoUrl.endsWith(".m3u8"); // This checks if the URL is HLS
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      preload: "auto",
      responsive: true,
      fluid: true,
      poster: posterUrl,
      sources: isHLS
        ? [
          {
            src: videoUrl,
            type: "application/x-mpegURL", // HLS
          },
        ]
        : [
          {
            src: videoUrl,
            type: "video/mp4", // MP4 fallback
          },
        ],
    };

    // create player
    const player = videojs(videoElement, videoJsOptions, () => {
      videojs.log("player is ready");
      onReady && onReady(player);

    });

    player.ima({
      adTagUrl: "https://s.magsrv.com/v1/vast.php?idzone=5631720",
      debug: false
    });

    playerRef.current = player;
  }, [videoRef, playerRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player style={{ height: "100%" }}>
      <div style={{ height: "100%" }} ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
