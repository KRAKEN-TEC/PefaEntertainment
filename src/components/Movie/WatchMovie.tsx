import VideoPlayer from "@/helper/VideoPlayer";
import ForMovie from "./ForMovie";
import { useParams } from "react-router";
import { useSingleMovie } from "@/hooks/useMovie";

import "../CSS/WatchMovie.css";

export default function WatchMovie() {
  const { id } = useParams();
  const { data: movie } = useSingleMovie(id);

  return (
    <div className="watch-section">
      <div className="watch-container">
        {movie && (
          <VideoPlayer
            id="watch-movie"
            posterUrl={movie.poster_url}
            videoUrl={movie.video_url}
          />
        )}
      </div>

      <div>
        <ForMovie detailData={movie} />
      </div>
    </div>
  );
}
