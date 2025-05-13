import { createBrowserRouter } from "react-router";
import { Provider } from "@/components/ui/provider";

// ADMIN PANEL
import MoviePanel from "@/pages/MoviePanel";
import TeamPanel from "@/pages/TeamPanel";
import SeriePanel from "@/pages/SeriePanel";
import SerieTable from "@/components/admin/SerieTable";
import SeasonTable from "@/components/admin/SeasonTable";
import EpisodeTable from "@/components/admin/EpisodeTable";
// import TestSeries from "@/components/admin/TestSeries";
// import TestMovies from "@/components/admin/TestMovies";

import App from "../App";
import Layout from "@/pages/layout/Layout";
import AdminLayout from "@/pages/layout/AdminLayout";
import Home from "@/pages/Home";
import Search from "@/pages/HumburgerPage/Search";
import Profile from "@/pages/HumburgerPage/Profile";
import HowToDownload from "@/pages/HumburgerPage/HowToDownload";
import Login from "@/pages/HumburgerPage/Login";
import Register from "@/pages/HumburgerPage/Register";
import MoviesPage from "@/pages/MoviePage/MoviesPage";
import SeriesPage from "@/pages/SeriesPage/SeriesPage";
import AboutUs from "@/pages/HumburgerPage/AboutUs";
import DetailPageLayout from "@/pages/layout/DetailPageLayout";
import MovieDetail from "@/pages/MoviePage/MovieDetail";
import SeriesDetail from "@/pages/SeriesPage/SeriesDetail";
import Episodes from "@/components/Series/Episodes";
import WatchMovie from "@/components/Movie/WatchMovie";
import WatchSerie from "@/components/Series/WatchSerie";

// Ko Oak Kar ၀င်မရေးရ

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
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "series",
        element: <SeriesPage />,
      },
      // {
      //   path: "test-series",
      //   element: <TestSeries />,
      // },
      // {
      //   path: "test-movies",
      //   element: <TestMovies />,
      // },
    ],
  },

  {
    path: "",
    element: <DetailPageLayout />,
    children: [
      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
      { path: "movie/:id/watch", element: <WatchMovie /> },

      {
        path: "series/:serieSlug/*",
        element: <SeriesDetail />,
        children: [
          {
            path: "seasons/:seasonNumber/episodes",
            element: <Episodes />,
          },
        ],
      },
      {
        path: "series/:serieSlug/seasons/:seasonNumber/episodes/:episodeNumber/watch",
        element: <WatchSerie />,
      },
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
