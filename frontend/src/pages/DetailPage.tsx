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
      <div className="series-header">
        <img src={deatilData?.poster_url} alt="PEFA Logo" />
        <h1>{deatilData?.title}</h1>
        <p>{deatilData?.description}</p>
        <ul>
          {deatilData?.genres.map((genre) => (
            <li>{genre.name}</li>
          ))}
        </ul>
        <span>{deatilData?.rating}</span>
        {deatilData?.isOnGoing ? <span>Ongoing</span> : null}
      </div>

      {/* Tab Navigation (State-Based) */}
      <div className="tabs">
        <button onClick={() => setActiveTab("overview")}>Overview</button>
        <button onClick={() => setActiveTab("watch")}>Watch</button>
      </div>

      {/* Tab Content (Conditional Rendering) */}
      <div className="tab-content">
        {activeTab === "overview" && <Overview detailData={deatilData} />}
        {activeTab === "watch" && <Watch detailData={deatilData} />}
      </div>
    </div>
  );
}
