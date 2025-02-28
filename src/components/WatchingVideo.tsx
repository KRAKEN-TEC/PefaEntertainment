import { useRef } from "react";
import { data, useParams } from "react-router";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import VideoPlayer from "@/helper/VideoPlayer";
import ForMovie from "./ForMovie";
import { useMovieStore } from "@/context/useMovieStore";

export default function WatchingVideo() {
  const playerRef = useRef<Player | null>(null);
  const { id } = useParams();
  const index = id?.split("$")[0];
  const { moviesStore } = useMovieStore();
  const movie = moviesStore[index];

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
      <div>
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
