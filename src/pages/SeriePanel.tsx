import { useState, useRef } from "react";
import {
  Text,
  Box,
  Grid,
  GridItem,
  Input,
  Button,
  Fieldset,
  HStack,
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  useForm,
  UseFormSetValue,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { GoHomeFill } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { MdMovieEdit } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router";


import { useSerie, SerieQuery, FetchSeries, FormSerie, schemaSeries } from "@/hooks/useSerie";
import { useGenre, useGenreActions, FormGenre, schemaGenre } from "@/hooks/useGenre";
import { useSerieStore } from "@/context/useSerieStore";
import { useUserStore } from "@/context/useUserStore";
import SortSelector from "@/components/SortSelector";
import AlertMessage from "@/components/AlertMessage";
import SearchInput from "@/components/SearchInput";
import MultipleSelector from "@/components/MultipleSelector";

interface SerieUpdateProps {
  children: React.ReactNode;
  serie: FetchSeries;
}

interface FileFields {
  setValue: UseFormSetValue<FormSerie>;
  errors: FieldErrors<FormSerie>;
}

interface OtherFieldsProps {
  register: UseFormRegister<FormSerie>;
  errors: FieldErrors<FormSerie>;
}

interface SerieDetailProps {
  serie: FetchSeries
  error: string | null;
  loading: boolean;
}

// SERIES ACTIONS AND LIST

// const SerieUpdateForm = ({ serie }: { serie: FetchSeries }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormSerie>();
//   const { data: genres } = useGenre();
//   const { alert, handleUpdate } = useSerieActions();

//   const onSubmit = (payload: FormSerie) => {
//     handleUpdate(payload, serie);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Field label="Title">
//           <Input
//             {...register("title")}
//             type="text"
//             placeholder={`${serie.title}`}
//           />
//           {errors.title?.message && (
//             <p className="text-danger">{errors.title?.message}</p>
//           )}
//         </Field>

//         <Field label="Select Genres">
//           <HStack>
//             {genres.map((genre) => (
//               <div key={genre._id}>
//                 <input
//                   {...register("genres")}
//                   type="checkbox"
//                   id={`${genre._id}`}
//                   value={genre._id}
//                   defaultChecked={serie.genres.some((g) => g._id === genre._id)}
//                 />
//                 <label htmlFor={`${genre._id}`} style={{ paddingLeft: "5px" }}>
//                   {genre.name}
//                 </label>
//               </div>
//             ))}
//           </HStack>
//           {errors.genres?.message && (
//             <p className="text-danger">{errors.genres?.message}</p>
//           )}
//         </Field>

//         <Field label="Rating">
//           <Input
//             {...register("rating", { valueAsNumber: true })}
//             type="text"
//             placeholder={`${serie.rating}`}
//           />
//           {errors.rating?.message && (
//             <p className="text-danger">{errors.rating?.message}</p>
//           )}
//         </Field>

//         <Field label="Description">
//           <Input
//             {...register("description")}
//             type="text"
//             placeholder={`${serie.description}`}
//           />
//           {errors.description?.message && (
//             <p className="text-danger">{errors.description?.message}</p>
//           )}
//         </Field>

//         <Field label="Released Date">
//           <Input
//             {...register("releasedDate")}
//             type="text"
//             placeholder={`${serie.releasedDate.split("T")[0]}`}
//           />
//           {errors.releasedDate?.message && (
//             <p className="text-danger">{errors.releasedDate?.message}</p>
//           )}
//         </Field>

//         <Field label="Translator">
//           <Input
//             {...register("translator")}
//             type="text"
//             placeholder={`${serie.translator}`}
//           />
//           {errors.translator?.message && (
//             <p className="text-danger">{errors.translator?.message}</p>
//           )}
//         </Field>

//         <Field label="Encoder">
//           <Input
//             {...register("encoder")}
//             type="text"
//             placeholder={`${serie.encoder}`}
//           />
//           {errors.encoder?.message && (
//             <p className="text-danger">{errors.encoder?.message}</p>
//           )}
//         </Field>

//         <Field label="Is Serie">
//           <input
//             {...register("isSerie")}
//             type="checkbox"
//             id="signal1"
//             defaultChecked={serie.isSerie}
//           />
//         </Field>

//         <Field label="Is On Going">
//           <input
//             {...register("isOnGoing")}
//             type="checkbox"
//             id="signal1"
//             defaultChecked={serie.isOnGoing}
//           />
//         </Field>

//         <Field label="Episode">
//           <Input
//             {...register("episode", { valueAsNumber: true })}
//             type="text"
//             placeholder={`${serie.episode}`}
//           />
//           {errors.episode?.message && (
//             <p className="text-danger">{errors.episode?.message}</p>
//           )}
//         </Field>

//         <Field label="Season">
//           <Input
//             {...register("season", { valueAsNumber: true })}
//             type="text"
//             placeholder={`${serie.season}`}
//           />
//           {errors.season?.message && (
//             <p className="text-danger">{errors.season?.message}</p>
//           )}
//         </Field>

//         <Field label="Studio">
//           <Input
//             {...register("studio")}
//             type="text"
//             placeholder={`${serie.studio}`}
//           />
//           {errors.studio?.message && (
//             <p className="text-danger">{errors.studio?.message}</p>
//           )}
//         </Field>

//         {alert && <AlertMessage message={alert} />}

//         <DialogFooter>
//           <Button type="submit">Update</Button>
//         </DialogFooter>
//       </form>
//     </>
//   );
// };

// const SerieUpdate = ({ children, serie }: SerieUpdateProps) => {
//   const ref = useRef<HTMLInputElement>(null);
//   return (
//     <DialogRoot
//       initialFocusEl={() => ref.current}
//       scrollBehavior={"inside"}
//       placement={"top"}
//     >
//       <DialogTrigger asChild>
//         <Button variant="plain" _hover={{ color: "cyan" }} color="blue">
//           {children}
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Series Updating</DialogTitle>
//           <DialogCloseTrigger />
//         </DialogHeader>
//         <DialogBody>
//           <SerieUpdateForm serie={serie} />
//         </DialogBody>
//       </DialogContent>
//     </DialogRoot>
//   );
// };

// const SerieAction = ({ serie }: { serie: FetchSeries }) => {
//   const { accessToken, handleDelete } = useSerieActions();

//   const onClick = () => {
//     handleDelete(serie);
//   };

//   return (
//     <>
//       {accessToken ? (
//         <HStack>
//           <SerieUpdate serie={serie}>Edit</SerieUpdate>
//           <Button
//             variant="plain"
//             _hover={{ color: "cyan" }}
//             color="red"
//             onClick={onClick}
//           >
//             Delete
//           </Button>
//         </HStack>
//       ) : (
//         <HStack>
//           <Button
//             variant="plain"
//             _hover={{ textDecoration: "underline" }}
//             color="grey"
//             onClick={() => window.alert("Please login to perform this action")}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="plain"
//             _hover={{ textDecoration: "underline" }}
//             color="grey"
//             onClick={() => window.alert("Please login to perform this action")}
//           >
//             Delete
//           </Button>
//         </HStack>
//       )}
//     </>
//   );
// };


// ADD SERIE

// const GenreField = ({ register, errors }: OtherFieldsProps) => {
//   const { data: genres } = useGenre();
//   return (
//     <Field label="Select Genres">
//       <HStack>
//         {genres.map((genre) => (
//           <div key={genre._id}>
//             <input
//               {...register("genres")}
//               type="checkbox"
//               id={`${genre._id}`}
//               value={genre._id}
//             />
//             <label htmlFor={`${genre._id}`} style={{ paddingLeft: "5px" }}>
//               {genre.name}
//             </label>
//           </div>
//         ))}
//       </HStack>
//       {errors.genres?.message && (
//         <p className="text-danger">{errors.genres?.message}</p>
//       )}
//     </Field>
//   );
// };

// const FileField = ({ setValue, errors }: FileFields) => {
//   return (
//     <>
//       <Field label="Poster File">
//         <input
//           type="file"
//           accept="image/jpeg, image/png"
//           className="file-upload"
//           onChange={(e) => {
//             const file = e.target.files?.[0];
//             if (file) setValue("poster", file);
//           }}
//         />
//         {errors.poster?.message && (
//           <p className="text-danger">{errors.poster?.message}</p>
//         )}
//       </Field>

//       <Field label="Video File">
//         <input
//           type="file"
//           accept="video/mp4"
//           className="file-upload"
//           onChange={(e) => {
//             const file = e.target.files?.[0];
//             if (file) setValue("video", file);
//           }}
//         />
//         {errors.video?.message && (
//           <p className="text-danger">{errors.video?.message}</p>
//         )}
//       </Field>
//     </>
//   );
// };

// const OtherFields = ({ register, errors }: OtherFieldsProps) => {
//   return (
//     <>
//       <Field label="Title">
//         <Input
//           {...register("title", { required: true })}
//           type="text"
//           placeholder="Title..."
//         />
//         {errors.title?.message && (
//           <p className="text-danger">{errors.title?.message}</p>
//         )}
//       </Field>

//       <GenreField register={register} errors={errors} />

//       <Field label="Rating">
//         <Input
//           {...register("rating", { valueAsNumber: true })}
//           type="text"
//           placeholder="1~10"
//         />
//         {errors.rating?.message && (
//           <p className="text-danger">{errors.rating?.message}</p>
//         )}
//       </Field>

//       <Field label="Description">
//         <Input
//           {...register("description")}
//           type="text"
//           placeholder="Spirited is ..."
//         />
//         {errors.description?.message && (
//           <p className="text-danger">{errors.description?.message}</p>
//         )}
//       </Field>

//       <Field label="Released Date">
//         <Input
//           {...register("releasedDate", { required: true })}
//           type="text"
//           placeholder="YYYY-MM-DD"
//         />
//         {errors.releasedDate?.message && (
//           <p className="text-danger">{errors.releasedDate?.message}</p>
//         )}
//       </Field>

//       <Field label="Translator">
//         <Input
//           {...register("translator", { required: true })}
//           type="text"
//           placeholder="name..."
//         />
//         {errors.translator?.message && (
//           <p className="text-danger">{errors.translator?.message}</p>
//         )}
//       </Field>

//       <Field label="Encoder">
//         <Input
//           {...register("encoder", { required: true })}
//           type="text"
//           placeholder="name..."
//         />
//         {errors.encoder?.message && (
//           <p className="text-danger">{errors.encoder?.message}</p>
//         )}
//       </Field>

//       <Field label="Is Serie">
//         <input {...register("isSerie")} type="checkbox" id="signal2" />
//       </Field>

//       <Field label="Is On Going">
//         <input {...register("isOnGoing")} type="checkbox" id="signal1" />
//       </Field>

//       <Field label="Episode">
//         <Input
//           {...register("episode", {
//             setValueAs: (value) => (value === "" ? undefined : parseInt(value)),
//           })}
//           type="text"
//           placeholder="Episode number"
//         />
//         {errors.episode?.message && (
//           <p className="text-danger">{errors.episode?.message}</p>
//         )}
//       </Field>

//       <Field label="Season">
//         <Input
//           {...register("season", {
//             setValueAs: (value) => (value === "" ? undefined : parseInt(value)),
//           })}
//           type="text"
//           placeholder="Season number"
//         />
//         {errors.season?.message && (
//           <p className="text-danger">{errors.season?.message}</p>
//         )}
//       </Field>

//       <Field label="Studio">
//         <Input
//           {...register("studio", { required: true })}
//           type="text"
//           placeholder="Studio name"
//         />
//         {errors.studio?.message && (
//           <p className="text-danger">{errors.studio?.message}</p>
//         )}
//       </Field>
//     </>
//   );
// };

// const SerieForm = () => {
//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormSerie>({ resolver: zodResolver(schemaSeries) });
//   const { alert, loading, handleCreate } = useSerieActions();

//   const onSubmit = (payload: FormSerie) => {
//     handleCreate(payload);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Fieldset.Root>
//         <Fieldset.HelperText>
//           Please provide series details below.
//         </Fieldset.HelperText>
//         <Fieldset.Content>
//           <OtherFields register={register} errors={errors} />
//           <FileField setValue={setValue} errors={errors} />
//         </Fieldset.Content>
//         {alert && <AlertMessage message={alert} />}
//         {!loading ? (
//           <Button type="submit">Submit</Button>
//         ) : (
//           <Button disabled>Submiting...</Button>
//         )}
//       </Fieldset.Root>
//     </form>
//   );
// };

// const AddSerie = ({ children }: { children: React.ReactNode }) => {
//   const ref = useRef<HTMLInputElement>(null);
//   return (
//     <DialogRoot
//       initialFocusEl={() => ref.current}
//       scrollBehavior="inside"
//       placement={"top"}
//     >
//       <DialogTrigger asChild>
//         <Button>{children}</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogCloseTrigger />
//         <DialogHeader>
//           <DialogTitle>Serie Form</DialogTitle>
//           <DialogCloseTrigger />
//         </DialogHeader>
//         <DialogBody>
//           <SerieForm />
//         </DialogBody>
//       </DialogContent>
//     </DialogRoot>
//   );
// };

// ADD GENRE

const GenreForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormGenre>({ resolver: zodResolver(schemaGenre) });
  const { alert, loading, handleCreate } = useGenreActions();

  const onSubmit = (payload: FormGenre) => {
    handleCreate(payload);
  };

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
              <Input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name..."
              />
              {errors.name?.message && (
                <p className="text-danger">{errors.name?.message}</p>
              )}
            </Field>
          </Fieldset.Content>
          {!loading ? (
            <DialogFooter>
              <Button type="submit">Submit</Button>{" "}
            </DialogFooter>
          ) : (
            <DialogFooter>
              <Button disabled>Submiting...</Button>
            </DialogFooter>
          )}
        </Fieldset.Root>
      </form>
    </>
  );
};

