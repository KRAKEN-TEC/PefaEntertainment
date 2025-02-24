import { Fieldset, DialogFooter, HStack, Text, Box, Button, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { useForm, FieldErrors, UseFormRegister, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "@/admin.css"
import { FormSerie, FetchSeries, schemaSeries, useSerieActions } from "@/hooks/useSerie";
import { useSerieStore } from "@/context/useSerieStore";
import { useSerie } from "@/hooks/useSerie";
import { DialogActionBox } from "../global/DialogBox";
import AlertMessage from "../global/AlertMessage";
import SerieGenreUpdateField from "../global/SerieGenreUpdateField";
import SerieUpdateField from "../global/SerieUpdateField";
import GenreField from "@/components/global/GenreField";
import DialogBox from "@/components/global/DialogBox";
import SerieField from "@/components/global/SerieField";

interface SerieUpdate {
  children: React.ReactNode,
  serie: FetchSeries
}

interface SerieFieldsProps {
  register: UseFormRegister<FormSerie>;
  errors: FieldErrors<FormSerie>;
}

const SerieUpdate = ({ children, serie }: SerieUpdate) => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormSerie>();
  const { alert, handleSerieUpdate } = useSerieActions();

  const onSubmit = (payload: FormSerie) => {
    handleSerieUpdate(payload, serie);
  };

  return (
    <>
      <DialogActionBox dialogTitle="Serie Update Form" buttonTitle={`${children}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SerieUpdateField label="Title" payloadKey="title" fetchKey="title" register={register} errors={errors} serie={serie} />
          <SerieGenreUpdateField register={register} errors={errors} document={serie} />
          <SerieUpdateField label="Rating" payloadKey="rating" fetchKey="rating" register={register} errors={errors} serie={serie} />
          <SerieUpdateField label="Description" payloadKey="description" fetchKey="description" register={register} errors={errors} serie={serie} />
          <SerieUpdateField label="Released Date" payloadKey="releasedDate" fetchKey="releasedDate" register={register} errors={errors} serie={serie} />
          <SerieUpdateField label="Translator" payloadKey="translator" fetchKey="translator" register={register} errors={errors} serie={serie} />
          <SerieUpdateField label="Encoder" payloadKey="encoder" fetchKey="encoder" register={register} errors={errors} serie={serie} />
          <SerieUpdateField label="Studio" payloadKey="studio" fetchKey="studio" register={register} errors={errors} serie={serie} />
          {alert && <AlertMessage message={alert} />}
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogActionBox>
    </>
  );
};

const SerieAction = ({ serie }: { serie: FetchSeries }) => {
  const { accessToken, handleSerieDelete } = useSerieActions();

  const onClick = () => {
    handleSerieDelete(serie._id);
  };

  return (
    <>
      {accessToken ? (
        <HStack>
          <SerieUpdate serie={serie}>
            Edit
          </SerieUpdate>
          <Button className="button-action red" onClick={onClick} >
            Delete
          </Button>
        </HStack>
      ) : (
        <HStack>
          <Button className="button-action gray" onClick={() => window.alert("Please login to perform this action")}>
            Edit
          </Button>
          <Button className="button-action gray" onClick={() => window.alert("Please login to perform this action")} >
            Delete
          </Button>
        </HStack>
      )}
    </>
  );
};

// ADD SERIE
const SerieFields = ({ register, errors }: SerieFieldsProps) => {
  return (
    <>
      <SerieField label="Title" payloadKey="title" placeHolder="Title..." required={true} register={register} errors={errors} />
      <GenreField register={register} payloadKey={"genreIds"} errors={errors} />
      <SerieField label="Rating" payloadKey="rating" placeHolder="1~10" valueAsNumber={true} register={register} errors={errors} />
      <SerieField label="Description" payloadKey="description" placeHolder="Spirited Awasy is a ..." register={register} errors={errors} />
      <SerieField label="Released Date" payloadKey="releasedDate" placeHolder="YYYY-MM-DD" required={true} register={register} errors={errors} />
      <SerieField label="Translator" payloadKey="translator" placeHolder="name..." required={true} register={register} errors={errors} />
      <SerieField label="Encoder" payloadKey="encoder" placeHolder="name..." required={true} register={register} errors={errors} />
      <SerieField label="Studio" payloadKey="studio" placeHolder="Studio Name" required={true} register={register} errors={errors} />
    </>
  );
};

export const AddSerie = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormSerie>({ resolver: zodResolver(schemaSeries) });
  const { alert, loading, handleSerieCreate } = useSerieActions();
  console.log(errors)

  const onSubmit = async (payload: FormSerie) => {
    handleSerieCreate(payload)
  };

  return (
    <DialogBox dialogTitle="Series Form" buttonTitle="Add Series">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Fieldset.HelperText>
            Please provide series details below.
          </Fieldset.HelperText>
          <Fieldset.Content>
            <SerieFields register={register} errors={errors} />
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

export default function SerieTable() {
  const { serieQuery } = useSerieStore();
  const { data: series, error, loading } = useSerie(serieQuery);

  return (
    <>
      {series &&
        <Table.ScrollArea height={series?.length ? "560px" : "auto"}>
          <TableRoot stickyHeader>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Title</TableColumnHeader>
                <TableColumnHeader>Genres</TableColumnHeader>
                <TableColumnHeader>Rating</TableColumnHeader>
                <TableColumnHeader>Seasons</TableColumnHeader>
                <TableColumnHeader>Episodes</TableColumnHeader>
                <TableColumnHeader>Is On Going</TableColumnHeader>
                <TableColumnHeader>Released Date</TableColumnHeader>
                <TableColumnHeader>Translator</TableColumnHeader>
                <TableColumnHeader>Encoder</TableColumnHeader>
                <TableColumnHeader>Studio</TableColumnHeader>
                <TableColumnHeader paddingLeft={7}>Actions</TableColumnHeader>
              </TableRow>
            </TableHeader>

            <TableBody>
              {series.map((serie) => (
                <TableRow key={serie._id}>
                  <TableCell>{serie.title}</TableCell>
                  <TableCell>{serie.genres.map((genre) => genre.name).join(", ")}</TableCell>
                  <TableCell>{serie.rating}</TableCell>
                  <TableCell>
                    <NavLink to={`${serie._id}`}>
                      <Button className="button-action">{serie.seasons.length}</Button>
                    </NavLink>
                  </TableCell>
                  <TableCell>{serie.seasons.reduce((total, season) => total + season.episodes.length, 0)}</TableCell>
                  <TableCell>{serie.isOnGoing == true ? "yes" : "no"}</TableCell>
                  <TableCell>{serie.releasedDate.split("T")[0]}</TableCell>
                  <TableCell>{serie.translator}</TableCell>
                  <TableCell>{serie.encoder}</TableCell>
                  <TableCell>{serie.studio}</TableCell>
                  <TableCell>
                    <SerieAction serie={serie} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableRoot>
        </Table.ScrollArea>
      }

      {error && (<Text fontSize="6xl" textAlign="center" mt="20vh">{error}</Text>)}

      {loading && (
        <Box display={"flex"} justifyContent={"center"} alignItems="center" height="50vh">
          <Spinner size="xl" />
        </Box>
      )}
    </>
  );
};
