import { genreLi } from "@/components/global/genreLi";
import "./CSS/SeriesPage.css";
import useNavDetail from "@/hooks/useNavDetail";
import { FetchSeries, useSerie } from "@/hooks/useSerie";
import { useSerieStore } from "@/context/useSerieStore";
import { useEffect } from "react";

export default function SeriesPage() {
  const { data: series } = useSerie();
  const { callNavForSeriesPage } = useNavDetail();
  const { seriesStore, setSeriesStore } = useSerieStore();

  useEffect(() => {
    if (series && JSON.stringify(seriesStore) !== JSON.stringify(series)) {
      setSeriesStore(series as FetchSeries[]);
    }
  }, [series]);

  return (
    <div className="SP-section">
      <h2>Series</h2>
      <div className="SP-scroll-container"></div>
      <div className="SP-grid">
        {seriesStore &&
          seriesStore.map((s, index) => (
            <div
              className="SP-box"
              key={s._id}
              onClick={() => callNavForSeriesPage(`${s._id}$series`)}
            >
              <img src={s.poster_url} />
              <div className="SP-text">
                <h3>{s.title}</h3>
                <span>{s.description}</span>
                <ul>
                  {s.genres.map(
                    (g, index) =>
                      index < 3 && genreLi(g.name.toUpperCase(), g._id)
                  )}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
