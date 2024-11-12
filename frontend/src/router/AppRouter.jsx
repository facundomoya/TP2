import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import Index from "../pages/Index";
import NewStudent from "../pages/NewStudent";
import StudentList from "../pages/StudentList";

const AppRouter = () => {
  return (
    <Routes>

      {/* Reutilización del NavBar para todas las páginas, con distinto título y botón enviado por props  */}

      <Route element={<NavBar title="Pagina Principal"/>}>
        <Route index exact path="/" element={<Index ></Index>}></Route>
      </Route>

      <Route element={<NavBar title="Alumnos" addStudentBtn={true}/> }>
        <Route
          exact
          path="/students"
          element={<StudentList></StudentList>}
        ></Route>
      </Route>

      <Route element={<NavBar title="Alumnos" backBtn={true}/>}>
        <Route
          exact
          path="/students/add"
          element={<NewStudent></NewStudent>}
        ></Route>
      </Route>

    </Routes>
  );
};

export default AppRouter;
