import NavBar from "@/components/NavBar";
import { useMovieStore } from "@/context/useMovieStore";
import { useSerieStore } from "@/context/useSerieStore";
import { Outlet } from "react-router";

export default function Layout() {
  const { movieQuery, setMovieQuery } = useMovieStore();
  const { serieQuery, setSerieQuery } = useSerieStore();
  return (
    <div>
      <NavBar
        onSearch={(search) => {
          if (search.length > 0) {
            setMovieQuery({ ...movieQuery, page: 0, search: search });
            setSerieQuery({ ...serieQuery, page: 0, search: search });
          } else {
            setMovieQuery({ ...movieQuery, page: 0, search: "" });
            setSerieQuery({ ...serieQuery, page: 0, search: "" });
          }
        }}
      />
      <Outlet />
    </div>
  );
}
