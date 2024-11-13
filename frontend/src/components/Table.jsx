import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2
import jsPDF from 'jspdf';

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

  const generatePDF = (student) => {
    const doc = new jsPDF();
    const imgData = '../../public/images.png'; 
    doc.addImage(imgData, 'PNG', 10, 10, 50, 50);
  
    // Establecer el tipo de fuente y tamaño
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
  
    // Título
    doc.text("CERTIFICADO DE ALUMNO REGULAR", 60, 60);
  
    // Texto largo (usamos splitTextToSize para evitar que se desborde)
    const introText = `Por la presente se certifica que el/la estudiante con los siguientes datos personales es alumno/a regular de la materia de Programación Web en la Universidad Tecnológica Nacional - Facultad Regional Tucumán (UTN-FRT), correspondiente a la comisión 3K4.`;
    const introTextLines = doc.splitTextToSize(introText, 180);  // 180 es el ancho máximo disponible para el texto
    doc.text(introTextLines, 10, 75);
  
    // Datos del estudiante
    doc.text(`Nombre: ${student.firstname}`, 10, 95);
    doc.text(`Apellido: ${student.lastname}`, 10, 105);
  
    // Continuación del texto con fecha y lugar dentro del párrafo
    const conclusionText = `Este certificado se emite el día ${new Date().toLocaleDateString()} en Tucumán, Argentina y tiene validez para acreditar su condición de alumno regular ante cualquier entidad pública o privada que lo requiera. La firma que autentica este documento será colocada en la parte inferior del mismo.`;
    const conclusionTextLines = doc.splitTextToSize(conclusionText, 180);  // Ajustamos el ancho
    doc.text(conclusionTextLines, 10, 120);
  
    // **Firma al final**: Dejamos espacio para la firma al final del documento
    const pageHeight = doc.internal.pageSize.height;
    const signatureY = pageHeight - 30; // Ajustamos 30 unidades para dejar un margen
  
    // Agregar la firma
    doc.text("Firma: ____________________________", 10, signatureY);
  
    // Guardar el PDF con el nombre del estudiante
    doc.save(`Certificado_${student.firstname}_${student.lastname}.pdf`);
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
            <th scope="col">Certificado de Alumno Regular</th>
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
              <td>
                <button className="btn_class" onClick={() => generatePDF(student)}>Click aquí</button>
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
