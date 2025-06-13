import { FetchMovies, useMovie } from "@/hooks/useMovie";
import "../CSS/MoviesPage.css";
import useNavDetail from "@/hooks/useNavDetail";
import { useMovieStore } from "@/context/useMovieStore";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/context/useThemeStore";

export default function MoviesPage() {
  const { movieQuery, setMovieQuery } = useMovieStore();
  const { data: movies, loading } = useMovie(movieQuery);
  const { navMovieDetail } = useNavDetail();
  const [moviesStore, setMoviesStore] = useState([] as FetchMovies[]);
  const { dark } = useThemeStore();

  // Reset Page When Mount
  useEffect(() => {
    setMovieQuery({ ...movieQuery, page: 1, search: "" });
  }, []);

  // REFRESH STATE on search, genres, ordering
  useEffect(() => {
    setMoviesStore([]); // Clear previous results
    setMovieQuery({ ...movieQuery, page: 1 }); // Reset page when search changes
  }, [movieQuery.search]);

  // ADDS UP CONTENT TO STATE
  useEffect(() => {
    setMoviesStore((prev) => [...prev, ...movies]);
  }, [movies])

  // Scroll listener to load more
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;

      if (currentScroll >= scrollHeight * 0.9 && !loading && movies.length > 0 && movies.length == 12) {
        setMovieQuery({ ...movieQuery, page: movieQuery.page + 1 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, setMovieQuery]);

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
                <div className="imgContainer"><img src={movie.poster_url} /></div>
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
