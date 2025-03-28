import { useEffect, useState } from "react";
import axios from "axios";

function ListMovies() {
    const [peliculas, setPeliculas] = useState([]);
    useEffect( ()=>{

        const carga = async()=>{
            const lista = await axios.get("http://localhost:3000/peliculas");
            setPeliculas(lista.data)
        }
        carga();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = await confirm("¿Estás seguro de que deseas eliminar esta película?");
        if (confirmDelete) {
          try {
            await axios.delete(`http://localhost:3000/peliculas/${id}`);
            setPeliculas(peliculas.filter((pelicula) => pelicula.id !== id));
          } catch (error) {
            console.error("Error al eliminar la película:", error);
          }
        }
      };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">Listado de Películas</h2>
      
      <button className="btn btn-success mb-3" onClick={() => navigate("/new-movies")}>
        <i className="bi bi-plus-circle me-1"></i> Crear nueva película
      </button>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Fecha de Estreno</th>
            <th>Nacionalidad</th>
            <th>Clasificación</th>
            <th>Director</th>
            <th>Géneros</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((pelicula) => (
            <tr key={pelicula.id}>
              <td>{pelicula.id}</td>
              <td>{pelicula.titulo}</td>
              <td>{pelicula.fecha_estreno}</td>
              <td>{pelicula.nacionalidad}</td>
              <td>{pelicula.clasificacion}</td>
              <td>{pelicula.director}</td>
              <td>{pelicula.generos.join(", ")}</td>
              <td>
                  <button className="btn btn-warning me-2">
                    <i className="bi bi-pencil"></i> 
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(pelicula.id)}>
                    <i className="bi bi-trash"></i> 
                  </button>
                </td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListMovies