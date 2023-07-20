import { useState } from "react";
import "./Register.scss";

function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Confirm, setConfirm] = useState(false);
  const handleFirstnameChange = (event) => {
    const newFirstname = event.target.value;
    setFirstname(newFirstname);
  };
  const handleLastnameChange = (event) => {
    const newLastname = event.target.value;
    setLastname(newLastname);
  };
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };
  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
  };
  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/user`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          address,
          phoneNumber,
        }),
      }
    ).then(() => {
      setConfirm(true);
    });
  };

  return (
    <form className="form-sub" onSubmit={handleSubmit}>
      <div className="input-place">
        <label className="label-workshp" htmlFor="firstname">
          Prénom
        </label>
        <input
          className="input-workshop"
          type="text"
          id="firstname"
          value={firstname}
          onChange={handleFirstnameChange}
        />
      </div>
      <div className="input-place">
        <label className="label-workshp" htmlFor="lastname">
          Nom
        </label>
        <input
          className="input-workshop"
          type="text"
          id="lastname"
          value={lastname}
          onChange={handleLastnameChange}
        />
      </div>
      <div className="input-place">
        <label className="label-workshp" htmlFor="email">
          Email
        </label>
        <input
          className="input-workshop"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="input-place">
        <label className="label-workshp" htmlFor="password">
          Mot de Passe
        </label>
        <input
          className="input-workshop"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="input-place">
        <label className="label-workshp" htmlFor="address">
          Adresse
        </label>
        <input
          className="input-workshop"
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <div className="input-place">
        <label className="label-workshp" htmlFor="phoneNumber">
          Téléphone
        </label>
        <input
          className="input-workshop"
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>

      <button className="btn-sub" type="submit">
        Valider
      </button>
      {Confirm && (
        <h3 className="thank">
          Tu es bien inscrit(e), maintenant connècte toi !
        </h3>
      )}
    </form>
  );
}

export default RegisterForm;
