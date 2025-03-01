
import "./CSS/SeriesPage.css";
import { useSeries } from "@/hooks/useSerie";
import useNavDetail from "@/hooks/useNavDetail";

export default function SeriesPage() {
  const { data: series } = useSeries();
  const { navSerieDetail } = useNavDetail();

  return (
    <div className="SP-section">
      <h2>Series</h2>
      <div className="SP-scroll-container"></div>
      <div className="SP-grid">
        {series &&
          series.map(serie => (
            <div className="SP-box" key={serie._id} onClick={() => navSerieDetail(serie.slug)} >
              <img src={serie.poster_url} />
              <div className="SP-text">
                <h3>{serie.title}</h3>
                <span>{serie.description}</span>
                <ul>
                  {serie.genres.map(genre => <li key={genre._id}>{genre.name}</li>)}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
