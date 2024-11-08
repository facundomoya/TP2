import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../style/sideBar.css";

const SideBar = () => {
  const location = useLocation(); // Obtenemos la ubicación actual

  return (
    <aside>
      <p className="my-4 font-weight-bold">Trabajo Practico 2</p>
      <div className="link">
        <ul>
          <li className={location.pathname === "/" ? "selected_page_main " : "hover_main"}>
            <Link to="/" className="links">
              <label>Pagina Principal</label>
            </Link>
          </li>

          <li className={(location.pathname === "/students" || location.pathname === "/students/add") ? "selected_page_students" : "hover_students"}>
            <Link to="/students" className="links">
              <label>Alumnos</label>
            </Link>
          </li>
        </ul>

      </div>
    </aside>
  );
};

export default SideBar;
