import React, { useState } from "react";
import Table from "../components/Table";

const StudentList = () => {
  const [search, setSearch] = useState("");

  // Esta función se usará para actualizar el estado 'search' con lo que el usuario va escribiendo.
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="px-3">

      {/* Buscador */}
      <nav className="navbar navbar-light">
        <form className="form-inline w-50 d-flex">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Buscar por nombre o apellido"
            aria-label="Search"
            value={search} // Vinculamos el valor con el estado 'search'
            onChange={handleSearchChange} // Llamamos a esta función en cada cambio
          />
        </form>
      </nav>

      {/* Se renderiza la tabla con valores del Search (todos los datos o con datos del buscador) */}
      <Table search={search} />
      
    </div>
  );
};

export default StudentList;

