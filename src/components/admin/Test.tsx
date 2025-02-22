
import { FetchPefa, usePefa } from '@/hooks/usePefa';

function Test() {
  const { data, loading, error } = usePefa();

  return (
    <>
      {data &&
        <ul>
          {(data as FetchPefa[]).map(d => <li key={d._id}>{d.title}</li>)}
        </ul>
      }

      {error && <p>{error}</p>}

      {loading && <p>Loading</p>}
    </>
  )
}

export default Test
