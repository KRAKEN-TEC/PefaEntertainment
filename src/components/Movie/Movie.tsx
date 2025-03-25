import { FetchMovies, useMovie } from "@/hooks/useMovie";
import { genreLi } from "../global/genreLi";
import "../CSS/Movies.css";
import useNavDetail from "@/hooks/useNavDetail";
import { useMovieStore } from "@/context/useMovieStore";
import { useThemeStore } from "@/context/useThemeStore";
import { useEffect } from "react";

// Ko Oak Kar ၀င်မရေးရ

export default function Movies() {
  const { movieQuery, setMovieQuery } = useMovieStore();
  const { data: movies } = useMovie(movieQuery);
  const { nav, navMovieDetail } = useNavDetail();
  const getRandomMovies = (moviesStore: FetchMovies[], count = 3) => {
    return moviesStore.sort(() => Math.random() - 0.5).slice(0, count);
  };

  useEffect(() => {
    setMovieQuery({ ...movieQuery, page: 0, search: "" });
  }, []);
  const randomMovies = getRandomMovies(movies);
  const { dark } = useThemeStore();

  return (
    <div className={`movie-section ${dark === true ? "light" : "dark"}`}>
      <div className="movie-title">
        <h2>Movies</h2>
        <span onClick={() => nav("movies")}>See more</span>
      </div>

      <div className="scroll-container">
        <div className="movie-grid">
          {movies &&
            randomMovies.map((movie) => (
              <div
                className="movie-box"
                key={movie._id}
                onClick={() => navMovieDetail(movie.slug)}
              >
                <img src={movie.poster_url} />
                <div className="movie-text">
                  <h3>{movie.title}</h3>
                  <span>{movie.description}</span>
                  <ul>
                    {movie.genres.map(
                      (g, index) =>
                        index < 3 && genreLi(g.name.toUpperCase(), g._id)
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
