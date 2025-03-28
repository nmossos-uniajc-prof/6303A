import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Tarjeta from "./Tarjeta"
import About from "./components/About";
import Faq from "./components/Faq";


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-md bg-dark border-bottom border-body"  data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/preguntas">Preguntas frecuentes</Link>
              <Link className="nav-link" to="/acerca">A cerca de </Link>
            </div>
          </div>
        </div>
      </nav>
      <h1>Modulos</h1>
      <Routes>
        <Route path="/" element={<Tarjeta nombre="manzana" tipo="Fruta" />} />
        <Route path="/preguntas" element={<Faq />} />
        <Route path="/acerca" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
