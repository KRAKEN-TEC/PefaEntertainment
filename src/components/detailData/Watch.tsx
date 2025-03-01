import WatchingBox from "./WatchingBox";


export default function Watch<T>({ detailData }: { detailData: T }) {
  return (
    <div>
      <WatchingBox detailData={detailData} />
    </div>
  );
}
