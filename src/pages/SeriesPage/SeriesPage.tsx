import "../CSS/SeriesPage.css";
import { useSeries } from "@/hooks/useSerie";
import useNavDetail from "@/hooks/useNavDetail";
import { genreLi } from "@/components/global/genreLi";
import { useSerieStore } from "@/context/useSerieStore";

// Ko Oak Kar ၀င်မရေးရ

export default function SeriesPage() {
  const { serieQuery } = useSerieStore();
  const { data: series } = useSeries(serieQuery);
  const { navSerieDetail } = useNavDetail();

  return (
    <div className="SP-section">
      <h2>Series</h2>
      <div className="SP-scroll-container"></div>
      <div className="SP-grid">
        {series &&
          series.map((serie) => (
            <div
              className="SP-box"
              key={serie._id}
              onClick={() => navSerieDetail(serie.slug)}
            >
              <img src={serie.poster_url} />
              <div className="SP-text">
                <h3>{serie.title}</h3>
                <span>{serie.description}</span>
                <ul>
                  {serie.genres.map((genre, index) => (
                    index < 3 &&
                    genreLi(genre.name.toUpperCase(), genre._id)
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
