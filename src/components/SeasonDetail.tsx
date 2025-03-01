import { useEpisodes } from "@/hooks/useSerie";
import { useParams } from "react-router";
import { useEffect } from "react";

export default function SeasonDetail() {
  const { seasonNumber, serieSlug } = useParams();
  const {
    data: episodes,
    loading,
    refetch,
  } = useEpisodes(serieSlug, seasonNumber);

  useEffect(() => {
    if (seasonNumber) {
      refetch(); // ✅ Refetch episodes when seasonNumber changes
    }
  }, [seasonNumber, refetch]);

  return (
    <ul>
      {loading ? (
        <p>Loading episodes...</p>
      ) : episodes?.length > 0 ? (
        episodes.map((e) => <li key={e._id}>{e.title}</li>)
      ) : (
        <p>No episodes available.</p>
      )}
    </ul>
  );
}
