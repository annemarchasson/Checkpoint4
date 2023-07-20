import { useEffect, useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Register/RegisterForm";
import LogoAzart from "../../assets/images/logo.png";

import "./Home.scss";

function Home() {
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
    <div className="container-max-home">
      <img className="picture-home" src={LogoAzart} alt="Logo Az'art" />
      {/* Vérification de l'état de connexion de l'utilisateur */}
      {user == null ? (
        // Si l'utilisateur n'est pas connecté, affiche les formulaires d'inscription et de connexion
        <>
          <details>
            <summary className="btn-login">S'inscrire</summary>
            <RegisterForm />
          </details>
          <details>
            <summary className="btn-connect">Se Connecter</summary>
            <LoginForm setUser={setUser} />
          </details>
        </>
      ) : (
        // Si l'utilisateur est connecté, affiche le bouton de déconnexion
        <button type="button" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}
export default Home;
