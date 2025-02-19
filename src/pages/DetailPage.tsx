import { useParams } from "react-router";
import { useMovie } from "@/hooks/useMovie";
import { useState } from "react";
import Overview from "@/components/detailData/Overview";
import Watch from "@/components/detailData/Watch";
import "./CSS/DetailPage.css";

export default function DetailPage() {
  const { id } = useParams();
  const { data: allData } = useMovie();
  const [activeTab, setActiveTab] = useState("overview");

  const deatilData = allData.find(
    (allData) => String(allData._id) === String(id)
  );

  return (
    <div>
      {/* Header Section */}
      <div className="series-header" style={{
        backgroundImage: `url(${deatilData?.poster_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "97%",
        height: "500px",
      }}>
        <div className="details-overlay">
          <h1>{deatilData?.title}</h1>
          <p>{deatilData?.description}</p>
          <div className="genres-box"><ul>
            {deatilData?.genres.map((genre) => (
              <li>{genre.name}</li>
            ))}
          </ul>
            <span>{deatilData?.rating}</span>
            {deatilData?.isOnGoing ? <span>Ongoing</span> : null}</div>

          {/* Tab Navigation (State-Based) */}
          <div className="tabs">
            <button onClick={() => setActiveTab("overview")}>OVERVIEW</button>
            <button onClick={() => setActiveTab("watch")}>WATCH</button>
          </div>
        </div>
      </div>

      {/* Tab Content (Conditional Rendering) */}
      <div className="tab-content">
        {activeTab === "overview" && <Overview detailData={deatilData} />}
        {activeTab === "watch" && <Watch detailData={deatilData} />}
      </div>
    </div>
  );
}
