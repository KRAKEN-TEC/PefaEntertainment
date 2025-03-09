import { useRef } from "react";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import VideoPlayer from "@/helper/VideoPlayer";
import { useParams } from "react-router";
import { useSingleEpisode } from "@/hooks/useSerie";
import ForSeries from "./ForSeries";
import "../CSS/WatchMovie.css";

export default function WatchSerie() {
  const { serieSlug, seasonNumber, episodeNumber } = useParams();
  const playerRef = useRef<Player | null>(null);
  const { data: episode } = useSingleEpisode(
    serieSlug,
    seasonNumber,
    episodeNumber
  );

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  console.log(episode);

  return (
    <div className="watch-section">
      <div className="watch-container">
        {episode && (
          <VideoPlayer
            posterUrl={episode.poster_url}
            videoUrl={episode.video_url}
            onReady={handlePlayerReady}
          />
        )}
      </div>

      <div>
        <ForSeries detailData={episode} />
      </div>
    </div>
  );
}
