import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function LoginForm({ setUser }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const handleClicktoHome = () => {
    navigate("/Workshop");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: emailRef.current.value,
        hashedPassword: passwordRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.info("cookie?", document.cookie);

        setUser(data.user);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">email</label>
        <input type="text" id="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="hashedPassword">mot de passe</label>
        <input type="password" id="hashedPassword" ref={passwordRef} />
      </div>
      <button type="submit" onClick={handleClicktoHome}>
        Valider
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
