import { useState } from "react";
import download from "../assets/download.svg";
import { useUserStore } from "@/context/useUserStore";
import { useNavigate } from "react-router";

export default function Download({ detailData }: { detailData?: any }) {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { accessToken } = useUserStore();
  const navigate = useNavigate();

  const toggleDownloadOptions = () => {
    setShowDownloadOptions((prev) => !prev);
  };

  const downloadVdo = async (url: string, fileName: string) => {
    navigator.permissions.query({ name: "downloads" }).then(() => {
      alert(
        "You have denied download permissions. Please enable them in your browser settings."
      );
    });

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

  const handleDownloadClick = () => {
    if (!accessToken) {
      setShowPopup(true);
      return;
    }
    toggleDownloadOptions();
  };

  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Login Required</h3>
            <p>Please Sign Up to Download</p>
            <button
              className="login-btn"
              onClick={() => navigate("/login")} // Redirect to login
            >
              Login
            </button>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <button className="download-button" onClick={handleDownloadClick}>
        <img src={download} alt="Download" />
      </button>

      {showDownloadOptions && (
        <div className="download-options">
          <button
            onClick={() =>
              downloadVdo(detailData?.video_url, `${detailData?.title}.mp4`)
            }
          >
            1080p
          </button>
          <button>720p</button>
          <button>480p</button>
          <button>360p</button>
        </div>
      )}
    </>
  );
}
