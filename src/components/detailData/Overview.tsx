import { FetchMovies } from "@/hooks/useMovie";
import Tag from "../ui/Global/Tag";
import { stringSliceFrontOnly } from "@/helper/GlobalHelper";

export default function Overview({ detailData }: { detailData?: FetchMovies }) {
  return (
    <div className="detail-container">
      {/* Description */}
      <div>
        <Tag txt="Description" as="h2" />
        <p>{detailData?.description}</p>
      </div>

      {/* Series Details */}
      <div className="detail-info">
        <Tag
          txt={
            "Release Date: " +
            stringSliceFrontOnly(detailData?.releasedDate ?? "", "T")
          }
          as="h3"
        />
        <Tag txt={"Translator: " + (detailData?.translator ?? "")} as="h3" />
        <Tag txt={"Translator: " + (detailData?.translator ?? "")} as="h3" />
        <Tag txt={"Encoder: " + (detailData?.encoder ?? "")} as="h3" />
        <Tag txt={"Studio: " + (detailData?.studio ?? "")} as="h3" />
      </div>
    </div>
  );
}
