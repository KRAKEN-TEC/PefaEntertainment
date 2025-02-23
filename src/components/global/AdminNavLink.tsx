
import { GoHomeFill } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { MdMovieEdit } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { NavLink } from "react-router";

function AdminNavLink() {
  return (
    <>
      <NavLink to="/">
        <GoHomeFill size={"30px"} />
      </NavLink>
      <NavLink to="/admin/team-panel">
        <ImProfile size={"27px"} />
      </NavLink>
      <NavLink to="/admin/movie-panel">
        <MdMovieEdit size={"31px"} />
      </NavLink>
      <NavLink to="/admin/serie-panel/series">
        <RiMovie2Fill size={"31px"} />
      </NavLink>
    </>
  )
}

export default AdminNavLink
