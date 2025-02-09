
import { useState, useRef } from "react";
import { Box, Grid, GridItem, Input, Button, Fieldset, HStack, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { useForm, UseFormSetValue, FieldErrors, UseFormRegister } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

import { useMovie, useMovieActions, FormMovie, FetchMovie, schemaMovie, MovieQuery } from "@/hooks/useMovie"
import { useGenre, useGenreActions, FormGenre, schemaGenre } from "@/hooks/useGenre";
import GenreSelector from "@/components/GenreSelector";
import SortSelector from "@/components/SortSelector";
import NavBar from "@/components/NavBar";
import AlertMessage from "@/components/AlertMessage";

interface MovieUpdateProps {
  children: React.ReactNode
  movie: FetchMovie
}

interface FileFields {
  setValue: UseFormSetValue<FormMovie>
  errors: FieldErrors<FormMovie>
}

interface OtherFieldsProps {
  register: UseFormRegister<FormMovie>
  errors: FieldErrors<FormMovie>
}

// MOVIE ACTIONS AND LIST

const MovieUpdateForm = ({ movie }: { movie: FetchMovie }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormMovie>();
  const { data: genres } = useGenre()
  const { handleUpdate } = useMovieActions()

  const onSubmit = (payload: FormMovie) => {
    handleUpdate(payload, movie)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="Title">
          <Input {...register('title')} type="text" placeholder={`${movie.title}`} />
          {errors.title?.message && <p className="text-danger">{errors.title?.message}</p>}
        </Field>

        <Field label="Select Genres">
          <HStack>
            {genres.map((genre) => (
              <div key={genre._id}>
                <input {...register("genre")} type="checkbox" id={`${genre._id}`} value={genre._id} defaultChecked={movie.genre.some((g) => g._id === genre._id)} />
                <label htmlFor={`${genre._id}`} style={{ paddingLeft: "5px" }} >{genre.name}</label>
              </div>
            ))}
          </HStack>
          {errors.genre?.message && <p className="text-danger">{errors.genre?.message}</p>}
        </Field>

        <Field label="Rating">
          <Input {...register('rating', { valueAsNumber: true })} type="text" placeholder={`${movie.rating}`} />
          {errors.rating?.message && <p className="text-danger">{errors.rating?.message}</p>}
        </Field>

        <Field label="Description">
          <Input {...register('description')} type="text" placeholder={`${movie.description}`} />
          {errors.description?.message && <p className="text-danger">{errors.description?.message}</p>}
        </Field>

        <Field label="Released Date">
          <Input {...register('releasedDate')} type="text" placeholder={`${movie.releasedDate.split('T')[0]}`} />
          {errors.releasedDate?.message && <p className="text-danger">{errors.releasedDate?.message}</p>}
        </Field>

        <Field label="Translator">
          <Input {...register('translator')} type="text" placeholder={`${movie.translator}`} />
          {errors.translator?.message && <p className="text-danger">{errors.translator?.message}</p>}
        </Field>

        <Field label="Encoder">
          <Input {...register('encoder')} type="text" placeholder={`${movie.encoder}`} />
          {errors.encoder?.message && <p className="text-danger">{errors.encoder?.message}</p>}
        </Field>

        <Field label="Is On Going">
          <input {...register("isOnGoing")} type="checkbox" id="signal1" defaultChecked={movie.isOnGoing} />
        </Field>

        <Field label="Episode" >
          <Input {...register('episode', { valueAsNumber: true })} type="text" placeholder={`${movie.episode}`} />
          {errors.episode?.message && <p className="text-danger">{errors.episode?.message}</p>}
        </Field>

        <Field label="Season">
          <Input {...register('season', { valueAsNumber: true })} type="text" placeholder={`${movie.season}`} />
          {errors.season?.message && <p className="text-danger">{errors.season?.message}</p>}
        </Field>

        <Field label="Studio">
          <Input {...register('studio')} type="text" placeholder={`${movie.studio}`} />
          {errors.studio?.message && <p className="text-danger">{errors.studio?.message}</p>}
        </Field>

        <DialogFooter>
          <Button type="submit">Update</Button>
        </DialogFooter>
      </form>
    </>
  )
}

const MovieUpdate = ({ children, movie }: MovieUpdateProps) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior={"inside"} placement={"top"}>
      <DialogTrigger asChild>
        <Button variant="plain" _hover={{ color: "cyan" }} color="blue">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Movie Updating</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <MovieUpdateForm movie={movie} />
        </DialogBody >
      </DialogContent>
    </DialogRoot>
  )
}

