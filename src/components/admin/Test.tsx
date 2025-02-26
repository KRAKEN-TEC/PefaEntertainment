
import { useEpisodes, useSeasons, useSeries, useSingleSeason, useSingleSerie, useSingleEpisode } from '@/hooks/useSerie';

function Test() {
  const { data: series } = useSeries();
  const { data: serie } = useSingleSerie("67be56c81c83a35fcb4cf2e2");
  const { data: seasons } = useSeasons("67be56c81c83a35fcb4cf2e2");
  const { data: season } = useSingleSeason("67be56c81c83a35fcb4cf2e2", "1")
  const { data: episodes } = useEpisodes("67be56c81c83a35fcb4cf2e2", "1")
  const { data: episode, loading, error } = useSingleEpisode("67be56c81c83a35fcb4cf2e2", "1", "1")

  console.log(episodes)
  // useEffect(() => {
  //   apiPefa.get("/series/67be56c81c83a35fcb4cf2e2")
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching series:", error);
  //     });
  // }, []);

  return (
    <>
      <h1>Series</h1>
      {series &&
        <ul>
          {series.map(serie =>
            <ul key={serie._id}>
              <li>{serie._id}</li>
              <li>{serie.title}</li>
            </ul>
          )}
        </ul>
      }

      <h1>Single Serie</h1>
      {serie &&
        <ul key={serie._id}>
          <li>{serie._id}</li>
          <li>{serie.title}</li>
        </ul>
      }

      <h1>Seasons</h1>
      {seasons &&
        <ul>
          {seasons.map(season =>
            <ul key={season._id}>
              <li>{season._id}</li>
              <li>{season.title}</li>
            </ul>
          )}
        </ul>
      }

      <h1>Single Season</h1>
      {season &&
        <ul key={season._id}>
          <li>{season._id}</li>
          <li>{season.title}</li>
        </ul>
      }

      <h1>Episodes</h1>
      {episodes &&
        <ul>
          {episodes.map(episode =>
            <ul key={episode._id}>
              <li>{episode._id}</li>
              <li>{episode.title}</li>
            </ul>
          )}
        </ul>
      }

      <h1>Single Episode</h1>
      {episode &&
        <ul key={episode._id}>
          <li>{episode._id}</li>
          <li>{episode.title}</li>
        </ul>
      }

      {error && <p>{error}</p>}

      {loading && <p>Loading</p>}
    </>
  )
}

export default Test
