import { useEpisodes } from "@/hooks/useSerie";
import { useParams } from "react-router";

export default function Episodes() {
  const { serieSlug, seasonNumber } = useParams();
  const { data: episodes } = useEpisodes(serieSlug, seasonNumber);

  return (
    <ul>
      {episodes && episodes.map(episode => <li key={episode._id}>{episode.title}</li>)}
    </ul>
  );
}