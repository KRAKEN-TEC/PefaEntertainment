import { useRef } from "react";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import VideoPlayer from "@/helper/VideoPlayer";
import ForMovie from "./ForMovie";
import { useParams } from "react-router";
import { useSingleMovie } from "@/hooks/useMovie";
import "../CSS/WatchMovie.css";

// Ko Oak Kar ၀င်မရေးရ

export default function WatchMovie() {
  const { id } = useParams();
  const playerRef = useRef<Player | null>(null);
  const { data: movie } = useSingleMovie(id);

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  console.log(movie);

  return (
    <div className="watch-section">
      <div className="watch-container">
        {movie && (
          <VideoPlayer
            posterUrl={movie.poster_url}
            videoUrl={movie.video_url}
            onReady={handlePlayerReady}
          />
        )}
      </div>

      <div>
        <ForMovie detailData={movie} />
      </div>
    </div>
  );
}
