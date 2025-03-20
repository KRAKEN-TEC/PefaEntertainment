import "../CSS/SeriesPage.css";
import { FetchSeries, useSeries } from "@/hooks/useSerie";
import useNavDetail from "@/hooks/useNavDetail";
import { genreLi } from "@/components/global/genreLi";
import { useSerieStore } from "@/context/useSerieStore";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/context/useThemeStore";

export default function SeriesPage() {
  const { serieQuery, setSerieQuery, seriesStore, setSeriesStore } =
    useSerieStore();
  const { data: series } = useSeries(serieQuery);
  const { navSerieDetail } = useNavDetail();

  useEffect(() => {
    setSeriesStore(series as FetchSeries[]);
  }, [series]);

  const [isFetching, setIsFetching] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleScroll = () => {
    if (isFetching) return;

    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;
    const maxVal = (maxScrollY / 3) * 2;
    const tolerance = 50;
    if (window.scrollY >= maxVal - tolerance) {
      setIsFetching(true);
      setSerieQuery({ ...serieQuery, page: serieQuery.page + 1 });
    }
  };
  useEffect(() => {
    const handle = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      setDebounceTimer(setTimeout(handleScroll, 200));
    };

    window.addEventListener("scroll", handle);

    return () => window.removeEventListener("scroll", handle);
  }, [debounceTimer, isFetching, serieQuery, setSerieQuery]);

  useEffect(() => {
    if (!isFetching) return;

    const loadDataTimeout = setTimeout(() => {
      setIsFetching(false);
    }, 1000);

    return () => clearTimeout(loadDataTimeout);
  }, [isFetching, serieQuery]);

  const { dark } = useThemeStore();

  return (
    <div className={`SP-section ${dark === true ? "light" : "dark"}`}>
      <h2>Series</h2>
      <div className="SP-scroll-container"></div>
      <div className="SP-grid">
        {seriesStore &&
          seriesStore.map((serie) => (
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
                  {serie.genres.map(
                    (genre, index) =>
                      index < 3 && genreLi(genre.name.toUpperCase(), genre._id)
                  )}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
