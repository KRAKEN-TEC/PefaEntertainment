import { FetchMovies } from "@/hooks/useMovie";

export default function Overview({ detailData }: { detailData?: FetchMovies }) {
  return (
    <div className="detail-container">
      {/* Description */}
      <div>
        <h2>Description</h2>
        <p>{detailData?.description}</p>
      </div>

      {/* Series Details */}
      <div className="detail-info">
        <h3>Release Date: {detailData?.releasedDate}</h3>
        <h3>Translator: {detailData?.translator}</h3>
        <h3>Encoder: {detailData?.encoder}</h3>
        <h3>Studio: {detailData?.studio}</h3>
      </div>
    </div>
  );
}
