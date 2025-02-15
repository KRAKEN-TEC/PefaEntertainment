import './CSS/Dropdown.css'
import { useState } from "react";
import { NavLink } from 'react-router';


const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hamburger = () =>{
    setIsOpen(!isOpen)
  }

  return (
    <>
    <button
      className={`hamburgerContainer ${isOpen ? "isopened" : ""}`}
      onClick={() => hamburger() }
    >
      <div className={`line1 ${isOpen ? "degreeLine1" : ""}`}></div>
      <div className={`line2 ${isOpen ? "hideLine2" : ""}`}></div>
      <div className={`line3 ${isOpen ? "degreeLine3" : ""}`}></div>
    </button>

    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
          <ul onClick={()=> hamburger()}>
             <li> <NavLink to="/">Home</NavLink> </li>
             <li> <NavLink to="search">Search</NavLink> </li>
             <li> <NavLink to="aboutus"> About us</NavLink></li>
             <li> <NavLink to="howtodownload">How to download?</NavLink></li>
             <li> <NavLink to="profile">Profile</NavLink></li>

             <hr />
             <li> <NavLink to="login">Login</NavLink> </li>
             <li> <NavLink to="register">Register</NavLink></li>
             <li className="logout"><NavLink to="/">Logut</NavLink></li>
          </ul>
    </div>
    </>
  );
};

export default Dropdown;
