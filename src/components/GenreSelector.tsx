import { useGenre, FetchGenres } from "@/hooks/useGenre";

interface Props {
  onChange: (genre: FetchGenres) => void;
}

export default function GenreSelector({ onChange }: Props) {
  const { data: genres } = useGenre();

  return (
    <select
      id="genre"
      className="custom-form-select"
      onChange={(event) => {
        const genreId = event.target.value;
        const genre = genres.filter(
          (genre) => String(genre._id) === genreId
        )[0];
        onChange(genre);
      }}
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option value={genre._id} key={genre._id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}
