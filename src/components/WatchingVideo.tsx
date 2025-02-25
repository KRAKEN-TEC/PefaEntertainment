import { useRef } from "react";
import { data, useParams } from "react-router";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import VideoPlayer from "@/helper/VideoPlayer";
import ForMovie from "./ForMovie";
import ForSeries from "./ForSeries";

export default function WatchingVideo() {
  const playerRef = useRef<Player | null>(null);

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div>
      {/* <div>
        {deatilData && (
          <VideoPlayer
            posterUrl={deatilData.poster_url}
            videoUrl={deatilData.video_url}
            onReady={handlePlayerReady}
          />
        )}
      </div>

      <div>
        {!deatilData?.seasons && <ForMovie detailData={deatilData} />}
        {deatilData?.seasons && <ForSeries detailData={deatilData} />}
      </div> */}
    </div>
  );
}
