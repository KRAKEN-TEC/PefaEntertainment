import { useNavigate } from "react-router";

const useNavDetail = () => {
  const navigate = useNavigate();

  const nav = (endpoint: string) => {
    navigate(endpoint)
  };

  const navMovieDetail = (id: string) => {
    navigate("/movies/" + id)
  }

  const navSerieDetail = (slug: string) => {
    navigate("/series/" + slug + "/seasons/1/episodes")
  }

  const callNav = (id: string, type: "movies" | "series") => {
    if (type === "movies") {
      navigate(`/movie/${id}`);
    } else {
      navigate(`/series/${id}`);
    }
  };

  const callNavForMoviesPage = (id: string) => {
    navigate(`/detail-page/${id}`);
  };

  const callNavForSeriesPage = (id: string) => {
    navigate(`/detail-page/${id}`);
  };

  const callNavForSeason = (serieSlug: any) => {
    navigate(`/series/${serieSlug}/seasons/1`);
  };

  return { callNav, callNavForMoviesPage, callNavForSeriesPage, callNavForSeason, nav, navMovieDetail, navSerieDetail };
};

export default useNavDetail;
