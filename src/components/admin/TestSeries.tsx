
import { useEpisodes, useSeasons, useSeries, useSingleSeason, useSingleSerie, useSingleEpisode } from '@/hooks/useSerie';

const queryObj = {
  page: 1,
  search: "",
  ordering: "",
  genres: { _id: "", name: "" },
};

function TestSeries() {

  const { data: series } = useSeries(queryObj);
  const { data: serie } = useSingleSerie("attack-on-titan");

  const { data: seasons } = useSeasons("attack-on-titan", queryObj);
  const { data: season } = useSingleSeason("attack-on-titan", "1")

  const { data: episodes } = useEpisodes("attack-on-titan", "1", queryObj)
  const { data: episode, loading, error } = useSingleEpisode("attack-on-titan", "1", "1")

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}

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
    </>
  )
}

export default TestSeries
