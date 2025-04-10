import "../CSS/ForMovie.css";
import Download from "../Download";
import { useThemeStore } from "@/context/useThemeStore";


export default function ForMovie({ detailData }: { detailData?: any }) {
  const { dark } = useThemeStore();
  return (
    <div className="movie-container">
      <div className={`episode-details ${dark === true ? "light" : "dark"}`}>
        <h2>{detailData?.title}</h2>

        <div className="download-container">
          <p>{detailData?.description}</p>
          <Download detailData={detailData} />
        </div>
      </div>
    </div>
  );
}
