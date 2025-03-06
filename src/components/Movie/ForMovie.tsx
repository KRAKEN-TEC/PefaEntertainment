import { useState } from "react";
import "../CSS/ForMovie.css";
import download from "../../assets/download.svg";

// Ko Oak Kar ၀င်မရေးရ

export default function ForMovie({ detailData }: { detailData?: any }) {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };

  return (
    <div className="movie-container">
      <div className="episode-details">
        <h2>{detailData?.title}</h2>

        <div className="download-container">
          <p>{detailData?.description}</p>
          <button className="download-button" onClick={toggleDownloadOptions}>
            <img src={download} />
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
