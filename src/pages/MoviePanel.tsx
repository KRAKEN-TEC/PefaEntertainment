
import { DialogFooter, Text, Box, GridItem, Button, Fieldset, HStack, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner, Stack, Spacer } from "@chakra-ui/react";
import { useForm, UseFormSetValue, FieldErrors, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/ui/field";

import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { useMovie, useMovieActions, FormMovie, FetchMovies, schemaMovie } from "@/hooks/useMovie";
import { UserLogin, UserLogout } from "@/pages/TeamPanel";
import { useGenre } from "@/hooks/useGenre";
import { useMovieStore } from "@/context/useMovieStore";
import { useUserStore } from "@/context/useUserStore";
import { DialogActionBox } from "@/components/global/DialogBox";
import SortSelector from "@/components/global/SortSelector";
import AlertMessage from "@/components/global/AlertMessage";
import MultipleSelector from "@/components/global/MultipleSelector";
import DialogBox from "@/components/global/DialogBox";
import GenreField from "@/components/global/GenreField";
import MovieField from "@/components/global/MovieField";
import MovieUpdateField from "@/components/global/MovieUpdateField";
import AddGenre from "@/components/global/AddGenre";
import MovieGenreUpdateField from "@/components/global/MovieGenreUpdateField";
import AdminNavLink from "@/components/global/AdminNavLink";
import AdminSearchInput from "@/components/admin/AdminSearchInput";
import DarkMode from "@/components/DarkMode";

interface MovieUpdateProps {
  children: React.ReactNode;
  movie: FetchMovies;
}

interface FileFields {
  setValue: UseFormSetValue<FormMovie>;
  errors: FieldErrors<FormMovie>;
}

interface OtherFieldsProps {
  register: UseFormRegister<FormMovie>;
  errors: FieldErrors<FormMovie>;
}

const movieSortArray = [
  { value: "uploadDate", label: "Upload Date" },
  { value: "rating", label: "Rating" },
  { value: "releasedDate", label: "Released Date" },
]

// MOVIE ACTIONS AND LIST
const MovieUpdateForm = ({ movie, children }: MovieUpdateProps) => {
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<FormMovie>();
  const { alert, handleUpdate } = useMovieActions();

  const onSubmit = (payload: FormMovie) => {
    handleUpdate(payload, movie);
  };

  return (
    <>
      <DialogActionBox dialogTitle="Movie Form" buttonTitle={`${children}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MovieUpdateField label="Title" payloadKey="title" fetchKey="title" movie={movie} register={register} errors={errors} />
          <MovieGenreUpdateField register={register} errors={errors} document={movie} />
          <MovieUpdateField label="Rating" payloadKey="rating" fetchKey="rating" movie={movie} valueAsNumber={true} register={register} errors={errors} />
          <MovieUpdateField label="Description" payloadKey="description" fetchKey="description" movie={movie} register={register} errors={errors} />
          <MovieUpdateField label="Released Date" payloadKey="releasedDate" fetchKey="releasedDate" movie={movie} register={register} errors={errors} />
          <MovieUpdateField label="Translator" payloadKey="translator" fetchKey="translator" movie={movie} register={register} errors={errors} />
          <MovieUpdateField label="Encoder" payloadKey="encoder" fetchKey="encoder" movie={movie} register={register} errors={errors} />
          <MovieUpdateField label="Studio" payloadKey="studio" fetchKey="studio" movie={movie} register={register} errors={errors} />
          <FileField setValue={setValue} errors={errors} />
          {alert && <AlertMessage message={alert} />}
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogActionBox>
    </>
  );
};

const MovieAction = ({ movie }: { movie: FetchMovies }) => {
  const { accessToken, handleDelete } = useMovieActions();

  const onClick = () => {
    handleDelete(movie);
  };

  return (
    <>
      {accessToken ? (
        <HStack>
          <MovieUpdateForm movie={movie}>Edit</MovieUpdateForm>
          {movie.video_url !== "pending" &&
            <Button variant="plain" _hover={{ color: "cyan" }} color="red" onClick={onClick}>Delete</Button>
          }
        </HStack>
      ) : (
        <HStack>
          <Button variant="plain" _hover={{ textDecoration: "underline" }} color="grey" onClick={() => window.alert("Please login to perform this action")} >Edit</Button>
          <Button variant="plain" _hover={{ textDecoration: "underline" }} color="grey" onClick={() => window.alert("Please login to perform this action")}> Delete</Button>
        </HStack>
      )}
    </>
  );
};

const MovieList = () => {
  const { movieQuery } = useMovieStore();
  const { data: movies, error, loading } = useMovie(movieQuery);

  return (
    <>
      <Table.ScrollArea height={movies?.length ? "560px" : "auto"}>
        <TableRoot stickyHeader>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Title</TableColumnHeader>
              <TableColumnHeader>Genre</TableColumnHeader>
              <TableColumnHeader>Rating</TableColumnHeader>
              <TableColumnHeader>Released Date</TableColumnHeader>
              <TableColumnHeader>Translator</TableColumnHeader>
              <TableColumnHeader>Encoder</TableColumnHeader>
              <TableColumnHeader>Studio</TableColumnHeader>
              <TableColumnHeader paddingLeft={7}>Actions</TableColumnHeader>
            </TableRow>
          </TableHeader>

          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie._id} color={movie.video_url === "pending" ? "gray" : ""}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </TableCell>
                <TableCell>{movie.rating}</TableCell>
                <TableCell>{movie.releasedDate.split("T")[0]}</TableCell>
                <TableCell>{movie.translator}</TableCell>
                <TableCell>{movie.encoder}</TableCell>
                <TableCell>{movie.studio}</TableCell>
                <TableCell>
                  <MovieAction movie={movie} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </TableRoot>
      </Table.ScrollArea>

      {error && (
        <Text fontSize="6xl" textAlign="center" mt="20vh">
          {error}
        </Text>
      )}

      {loading && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems="center"
          height="50vh"
        >
          <Spinner size="xl" />
        </Box>
      )}
    </>
  );
};

// ADD MOVIE
const FileField = ({ setValue, errors }: FileFields) => {
  return (
    <>
      <Field label="Poster File">
        <input
          type="file"
          accept="image/jpeg, image/png"
          className="file-upload"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setValue("poster", file);
          }}
        />
        {errors.poster?.message && (
          <p className="text-danger">{errors.poster?.message}</p>
        )}
      </Field>

      <Field label="Video File">
        <input
          type="file"
          accept="video/mp4"
          className="file-upload"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setValue("video", file);
          }}
        />
        {errors.video?.message && (
          <p className="text-danger">{errors.video?.message}</p>
        )}
      </Field>
    </>
  );
};

const OtherFields = ({ register, errors }: OtherFieldsProps) => {
  return (
    <>
      <MovieField label="Title" payloadKey="title" placeHolder="Title..." required={true} register={register} errors={errors} />

      <GenreField payloadKey="genreIds" register={register} errors={errors} />

      <MovieField label="Rating" payloadKey="rating" placeHolder="1~10" valueAsNumber={true} register={register} errors={errors} />

      <MovieField label="Description" payloadKey="description" placeHolder="Spirited Away is a ..." required={true} register={register} errors={errors} />

      <MovieField label="Released Date" payloadKey="releasedDate" placeHolder="YYYY-MM-DD" required={true} register={register} errors={errors} />

      <MovieField label="Translator" payloadKey="translator" placeHolder="Translator..." required={true} register={register} errors={errors} />

      <MovieField label="Encoder" payloadKey="encoder" placeHolder="Encoder..." required={true} register={register} errors={errors} />

      <MovieField label="Studio" payloadKey="studio" placeHolder="Studio..." required={true} register={register} errors={errors} />
    </>
  );
};

const AddMovie = () => {
  const { register, setValue, handleSubmit, formState: { errors }, } = useForm<FormMovie>({ resolver: zodResolver(schemaMovie) });
  const { alert, loading, handleCreate } = useMovieActions();

  const onSubmit = (payload: FormMovie) => {
    handleCreate(payload);
  };

  return (
    <DialogBox dialogTitle="Movie Form" buttonTitle="Add Movies">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Fieldset.HelperText>
            Please provide movie details below.
          </Fieldset.HelperText>
          <Fieldset.Content>
            <OtherFields register={register} errors={errors} />
            <FileField setValue={setValue} errors={errors} />
          </Fieldset.Content>
          {alert && <AlertMessage message={alert} />}
          {!loading ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button disabled>Submiting...</Button>
          )}
        </Fieldset.Root>
      </form>
    </DialogBox>
  );
};

function MoviePanel() {
  // const [movieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery);
  const { movieQuery, setMovieQuery } = useMovieStore();
  const { accessToken } = useUserStore();
  const { data: genres } = useGenre();
  const { data: movies } = useMovie(movieQuery);

  const nextPage = () => {
    setMovieQuery({ ...movieQuery, page: movieQuery.page + 1 })
  }

  const prevPage = () => {
    setMovieQuery({ ...movieQuery, page: movieQuery.page - 1 })
  }

  return (
    <>
      {/* NAV */}
      <GridItem area="nav">
        <Stack direction={{ base: "row", md: "row", sm: "row" }} justifyContent={"flex-start"} paddingBottom={3}>

          <AdminNavLink />

          <Spacer />

          <SortSelector sortArray={movieSortArray} selectedSort={movieQuery.ordering} onClick={(ordering) => setMovieQuery({ ...movieQuery, ordering })} />
          <MultipleSelector labelName="name" placeholderName="Genre" data={genres} onValueChange={(selected: any) => setMovieQuery({ ...movieQuery, genres: selected })} />
          <AdminSearchInput placeholderName="movies" onSubmit={(payload) => setMovieQuery({ ...movieQuery, search: payload.searchName })} />

          {accessToken ? (
            <>
              <AddMovie />
              <AddGenre />
            </>
          ) : (
            <>
              <Button onClick={() => window.alert("Please login to perform this action")} >
                Add Movies
              </Button>
              <Button onClick={() => window.alert("Please login to perform this action")} >
                Add Genre
              </Button>
            </>
          )}

          {accessToken ? (
            <UserLogout>Log Out</UserLogout>
          ) : (
            <UserLogin>Log In</UserLogin>
          )}

          <DarkMode />
        </Stack>
      </GridItem>

      {/* MOVIE LIST */}
      <GridItem area="list">
        <Box>
          <MovieList />
        </Box>
      </GridItem>

      {/* PAGINATION */}
      <GridItem area="page">
        <Box>
          {movieQuery.page === 1 ?
            <Button variant="plain" color="grey"> <MdArrowBack /> </Button>
            :
            <Button variant="plain" _hover={{ color: "cyan" }} onClick={prevPage}> <MdArrowBack /> </Button>
          }
          {movies.length === 12 ?
            <Button variant="plain" _hover={{ color: "cyan" }} onClick={nextPage}> <MdArrowForward /> </Button>
            :
            <Button variant="plain" color="grey"> <MdArrowForward /> </Button>
          }
        </Box>
      </GridItem>
    </>
  );
}

export default MoviePanel;
