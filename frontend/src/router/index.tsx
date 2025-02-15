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

        ]
    }
]);

export default router;