import { Fieldset, DialogFooter, HStack, Button, Text, Box, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useParams, NavLink } from "react-router";
import { useForm, FieldErrors, UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "@/admin.css"
import { FetchSeasons, FormSeason, useSerieActions, schemaSeasons, useSeasons } from "@/hooks/useSerie";
import DialogBox, { DialogActionBox } from "../global/DialogBox";
import SeasonUpdateField from "../global/SeasonUpdateField";
import AlertMessage from "../global/AlertMessage";
import SeasonField from "../global/SeasonField";

interface SerieUpdateProps {
  children: React.ReactNode,
  season: FetchSeasons
}

interface FileFieldProps {
  setValue: UseFormSetValue<FormSeason>;
  errors: FieldErrors<FormSeason>;
}

const SeasonUpdate = ({ children, season }: SerieUpdateProps) => {
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<FormSeason>();
  const { alert, handleSeasonUpdate } = useSerieActions();

  const onSubmit = (payload: FormSeason) => {
    handleSeasonUpdate(payload, season);
  };

  return (
    <>
      <DialogActionBox dialogTitle="Serie Update Form" buttonTitle={`${children}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SeasonUpdateField label="Title" payloadKey="title" fetchKey="title" register={register} errors={errors} season={season} />
          <SeasonUpdateField label="Description" payloadKey="description" fetchKey="description" register={register} errors={errors} season={season} />
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

const SeasonAction = ({ season }: { season: FetchSeasons }) => {
  const { accessToken, handleSeasonDelete } = useSerieActions();

  const onClick = () => {
    handleSeasonDelete(season);
  };

  return (
    <>
      {accessToken ? (
        <HStack>
          <SeasonUpdate season={season}>
            Edit
          </SeasonUpdate>
          {season.episodes.length === 0 &&
            <Button className="button-action red" onClick={onClick} >
              Delete
            </Button>
          }
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

// ADD SEASON
const FileField = ({ setValue, errors }: FileFieldProps) => {
  return (
    <>
      <Field label="Poster File">
        <input type="file" accept="image/jpeg, image/png" className="file-upload"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setValue("poster", file);
          }}
        />
        {errors.poster?.message && (<p className="text-danger">{errors.poster?.message}</p>)}
      </Field>
    </>
  );
};

export const AddSeason = () => {
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<FormSeason>({ resolver: zodResolver(schemaSeasons) });
  const { alert, loading, handleSeasonCreate } = useSerieActions();

  const onSubmit = (payload: FormSeason) => {
    handleSeasonCreate(payload);
  };

  return (
    <DialogBox dialogTitle="Season Form" buttonTitle="Add Season">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>

          <Fieldset.HelperText>
            Please provide series details below.
          </Fieldset.HelperText>

          <Fieldset.Content>
            <SeasonField label="Season Number" payloadKey="seasonNumber" required={true} valueAsNumber={true} placeHolder="A Number" register={register} errors={errors} />
            <SeasonField label="Title" payloadKey="title" placeHolder="Title..." required={true} register={register} errors={errors} />
            <SeasonField label="Description" payloadKey="description" placeHolder="Attack On Titan is a ..." register={register} errors={errors} />
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

const SeasonTable = () => {
  const { serieSlug } = useParams();
  const { data: seasons, error, loading } = useSeasons(serieSlug);

  return (
    <>
      {seasons &&
        <Table.ScrollArea height={seasons.length ? "560px" : "auto"}>
          <TableRoot stickyHeader>
            <Table.ColumnGroup>
              <Table.Column htmlWidth="10%" />
              <Table.Column htmlWidth="10%" />
              <Table.Column htmlWidth="10%" />
              <Table.Column htmlWidth="15%" />
              <Table.Column />
            </Table.ColumnGroup>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Season Number</TableColumnHeader>
                <TableColumnHeader>Title</TableColumnHeader>
                <TableColumnHeader>Episodes</TableColumnHeader>
                <TableColumnHeader>Description</TableColumnHeader>
                <TableColumnHeader paddingLeft={7}>Actions</TableColumnHeader>
              </TableRow>
            </TableHeader>

            <TableBody>
              {seasons.map((season) => (
                <TableRow key={season._id}>
                  <TableCell>{season.seasonNumber}</TableCell>
                  <TableCell>{season.title}</TableCell>
                  <TableCell>
                    <NavLink to={`${season.seasonNumber}/episodes`}>
                      <Button className="button-action">{season.episodes.length}</Button>
                    </NavLink>
                  </TableCell>
                  <TableCell>{season.description}</TableCell>
                  <TableCell>
                    <SeasonAction season={season} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableRoot>
        </Table.ScrollArea>
      }

      {seasons.length === 0 && (<Text fontSize="6xl" textAlign="center" mt="20vh">No Season Yet</Text>)}

      {error && (<Text fontSize="6xl" textAlign="center" mt="20vh">{error}</Text>)}

      {loading && (
        <Box display={"flex"} justifyContent={"center"} alignItems="center" height="50vh">
          <Spinner size="xl" />
        </Box>
      )}
    </>
  )
}

export default SeasonTable