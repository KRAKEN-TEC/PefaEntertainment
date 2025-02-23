import { useMovie } from "@/hooks/useMovie";
import { useMovieStore } from "@/context/useMovieStore";
import "./CSS/NewRealses.css";
import useNavDetail from "@/hooks/useNavDetail";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { scroll } from "@/helper/GlobalHelper";
import ButtonWithSVGIcon from "./ui/ButtonWithSvgIcon";
export default function NewRealeses() {
  const { movieQuery, setMovieQuery } = useMovieStore();
  const { data: newRealses } = useMovie(movieQuery);
  const { callNav } = useNavDetail();
  const NR_movie_container = useRef<HTMLDivElement | null>(null);
  const NR_movie_box = useRef<HTMLDivElement | null>(null);
  const [clientWidth, setClientWidth] = useState<number>(0);
  const [apiCallingWatcher, setApiCallingWatcher] = useState({
    watchNumber: 0,
    shouldCall: false,
  });
  useLayoutEffect(() => {
    if (NR_movie_box.current) {
      setClientWidth(NR_movie_box.current.clientWidth);
    }
  }, []);
  console.log(movieQuery);
  useEffect(() => {
    if (
      apiCallingWatcher.watchNumber > newRealses.length - 4 &&
      apiCallingWatcher.shouldCall
    ) {
      setMovieQuery({ ...movieQuery, page: movieQuery.page + 1 });
      console.log(newRealses);
    }
  }, [apiCallingWatcher]);
  return (
    <div className="NR-movie-section">
      <h2>New Realsese</h2>
      <div className="NR-scroll-container" ref={NR_movie_container}>
        {newRealses.length > 1 && (
          <>
            <ButtonWithSVGIcon
              onClick={() => {
                scroll("left", NR_movie_container.current!, clientWidth);
                setApiCallingWatcher((prev) =>
                  prev.watchNumber === 0
                    ? { watchNumber: 0, shouldCall: false }
                    : { watchNumber: prev.watchNumber - 1, shouldCall: false }
                );
              }}
              btnType="button"
              className="scroll-btn left"
              svg={
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 25C50 38.8235 38.8235 50 25 50C11.1765 50 0 38.8235 0 25C0 11.1765 11.1765 0 25 0C38.8235 0 50 11.1765 50 25ZM2.94118 25C2.94118 37.2059 12.7941 47.0588 25 47.0588C37.2059 47.0588 47.0588 37.2059 47.0588 25C47.0588 12.7941 37.2059 2.94118 25 2.94118C12.7941 2.94118 2.94118 12.7941 2.94118 25Z"
                    fill="#E85448"
                  />
                  <path
                    d="M27.472 12.7911L15.2661 24.997L27.472 37.2029L25.4131 39.2617L11.1484 24.997L25.4131 10.7323L27.472 12.7911Z"
                    fill="#E85448"
                  />
                  <path
                    d="M13.2656 26.4668V23.5256H38.2656V26.4668H13.2656Z"
                    fill="#E85448"
                  />
                </svg>
              }
            />
            {/* <button
              className="scroll-btn left"
              onClick={() =>
                // scroll("left", NR_movie_container.current!, clientWidth)
                setMovieQuery({ ...movieQuery, page: movieQuery.page + 1 })
              }
            >
         
            </button> */}
            <ButtonWithSVGIcon
              onClick={() => {
                scroll("right", NR_movie_container.current!, clientWidth);
                setApiCallingWatcher({
                  watchNumber: apiCallingWatcher.watchNumber + 1,
                  shouldCall: true,
                });
              }}
              btnType="button"
              className="scroll-btn right"
              svg={
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="scale(-1,1) translate(-50,0)">
                    <path
                      d="M50 25C50 38.8235 38.8235 50 25 50C11.1765 50 0 38.8235 0 25C0 11.1765 11.1765 0 25 0C38.8235 0 50 11.1765 50 25ZM2.94118 25C2.94118 37.2059 12.7941 47.0588 25 47.0588C37.2059 47.0588 47.0588 37.2059 47.0588 25C47.0588 12.7941 37.2059 2.94118 25 2.94118C12.7941 2.94118 2.94118 12.7941 2.94118 25Z"
                      fill="#E85448"
                    />
                    <path
                      d="M27.472 12.7911L15.2661 24.997L27.472 37.2029L25.4131 39.2617L11.1484 24.997L25.4131 10.7323L27.472 12.7911Z"
                      fill="#E85448"
                    />
                    <path
                      d="M13.2656 26.4668V23.5256H38.2656V26.4668H13.2656Z"
                      fill="#E85448"
                    />
                  </g>
                </svg>
              }
            />
          </>
        )}

        <div className="NR-movie-grid">
          {newRealses &&
            newRealses.map((newRealse) => (
              <div
                ref={NR_movie_box}
                className="NR-movie-box"
                key={newRealse._id}
                onClick={() => callNav(newRealse._id)}
                style={{
                  backgroundImage: `url(${newRealse.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "500px",
                }}
              >
                {/* <img src={newRealse.poster_url} /> */}

                <div className="overlay">
                  <h3>{newRealse.title}</h3>
                  {/* <span>{newRealse.description}</span> */}
                  <ul>
                    {newRealse.genres.map((genre) => (
                      <li key={genre._id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
