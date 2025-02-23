import { useRef } from "react";
import { Text, Box, Grid, GridItem, Input, Button, Fieldset, HStack, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner, Stack } from "@chakra-ui/react";
import { useForm, UseFormSetValue, FieldErrors, UseFormRegister } from "react-hook-form";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, DialogFooter, } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/ui/field";
import { GoHomeFill } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { RiMovie2Fill } from "react-icons/ri";
import { MdMovieEdit } from "react-icons/md";
import { NavLink } from "react-router";

import { useMovie, useMovieActions, FormMovie, FetchMovies, schemaMovie } from "@/hooks/useMovie";
import { useGenre, useGenreActions, FormGenre, schemaGenre } from "@/hooks/useGenre";
import { useMovieStore } from "@/context/useMovieStore";
import { useUserStore } from "@/context/useUserStore";
import SortSelector from "@/components/global/SortSelector";
import AlertMessage from "@/components/global/AlertMessage";
import SearchInput from "@/components/global/SearchInput";
import MultipleSelector from "@/components/global/MultipleSelector";
import DialogBox from "@/components/global/DialogBox";
import { DialogActionBox } from "@/components/global/DialogBox";
import GenreField from "@/components/global/GenreField";
import MovieField from "@/components/global/MovieField";
import MovieUpdateField from "@/components/global/MovieUpdateField";
import AddGenre from "@/components/global/AddGenre";

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

// MOVIE ACTIONS AND LIST

const MovieUpdateForm = ({ movie, children }: MovieUpdateProps) => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormMovie>();
  const { data: genres } = useGenre();
  const { alert, handleUpdate } = useMovieActions();

  const onSubmit = (payload: FormMovie) => {
    handleUpdate(payload, movie);
  };

  return (
    <>
      <DialogActionBox dialogTitle="Movie Form" buttonTitle={`${children}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MovieUpdateField label="Title" payloadKey="title" fetchKey="title" movie={movie} register={register} errors={errors} />

          <Field label="Select Genres">
            <HStack>
              {genres.map((genre) => (
                <div key={genre._id}>
                  <input {...register("genreIds")} type="checkbox" id={`${genre._id}`} value={genre._id} defaultChecked={movie.genres.some((g) => g._id === genre._id)} />
                  <label htmlFor={`${genre._id}`} style={{ paddingLeft: "5px" }}>
                    {genre.name}
                  </label>
                </div>
              ))}
            </HStack>
            {errors.genreIds?.message && (<p className="text-danger">{errors.genreIds?.message}</p>)}
          </Field>

          <Field label="Rating">
            <Input {...register("rating", { valueAsNumber: true })} type="text" placeholder={`${movie.rating}`} />
            {errors.rating?.message && (<p className="text-danger">{errors.rating?.message}</p>)}
          </Field>
          <Field label="Description">
            <Input {...register("description")} type="text" placeholder={`${movie.description}`} />
            {errors.description?.message && (<p className="text-danger">{errors.description?.message}</p>)}
          </Field>
          <Field label="Released Date">
            <Input {...register("releasedDate")} type="text" placeholder={`${movie.releasedDate.split("T")[0]}`} />
            {errors.releasedDate?.message && (<p className="text-danger">{errors.releasedDate?.message}</p>)}
          </Field>
          <Field label="Translator">
            <Input {...register("translator")} type="text" placeholder={`${movie.translator}`} />
            {errors.translator?.message && (<p className="text-danger">{errors.translator?.message}</p>)}
          </Field>
          <Field label="Encoder">
            <Input {...register("encoder")} type="text" placeholder={`${movie.encoder}`} />
            {errors.encoder?.message && (<p className="text-danger">{errors.encoder?.message}</p>)}
          </Field>
          <Field label="Studio">
            <Input {...register("studio")} type="text" placeholder={`${movie.studio}`} />
            {errors.studio?.message && (<p className="text-danger">{errors.studio?.message}</p>)}
          </Field>
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
          <Button variant="plain" _hover={{ color: "cyan" }} color="red" onClick={onClick}>Delete</Button>
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
              <TableRow key={movie._id}>
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
    <DialogBox dialogTitle="Movie Form" buttonTitle="Add Movie">
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

  return (
    <Grid
      templateAreas={{
        base: `"nav" "list"`, // Stack nav, form, and list in one column for small screens
        lg: `"nav nav" "list list"`, // In large screens, side by side
        md: `"nav nav nav" "list list list"`,
        sm: `"nav nav nav nav" "list list list list"`,
      }}
      templateColumns={{
        base: "1fr",
        md: "1fr",
        sm: "1fr",
      }}
      padding={3}
    >
      {/* NAV */}
      <GridItem area="nav">
        <Stack
          direction={{ base: "row", md: "row", sm: "row" }}
          justifyContent={"flex-start"}
          paddingBottom={3}
        >
          <NavLink to="/">
            <GoHomeFill size={"30px"} />
          </NavLink>
          <NavLink to="/admin/team-panel">
            <ImProfile size={"27px"} />
          </NavLink>
          <NavLink to="/admin/movie-panel">
            <MdMovieEdit size={"31px"} />
          </NavLink>
          <NavLink to="/admin/serie-panel/series">
            <RiMovie2Fill size={"31px"} />
          </NavLink>
          {accessToken ? (
            <>
              <AddMovie />
              <AddGenre />
            </>
          ) : (
            <>
              <Button
                onClick={() =>
                  window.alert("Please login to perform this action")
                }
              >
                Add Movie
              </Button>
              <Button
                onClick={() =>
                  window.alert("Please login to perform this action")
                }
              >
                Add Genre
              </Button>
            </>
          )}
          <SortSelector
            selectedSort={movieQuery.ordering}
            onClick={(ordering) => setMovieQuery({ ...movieQuery, ordering })}
          />
          <MultipleSelector
            labelName="name"
            placeholderName="Genre"
            data={genres}
            onValueChange={(selected: any) =>
              setMovieQuery({ ...movieQuery, genres: selected })
            }
          />
          <SearchInput
            placeholderName="movies"
            onSubmit={(payload) =>
              setMovieQuery({ ...movieQuery, search: payload.searchName })
            }
          />
        </Stack>
      </GridItem>

      {/* MOVIE LIST */}
      <GridItem area="list">
        <Box>
          <MovieList />
        </Box>
      </GridItem>
    </Grid>
  );
}

export default MoviePanel;
