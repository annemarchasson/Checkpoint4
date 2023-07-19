import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Effect hook pour vérifier l'état de connexion de l'utilisateur
    // et effectuer une requête pour récupérer le jeton d'authentification

    // Si l'utilisateur est connecté (user != null), envoie une requête pour récupérer le jeton
    if (user != null) {
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/show-token`,
        {
          credentials: "include",
        }
      );
    }
  }, [user]);

  // Fonction de déconnexion
  const logout = () => {
    // Envoie une requête pour déconnecter l'utilisateur
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/logout`,
      {
        credentials: "include",
      }
    ).then((response) => {
      // Si la déconnexion est réussie (réponse OK), met à jour l'état de l'utilisateur à null
      if (response.ok) {
        setUser(null);
      }
    });
  };

  return (
    <Router>
      <div>
        <div>
          {/* Composant de la barre de navigation */}
          <Navbar />
        </div>
        {/* Vérification de l'état de connexion de l'utilisateur */}
        {user == null ? (
          // Si l'utilisateur n'est pas connecté, affiche les formulaires d'inscription et de connexion
          <>
            <details>
              <summary>S'inscrire</summary>
              <RegisterForm />
            </details>
            <details>
              <summary>Se Connecter</summary>
              <LoginForm setUser={setUser} />
            </details>
          </>
        ) : (
          // Si l'utilisateur est connecté, affiche le bouton de déconnexion
          <button type="button" onClick={logout}>
            Logout
          </button>
        )}
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/Home" element={<Home />} />
        </Routes>
        {/* Composant du pied de page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
