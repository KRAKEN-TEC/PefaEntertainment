import { Outlet, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSerieStore } from "@/context/useSerieStore";
import Overview from "@/components/detailData/Overview";
import Watch from "@/components/detailData/Watch";
import { FetchSeries, useSeasons, useSingleSerie } from "@/hooks/useSerie";
import useNavDetail from "@/hooks/useNavDetail";
import { Link } from "react-router";
export default function SeriesDetail() {
  const { serieSlug } = useParams(); // Extract ID from URL
  // const { seriesStore } = useSerie();
  // const [series, setSeries] = useState<FetchSeries | null>(null);
  // const [activeTab, setActiveTab] = useState<string>("overview");
  const { data: seasons } = useSeasons(serieSlug);
  const { data: serie } = useSingleSerie(serieSlug);

  // useEffect(() => {
  //   if (!id) return;

  //   const fetchingSeries = seriesStore.find((s) => s.slug === id) || null;

  //   if (fetchingSeries) {
  //     setSeries(fetchingSeries);
  //   }
  // }, [id, seriesStore]);

  return (
    <div>
      <h1>{serie?.title}</h1>
      <ul>
        {seasons.map((season) => (
          <li>
            <Link
              to={`/series/${serieSlug}/seasons/${season.seasonNumber}/episodes`}
            >
              {season.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
  //   <div className="series-detail">
  //     {series && (
  //       <div className="s-con">
  //         <div
  //           className="header"
  //           style={{
  //             backgroundImage: `url(${series.poster_url})`,
  //             backgroundSize: "cover",
  //             backgroundPosition: "center",
  //             width: "100%",
  //             height: "500px",
  //           }}
  //         >
  //           <div className="details-overlay">
  //             <h1>{series.title}</h1>
  //             <p>{series.description}</p>
  //             <div className="genres-box">
  //               <ul>
  //                 {series.genres.map((genre) => (
  //                   <li key={genre.name}>{genre.name}</li>
  //                 ))}
  //               </ul>
  //               <span>{series.rating}</span>
  //               {series.isOnGoing && <span>Ongoing</span>}
  //             </div>

  //             <div className="tabs">
  //               <button onClick={() => setActiveTab("overview")}>
  //                 OVERVIEW
  //               </button>
  //               <button onClick={() => handleWatch()}>WATCH</button>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="tab-content">
  //           {activeTab === "overview" && <Overview anyData={series} />}

  //           {activeTab === "watch" && (
  //             <div>
  //               <div className="seasons"></div>
  //               {seasons.map((season) => (
  //                 <div>{season.seasonNumber}</div>
  //               ))}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </div>
}
