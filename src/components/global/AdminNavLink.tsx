
import { MdHomeFilled } from "react-icons/md";
import { MdSupervisedUserCircle } from "react-icons/md";
import { MdMovieEdit } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { NavLink } from "react-router";

function AdminNavLink() {
  return (
    <>
      <NavLink to="/">
        <MdHomeFilled size={"31px"} />
      </NavLink>
      <NavLink to="/admin/team-panel">
        <MdSupervisedUserCircle size={"31px"} />
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
