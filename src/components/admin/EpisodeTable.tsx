import { HStack, Fieldset, DialogFooter, Button, Text, Box, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useParams } from "react-router";
import { useForm, UseFormSetValue, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemaEpisodes, FormEpisode, FetchEpisodes, useSerieActions, useEpisode } from "@/hooks/useSerie";
import DialogBox, { DialogActionBox } from "../global/DialogBox";
import EpisodeUpdateField from "../global/EpisodeUpdateField";
import AlertMessage from "../global/AlertMessage";
import EpisodeField from "../global/EpisodeField";
import { useSerieStore } from "@/context/useSerieStore";

interface EpisodeUpdateProps {
  children: React.ReactNode,
  episode: FetchEpisodes
}

interface FileFieldsProps {
  setValue: UseFormSetValue<FormEpisode>;
  errors: FieldErrors<FormEpisode>;
}

const EpisodeUpdate = ({ children, episode }: EpisodeUpdateProps) => {
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

const FileField = ({ setValue, errors }: FileFieldsProps) => {
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

export const AddEpisode = () => {
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<FormEpisode>({ resolver: zodResolver(schemaEpisodes) });
  const { alert, loading, handleEpisodeCreate } = useSerieActions();

  const onSubmit = (payload: FormEpisode) => {
    handleEpisodeCreate(payload);
  };

  return (
    <DialogBox dialogTitle="Episode Form" buttonTitle="Add Episode">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>

          <Fieldset.HelperText>
            Please provide series details below.
          </Fieldset.HelperText>

          <Fieldset.Content>
            <EpisodeField label="Episode Number" payloadKey="episodeNumber" required={true} valueAsNumber={true} placeHolder="A Number" register={register} errors={errors} />
            <EpisodeField label="Title" payloadKey="title" placeHolder="Title..." required={true} register={register} errors={errors} />
            <EpisodeField label="Released Date" payloadKey="releasedDate" placeHolder="YYYY-MM-DD" register={register} errors={errors} />
            <EpisodeField label="Description" payloadKey="description" placeHolder="Attack On Titan is a ..." register={register} errors={errors} />
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


const EpisodeTable = () => {
  const { serieId, seasonNumber } = useParams();
  const { serieQuery } = useSerieStore();
  const { data: episodes, error, loading } = useEpisode(serieId, seasonNumber, serieQuery);

  return (
    <>
      {episodes &&
        <Table.ScrollArea height={episodes ? "560px" : "auto"}>
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
              {episodes.map((episode) => (
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


export default EpisodeTable