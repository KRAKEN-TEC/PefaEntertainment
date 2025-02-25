import { useRef } from "react";
import { data, useParams } from "react-router";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import { useMovie } from "@/hooks/useMovie";
import VideoPlayer from "@/helper/VideoPlayer";
import ForMovie from "../ForMovie";
import ForSeries from "../ForSeries";

export default function WatchingVideo() {
  const { id } = useParams();
  const { data: allData } = useMovie();

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

  const deatilData = allData.find(
    (allData) => String(allData._id) === String(id)
  );

  return (
    <div>
      <div>
        {!deatilData?.seasons ? (
          <VideoPlayer
            posterUrl={deatilData.poster_url}
            videoUrl={deatilData.video_url}
            onReady={handlePlayerReady}
          />
        ) : (
          deatilData.map((ep, i) => (
            <VideoPlayer
              posterUrl={ep.poster_url}
              videoUrl={ep.video_url}
              onReady={handlePlayerReady}
            />
          ))
        )}
      </div>

      <div>
        {!deatilData?.seasons && <ForMovie detailData={deatilData} />}
        {deatilData?.seasons && <ForSeries detailData={deatilData} />}
      </div>
    </div>
  );
}
