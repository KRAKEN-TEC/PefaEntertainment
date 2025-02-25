import { useRef } from "react";
import { data, useParams } from "react-router";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import { useMovie } from "@/hooks/useMovie";
import VideoPlayer from "@/helper/VideoPlayer";
import ForMovie from "./ForMovie";
import ForSeries from "./ForSeries";

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
      </div>
    </div>
  );
}

// {videoData.seasons[selectedSeason].episodes.map(
//   (episode, i) => (
//     <div key={i} className="episode-item">
//       <img
//         src={episode.thumbnail}
//         alt={`Episode ${i + 1}`}
//       />
//       <div>
//         <h3>
//           Episode {i + 1} - {episode.title}
//         </h3>
//         <p>{episode.description}</p>
//         <span>{episode.duration}</span>
//       </div>
