import "./CSS/Dropdown.css";
import { useState } from "react";
import { Link } from "react-router";
import { useThemeStore } from "@/context/useThemeStore";
import { useUserActions } from "@/hooks/useUser";

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { accessToken, handleLogout, isAdmin } = useUserActions();
  const admin = isAdmin();

  const hamburger = () => {
    setIsOpen(!isOpen);
  };
  const { dark } = useThemeStore();

  const handleSelect = (item: string) => {
    setSelected(item);
  };

  return (
    <>
      <button
        className={`hamburgerContainer ${isOpen ? "isopened" : ""} `}
        onClick={() => hamburger()}
      >
        <div className={`line1 ${isOpen ? "degreeLine1" : ""} `}></div>
        <div className={`line2 ${isOpen ? "hideLine2" : ""}`}></div>
        <div className={`line3 ${isOpen ? "degreeLine3" : ""}`}></div>
      </button>

      <div
        className={`sidebar ${isOpen ? "sidebar-open" : ""} ${dark === true ? "" : "darkBackgroundOnly"
          }`}
      >
        <ul
          className={`${dark === true ? "light" : "dark"}`}
          onClick={() => hamburger()}
        >
          <li>
            <svg
              width="15"
              height="15"
              viewBox="0 0 34 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.42857 34.5951H11.3949V22.3852C11.3949 21.8353 11.5835 21.3743 11.9607 21.0023C12.3363 20.6288 12.8018 20.442 13.3571 20.442H20.6429C21.1982 20.442 21.6645 20.6288 22.0417 21.0023C22.4173 21.3743 22.6051 21.8353 22.6051 22.3852V34.5951H31.5714V13.6913C31.5714 13.4444 31.5172 13.22 31.4087 13.0179C31.3002 12.8159 31.1521 12.6396 30.9643 12.4889L17.8889 2.72961C17.6395 2.51477 17.3432 2.40735 17 2.40735C16.6568 2.40735 16.3613 2.51477 16.1136 2.72961L3.03571 12.4889C2.84952 12.6428 2.70138 12.8191 2.59129 13.0179C2.48119 13.2167 2.42695 13.4412 2.42857 13.6913V34.5951ZM0 34.5951V13.6913C0 13.0757 0.139238 12.4929 0.417714 11.9429C0.69619 11.393 1.0799 10.9401 1.56886 10.5841L14.6467 0.776797C15.3316 0.258933 16.1136 0 16.9927 0C17.8719 0 18.6587 0.258933 19.3533 0.776797L32.4311 10.5817C32.9217 10.9377 33.3054 11.3914 33.5823 11.9429C33.8608 12.4929 34 13.0757 34 13.6913V34.5951C34 35.2396 33.758 35.8015 33.2739 36.2809C32.7898 36.7603 32.2223 37 31.5714 37H22.1389C21.5819 37 21.1156 36.814 20.74 36.4421C20.3644 36.0685 20.1766 35.6067 20.1766 35.0568V22.8493H13.8234V35.0568C13.8234 35.6083 13.6356 36.0701 13.26 36.4421C12.8844 36.814 12.4189 37 11.8636 37H2.42857C1.77771 37 1.21024 36.7603 0.726142 36.2809C0.242047 35.8015 0 35.2396 0 34.5951Z"
                fill="#E85448"
              />
            </svg>
            <Link to="/" onClick={() => handleSelect("home")}>
              <p
                className={`${dark === true ? "" : "darkTextColor"
                  } textMargin ${selected === "home" ? "selected" : ""}`}
              >
                {" "}
                Home
              </p>
            </Link>{" "}
          </li>
          {/* <li>
            <svg
              width="15"
              height="15"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.7333 42L24.0333 27.3C22.8667 28.2333 21.525 28.9722 20.0083 29.5167C18.4917 30.0611 16.8778 30.3333 15.1667 30.3333C10.9278 30.3333 7.34067 28.8649 4.40533 25.928C1.47 22.9911 0.00155679 19.404 1.23457e-06 15.1667C-0.00155432 10.9293 1.46689 7.34222 4.40533 4.40533C7.34378 1.46844 10.9309 0 15.1667 0C19.4024 0 22.9903 1.46844 25.9303 4.40533C28.8703 7.34222 30.338 10.9293 30.3333 15.1667C30.3333 16.8778 30.0611 18.4917 29.5167 20.0083C28.9722 21.525 28.2333 22.8667 27.3 24.0333L42 38.7333L38.7333 42ZM15.1667 25.6667C18.0833 25.6667 20.5629 24.6462 22.6053 22.6053C24.6478 20.5644 25.6682 18.0849 25.6667 15.1667C25.6651 12.2484 24.6447 9.76967 22.6053 7.73033C20.566 5.691 18.0864 4.66978 15.1667 4.66667C12.2469 4.66356 9.76811 5.68478 7.73033 7.73033C5.69256 9.77589 4.67133 12.2547 4.66667 15.1667C4.662 18.0787 5.68322 20.5582 7.73033 22.6053C9.77745 24.6524 12.2562 25.6729 15.1667 25.6667Z"
                fill="#E85448"
              />
            </svg>{" "}
            <Link to="search">
              <p
                className={`${dark === true ? "" : "darkTextColor"} textMargin`}
              >
                Search
              </p>
            </Link>{" "}
          </li> */}
          <li>
            <svg
              width="15"
              height="15"
              viewBox="0 0 154 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M71.3014 2.98447C62.9929 7.25884 56.8286 13.217 51.7364 22.2839C39.8098 43.0081 39.6758 60.3646 51.4684 82.2545C58.4367 95.0776 60.3128 104.922 56.9626 111.139C55.7566 113.341 53.8805 115.672 52.5404 116.32C50.6643 117.356 50.7983 118.004 54.4165 121.242C61.2508 127.718 75.0535 136.008 78.6717 136.008C79.3418 136.008 80.6818 134.324 81.6199 132.122C83.63 127.33 82.1559 115.284 79.6098 115.284C77.76 113.609 77.4657 113.018 77.4657 111.009C79.7438 108.807 81.2442 107.106 77.76 107.106C74.2758 107.106 67.1735 101.019 67.9775 98.8166C68.2455 98.0394 68.4872 97.9272 70.8993 98.1863C73.4455 98.3158 79.8778 97.5386 85.238 96.3729C93.1444 94.6891 95.8246 94.5595 98.9067 95.8548C101.051 96.632 103.597 97.1501 104.535 97.0205C107.483 96.3729 113.781 98.3158 113.781 99.8701C113.781 100.518 111.101 102.202 107.885 103.626C101.587 106.217 97.7007 110.362 97.7007 114.636C97.7007 116.19 99.4428 119.947 101.453 123.185C110.565 137.174 113.513 148.054 111.101 158.157C109.761 163.597 107.751 166.447 100.783 173.441C88.5882 185.357 86.9801 187.559 86.9801 192.222C86.9801 199.735 89.1242 201.03 98.3707 199.346C139.243 192.093 165.642 147.924 148.891 114.895C144.603 106.605 140.181 101.036 137.635 101.036C137.099 101.036 136.563 103.108 136.563 105.699C136.563 108.289 135.625 112.046 134.285 113.988C130.934 119.429 117.802 125.775 117.802 122.019C117.802 121.371 119.678 117.227 122.09 112.693C125.574 105.828 126.244 102.979 126.378 95.3367C126.512 73.8353 119.812 62.5665 93.1444 39.5109C76.6616 25.263 71.0333 15.5485 74.1155 6.74073C74.9195 4.40926 76.5276 1.94825 77.5997 1.30062C81.4859 -1.16038 76.7956 0.134892 71.3014 2.98447Z"
                fill="#E85448"
              />
              <path
                d="M25.4618 76.7392C20.4534 78.1081 7.58917 93.0524 8.52722 96.6791C9.73328 101.472 18.9797 111.963 26.6181 117.533C30.5043 120.123 43.0449 127.478 43.313 127.219C43.581 126.96 33.3602 118.826 30.6801 115.976C15.0393 94.6743 21.3076 83.6041 27.0699 77.5164C30.152 74.2782 29.616 74.0191 25.4618 76.7392Z"
                fill="#E85448"
              />
              <path
                d="M0 124.858C0.601566 133.73 3.78552 134.428 13.836 137.278C27.0705 142.008 51.4041 142.105 49.93 139.644C49.394 138.997 41.2741 138.199 38.4599 137.681C30.8215 136.515 13.2345 129.588 9.64848 126.93C8.42193 126.038 4.81253 123.671 3.6094 121.897L0 113.613V124.858Z"
                fill="#E85448"
              />
              <path
                d="M4.81264 156.833C4.81264 157.48 4.60611 159.382 6.61621 160.355C8.81707 162.933 40.305 162.13 48.858 155.474C51.6722 154.308 52.0742 153.79 49.9301 154.438C46.4459 155.215 12.719 157.221 7.76079 156.314C6.15271 156.055 4.81264 156.314 4.81264 156.833Z"
                fill="#E85448"
              />
              <path
                d="M48.7281 178.106C40.1521 186.525 27.8797 181.711 23.3237 181.064C18.3657 180.286 18.6521 181.535 23.878 183.996C27.496 185.81 37.7602 193.27 40.3062 191.715C45.8002 188.218 68.3175 160.946 66.1735 160.946C65.9055 160.946 52.3375 175.147 48.7281 178.106Z"
                fill="#E85448"
              />
            </svg>{" "}
            <Link to="aboutus" onClick={() => handleSelect("aboutUs")}>
              <p
                className={`${dark === true ? "" : "darkTextColor"
                  } textMargin ${selected === "aboutUs" ? "selected" : ""}`}
              >
                About us
              </p>
            </Link>
          </li>
          <li>
            <svg
              width="15"
              height="15"
              viewBox="0 0 11 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 10.5011C8.14949 10.5011 10.5 8.15032 10.5 5.25053C10.5 2.35074 8.14949 0 5.25 0C2.3505 0 0 2.35074 0 5.25053C0 8.15032 2.3505 10.5011 5.25 10.5011Z"
                fill="#E85448"
              />
              <path
                d="M1.0625 16.7969H9.4625V50.4003H1.0625V16.7969Z"
                fill="#E85448"
              />
            </svg>{" "}
            <Link to="howtodownload" onClick={() => handleSelect("download")}>
              <p
                className={`${dark === true ? "" : "darkTextColor"
                  } textMargin ${selected === "download" ? "selected" : ""}`}
              >
                How to download?
              </p>
            </Link>
          </li>
          <li>
            <svg
              width="15"
              height="15"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5 4C5 2.93913 5.42143 1.92172 6.17157 1.17157C6.92172 0.421427 7.93913 0 9 0C10.0609 0 11.0783 0.421427 11.8284 1.17157C12.5786 1.92172 13 2.93913 13 4C13 5.06087 12.5786 6.07828 11.8284 6.82843C11.0783 7.57857 10.0609 8 9 8C7.93913 8 6.92172 7.57857 6.17157 6.82843C5.42143 6.07828 5 5.06087 5 4ZM5 10C3.67392 10 2.40215 10.5268 1.46447 11.4645C0.526784 12.4021 0 13.6739 0 15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15C18 13.6739 17.4732 12.4021 16.5355 11.4645C15.5979 10.5268 14.3261 10 13 10H5Z"
                fill="#E85448"
              />
            </svg>{" "}
            <Link to="profile" onClick={() => handleSelect("profile")}>
              <p
                className={`${dark === true ? "" : "darkTextColor"
                  } textMargin ${selected === "profile" ? "selected" : ""}`}
              >
                Profile
              </p>
            </Link>
          </li>

          <hr />

          {accessToken ?
            <li className="logout">
              <Link to="/" onClick={() => {
                handleSelect("logout");
                handleLogout();
              }}>
                <p
                  className={`textMargin ${selected === "logout" ? "selected" : ""
                    }`}
                >
                  Logout
                </p>
              </Link>
            </li>
            :
            <li>
              {" "}
              <Link to="login" onClick={() => handleSelect("login")}>
                <p
                  className={`${dark === true ? "" : "darkTextColor"
                    } textMargin ${selected === "login" ? "selected" : ""}`}
                >
                  Login
                </p>
              </Link>{" "}
            </li>
          }
          {!accessToken && <li>
            {" "}
            <Link to="register" onClick={() => handleSelect("register")}>
              <p
                className={`${dark === true ? "" : "darkTextColor"
                  } textMargin ${selected === "register" ? "selected" : ""}`}
              >
                Register
              </p>
            </Link>
          </li>
          }
          {admin &&
            <li>
              <Link to="admin/team-panel" onClick={() => handleSelect("admin")}>
                <p
                  className={`${dark === true ? "" : "darkTextColor"
                    } textMargin ${selected === "admin" ? "selected" : ""}`}
                >
                  Admin Panel
                </p>
              </Link>
            </li>
          }
          {/* <li>
            <Link to="test">
              <p
                className={`${dark === true ? "" : "darkTextColor"} textMargin`}
              >
                Test
              </p>
            </Link>
          </li> */}
          {/* 
          <li>
            <Link to="test-movies">
              <p
                className={`${dark === true ? "" : "darkTextColor"} textMargin`}
              >
                Test Movies
              </p>
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
