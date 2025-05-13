import "../CSS/WatchingBox.css";
import { useNavigate } from "react-router";
import Download from "../Download";

export default function WatchingBox({ detailData }: { detailData?: any }) {
  const navigate = useNavigate();

  const handleVideoNav = () => {
    if (detailData.episodeNumber) {
      navigate(`${detailData.episodeNumber}/watch`);
    } else {
      navigate("watch");
    }
  };

  return (
    <div className="episode-box" key={detailData?._id}>
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

        {/* <Download detailData={detailData} /> */}
      </div>
    </div>
  );
}
