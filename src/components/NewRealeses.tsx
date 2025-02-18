import { useMovie } from "@/hooks/useMovie";
import "./CSS/NewRealses.css";
import useNavDetail from "@/hooks/useNavDetail";
import { useState } from "react";

export default function NewRealeses() {
  const { data: newRealses } = useMovie();
  const { callNav } = useNavDetail();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 300; // Adjust scroll speed
  const maxScroll = newRealses.length * 300 - 1050; // Prevent infinite scrolling

  const handleScroll = (direction: "left" | "right") => {
    setScrollPosition((prev) => {
      let newScroll =
        direction === "left" ? prev - scrollAmount : prev + scrollAmount;
      return Math.max(0, Math.min(newScroll, maxScroll)); // Prevent over-scrolling
    });
  };

  return (
    <div className="NR-movie-section">
      <h2>New Realsese</h2>
      <div className="NR-scroll-container">
        <button
          className="scroll-btn left"
          onClick={() => handleScroll("left")}
        >
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
        </button>

        <div
          className="NR-movie-grid"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {newRealses &&
            newRealses.map((newRealse) => (
              <div
                className="NR-movie-box"
                key={newRealse._id}
                onClick={() => callNav(newRealse._id)}
                style={{
                  backgroundImage: `url(${newRealse.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
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
        <button
          className="scroll-btn right"
          onClick={() => handleScroll("right")}
        >
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
        </button>
      </div>
    </div>
  );
}
