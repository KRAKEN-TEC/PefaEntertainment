
import { useInfeed } from '@/hooks/useInfeed';

function TestSeries() {
  const { data: inFeeds, error, loading } = useInfeed();
  console.log(inFeeds);

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}

      <h1>Series</h1>
      {inFeeds &&
        <ul>
          {inFeeds.map(inFeed =>
            <ul key={inFeed.id}>
              <li>{inFeed.id}</li>
              <li>{inFeed.name}</li>
              <li>{inFeed.ad_refresh_rate}</li>
            </ul>
          )}
        </ul>
      }
    </>
  )
}

export default TestSeries
