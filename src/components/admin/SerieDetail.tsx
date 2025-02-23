import { Text, Box, Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router";

import { FetchSeries } from "@/hooks/useSerie";
import { useSingleData } from "@/hooks/useData";

const SerieDetail = () => {
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
              <Table.Column />
            </Table.ColumnGroup>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Season Number</TableColumnHeader>
                <TableColumnHeader>Title</TableColumnHeader>
                <TableColumnHeader>Episodes</TableColumnHeader>
                <TableColumnHeader>Description</TableColumnHeader>
              </TableRow>
            </TableHeader>

            <TableBody>
              {serie.seasons.map((season) => (
                <TableRow key={season._id}>
                  <TableCell>{season.seasonNumber}</TableCell>
                  <TableCell>{season.title}</TableCell>
                  <TableCell>{season.episodes.length}</TableCell>
                  <TableCell>{season.description}</TableCell>
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

export default SerieDetail