const AddGenre = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot initialFocusEl={() => ref.current} placement={"top"}>
      <DialogTrigger asChild>
        <Button>{children}</Button>
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
  );
};

function SeriePanel() {
  const { serieQuery, setSerieQuery } = useSerieStore();
  const { accessToken } = useUserStore();
  const { data: genres } = useGenre();

  return (
    <Grid
      templateAreas={{
        base: `"buttons" "list"`, // Stack nav, form, and list in one column for small screens
        lg: `"buttons buttons" "list list"`, // In large screens, side by side
        md: `"buttons buttons buttons" "list list list"`,
        sm: `"buttons buttons buttons buttons" "list list list list"`,
      }}
      templateColumns={{
        base: "1fr",
        md: "1fr",
        sm: "1fr",
      }}
      padding={3}
    >
      {/* BUTTONS */}
      <GridItem area="buttons">
        <Stack direction={{ base: "row", md: "row", sm: "row" }} justifyContent={"flex-start"} paddingBottom={3}>
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
          {accessToken ?
            (
              <>
                {/* <AddSerie>Add Series</AddSerie> */}
                <AddGenre>Add Genre</AddGenre>
              </>
            )
            :
            (
              <>
                <Button onClick={() => window.alert("Please login to perform this action")}>
                  Add Series
                </Button>
                <Button onClick={() => window.alert("Please login to perform this action")}>
                  Add Genre
                </Button>
              </>
            )}
          <SortSelector selectedSort={serieQuery.ordering} onClick={(ordering) => setSerieQuery({ ...serieQuery, ordering })} />
          <MultipleSelector labelName="name" placeholderName="Genre" data={genres} onValueChange={(selected: any) => setSerieQuery({ ...serieQuery, genres: selected })} />
          <SearchInput placeholderName="series" onSubmit={(payload) => setSerieQuery({ ...serieQuery, search: payload.searchName })} />
        </Stack>
      </GridItem>

      {/* SERIE LIST */}
      <GridItem area="list">
        <div>
          <Outlet />
        </div>
      </GridItem>
    </Grid>
  );
}

export default SeriePanel;
