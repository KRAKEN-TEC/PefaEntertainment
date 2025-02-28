import { Fieldset, DialogFooter, HStack, Text, Box, Button, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { useForm, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "../ui/field";

import "@/admin.css"
import { FormSerie, FetchSeries, schemaSeries, useSerieActions } from "@/hooks/useSerie";
import { useSerieStore } from "@/context/useSerieStore";
import { useSeries } from "@/hooks/useSerie";
import { DialogActionBox } from "../global/DialogBox";
import AlertMessage from "../global/AlertMessage";
import SerieGenreUpdateField from "../global/SerieGenreUpdateField";
import SerieUpdateField from "../global/SerieUpdateField";
import GenreField from "@/components/global/GenreField";
import DialogBox from "@/components/global/DialogBox";
import SerieField from "@/components/global/SerieField";
import CheckBoxField from "../global/CheckBoxField";

interface SerieUpdate {
  children: React.ReactNode,
  serie: FetchSeries
}

interface SerieFieldsProps {
  register: UseFormRegister<FormSerie>;
  errors: FieldErrors<FormSerie>;
}


interface FileFieldsProps {
  setValue: UseFormSetValue<FormSerie>;
  errors: FieldErrors<FormSerie>;
}

const FileField = ({ setValue, errors }: FileFieldsProps) => {
  return (
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
  );
};


const SerieUpdate = ({ children, serie }: SerieUpdate) => {
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<FormSerie>();
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
          <FileField setValue={setValue} errors={errors} />
          <Field label="Is On Going">
            <input {...register("isOnGoing")} type="checkbox" id="signal1" defaultChecked={serie.isOnGoing} />
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
      <CheckBoxField label="Is On Going" payloadKey="isOnGoing" required={true} register={register} errors={errors} />
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
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<FormSerie>({ resolver: zodResolver(schemaSeries) });
  const { alert, loading, handleSerieCreate } = useSerieActions();

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

export default function SerieTable() {
  const { serieQuery } = useSerieStore();
  const { data: series, error, loading } = useSeries(serieQuery);

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
                  <TableCell>{serie.genres.map(genre => genre.name).join(", ")}</TableCell>
                  <TableCell>{serie.rating}</TableCell>
                  <TableCell>
                    <NavLink to={`${serie.slug}/seasons`}>
                      <Button className="button-action">{serie.seasons.length}</Button>
                    </NavLink>
                  </TableCell>
                  <TableCell>{serie.seasons.length}</TableCell>
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
