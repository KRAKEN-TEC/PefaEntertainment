import { FetchMovies } from "@/hooks/useMovie";
import WatchingBox from "./WatchingBox";

export default function Watch({ detailData }: { detailData?: FetchMovies }) {
  return (
    <div>{!detailData?.isSerie && <WatchingBox detailData={detailData} />}</div>
  );
}
