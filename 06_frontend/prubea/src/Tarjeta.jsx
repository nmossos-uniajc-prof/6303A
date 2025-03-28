import { useState } from "react";



function Tarjeta( {nombre, tipo, children} ) {
    const [calificacion, setCalificacion] = useState(0);
  return (
    <div className="card" style={{width: "18rem"}}>
    <div className="card-body">
        <h5 className="card-title">{ nombre }</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{ tipo }</h6>
        <p className="card-text"><b>Calificacion:</b> {calificacion}</p>
        <div className="card-text"> { children } </div>
        <button onClick={() => setCalificacion(calificacion+1)} className="btn btn-primary">Incrementar</button>
    </div>
    </div>
  )
}

export default Tarjeta