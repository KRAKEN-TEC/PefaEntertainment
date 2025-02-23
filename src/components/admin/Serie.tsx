import { DialogFooter, HStack, Text, Box, Button, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";

import "@/admin.css"
import { FormSerie, FetchSeries, useSerieActions } from "@/hooks/useSerie";
import { useSerieStore } from "@/context/useSerieStore";
import { useSerie } from "@/hooks/useSerie";
import { DialogActionBox } from "../global/DialogBox";
import AlertMessage from "../global/AlertMessage";
import GenreUpdateField from "../global/GenreUpdateField";
import SerieUpdateField from "../global/SerieUpdateField";

interface SerieUpdate {
  children: React.ReactNode,
  serie: FetchSeries
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
          <GenreUpdateField register={register} errors={errors} document={serie} />
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
    handleSerieDelete(serie);
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

export default function Serie() {
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
