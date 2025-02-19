
import { FetchMovies } from "@/hooks/useMovie";
import { useState } from "react";
import "./CSS/ForMovie.css";

export default function ForMovie({ detailData }: { detailData?: FetchMovies }) {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };

  return (
    <div className="movie-container">
      <div className="episode-details">
        <h2>{detailData?.title}</h2>
        <p>{detailData?.description}</p>

        <div className="download-container">
          <button className="download-button" onClick={toggleDownloadOptions}>
            ⬇ 1080p
          </button>
          {showDownloadOptions && (
            <div className="download-options">
              <button>1080p</button>
              <button>720p</button>
              <button>480p</button>
              <button>360p</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
