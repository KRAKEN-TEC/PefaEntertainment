import { FetchMovies } from "@/hooks/useMovie";
import "./CSS/Movies.css";
import { useNavigate } from "react-router";
import useNavDetail from "@/hooks/useNavDetail";
import { genreLi } from "./global/genreLi";
import { useMovieStore } from "@/context/useMovieStore";

export default function Movies() {
  const { moviesStore } = useMovieStore();
  const { callNav } = useNavDetail();

  const nav = useNavigate();

  const getRandomMovies = (moviesStore: FetchMovies[], count = 3) => {
    return moviesStore.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const randomMovies = getRandomMovies(moviesStore);

  return (
    <div className="movie-section">
      <div className="movie-title">
        <h2>Movies</h2>
        <span onClick={() => nav("movies-page")}>See more</span>
      </div>
      <div className="scroll-container">
        <div className="movie-grid">
          {moviesStore &&
            randomMovies.map((movie) => (
              <div
                className="movie-box"
                key={movie._id}
                onClick={() => {
                  callNav(`${movie._id}$movie`);
                }}
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
