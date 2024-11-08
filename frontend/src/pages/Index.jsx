import React from "react";
import { Link } from "react-router-dom";


const Index = () => {
  return (
    <div className="containerMain">
      <Link to="/students" className="links w-100 ">
        <h2 className="text-center m-5">Modulo Alumnos</h2>
      </Link>
    </div>
  );
};

export default Index;
