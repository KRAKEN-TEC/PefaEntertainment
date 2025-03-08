import { useEffect, useRef, useState } from "react";
import { FetchMovies, useMovie } from "@/hooks/useMovie";
import "../CSS/MoviesPage.css";
import useNavDetail from "@/hooks/useNavDetail";
import { useMovieStore } from "@/context/useMovieStore";

export default function MoviesPage() {
  const { movieQuery, setMovieQuery } = useMovieStore();
  const { data: movies } = useMovie(movieQuery);
  const { navMovieDetail } = useNavDetail();
  const lastMovieRef = useRef(null);

  return (
    <div className="MP-section">
      <h2>Movies</h2>
      <div className="MP-scroll-container">
        <div className="MP-grid">
          {preMovies.map((movie, index) => (
            <div
              ref={index === preMovies.length - 1 ? lastMovieRef : null}
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
