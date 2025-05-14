import { FetchMovies, useMovie } from "@/hooks/useMovie";
import "../CSS/MoviesPage.css";
import useNavDetail from "@/hooks/useNavDetail";
import { useMovieStore } from "@/context/useMovieStore";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/context/useThemeStore";

export default function MoviesPage() {
  const {
    moviesStore,
    setMovieStore,
    movieQuery,
    setMovieQuery,
    setMovieSearchStore,
  } = useMovieStore();
  const { data: movies } = useMovie(movieQuery);
  const { navMovieDetail } = useNavDetail();

  useEffect(() => {
    if (movieQuery.page === 1 && movieQuery.search === "") {
      setMovieSearchStore(movies);
      return;
    }
    movieQuery.search?.length > 0
      ? setMovieSearchStore(movies)
      : setMovieStore(movies as FetchMovies[]);
  }, [movies]);

  const [isFetching, setIsFetching] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<null | number>(null);

  const { dark } = useThemeStore();

  const handleScroll = () => {
    if (isFetching) return;

    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;
    const maxVal = (maxScrollY / 3) * 2;
    const tolerance = 50;
    if (window.scrollY >= maxVal - tolerance) {
      setIsFetching(true);
      setMovieQuery({ ...movieQuery, page: movieQuery.page + 1 });
    }
  };
  useEffect(() => {
    const handle = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      setDebounceTimer(setTimeout(handleScroll, 50));
    };

    window.addEventListener("scroll", handle);

    return () => window.removeEventListener("scroll", handle);
  }, [debounceTimer, isFetching, movieQuery, setMovieQuery]);

  useEffect(() => {
    if (!isFetching) return;

    const loadDataTimeout = setTimeout(() => {
      setIsFetching(false);
    }, 1000);

    return () => clearTimeout(loadDataTimeout);
  }, [isFetching, movieQuery]);

  return (
    <div className={`MP-section ${dark === true ? "light" : "dark"}`}>
      <h2>Movies</h2>
      <div className="MP-scroll-container">
        <div className="MP-grid">
          {moviesStore &&
            moviesStore.map((movie, index) => (
              <div
                className="MP-box"
                key={index}
                onClick={() => navMovieDetail(`${movie.slug}`)}
              >
                <img src={movie.poster_url} />
                <div className="mp-text">
                  <h3>{movie.title}</h3>
                  <span>{movie.description}</span>
                  <ul>
                    {movie.genres.map((genre) => (
                      <li key={genre._id}>{genre.name.toUpperCase()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
