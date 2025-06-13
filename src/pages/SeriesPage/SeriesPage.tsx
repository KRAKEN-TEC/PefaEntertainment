import "../CSS/SeriesPage.css";
import { FetchSeries, useSeries } from "@/hooks/useSerie";
import useNavDetail from "@/hooks/useNavDetail";
import { genreLi } from "@/components/global/genreLi";
import { useSerieStore } from "@/context/useSerieStore";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/context/useThemeStore";

export default function SeriesPage() {
  const { serieQuery, setSerieQuery } = useSerieStore();
  const { data: series, loading } = useSeries(serieQuery);
  const [seriesStore, setSeriesStore] = useState([] as FetchSeries[]);
  const { navSerieDetail } = useNavDetail();
  const { dark } = useThemeStore();

  // Reset Page When Mount
  useEffect(() => {
    setSerieQuery({ ...serieQuery, page: 1, search: "" });
  }, []);

  // REFRESH STATE on search, genres, ordering
  useEffect(() => {
    setSeriesStore([]); // Clear previous results
    setSerieQuery({ ...serieQuery, page: 1 }); // Reset page when search changes
  }, [serieQuery.search]);

  // ADDS UP CONTENT FROM PAGES
  useEffect(() => {
    setSeriesStore((prev) => [...prev, ...series]);
  }, [series])

  // Scroll listener to load more
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;

      if (currentScroll >= scrollHeight * 0.9 && !loading && series.length > 0 && series.length == 12) {
        setSerieQuery({ ...serieQuery, page: serieQuery.page + 1 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, setSerieQuery]);

  return (
    <div className={`SP-section ${dark === true ? "light" : "dark"}`}>
      <h2>Series</h2>
      <div className="SP-scroll-container"></div>
      <div className="SP-grid">
        {seriesStore &&
          seriesStore.length > 0 &&
          seriesStore.map((serie, index) => (
            <div>
              <div
                className="SP-box"
                key={index}
                onClick={() => navSerieDetail(serie.slug)}
              >
                <div className="imgContainer">
                  <img src={serie.poster_url} />
                </div>
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
            </div>
          ))}
      </div>
    </div>
  );
}
