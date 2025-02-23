import { DialogFooter, HStack, Button, Text, Box, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

import { FormEpisode, FetchEpisodes, useSerieActions, FetchSeasons } from "@/hooks/useSerie";
import { useSingleData } from "@/hooks/useData";
import { DialogActionBox } from "../global/DialogBox";
import EpisodeUpdateField from "../global/EpisodeUpdateField";
import AlertMessage from "../global/AlertMessage";

interface SerieUpdate {
  children: React.ReactNode,
  episode: FetchEpisodes
}

const EpisodeUpdate = ({ children, episode }: SerieUpdate) => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormEpisode>();
  const { alert, handleEpisodeUpdate } = useSerieActions();

  const onSubmit = (payload: FormEpisode) => {
    handleEpisodeUpdate(payload, episode);
  };

  return (
    <>
      <DialogActionBox dialogTitle="Serie Update Form" buttonTitle={`${children}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EpisodeUpdateField label="Episode Number" payloadKey="episodeNumber" fetchKey="episodeNumber" register={register} errors={errors} episode={episode} />
          <EpisodeUpdateField label="Title" payloadKey="title" fetchKey="title" register={register} errors={errors} episode={episode} />
          <EpisodeUpdateField label="Description" payloadKey="description" fetchKey="description" register={register} errors={errors} episode={episode} />
          {alert && <AlertMessage message={alert} />}
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogActionBox>
    </>
  );
};


const EpisodeAction = ({ episode }: { episode: FetchEpisodes }) => {
  const { accessToken, handleEpisodeDelete } = useSerieActions();

  const onClick = () => {
    handleEpisodeDelete(episode);
  };

  return (
    <>
      {accessToken ? (
        <HStack>
          <EpisodeUpdate episode={episode}>
            Edit
          </EpisodeUpdate>
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


const Episode = () => {
  const { serieId, seasonNumber } = useParams();
  const { data: season, error, loading } = useSingleData<FetchSeasons>(`/series/${serieId}/seasons/${seasonNumber}`);

  return (
    <>
      {season &&
        <Table.ScrollArea height={season.episodes.length ? "560px" : "auto"}>
          <TableRoot stickyHeader>
            <Table.ColumnGroup>
              <Table.Column htmlWidth="10%" />
              <Table.Column htmlWidth="10%" />
              <Table.Column htmlWidth="10%" />
              <Table.Column htmlWidth="10%" />
              <Table.Column />
            </Table.ColumnGroup>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Episode Number</TableColumnHeader>
                <TableColumnHeader>Title</TableColumnHeader>
                <TableColumnHeader>Released Date</TableColumnHeader>
                <TableColumnHeader>Description</TableColumnHeader>
                <TableColumnHeader paddingLeft={7}>Actions</TableColumnHeader>
              </TableRow>
            </TableHeader>

            <TableBody>
              {season.episodes.map((episode) => (
                <TableRow key={episode._id}>
                  <TableCell>{episode.episodeNumber}</TableCell>
                  <TableCell>{episode.title}</TableCell>
                  <TableCell>{episode.releasedDate.split('T')[0]}</TableCell>
                  <TableCell>{episode.description}</TableCell>
                  <TableCell>
                    <EpisodeAction episode={episode} />
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


export default Episode