
import { GridItem, Button, Stack } from "@chakra-ui/react";
import { Outlet, useParams } from "react-router";

import { useGenre } from "@/hooks/useGenre";
import { useSerieStore } from "@/context/useSerieStore";
import { useUserStore } from "@/context/useUserStore";
import { AddSeason } from "@/components/admin/SeasonTable";
import { AddEpisode } from "@/components/admin/EpisodeTable";
import { AddSerie } from "@/components/admin/SerieTable";
import SortSelector from "@/components/global/SortSelector";
import SearchInput from "@/components/global/SearchInput";
import MultipleSelector from "@/components/global/MultipleSelector";
import AddGenre from "@/components/global/AddGenre";
import AdminNavLink from "@/components/global/AdminNavLink";
import LinkTree from "@/components/global/LinkTree";

function SeriePanel() {
  const { serieQuery, setSerieQuery } = useSerieStore();
  const { serieId, seasonNumber } = useParams();
  const { accessToken } = useUserStore();
  const { data: genres } = useGenre();

  return (
    <>
      {/* NAVIGATION BAR*/}
      <GridItem area="nav">
        <Stack direction={{ base: "row", md: "row", sm: "row" }} justifyContent={"flex-start"} paddingBottom={3}>

          {/* LINKS */}
          <AdminNavLink />

          {/* ADD */}
          {accessToken ? (
            <>
              {!serieId ? <AddSerie /> : !seasonNumber ? <AddSeason /> : <AddEpisode />}
              {!serieId && <AddGenre />}
            </>
          ) : (
            <>
              <Button onClick={() => window.alert("Please login to perform this action")}>
                Add Series
              </Button>
              <Button onClick={() => window.alert("Please login to perform this action")}>
                Add Genre
              </Button>
            </>
          )}

          {/* SORT SEARCH FILTER */}
          <SortSelector selectedSort={serieQuery.ordering}
            onClick={(ordering) => setSerieQuery({ ...serieQuery, ordering })}
          />
          {!serieId && <MultipleSelector labelName="name" placeholderName="Genre" data={genres}
            onValueChange={(selected: any) => setSerieQuery({ ...serieQuery, genres: selected })}
          />}
          {!serieId ?
            <SearchInput placeholderName="series"
              onSubmit={(payload) => setSerieQuery({ ...serieQuery, search: payload.searchName })}
            /> : !seasonNumber ?
              <SearchInput placeholderName="seasons"
                onSubmit={(payload) => setSerieQuery({ ...serieQuery, search: payload.searchName })}
              /> :
              <SearchInput placeholderName="episodes"
                onSubmit={(payload) => setSerieQuery({ ...serieQuery, search: payload.searchName })}
              />
          }
        </Stack>
      </GridItem>

      {/* SERIE LIST */}
      <GridItem area="list">
        <div>
          <LinkTree />
        </div>
        <div>
          <Outlet />
        </div>
      </GridItem>
    </>
  );
}

export default SeriePanel;