const MovieAction = ({ movie }: { movie: FetchMovie }) => {
  const { accessToken, handleDelete } = useMovieActions()

  const onClick = () => {
    handleDelete(movie)
  }

  return (
    <>
      {accessToken ?
        <HStack>
          <MovieUpdate movie={movie}>Edit</MovieUpdate>
          <Button variant="plain" _hover={{ color: "cyan" }} color="red" onClick={onClick}>
            Delete
          </Button>
        </HStack>
        :
        <HStack>
          <Button variant="plain" _hover={{ textDecoration: "underline" }} color="grey" onClick={() => window.alert("Please login to perform this action")}>
            Edit
          </Button>
          <Button variant="plain" _hover={{ textDecoration: "underline" }} color="grey" onClick={() => window.alert("Please login to perform this action")}>
            Delete
          </Button>
        </HStack>
      }
    </>
  )
}

const MovieList = () => {
  const { data: movies, loading } = useMovie()
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md">
      <TableRoot stickyHeader>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Title</TableColumnHeader>
            <TableColumnHeader>Genre</TableColumnHeader>
            <TableColumnHeader>Rating</TableColumnHeader>
            <TableColumnHeader>Released Date</TableColumnHeader>
            <TableColumnHeader>Translator</TableColumnHeader>
            <TableColumnHeader>Encoder</TableColumnHeader>
            <TableColumnHeader>Is On Going</TableColumnHeader>
            <TableColumnHeader>Episode</TableColumnHeader>
            <TableColumnHeader>Season</TableColumnHeader>
            <TableColumnHeader>Studio</TableColumnHeader>
          </TableRow>
        </TableHeader>


        <TableBody>
          {loading &&
            <TableRow>
              <TableCell><Spinner /></TableCell>
            </TableRow>}

          {movies.map(movie =>
            <TableRow key={movie._id}>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.genre.map(genre => genre.name).join(", ")}</TableCell>
              <TableCell>{movie.rating}</TableCell>
              <TableCell>{movie.releasedDate.split('T')[0]}</TableCell>
              <TableCell>{movie.translator}</TableCell>
              <TableCell>{movie.encoder}</TableCell>
              <TableCell>{movie.isOnGoing == true ? "yes" : "no"}</TableCell>
              <TableCell>{movie.episode == null ? "-" : movie.episode}</TableCell>
              <TableCell>{movie.season == null ? "-" : movie.season}</TableCell>
              <TableCell>{movie.studio}</TableCell>
              <TableCell><MovieAction movie={movie} /></TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableRoot>
    </Table.ScrollArea>
  )
}

// ADD MOVIE

const GenreField = ({ register, errors }: OtherFieldsProps) => {
  const { data: genres } = useGenre()
  return (
    <Field label="Select Genres">
      <HStack>
        {genres.map((genre) => (
          <div key={genre._id}>
            <input {...register("genre")} type="checkbox" id={`${genre._id}`} value={genre._id} />
            <label htmlFor={`${genre._id}`} style={{ paddingLeft: "5px" }} >{genre.name}</label>
          </div>
        ))}
      </HStack>
      {errors.genre?.message && <p className="text-danger">{errors.genre?.message}</p>}
    </Field>
  )
}

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
        {errors.poster?.message && <p className="text-danger">{errors.poster?.message}</p>}
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
        {errors.video?.message && <p className="text-danger">{errors.video?.message}</p>}
      </Field>
    </>
  )
}

