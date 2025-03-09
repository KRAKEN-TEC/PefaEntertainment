import { useMovieStore } from "@/context/useMovieStore";
import { useSerieStore } from "@/context/useSerieStore";
import { useEffect, useRef, useState } from "react";
import useNavDetail from "@/hooks/useNavDetail";
import { scroll } from "@/helper/GlobalHelper";

import { genreLi } from "./global/genreLi";

import { FetchMovies, useMovie } from "@/hooks/useMovie";
import { FetchSeries, useSeries } from "@/hooks/useSerie";
import "./CSS/NewRealses.css";
import ButtonWithSVGIcon from "./ui/Global/ButtonWithSvgIcon";

// Ko Oak Kar ၀င်မရေးရ

export default function NewRealeses() {
  const NR_movie_container = useRef<HTMLDivElement | null>(null);
  const NR_movie_box = useRef<HTMLDivElement | null>(null);

  const { moviesStore, setMovieStore } = useMovieStore();
  const { seriesStore, setSeriesStore } = useSerieStore();
  const { data: newRealsesMovies } = useMovie();
  const { data: newRealsesSeries } = useSeries();
  const { callNav } = useNavDetail();
  const [clientWidth, setClientWidth] = useState<number>(0);

  // State for filtering
  const [selectedCategory, setSelectedCategory] = useState<"movies" | "series">(
    "movies"
  );

  useEffect(() => {
    if (
      newRealsesMovies &&
      JSON.stringify(moviesStore) !== JSON.stringify(newRealsesMovies)
    ) {
      setMovieStore(newRealsesMovies as FetchMovies[]);
    }
    if (
      newRealsesSeries &&
      JSON.stringify(seriesStore) !== JSON.stringify(newRealsesSeries)
    ) {
      setSeriesStore(newRealsesSeries as FetchSeries[]);
    }
    if (NR_movie_box.current) {
      setClientWidth(NR_movie_box.current.clientWidth);
    }
  }, [newRealsesMovies, newRealsesSeries]);

  // Filter data based on selected category
  const displayedData =
    selectedCategory === "movies" ? moviesStore : seriesStore;

  return (
    <div className="NR-movie-section">
      <div className="NR-heading">
        <h2>New Releases</h2>

        {/* Category Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={selectedCategory === "movies" ? "active" : ""}
            onClick={() => setSelectedCategory("movies")}
          >
            Movies
          </button>
          <button
            className={selectedCategory === "series" ? "active" : ""}
            onClick={() => setSelectedCategory("series")}
          >
            Series
          </button>
        </div>
      </div>

      <div className="NR-scroll-container" ref={NR_movie_container}>
        {displayedData?.length > 0 && (
          <>
            <ButtonWithSVGIcon
              onClick={() => {
                scroll("right", NR_movie_container.current!, clientWidth);
              }}
              btnType="button"
              className="scroll-btn left"
              svg={
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 25C50 38.8235 38.8235 50 25 50C11.1765 50 0 38.8235 0 25C0 11.1765 11.1765 0 25 0C38.8235 0 50 11.1765 50 25ZM2.94118 25C2.94118 37.2059 12.7941 47.0588 25 47.0588C37.2059 47.0588 47.0588 37.2059 47.0588 25C47.0588 12.7941 37.2059 2.94118 25 2.94118C12.7941 2.94118 2.94118 12.7941 2.94118 25Z"
                    fill="#E85448"
                  />
                  <path
                    d="M27.472 12.7911L15.2661 24.997L27.472 37.2029L25.4131 39.2617L11.1484 24.997L25.4131 10.7323L27.472 12.7911Z"
                    fill="#E85448"
                  />
                  <path
                    d="M13.2656 26.4668V23.5256H38.2656V26.4668H13.2656Z"
                    fill="#E85448"
                  />
                </svg>
              }
            />
            <ButtonWithSVGIcon
              onClick={() => {
                scroll("left", NR_movie_container.current!, clientWidth);
              }}
              btnType="button"
              className="scroll-btn right"
              svg={
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="scale(-1,1) translate(-50,0)">
                    <path
                      d="M50 25C50 38.8235 38.8235 50 25 50C11.1765 50 0 38.8235 0 25C0 11.1765 11.1765 0 25 0C38.8235 0 50 11.1765 50 25ZM2.94118 25C2.94118 37.2059 12.7941 47.0588 25 47.0588C37.2059 47.0588 47.0588 37.2059 47.0588 25C47.0588 12.7941 37.2059 2.94118 25 2.94118C12.7941 2.94118 2.94118 12.7941 2.94118 25Z"
                      fill="#E85448"
                    />
                    <path
                      d="M27.472 12.7911L15.2661 24.997L27.472 37.2029L25.4131 39.2617L11.1484 24.997L25.4131 10.7323L27.472 12.7911Z"
                      fill="#E85448"
                    />
                    <path
                      d="M13.2656 26.4668V23.5256H38.2656V26.4668H13.2656Z"
                      fill="#E85448"
                    />
                  </g>
                </svg>
              }
            />
          </>
        )}

        <div className="NR-movie-grid">
          {displayedData &&
            displayedData.map((item) => (
              <div
                className="NR-movie-box"
                ref={NR_movie_box}
                key={item._id}
                onClick={() => {
                  callNav(item.slug, selectedCategory);
                }}
                style={{
                  backgroundImage: `url(${item.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="overlay">
                  <h3>{item.title}</h3>
                  <ul>
                    {item.genres.map(
                      (genre: { _id: string; name: string }, index: number) =>
                        index < 3 &&
                        genreLi(genre.name.toUpperCase(), genre._id)
                    )}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
