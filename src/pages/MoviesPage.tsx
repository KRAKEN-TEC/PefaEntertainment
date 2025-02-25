import { useMovie } from "@/hooks/useMovie";
import "./CSS/MoviesPage.css";
import useNavDetail from "@/hooks/useNavDetail";
import { genreLi } from "@/components/global/genreLi";
import { useMovieStore } from "@/context/useMovieStore";
import { FetchMovies } from "@/hooks/useMovie";
import { useEffect } from "react";

export default function MoviesPage() {
  const { data: movies } = useMovie();
  const { callNavForMoviesPage } = useNavDetail();
  const { moviesStore, setMovieStore } = useMovieStore();

  const navigate = () => {
    console.log("Hello");
  };

  useEffect(() => {
    if (movies && JSON.stringify(moviesStore) !== JSON.stringify(movies)) {
      setMovieStore(movies as FetchMovies[]);
    }
  }, [movies]);

  return (
    <div className="MP-section">
      <h2>Movies</h2>
      <div className="MP-scroll-container">
        <div className="MP-grid">
          {moviesStore &&
            moviesStore.map((movie, index) => (
              <div
                className="MP-box"
                key={movie._id}
                onClick={() => callNavForMoviesPage(`${index}$movie`)}
              >
                <img src={movie.poster_url} />
                <div className="mp-text">
                  <h3>{movie.title}</h3>
                  <span>{movie.description}</span>
                  <ul>
                    {movie.genres.map((g, index) => (
                      index < 3 &&
                      genreLi(g._id, g.name.toUpperCase())
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
