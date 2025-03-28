import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ListMovies from './components/ListMovies';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body"  data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-link active">Home</Link>
              <Link to="/listMovies" className="nav-link active">Películas</Link>
              <Link to="/about" className="nav-link active">About</Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/listMovies' element={<ListMovies />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
