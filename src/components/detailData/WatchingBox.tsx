import "../CSS/WatchingBox.css";
import { useUserStore } from "@/context/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router";
import download from "../../assets/download.svg";

export default function WatchingBox({ detailData }: { detailData?: any }) {
  const [showPopup, setShowPopup] = useState(false);
  const { accessToken } = useUserStore();
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    if (!accessToken) {
      setShowPopup(true);
    } else {
      console.log("Download");
    }
  };

  const handleVideoNav = () => {
    if (detailData.episodeNumber) {
      navigate(`${detailData.episodeNumber}/watch`);
    } else {
      navigate("watch");
    }
  };

  return (
    <div className="episode-box" key={detailData?._id} >
      <img
        src={detailData?.poster_url}
        alt="Episode Thumbnail"
        className="episode-thumbnail"
        onClick={handleVideoNav}
      />
      <div className="episode-info">
        <div className="ep-info-container" onClick={handleVideoNav}>
          <h3>{detailData?.title}</h3>
          <p className="episode-description">{detailData?.description}</p>
        </div>
        <button className="download-btn" onClick={handleDownloadClick}>
          <img src={download} />
        </button>
        {/* Popup Modal for Login Prompt */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Login Required</h3>
              <p>Please <a>Signup</a> to Downloads</p>
              <button
                className="login-btn"
                onClick={() => alert("Redirecting to login...")}
              >
                Login
              </button>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
