// import { useParams } from "react-router";
// import { FetchMovies } from "@/hooks/useMovie";
// import { useEffect, useState } from "react";
// import Overview from "@/components/detailData/Overview";
// import Watch from "@/components/detailData/Watch";
// import "./CSS/DetailPage.css";
// import { useMovieStore } from "@/context/useMovieStore";
// import { FetchSeries, useSeasons, useEpisodes } from "@/hooks/useSerie";
// import { useSerieStore } from "@/context/useSerieStore";
// import useNavDetail from "@/hooks/useNavDetail";
// interface DetailPageProps {
//   type: "series" | "movie"; // ✅ Define prop type
// }

// export default function DetailPage({ type }: DetailPageProps) {
//   const { id } = useParams(); // ✅ Extract `id` from URL
//   const [videoData, setVideoData] = useState<FetchMovies | FetchSeries | null>(
//     null
//   );
//   const { moviesStore } = useMovieStore();
//   const { seriesStore } = useSerieStore();
//   const [activeTab, setActiveTab] = useState<string>("overview");
//   const [selectedSeason, setSelectedSeason] = useState<number>(1);
//   const { callNavForSeason } = useNavDetail();

//   // ✅ Fetch seasons and episodes if it's a series
//   const { data: seriesSeasons } = useSeasons(type === "series" ? id : null);
//   const { data: seriesEp, isLoading } = useEpisodes(
//     type === "series" ? id : null,
//     String(selectedSeason)
//   );

//   // ✅ Fetch movie/series details
//   useEffect(() => {
//     if (!id || !type) return;

//     if (type === "movie") {
//       setVideoData(moviesStore.find((movie) => movie._id === id) || null);
//     } else if (type === "series") {
//       setVideoData(seriesStore.find((serie) => serie._id === id) || null);
//     }
//   }, [id, type, moviesStore, seriesStore]);

//   return (
//     <div className="s-con">
//       <div
//         className="header"
//         style={{
//           backgroundImage: `url(${videoData?.poster_url})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           width: "100%",
//           height: "500px",
//         }}
//       >
//         <div className="details-overlay">
//           <h1>{videoData?.title}</h1>
//           <p>{videoData?.description}</p>
//           <div className="genres-box">
//             <ul>
//               {videoData?.genres.map((genre) => (
//                 <li key={genre.name}>{genre.name}</li>
//               ))}
//             </ul>
//             <span>{videoData?.rating}</span>
//             {videoData?.isOnGoing && <span>Ongoing</span>}
//           </div>

//           <div className="tabs">
//             <button onClick={() => setActiveTab("overview")}>OVERVIEW</button>
//             <button onClick={() => setActiveTab("watch")}>WATCH</button>
//           </div>
//         </div>
//       </div>

//       <div className="tab-content">
//         {activeTab === "overview" && <Overview detailData={videoData} />}

//         {activeTab === "watch" && (
//           <div>
//             {type === "series" ? (
//               <>
//                 <div className="seasons">
//                   {seriesSeasons?.map((season) => (
//                     <button
//                       key={season._id}
//                       className={`season-btn ${
//                         selectedSeason === season.seasonNumber ? "active" : ""
//                       }`}
//                       onClick={() => {
//                         setSelectedSeason(season.seasonNumber);
//                         callNavForSeason(id, season.seasonNumber);
//                       }}
//                     >
//                       Season {season.seasonNumber}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="episodes-list">
//                   {isLoading ? (
//                     <p>Loading episodes...</p>
//                   ) : seriesEp?.length > 0 ? (
//                     seriesEp.map((episode) => (
//                       <Watch detailData={episode} key={episode._id} />
//                     ))
//                   ) : (
//                     <p>No episodes available.</p>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <Watch detailData={videoData} key={videoData?._id} />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
