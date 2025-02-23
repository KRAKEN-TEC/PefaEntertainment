import { DialogFooter, HStack, Button, Text, Box, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { useParams, NavLink } from "react-router";
import { useForm } from "react-hook-form";

import "@/admin.css"
import { FetchSeasons, FormSeason, useSerieActions, FetchSeries } from "@/hooks/useSerie";
import { DialogActionBox } from "../global/DialogBox";
import { useSingleData } from "@/hooks/useData";
import SeasonUpdateField from "../global/SeasonUpdateField";
import AlertMessage from "../global/AlertMessage";

interface SerieUpdate {
  children: React.ReactNode,
  season: FetchSeasons
}

const SeasonUpdate = ({ children, season }: SerieUpdate) => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormSeason>();
  const { alert, handleSeasonUpdate } = useSerieActions();

  const onSubmit = (payload: FormSeason) => {
    handleSeasonUpdate(payload, season);
  };

  return (
    <>
      <DialogActionBox dialogTitle="Serie Update Form" buttonTitle={`${children}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SeasonUpdateField label="Season Number" payloadKey="seasonNumber" fetchKey="seasonNumber" register={register} errors={errors} season={season} />
          <SeasonUpdateField label="Title" payloadKey="title" fetchKey="title" register={register} errors={errors} season={season} />
          <SeasonUpdateField label="Description" payloadKey="description" fetchKey="description" register={register} errors={errors} season={season} />
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


const Season = () => {
  const { serieId } = useParams();
  const { data: serie, error, loading } = useSingleData<FetchSeries>(`/series/${serieId}`);

  return (
    <>
      {serie &&
        <Table.ScrollArea height={serie.seasons?.length ? "560px" : "auto"}>
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
              {serie.seasons.map((season) => (
                <TableRow key={season._id}>
                  <TableCell>{season.seasonNumber}</TableCell>
                  <TableCell>{season.title}</TableCell>
                  <TableCell>
                    <NavLink to={`seasons/${season.seasonNumber}`}>
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

      {error && (<Text fontSize="6xl" textAlign="center" mt="20vh">{error}</Text>)}

      {loading && (
        <Box display={"flex"} justifyContent={"center"} alignItems="center" height="50vh">
          <Spinner size="xl" />
        </Box>
      )}
    </>
  )
}

export default Season