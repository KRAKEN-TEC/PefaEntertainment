import { useMovie } from "@/hooks/useMovie";
import "./CSS/NewRealses.css";
import useNavDetail from "@/hooks/useNavDetail";
import { useState } from "react";

export default function NewRealeses() {
  const { data: newRealses } = useMovie();
  const { callNav } = useNavDetail();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 600; // Adjust scroll speed
  const maxScroll = newRealses.length * 210 - 1050; // Prevent infinite scrolling

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
          ⬅
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

                <div>
                  <h3>{newRealse.title}</h3>
                  <span>{newRealse.description}</span>
                  command:formatter/configure/dfl/19774184-6f13-4006-a47c-b894a2f08a1d
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
          ➡
        </button>
      </div>
    </div>
  );
}
