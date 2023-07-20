import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Login.scss";

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
    <form className="form-sub" onSubmit={handleSubmit}>
      <div className="input-place">
        <label className="label-workshp" htmlFor="email">
          email
        </label>
        <input
          className="input-workshop"
          type="text"
          id="email"
          ref={emailRef}
        />
      </div>
      <div className="input-place">
        <label className="label-workshp" htmlFor="hashedPassword">
          mot de passe
        </label>
        <input
          className="input-workshop"
          type="password"
          id="hashedPassword"
          ref={passwordRef}
        />
      </div>
      <button className="btn-add" type="submit" onClick={handleClicktoHome}>
        Valider
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
