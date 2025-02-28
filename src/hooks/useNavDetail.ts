import { useNavigate } from "react-router";

const useNavDetail = () => {
  const navigate = useNavigate();

  const callNav = (slug: string, type: "movies" | "series") => {
    if (type === "movies") {
      navigate(`/movie/${slug}`);
    } else {
      navigate(`/series/${slug}`);
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

  return { callNav, callNavForMoviesPage, callNavForSeriesPage, callNavForSeason };
};

export default useNavDetail;
