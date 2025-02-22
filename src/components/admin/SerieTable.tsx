import { Text, Box, Button, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router";

import { useSerieStore } from "@/context/useSerieStore";
import { useSerie } from "@/hooks/useSerie";

export default function SerieTable() {
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
                  <TableCell>{serie.seasons.length}</TableCell>
                  <TableCell>{serie.seasons.reduce((total, season) => total + season.episodes.length, 0)}</TableCell>
                  <TableCell>{serie.isOnGoing == true ? "yes" : "no"}</TableCell>
                  <TableCell>{serie.releasedDate.split("T")[0]}</TableCell>
                  <TableCell>{serie.translator}</TableCell>
                  <TableCell>{serie.encoder}</TableCell>
                  <TableCell>{serie.studio}</TableCell>
                  <TableCell>
                    <NavLink to={`${serie._id}`}>
                      <Button variant="plain" _hover={{ color: "cyan" }} color="blue">Detail</Button>
                    </NavLink>
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
