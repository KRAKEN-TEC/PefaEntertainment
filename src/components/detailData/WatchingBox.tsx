import "../CSS/WatchingBox.css";
import { FetchMovie } from "@/hooks/useMovie";
import { useUserStore } from "@/context/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function WatchingBox({
  detailData,
}: {
  detailData?: FetchMovie;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const { accessToken } = useUserStore();
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    if (!accessToken) {
      setShowPopup(true); // Show login popup
    } else {
      console.log("Download"); // Proceed with download if logged in
    }
  };

  const handleVideoNav = () => {
    navigate("watch");
  };

  return (
    <div className="episode-box" key={detailData?._id}>
      <img
        src={detailData?.poster_url}
        alt="Episode 1 Thumbnail"
        className="episode-thumbnail"
      />
      <div className="episode-info">
        <h3>{detailData?.title}</h3>
        <p className="episode-description">{detailData?.description}</p>
        <button className="watch-button" onClick={handleVideoNav}>
          Watch Now
        </button>
        <button className="download-btn" onClick={handleDownloadClick}>
          Download
        </button>
        {/* Popup Modal for Login Prompt */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Login Required</h3>
              <p>You must log in to download this episode.</p>
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
