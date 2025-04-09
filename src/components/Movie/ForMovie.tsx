import "../CSS/ForMovie.css";
import Download from "../Download";


export default function ForMovie({ detailData }: { detailData?: any }) {
  return (
    <div className="movie-container">
      <div className="episode-details">
        <h2>{detailData?.title}</h2>

        <div className="download-container">
          <p>{detailData?.description}</p>
          <Download detailData={detailData} />
        </div>
      </div>
    </div>
  );
}
