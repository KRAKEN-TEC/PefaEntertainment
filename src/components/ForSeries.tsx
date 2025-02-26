import { useState } from "react";

export default function ForSeries({ detailData }: { detailData?: any }) {
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
      {/* Next Episode Section */}
      <div className="next-episode">
        <img src="/path-to-next-episode-thumbnail.jpg" alt="Next Episode" />
        <div className="episode-info">
          <h3>Episode 02 - Lorem Ipsum</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          <span>28 Min 30 Sec</span>
        </div>
      </div>
    </div>
  );
}
