import { createBrowserRouter } from "react-router";
import { Provider } from "@/components/ui/provider";

// ADMIN PANEL
import MoviePanel from "@/pages/MoviePanel";
import TeamPanel from "@/pages/TeamPanel";
import SeriePanel from "@/pages/SeriePanel";
import SerieTable from "@/components/admin/SerieTable";
import SeasonTable from "@/components/admin/SeasonTable";
import EpisodeTable from "@/components/admin/EpisodeTable";
import TestSeries from "@/components/admin/TestSeries";
import TestMovies from "@/components/admin/TestMovies";

import App from "../App";
import Layout from "@/pages/layout/Layout";
import AdminLayout from "@/pages/layout/AdminLayout";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Profile from "@/pages/Profile";
import HowToDownload from "@/pages/HowToDownload";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MoviesPage from "@/pages/MoviesPage";
import SeriesPage from "@/pages/SeriesPage";
import AboutUs from "@/pages/AboutUs";
import DetailPageLayout from "@/pages/layout/DetailPageLayout";
import WatchingVideo from "@/components/WatchingVideo";
import MovieDetail from "@/pages/MovieDetail";
import SeriesDetail from "@/pages/SeriesDetail";
import SeasonDetail from "@/components/SeasonDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "howtodownload",
        element: <HowToDownload />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "movies-page",
        element: <MoviesPage />,
      },
      {
        path: "series-page",
        element: <SeriesPage />,
      },
      {
        path: "test-series",
        element: <TestSeries />,
      },
      {
        path: "test-movies",
        element: <TestMovies />,
      },
    ],
  },

  {
    path: "",
    element: <DetailPageLayout />,
    children: [
      { path: "movie/:id", element: <MovieDetail /> },
      {
        path: "series/:serieSlug/*",
        element: <SeriesDetail />,
        children: [
          {
            path: "seasons/:seasonNumber/episodes",
            element: <SeasonDetail />,
          },
        ],
      },

      { path: "watch", element: <WatchingVideo /> },
    ],
  },

  {
    path: "/admin/*",
    element: (
      <Provider>
        <AdminLayout />
      </Provider>
    ), // Separate layout without Navbar
    children: [
      { path: "movie-panel", element: <MoviePanel /> },
      { path: "team-panel", element: <TeamPanel /> },
      {
        path: "serie-panel/*",
        element: <SeriePanel />,
        children: [
          { path: "series", element: <SerieTable /> },
          { path: "series/:serieSlug/seasons", element: <SeasonTable /> },
          {
            path: "series/:serieSlug/seasons/:seasonNumber/episodes",
            element: <EpisodeTable />,
          },
        ],
      },
    ],
  },
]);

export default router;

{
  /* <div
        className="header"
        style={{
          backgroundImage: `url(${videoData?.poster_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "500px",
        }}
      >
        <div className="details-overlay">
          <h1>{videoData?.title}</h1>
          <p>{videoData?.description}</p>
          <div className="genres-box">
            <ul>
              {videoData?.genres.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
              ))}
            </ul>
            <span>{videoData?.rating}</span>
            {videoData?.isOnGoing && <span>Ongoing</span>}
          </div>

          <div className="tabs">
            <button onClick={() => setActiveTab("overview")}>OVERVIEW</button>
            <button onClick={() => setActiveTab("watch")}>WATCH</button>
          </div>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "overview" && <Overview detailData={videoData} />}

        {activeTab === "watch" && (
          <div>
            {type === "series" ? (
              <>
                <div className="seasons">
                  {seriesSeasons?.map((season) => (
                    <button
                      key={season._id}
                      className={`season-btn ${
                        selectedSeason === season.seasonNumber ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedSeason(season.seasonNumber);
                        callNavForSeason(id, season.seasonNumber);
                      }}
                    >
                      Season {season.seasonNumber}
                    </button>
                  ))}
                </div>

                <div className="episodes-list">
                  {isLoading ? (
                    <p>Loading episodes...</p>
                  ) : seriesEp?.length > 0 ? (
                    seriesEp.map((episode) => (
                      <Watch detailData={episode} key={episode._id} />
                    ))
                  ) : (
                    <p>No episodes available.</p>
                  )}
                </div>
              </>
            ) : (
              <Watch detailData={videoData} key={videoData?._id} />
            )}
          </div>
        )}
      </div> */
}
