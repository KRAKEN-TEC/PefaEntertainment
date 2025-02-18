import { FetchMovie } from "@/hooks/useMovie";
import WatchingBox from "./WatchingBox";

export default function Watch({ detailData }: { detailData?: FetchMovie }) {
  return (
    <div>{!detailData?.isSerie && <WatchingBox detailData={detailData} />}</div>
  );
}
