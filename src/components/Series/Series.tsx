import { FetchSeries, useSeries } from "@/hooks/useSerie";
import "../CSS/Series.css";
import useNavDetail from "@/hooks/useNavDetail";
import { genreLi } from "../global/genreLi";
import { useSerieStore } from "@/context/useSerieStore";
import { useThemeStore } from "@/context/useThemeStore";
import { useEffect } from "react";

export default function Series() {
  const { serieQuery, setSerieQuery } = useSerieStore();
  const { data: series } = useSeries(serieQuery);
  const { nav, navSerieDetail } = useNavDetail();
  useEffect(() => {
    setSerieQuery({ ...serieQuery, page: 0, search: "" });
  }, []);
  const getRandomSeries = (seriesStore: FetchSeries[], count = 3) => {
    return seriesStore.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const randomSeries = getRandomSeries(series);
  const { dark } = useThemeStore();

  return (
    <div className={`series-section ${dark === true ? "light" : "dark"}`}>
      <div className="series-title">
        <h2>Series</h2>
        <span onClick={() => nav("series")}>See more</span>
      </div>

      <div className="series-scroll-container">
        <div className="series-grid">
          {series &&
            randomSeries.map((s) => (
              <div
                className="series-box"
                key={s._id}
                onClick={() => navSerieDetail(s.slug)}
              >
                <img src={s.poster_url} />
                <div>
                  <div className="series-text">
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
