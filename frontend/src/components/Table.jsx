import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2

const before = '<';
const after = '>';

const Table = ({ search }) => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalStudents, setTotalStudents] = useState(0);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/students", {
        params: {
          search,
          currentPage,
          pageSize,
        },
      });

      setStudents(response.data.rows);
      setTotalStudents(response.data.count);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  const borrado = async (id) => {

    try {
      const response = await axios.put(`http://localhost:3000/api/students/${id}`);
      fetchStudents();
      console.log(response);
    } catch (error) {
      console.error("Error al borrar el estudiante", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, currentPage, pageSize]);

  const totalPages = Math.ceil(totalStudents / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };


  const handleBorrar = (id) => {
   
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este registro se eliminará permanentemente.",
      icon: 'warning', // Puedes cambiar el icono si quieres
      showCancelButton: true, // Mostrar botón de Cancelar
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true, 
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llamamos a la función de borrado
        borrado(id);
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        );
      }
    });
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Legajo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.sid}</td>
              <td>{student.firstname}</td>
              <td>{student.lastname}</td>
              <td>
                <button
                  type="button"
                  className="btn_class back"
                  onClick={() => handleBorrar(student.id)} // Llamamos a handleBorrar
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container m-auto">
        <select id="rowsPerPage" onChange={handlePageSizeChange} value={pageSize}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <div id="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {before}
          </button>
          <span> Página {currentPage} de {totalPages} </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {after}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
