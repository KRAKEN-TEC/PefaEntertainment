import { stringSliceFrontOnly } from "@/helper/GlobalHelper";
import Tag from "../ui/Global/Tag";
import "../CSS/Overview.css";

export default function Overview({ anyData }: { anyData?: any }) {
  return (
    <div className="detail-container">
      {/* Description */}
      <div>
        <Tag txt="Description" as="h2" />
        <p>{anyData?.description}</p>
      </div>

      {/* Series Details */}
      <div className="detail-info">
        <Tag
          txt={
            "Release Date : " +
            stringSliceFrontOnly(anyData?.releasedDate ?? "", "T")
          }
          as="h3"
        />
        <Tag txt={"Translator : " + (anyData.translator ?? "")} as="h3" />
        <Tag txt={"Encoder : " + (anyData?.encoder ?? "")} as="h3" />
        <Tag txt={"Studio : " + (anyData?.studio ?? "")} as="h3" />
      </div>
    </div>
  );
}
