
import { useEpisodes, useSeasons, useSeries, useSingleSeason, useSingleSerie, useSingleEpisode } from '@/hooks/useSerie';

function Test() {
  const { data: series } = useSeries();
  const { data: serie } = useSingleSerie("67bf255c5881b85c8a531234");
  const { data: seasons } = useSeasons("67bf255c5881b85c8a531234");
  const { data: season } = useSingleSeason("67bf255c5881b85c8a531234", "1")
  const { data: episodes } = useEpisodes("67bf255c5881b85c8a531234", "1")
  const { data: episode, loading, error } = useSingleEpisode("67bf255c5881b85c8a531234", "1", "1")

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
