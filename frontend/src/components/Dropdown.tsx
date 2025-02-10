import './CSS/Dropdown.css'

import { useState } from "react";

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`hamburgerContainer ${isOpen ? "isopened" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`line1 ${isOpen ? "degreeLine1" : ""}`}></div>
      <div className={`line2 ${isOpen ? "hideLine2" : ""}`}></div>
      <div className={`line3 ${isOpen ? "degreeLine3" : ""}`}></div>
    </div>
  );
};

export default Dropdown;