const OtherFields = ({ register, errors }: OtherFieldsProps) => {
  return (
    <>
      <Field label="Title">
        <Input {...register('title', { required: true })} type="text" placeholder="Title..." />
        {errors.title?.message && <p className="text-danger">{errors.title?.message}</p>}
      </Field>

      <GenreField register={register} errors={errors} />

      <Field label="Rating">
        <Input {...register('rating', { valueAsNumber: true })} type="text" placeholder="1~10" />
        {errors.rating?.message && <p className="text-danger">{errors.rating?.message}</p>}
      </Field>

      <Field label="Description">
        <Input {...register('description')} type="text" placeholder="Spirited is ..." />
        {errors.description?.message && <p className="text-danger">{errors.description?.message}</p>}
      </Field>

      <Field label="Released Date">
        <Input {...register('releasedDate', { required: true })} type="text" placeholder="YYYY-MM-DD" />
        {errors.releasedDate?.message && <p className="text-danger">{errors.releasedDate?.message}</p>}
      </Field>

      <Field label="Translator">
        <Input {...register('translator', { required: true })} type="text" placeholder="name..." />
        {errors.translator?.message && <p className="text-danger">{errors.translator?.message}</p>}
      </Field>

      <Field label="Encoder">
        <Input {...register('encoder', { required: true })} type="text" placeholder="name..." />
        {errors.encoder?.message && <p className="text-danger">{errors.encoder?.message}</p>}
      </Field>

      <Field label="Is On Going">
        <input {...register("isOnGoing")} type="checkbox" id="signal1" />
      </Field>

      <Field label="Episode" >
        <Input {...register('episode', { setValueAs: (value) => (value === "" ? undefined : parseInt(value)) })} type="text" placeholder="Episode number" />
        {errors.episode?.message && <p className="text-danger">{errors.episode?.message}</p>}
      </Field>

      <Field label="Season">
        <Input {...register('season', { setValueAs: (value) => (value === "" ? undefined : parseInt(value)) })} type="text" placeholder="Season number" />
        {errors.season?.message && <p className="text-danger">{errors.season?.message}</p>}
      </Field>

      <Field label="Studio">
        <Input {...register('studio', { required: true })} type="text" placeholder="Studio name" />
        {errors.studio?.message && <p className="text-danger">{errors.studio?.message}</p>}
      </Field>
    </>
  )
}

const MovieForm = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormMovie>({ resolver: zodResolver(schemaMovie) });
  const { alert, loading, handleCreate } = useMovieActions();

  const onSubmit = (payload: FormMovie) => {
    handleCreate(payload)
  }

  return (
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
        {!loading ? <Button type="submit">Submit</Button> : <Button disabled>Submiting...</Button>}
      </Fieldset.Root>
    </form >
  )
}

const AddMovie = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <DialogRoot initialFocusEl={() => ref.current} scrollBehavior="inside" placement={"top"}>
      <DialogTrigger asChild>
        <Button w={"100%"}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Movie Form</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <MovieForm />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

// ADD GENRE

const GenreForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormGenre>({ resolver: zodResolver(schemaGenre) });
  const { alert, loading, handleCreate } = useGenreActions();

  const onSubmit = (payload: FormGenre) => {
    handleCreate(payload)
  }

  return (
    <>
      {alert && <AlertMessage message={alert} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Fieldset.HelperText>
            Please provide genre details below.
          </Fieldset.HelperText>
          <Fieldset.Content>
            <Field label="Name">
              <Input {...register('name', { required: true })} type="text" placeholder="Name..." />
              {errors.name?.message && <p className="text-danger">{errors.name?.message}</p>}
            </Field>
          </Fieldset.Content>
          {!loading ?
            <DialogFooter><Button type="submit">Submit</Button> </DialogFooter>
            :
            <DialogFooter><Button disabled>Submiting...</Button></DialogFooter>
          }
        </Fieldset.Root>
      </form >
    </>
  )
}

const AddGenre = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <DialogRoot initialFocusEl={() => ref.current} placement={"top"}>
      <DialogTrigger asChild>
        <Button w={"100%"}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Genre Form</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <GenreForm />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

function MoviePanel() {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery)

  return (
    <Grid
      templateAreas={{
        base: `"nav" "list"`,  // Stack nav, form, and list in one column for small screens
        lg: `"nav nav" "list list"`,  // In large screens, side by side
        md: `"nav nav nav" "list list list"`,
        sm: `"nav nav nav nav" "list list list list"`,
      }}

      templateColumns={{
        base: '1fr', // 1 fraction for all elements in small screens (stacked)
      }}
    >
      {/* NAV BAR */}
      <GridItem area="nav">
        <NavBar onSearch={(search) => console.log(search)} />
      </GridItem>

      {/* MOVIE LIST */}
      <GridItem area="list">
        <Stack direction={{ base: "column", md: "row" }}>
          <Box flex={1}>
            <GenreSelector onSelectedGenre={(genre) => setMovieQuery({ ...movieQuery, genre })} />
          </Box>
          <Box flex={1}>
            <SortSelector selectedSortOrder={movieQuery.ordering} onSelectedSortOrder={(ordering) => setMovieQuery({ ...movieQuery, ordering })} />
          </Box>
        </Stack>

        <Box>
          <MovieList />
        </Box>

        <Stack direction={{ base: "column", md: "row" }}>
          <Box flex={1}>
            <AddMovie>Add Movie</AddMovie>
          </Box>
          <Box flex={1}>
            <AddGenre>Add Genre</AddGenre>
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  )
}

export default MoviePanel
