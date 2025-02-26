import { useNavigate } from "react-router";

const useNavDetail = () => {
  const navigate = useNavigate();

  const callNav = (id: string) => {
    navigate(`/detail-page/${id}`);
  };

  const callNavForMoviesPage = (id: string) => {
    navigate(`/detail-page/${id}`);
  };

  const callNavForSeriesPage = (id: string) => {
    navigate(`/detail-page/${id}`);
  };

  const callNavForSeason = (id: string, seasonNumber: number) => {
    navigate(`/detail-page/${id}/seasons/${seasonNumber}`);
  };

  return { callNav, callNavForMoviesPage, callNavForSeriesPage, callNavForSeason };
};

export default useNavDetail;
