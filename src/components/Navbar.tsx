import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <ul className="nav nav-pills navbar-expand navbar-light bg-light">
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            "nav-link " + (isActive ? " active" : "")
          }
          to="/"
          end
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            "nav-link " + (isActive ? " active" : "")
          }
          to="/feedback/add"
        >
          Add request
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            "nav-link " + (isActive ? " active" : "")
          }
          to="/feedback/list"
        >
          List requests
        </NavLink>
      </li>
    </ul>
  );
}

export default Nav;
