import { useMovie } from "@/hooks/useMovie"

export default function TestMovies() {
  const { data: movies, loading, error } = useMovie();

  return (
    <>
      {loading && <p>{loading}</p>}
      {error && <p>{error}</p>}

      <div>TestMovies</div>
      <ul>
        {movies.map(movie => <li key={movie._id}>{movie.title}</li>)}
      </ul>
    </>
  )
}
