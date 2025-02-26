import WatchingBox from "./WatchingBox";

export default function Watch({ detailData }: { detailData?: any }) {
  return (
    <div>
      <WatchingBox detailData={detailData} />
    </div>
  );
}
