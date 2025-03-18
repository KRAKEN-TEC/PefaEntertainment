import NavBar from "@/components/NavBar";
import { useMovieStore } from "@/context/useMovieStore";
import { useSerieStore } from "@/context/useSerieStore";
import { Outlet } from "react-router";

export default function Layout() {
  const { moviesStore, movieQuery, setMovieQuery } = useMovieStore();
  const { serieQuery, setSerieQuery } = useSerieStore();
  console.log(moviesStore);
  return (
    <div>
      <NavBar
        onSearch={(search) => {
          if (search.length > 0) {
            setMovieQuery({ ...movieQuery, page: 0, search: search });
            setSerieQuery({ ...serieQuery, search: search });
          } else {
            setMovieQuery({ ...movieQuery, page: 0, search: "" });
          }
        }}
      />
      <Outlet />
    </div>
  );
}
