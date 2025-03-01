import { useEpisodes } from "@/hooks/useSerie";
import { useParams } from "react-router";
import WatchingBox from "../detailData/WatchingBox";

// Ko Oak Kar ၀င်မရေးရ

export default function Episodes() {
  const { serieSlug, seasonNumber } = useParams();
  const { data: episodes } = useEpisodes(serieSlug, seasonNumber);

  return (
    <ul>
      {episodes &&
        episodes.map((episode) => (
          <WatchingBox detailData={episode} key={episode._id} />
        ))}
    </ul>
  );
}
