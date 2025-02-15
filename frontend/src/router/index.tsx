import { createBrowserRouter } from "react-router";
import App from "../App";
import Layout from "@/pages/layout/Layout";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Profile from "@/pages/Profile";
import HowToDownload from "@/pages/HowToDownload";
import Aboutus from "@/pages/AboutUs";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MoviePanel from "@/pages/MoviePanel";
import TeamPanel from "@/pages/TeamPanel";
import MoviesPage from "@/pages/MoviesPage";
import SeriesPage from "@/pages/SeriesPage";
import DetailPage from "@/pages/DetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path:"",
                element: <App/>
            },
            {
                path:"",
                element: <Home/>
            },
            {
                path:"search",
                element: <Search/>
            },
            {
                path:"profile",
                element: <Profile/>
            },
            {
                path:"howtodownload",
                element: <HowToDownload/>
            },
            {
                path:"aboutus",
                element: <Aboutus/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"register",
                element: <Register/>
            },
            {
                path:"movie-panel",
                element: <MoviePanel/>
            },
            {
                path:"team-panel",
                element: <TeamPanel/>
            },
            {
                path:"movies-page",
                element: <MoviesPage/>
            },
            {
                path:"series-page",
                element: <SeriesPage/>
            },
            {
                path:"detail-page/:id",
                element: <DetailPage/>
            },
        
        ]
    }
]);

export default router;