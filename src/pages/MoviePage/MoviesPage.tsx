import { useMovie } from "@/hooks/useMovie";
import "../CSS/MoviesPage.css";
import useNavDetail from "@/hooks/useNavDetail";

// Ko Oak Kar ၀င်မရေးရ

export default function MoviesPage() {
  const { data: movies } = useMovie();
  const { navMovieDetail } = useNavDetail();

  return (
    <div className="MP-section">
      <h2>Movies</h2>
      <div className="MP-scroll-container">
        <div className="MP-grid">
          {movies &&
            movies.map((movie) => (
              <div
                className="MP-box"
                key={movie._id}
                onClick={() => navMovieDetail(`${movie.slug}`)}
              >
                <img src={movie.poster_url} />
                <div className="mp-text">
                  <h3>{movie.title}</h3>
                  <span>{movie.description}</span>
                  <ul>
                    {movie.genres.map((genre) => (
                      <li key={genre._id}>{genre.name}</li>
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
