
import { Grid, GridItem, Button, Fieldset, Stack, } from "@chakra-ui/react";
import { useForm, FieldErrors, UseFormRegister, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Outlet } from "react-router";


import { useSerieActions, FormSerie, schemaSeries } from "@/hooks/useSerie";
import { useGenre } from "@/hooks/useGenre";
import { useSerieStore } from "@/context/useSerieStore";
import { useUserStore } from "@/context/useUserStore";
import SortSelector from "@/components/global/SortSelector";
import AlertMessage from "@/components/global/AlertMessage";
import SearchInput from "@/components/global/SearchInput";
import MultipleSelector from "@/components/global/MultipleSelector";
import GenreField from "@/components/global/GenreField";
import AddGenre from "@/components/global/AddGenre";
import DialogBox from "@/components/global/DialogBox";
import SerieField from "@/components/global/SerieField";
import AdminNavLink from "@/components/global/AdminNavLink";

interface SerieFieldsProps {
  register: UseFormRegister<FormSerie>;
  errors: FieldErrors<FormSerie>;
}

// ADD SERIE
const SerieFields = ({ register, errors }: SerieFieldsProps) => {
  return (
    <>
      <SerieField label="Title" payloadKey="title" placeHolder="Title..." required={true} register={register} errors={errors} />
      <GenreField register={register} errors={errors} />
      <SerieField label="Rating" payloadKey="rating" placeHolder="1~10" register={register} errors={errors} />
      <SerieField label="Description" payloadKey="description" placeHolder="Spirited Awasy is a ..." register={register} errors={errors} />
      <SerieField label="Released Date" payloadKey="releasedDate" placeHolder="YYYY-MM-DD" required={true} register={register} errors={errors} />
      <SerieField label="Translator" payloadKey="translator" placeHolder="name..." required={true} register={register} errors={errors} />
      <SerieField label="Encoder" payloadKey="encoder" placeHolder="name..." required={true} register={register} errors={errors} />
      <SerieField label="Studio" payloadKey="studio" placeHolder="Studio Name" required={true} register={register} errors={errors} />
    </>
  );
};

const AddSerie = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormSerie>({ resolver: zodResolver(schemaSeries) });
  const { alert, loading, handleSerieCreate } = useSerieActions();

  const onSubmit = (payload: FormSerie) => {
    handleSerieCreate(payload);
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
          <AdminNavLink />
          {accessToken ?
            (<>
              <AddSerie />
              <AddGenre />
            </>)
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
