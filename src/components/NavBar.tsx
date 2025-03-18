import logo from "../assets/PEFA-black.svg";
import { NavLink } from "react-router-dom";
import SearchInput from "./global/SearchInput";
import Dropdown from "./Dropdown";
import "./CSS/NavBar.css";
import { useThemeStore } from "@/context/useThemeStore";
interface Props {
  onSearch: (searchValue: string) => void;
}

export default function NavBar({ onSearch }: Props) {
  const { dark, setThemeStore } = useThemeStore();

  return (
    <div className={`mainbar ${dark === true ? "light" : "dark"}`}>
      {/* Left Side: Dropdown */}
      <Dropdown />

      {/* Center: Logo */}
      <NavLink to="/" end>
        <img src={logo} />
      </NavLink>

      {/* Right Side: SearchInput and DarkMode */}
      <div className="searchCon">
        <div>
          <SearchInput
            placeholderName="movies"
            onSubmit={(event) => {
              onSearch(event.searchName);
            }}
          />
        </div>
        <div className="modeButton">
          <button onClick={() => setThemeStore(!dark)} className="theme-toggle">
            {dark === true ? " light Mode" : " dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
