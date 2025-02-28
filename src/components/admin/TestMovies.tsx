import { useMovie } from "@/hooks/useMovie"

const queryObj = {
  page: 1,
  search: "",
  ordering: "-title",
  genres: { _id: "", name: "" },
};


export default function TestMovies() {
  const { data: movies, loading, error } = useMovie(queryObj);

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
