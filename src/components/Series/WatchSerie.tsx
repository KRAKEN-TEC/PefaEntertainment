import VideoPlayer from "@/helper/VideoPlayer";
import { useParams } from "react-router";
import { useSingleEpisode } from "@/hooks/useSerie";
import ForSeries from "./ForSeries";

import "../CSS/WatchMovie.css";

export default function WatchSerie() {
  const { serieSlug, seasonNumber, episodeNumber } = useParams();
  const { data: episode } = useSingleEpisode(
    serieSlug,
    seasonNumber,
    episodeNumber
  );

  return (
    <div className="watch-section">
      <div className="watch-container">
        {episode && (
          <VideoPlayer
            id="watch-serie"
            posterUrl={episode.poster_url}
            videoUrl={episode.video_url}
          />
        )}
      </div>
      <div>
        <ForSeries detailData={episode} />
      </div>
    </div>
  );
}
