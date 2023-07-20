import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Workshop from "./pages/Workshop/Workshop";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="container-max-app">
        <div>
          {/* Composant de la barre de navigation */}
          <Navbar />
        </div>
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Workshop" element={<Workshop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
