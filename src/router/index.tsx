import { createBrowserRouter } from "react-router";
import { Provider } from "@/components/ui/provider";

// ADMIN PANEL
import MoviePanel from "@/pages/MoviePanel";
import TeamPanel from "@/pages/TeamPanel";
import SeriePanel from "@/pages/SeriePanel";
import Serie from "@/components/admin/Serie";
import Season from "@/components/admin/Season";
import Episode from "@/components/admin/Episode";
import Test from "@/components/admin/Test";

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
import DetailPage from "@/pages/DetailPage";
import AboutUs from "@/pages/AboutUs";
import DetailPageLayout from "@/pages/layout/DetailPageLayout";
import WatchingVideo from "@/components/WatchingVideo";

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
        path: "test",
        element: <Test />,
      }
    ],
  },

  {
    path: "detail-page/:id",
    element: <DetailPageLayout />,
    children: [
      {
        path: "",
        element: <DetailPage />,
      },
      {
        path: "watch",
        element: <WatchingVideo />,
      },
    ],
  },

  {
    path: "/admin/*",
    element:
      <Provider>
        <AdminLayout />
      </Provider>, // Separate layout without Navbar
    children: [
      { path: "movie-panel", element: <MoviePanel /> },
      { path: "team-panel", element: <TeamPanel /> },
      {
        path: "serie-panel/*",
        element: <SeriePanel />,
        children: [
          { path: "series", element: <Serie /> },
          { path: "series/:serieId", element: <Season /> },
          { path: "series/:serieId/seasons/:seasonNumber", element: <Episode /> }
        ]
      },
    ],
  },

]);

export default router;
