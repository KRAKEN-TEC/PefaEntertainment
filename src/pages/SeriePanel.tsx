import { GridItem, Button, Stack, Spacer, Box } from "@chakra-ui/react";
import { Outlet, useParams } from "react-router";

import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { useSeries } from "@/hooks/useSerie";
import { useGenre } from "@/hooks/useGenre";
import { useSerieStore } from "@/context/useSerieStore";
import { useUserStore } from "@/context/useUserStore";
import { AddSeason } from "@/components/admin/SeasonTable";
import { AddEpisode } from "@/components/admin/EpisodeTable";
import { AddSerie } from "@/components/admin/SerieTable";
import SortSelector from "@/components/global/SortSelector";
import MultipleSelector from "@/components/global/MultipleSelector";
import AddGenre from "@/components/global/AddGenre";
import AdminNavLink from "@/components/global/AdminNavLink";
import LinkTree from "@/components/global/LinkTree";
import AdminSearchInput from "@/components/admin/AdminSearchInput";
import { UserLogin, UserLogout } from "./TeamPanel";
import DarkMode from "@/components/DarkMode";

const SerieSortArray = [
  { value: "rating", label: "Rating" },
  { value: "releasedDate", label: "Released Date" },
  { value: "uploadDate", label: "Upload Date" },
];

const SeasonSortArray = [
  { value: "seasonNumber", label: "Season Number" },
];

const EpisodeSortArray = [
  { value: "episodeNumber", label: "Episode Number" },
  { value: "releasedDate", label: "Released Date" },
]

function SeriePanel() {
  const { serieQuery, setSerieQuery } = useSerieStore();
  const { serieSlug, seasonNumber } = useParams();
  const { accessToken } = useUserStore();
  const { data: genres } = useGenre();
  const { data: series } = useSeries(serieQuery);

  const nextPage = () => {
    setSerieQuery({ ...serieQuery, page: serieQuery.page + 1 })
  }

  const prevPage = () => {
    setSerieQuery({ ...serieQuery, page: serieQuery.page - 1 })
  }

  return (
    <>
      {/* NAVIGATION BAR*/}
      <GridItem area="nav">
        <Stack direction={{ base: "row", md: "row", sm: "row" }} justifyContent={"flex-start"} paddingBottom={3}>

          {/* LINKS */}
          <AdminNavLink />

          <Spacer />

          {/* SORT SEARCH FILTER */}
          <SortSelector
            sortArray={!serieSlug ? SerieSortArray : !seasonNumber ? SeasonSortArray : EpisodeSortArray}
            selectedSort={serieQuery.ordering}
            onClick={(ordering) => setSerieQuery({ ...serieQuery, ordering })}
          />

          {!serieSlug &&
            <MultipleSelector
              labelName="name"
              placeholderName="Genre"
              data={genres}
              onValueChange={(selected: any) => setSerieQuery({ ...serieQuery, genres: selected })}
            />
          }

          <AdminSearchInput
            placeholderName={!serieSlug ? "series" : !seasonNumber ? "seasons" : "episodes"}
            onSubmit={(payload) => setSerieQuery({ ...serieQuery, search: payload.searchName })}
          />

          {/* ADD */}
          {accessToken ? (
            <>
              {!serieSlug ? <AddSerie /> : !seasonNumber ? <AddSeason /> : <AddEpisode />}
              {!serieSlug && <AddGenre />}
            </>
          ) : (
            <>
              <Button onClick={() => window.alert("Please login to perform this action")}>
                {!serieSlug ? "Add Series" : !seasonNumber ? "Add Season" : "Add Episode"}
              </Button>
              {!serieSlug &&
                <Button onClick={() => window.alert("Please login to perform this action")}>
                  Add Genre
                </Button>
              }
            </>
          )}

          {/* LOGIN LOGOUT */}
          {accessToken ? (
            <UserLogout>Log Out</UserLogout>
          ) : (
            <UserLogin>Log In</UserLogin>
          )}

          <DarkMode />
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

      {/* PAGINATION */}
      {!serieSlug && <GridItem area="page">
        <Box>
          {serieQuery.page === 1 ?
            <Button variant="plain" color="grey"> <MdArrowBack /> </Button>
            :
            <Button variant="plain" _hover={{ color: "cyan" }} onClick={prevPage}> <MdArrowBack /> </Button>
          }
          {series.length === 12 ?
            <Button variant="plain" _hover={{ color: "cyan" }} onClick={nextPage}> <MdArrowForward /> </Button>
            :
            <Button variant="plain" color="grey"> <MdArrowForward /> </Button>
          }
        </Box>
      </GridItem>}
    </>
  );
}

export default SeriePanel;
