import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useUserStore } from "./context/useUserStore";
import Home from "./pages/Home"
import MoviePanel from "./pages/MoviePanel"
import TeamPanel from "./pages/TeamPanel";

function App() {
  const { accessToken, fetchAccessToken } = useUserStore();

  useEffect(() => {
    if (!accessToken) {
      fetchAccessToken();
    }
    // if accessToken expires true or not 
    // fetchAccessToken(); // that will call refresh token api(which return new access token)
  }, [accessToken, fetchAccessToken]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie-panel" element={<MoviePanel />} />
      <Route path="team-panel" element={<TeamPanel />} />
    </Routes>
  )
}

export default App
