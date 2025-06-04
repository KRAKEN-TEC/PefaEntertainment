
import { useSingleZone, useZone } from '@/hooks/useZone';

function Test() {
  const { data: zones, error, loading } = useZone();
  // const { data: singleZone } = useSingleZone("5631720");

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}

      <h1>Zones</h1>
      {zones &&
        <ul>
          {zones.map(z =>
            <ul key={z.id}>
              <li>{z.id}</li>
              <li>{z.name}</li>
              <li>{z.ad_refresh_rate}</li>
            </ul>
          )}
        </ul>
      }

      {/* <h1>Single Zone</h1>
      {singleZone &&
        <ul>
          <li>{singleZone.name}</li>
        </ul>
      } */}

    </>
  )
}

export default Test
