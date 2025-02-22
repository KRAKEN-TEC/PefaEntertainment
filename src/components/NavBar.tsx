import logo from "../assets/PEFA-black.svg";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import Dropdown from "./Dropdown";
import "./CSS/NavBar.css";

interface Props {
  onSearch: (searchValue: string) => void;
}

export default function NavBar({ onSearch }: Props) {
  return (
    <div className="mainbar">
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
            onSubmit={(event) => onSearch(event.searchName)}
          />
        </div>
        <div className="modeButton"></div>
      </div>
    </div>
  );
}
