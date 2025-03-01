import { useNavigate } from "react-router";

const useNavDetail = () => {
  const navigate = useNavigate();

  const nav = (endpoint: string) => {
    navigate(endpoint)
  };

  const navMovieDetail = (id: string) => {
    navigate(`/movie/${id}` )
  }

  const navSerieDetail = (slug: string) => {
    navigate(`/series/${slug}` )
  }

  const callNav = (id: string, type: "movies" | "series") => {
    console.log("callNav function called with:", { id, type });

    if (type === "movies") {
      navigate(`/movie/${id}`);
    } else {
      navigate(`/series/${id}`);
    }
  };

  return { callNav, nav, navMovieDetail, navSerieDetail };
};

export default useNavDetail;
