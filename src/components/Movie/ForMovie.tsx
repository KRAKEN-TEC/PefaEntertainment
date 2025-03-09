import { useState } from "react";
import "../CSS/ForMovie.css";
import download from "../../assets/download.svg";
import { MdVideocamOff } from "react-icons/md";

export default function ForMovie({ detailData }: { detailData?: any }) {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };

  const downloadVdo = async (url: string, fileName: string) => {
    console.log(url);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
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
              <button
                onClick={() => {
                  downloadVdo(detailData.video_url, detailData.title + ".mp4");
                }}
              >
                1080p
              </button>
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
