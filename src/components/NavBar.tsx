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

  const darkToBody = () => {
    document.body.style.backgroundColor = dark === true ? "#131212" : "#fff";
  }

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
        <div className="modeButton" onClick={() => {
          setThemeStore(!dark)
          darkToBody()
        }}>

          {dark === true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 156 154"
              fill="none"
            >
              <path
                d="M146.182 77H153M78 9.72727V3M78 151V144.273M132.545 130.818L125.727 124.091M132.545 23.1818L125.727 29.9091M23.4545 130.818L30.2727 124.091M23.4545 23.1818L30.2727 29.9091M3 77H9.81818M78 117.364C88.8498 117.364 99.2552 113.111 106.927 105.541C114.599 97.9718 118.909 87.7051 118.909 77C118.909 66.2949 114.599 56.0282 106.927 48.4586C99.2552 40.8889 88.8498 36.6364 78 36.6364C67.1502 36.6364 56.7448 40.8889 49.0729 48.4586C41.401 56.0282 37.0909 66.2949 37.0909 77C37.0909 87.7051 41.401 97.9718 49.0729 105.541C56.7448 113.111 67.1502 117.364 78 117.364Z"
                stroke="#E85448"
                stroke-width="5.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 81 95"
              fill="none"
            >
              <path
                d="M39.3028 5.84667C39.6645 5.28125 39.8786 4.60493 39.9191 3.89968C39.9597 3.19443 39.8249 2.49053 39.5313 1.87329C39.2376 1.25605 38.7975 0.751971 38.2645 0.42215C37.7314 0.0923297 37.1283 -0.0490722 36.5281 0.0150832C14.0394 2.42177 1.48657 23.166 0.124125 44.3731C-1.23832 65.6192 8.58543 88.0978 31.0741 93.9001C54.6927 99.9899 78.7266 80.0788 80.9863 51.7783C81.0425 51.0776 80.9251 50.3728 80.648 49.7486C80.3709 49.1243 79.946 48.6072 79.4244 48.2594C78.9028 47.9116 78.3066 47.7478 77.7075 47.7878C77.1085 47.8278 76.532 48.0699 76.0474 48.4849C64.2631 58.5648 50.7923 54.8963 42.252 44.9577C33.7201 35.0241 30.6214 19.4342 39.3028 5.84667Z"
                fill="#E85448"
              />
            </svg>
          )}
        </div>
      </div>
    </div >
  );
}
