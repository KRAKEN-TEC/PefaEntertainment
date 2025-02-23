import { Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Grid, GridItem, Button } from "@chakra-ui/react";

import { useGenre } from "@/hooks/useGenre";
import { useUserStore } from "@/context/useUserStore";
import { useMovieStore } from "@/context/useMovieStore";
import AdminNavLink from "@/components/global/AdminNavLink";
import SortSelector from "@/components/global/SortSelector";
import MultipleSelector from "@/components/global/MultipleSelector";
import SearchInput from "@/components/global/SearchInput";

export default function AdminLayout() {
  const { movieQuery, setMovieQuery } = useMovieStore();
  const { accessToken, fetchAccessToken } = useUserStore();
  const { data: genres } = useGenre();

  useEffect(() => {
    if (!accessToken) {
      fetchAccessToken();
    }
    // if accessToken expires true or not
    // fetchAccessToken(); // that will call refresh token api(which return new access token)
  }, [accessToken, fetchAccessToken]);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "list"`, // Stack nav, form, and list in one column for small screens
        lg: `"nav nav" "list list"`, // In large screens, side by side
        md: `"nav nav nav" "list list list"`,
        sm: `"nav nav nav nav" "list list list list"`,
      }}
      templateColumns={{
        base: "1fr",
        md: "1fr",
        sm: "1fr",
      }}
      padding={3}
    >
      {/* NAV */}
      <GridItem area="nav">
        <Stack direction={{ base: "row", md: "row", sm: "row" }} justifyContent={"flex-start"} paddingBottom={3}>
          <AdminNavLink />
          {accessToken ? (
            <>
              {/* <AddMovie>Add Movie</AddMovie>
              <AddGenre>Add Genre</AddGenre> */}
            </>
          ) : (
            <>
              <Button onClick={() => window.alert("Please login to perform this action")} >
                Add Movie
              </Button>
              <Button onClick={() => window.alert("Please login to perform this action")} >
                Add Genre
              </Button>
            </>
          )}
          <SortSelector selectedSort={movieQuery.ordering} onClick={(ordering) => setMovieQuery({ ...movieQuery, ordering })} />
          <MultipleSelector labelName="name" placeholderName="Genre" data={genres} onValueChange={(selected: any) => setMovieQuery({ ...movieQuery, genres: selected })} />
          <SearchInput placeholderName="movies" onSubmit={(payload) => setMovieQuery({ ...movieQuery, search: payload.searchName })} />
        </Stack>
      </GridItem>

      <Outlet />

    </Grid>
  );
}
