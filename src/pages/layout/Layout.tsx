import NavBar from "@/components/NavBar";
import { useMovieStore } from "@/context/useMovieStore";
import { useSerieStore } from "@/context/useSerieStore";
import { Outlet } from "react-router";

export default function Layout() {
  const { movieQuery, setMovieQuery } = useMovieStore();
  const { serieQuery, setSerieQuery } = useSerieStore();

  return (
    <div>
      <NavBar onSearch={(search) => {
        setMovieQuery({ ...movieQuery, search: search })
        setSerieQuery({ ...serieQuery, search: search })
      }} />
      <Outlet />
    </div>
  );
}
